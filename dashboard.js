// Chrome Daily Dashboard - Main JavaScript
// Complete functionality for insights, microlearning, news, and reflections

// Data Arrays - Sample subset included (user can expand to full 52/100/52)
const INSIGHTS = [
    {
        id: 1,
        insight: "Visionary leaders clarify the destination, not the path. Your team needs to know WHERE you're going, then empower them to figure out HOW to get there.",
        category: "Visionary Leadership",
        sources: [
            { title: "Start With Why - Simon Sinek", url: "https://simonsinek.com/books/start-with-why/" },
            { title: "HBR: The Work of Leadership", url: "https://hbr.org/1997/01/the-work-of-leadership" }
        ]
    },
    {
        id: 2,
        insight: "Empowerment isn't delegation—it's creating conditions where people can make decisions without you. Build systems, clarify boundaries, and then get out of the way.",
        category: "Empowering Leadership",
        sources: [
            { title: "Turn the Ship Around - David Marquet", url: "https://davidmarquet.com/turn-the-ship-around-book/" },
            { title: "Multipliers - Liz Wiseman", url: "https://www.multipliersbooks.com/" }
        ]
    }
    // Add all 52 insights here...
];

const MICROLEARNINGS = [
    {
        id: 1,
        topic: "Gradient Descent",
        category: "AI/ML Fundamentals",
        content: "Gradient descent is like rolling a ball down a hill to find the lowest point. Each step adjusts parameters to reduce error, moving toward optimal weights.",
        sources: [
            { title: "3Blue1Brown: Neural Networks", url: "https://www.3blue1brown.com/topics/neural-networks" }
        ],
        quiz: {
            question: "What is the primary purpose of gradient descent?",
            options: [
                "Finding optimal parameters by minimizing loss",
                "Generating training data",
                "Selecting architecture",
                "Normalizing inputs"
            ],
            correct: 0,
            explanation: "Gradient descent iteratively adjusts parameters to minimize the loss function.",
            brushUpLink: { title: "Gradient Descent Guide", url: "https://machinelearningmastery.com/gradient-descent-for-machine-learning/" }
        },
        difficulty: "intermediate"
    }
    // Add all 100 microlearnings here...
];

const REFLECTIONS = [
    { id: 1, question: "What belief about myself am I outgrowing today?", theme: "Personal Evolution" },
    { id: 2, question: "Where am I leading from fear instead of vision?", theme: "Leadership Awareness" },
    { id: 3, question: "Who on my team needs to be seen, and how will I show up for them?", theme: "Team Connection" }
    // Add all 52 reflections here...
];

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

// Summary data loaded from summary.json
let summaryData = null;

// Initialize
function init() {
    loadState();
    displayCurrentDate();
    loadDailyInsight();
    loadMicrolearning();
    loadDailyReflection();
    loadNews();
    updateReflectionTrigger();

    // Close reflection modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeReflectionModal();
        }
    });

    // Close reflection modal on backdrop click
    document.getElementById('reflectionModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeReflectionModal();
        }
    });
}

function loadState() {
    const saved = localStorage.getItem('dashboard_state');
    if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(state, parsed);
    }
}

function saveState() {
    localStorage.setItem('dashboard_state', JSON.stringify(state));
}

function displayCurrentDate() {
    const now = new Date();
    document.getElementById('currentDate').textContent =
        now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

// Daily Insight
function loadDailyInsight() {
    const available = INSIGHTS.filter(i => !state.seenInsights.includes(i.id));
    if (available.length === 0) {
        state.seenInsights = [];
        loadDailyInsight();
        return;
    }

    const insight = available[Math.floor(Math.random() * available.length)];
    state.currentInsight = insight;
    state.seenInsights.push(insight.id);
    saveState();

    document.getElementById('insightDisplay').innerHTML = `
        <span class="insight-category">${insight.category}</span>
        <p style="font-size: 1.15rem; line-height: 1.8; margin: 1rem 0; color: var(--text-secondary);">
            ${insight.insight}
        </p>
        <div style="margin-top: 1.5rem;">
            <div style="font-size: 0.85rem; font-weight: 600; color: var(--text-tertiary); margin-bottom: 0.75rem;">SOURCES</div>
            ${insight.sources.map(s => `<a href="${s.url}" class="source-link" target="_blank">${s.title}</a>`).join('')}
        </div>
    `;
}

function refreshInsight() {
    loadDailyInsight();
}

// Microlearning
function loadMicrolearning() {
    const available = MICROLEARNINGS.filter(m => !state.seenMicrolearnings.includes(m.id));
    if (available.length === 0) {
        state.seenMicrolearnings = [];
        loadMicrolearning();
        return;
    }

    const learning = available[Math.floor(Math.random() * available.length)];
    state.currentMicrolearning = learning;
    state.seenMicrolearnings.push(learning.id);
    saveState();

    const progress = state.quizProgress[learning.id] || { correct: 0, mastery: 'new' };
    const masteredCount = Object.values(state.quizProgress).filter(p => p.mastery === 'mastered').length;

    document.getElementById('microlearningDisplay').innerHTML = `
        <div class="progress-bar">
            <div class="progress-fill" style="width: ${(masteredCount / MICROLEARNINGS.length) * 100}%"></div>
        </div>
        <p style="font-size: 0.85rem; text-align: center; color: var(--text-tertiary); margin-bottom: 1.5rem;">
            ${masteredCount} of ${MICROLEARNINGS.length} mastered
        </p>

        <span class="insight-category">${learning.category}</span>
        <h3 style="font-size: 1.25rem; margin: 1rem 0;">${learning.topic}</h3>
        <p style="line-height: 1.7; color: var(--text-secondary); margin-bottom: 1rem;">
            ${learning.content}
        </p>

        <div style="margin: 1rem 0;">
            ${learning.sources.map(s => `<a href="${s.url}" class="source-link" target="_blank">${s.title}</a>`).join('')}
        </div>

        <button class="btn" onclick="showQuiz(${learning.id})">Test Your Knowledge</button>

        <div id="quiz-${learning.id}" class="quiz-container"></div>
    `;
}

function showQuiz(id) {
    const learning = MICROLEARNINGS.find(m => m.id === id);
    const container = document.getElementById(`quiz-${id}`);

    container.innerHTML = `
        <div style="font-size: 1.1rem; font-weight: 600; margin-bottom: 1.5rem;">${learning.quiz.question}</div>
        <div id="options-${id}">
            ${learning.quiz.options.map((opt, idx) => `
                <div class="quiz-option" onclick="checkAnswer(${id}, ${idx})">
                    ${opt}
                </div>
            `).join('')}
        </div>
        <div id="feedback-${id}"></div>
    `;

    container.style.display = 'block';
}

function checkAnswer(id, selected) {
    const learning = MICROLEARNINGS.find(m => m.id === id);
    const isCorrect = selected === learning.quiz.correct;

    const options = document.querySelectorAll(`#options-${id} .quiz-option`);
    options.forEach((opt, idx) => {
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

    document.getElementById(`feedback-${id}`).innerHTML = isCorrect
        ? `<div style="margin-top: 1.5rem; padding: 1rem; background: rgba(16, 185, 129, 0.1); border: 1px solid var(--success); border-radius: 8px;">
               <strong>Correct!</strong> ${learning.quiz.explanation}
           </div>`
        : `<div style="margin-top: 1.5rem; padding: 1rem; background: rgba(239, 68, 68, 0.1); border: 1px solid var(--error); border-radius: 8px;">
               <strong>Incorrect.</strong> ${learning.quiz.explanation}
               <div style="margin-top: 1rem;">
                   <a href="${learning.quiz.brushUpLink.url}" class="btn" target="_blank">Brush Up</a>
               </div>
           </div>`;
}

// ============================================
// NEWS SECTION - Summary.json Integration
// ============================================

// Sample fallback data when summary.json is not available
const FALLBACK_NEWS = {
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

// Helper: Convert timestamp to human-readable "time ago" format
function timeAgo(dateString) {
    if (!dateString) return '';

    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
        if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;

        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } catch (e) {
        return '';
    }
}

// Helper: Sanitize HTML to prevent XSS from RSS content
function sanitizeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML.replace(/<[^>]*>/g, '');
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

// Toggle article expansion
function toggleArticle(articleId) {
    const encodedId = btoa(articleId).replace(/[^a-zA-Z0-9]/g, '');
    const element = document.getElementById('article-' + encodedId);

    if (!element) return;

    const isExpanded = element.classList.contains('expanded');

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

// Load news from summary.json or fallback to sample data
async function loadNews() {
    try {
        const response = await fetch('summary.json');

        if (!response.ok) {
            throw new Error('HTTP ' + response.status);
        }

        summaryData = await response.json();

        if (!summaryData.summaries || typeof summaryData.summaries !== 'object') {
            throw new Error('Invalid summary.json structure');
        }

        console.log('Loaded summary.json successfully', summaryData);

        renderNewsSection('aiNewsDisplay', 'ai_news', summaryData.summaries.ai_news);
        renderNewsSection('businessNewsDisplay', 'business_news', summaryData.summaries.business_news);
        renderNewsSection('leadershipNewsDisplay', 'leadership_news', summaryData.summaries.leadership_news);

    } catch (error) {
        console.log('summary.json not available, using fallback data:', error.message);
        summaryData = null;

        renderNewsSection('aiNewsDisplay', 'ai_news', null);
        renderNewsSection('businessNewsDisplay', 'business_news', null);
        renderNewsSection('leadershipNewsDisplay', 'leadership_news', null);
    }
}

// Render a single article item
function renderArticleItem(article) {
    const articleId = getArticleId(article);
    const encodedId = btoa(articleId).replace(/[^a-zA-Z0-9]/g, '');
    const isViewed = state.viewedArticles.indexOf(articleId) !== -1;
    const isExpanded = state.expandedArticles.indexOf(articleId) !== -1;
    const timeAgoStr = timeAgo(article.published);
    const description = sanitizeHTML(article.description || article.summary || '');
    const displayDescription = description || 'No description available.';
    const articleLink = article.link || article.url || '#';

    // Score badge (only show if scores exist)
    var scoreBadge = '';
    if (article.scores && article.scores.combined) {
        scoreBadge = '<span class="article-score-badge">' + article.scores.combined.toFixed(1) + '</span>';
    }

    return '<div id="article-' + encodedId + '" class="news-item ' + (isViewed ? 'viewed' : '') + ' ' + (isExpanded ? 'expanded' : '') + '">' +
        '<div class="news-header" onclick="toggleArticle(\'' + articleId.replace(/'/g, "\\'") + '\')">' +
            '<span class="expand-icon">&#9654;</span>' +
            '<div class="news-content">' +
                '<div class="news-title">' +
                    '<a href="' + articleLink + '" target="_blank" onclick="event.stopPropagation();">' + sanitizeHTML(article.title) + '</a>' +
                    scoreBadge +
                '</div>' +
                '<div style="font-size: 0.8rem; color: var(--text-tertiary); margin-top: 0.35rem;">' +
                    sanitizeHTML(article.source) + (timeAgoStr ? ' - ' + timeAgoStr : '') +
                '</div>' +
            '</div>' +
        '</div>' +
        '<div class="news-description">' +
            '<p class="news-description-text">' + truncateText(displayDescription, 400) + '</p>' +
            '<a href="' + articleLink + '" class="read-full-link" target="_blank">Read Full Article &rarr;</a>' +
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

// Render a complete news section with summary and articles (top 5 + collapsible rest)
function renderNewsSection(elementId, categoryKey, categoryData) {
    const container = document.getElementById(elementId);
    let html = '';

    if (categoryData && categoryData.summary) {
        const generatedAt = summaryData && summaryData.generated_at
            ? new Date(summaryData.generated_at).toLocaleString('en-US', {
                month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
              })
            : 'Unknown';
        const articleCount = categoryData.article_count || (categoryData.articles ? categoryData.articles.length : 0);

        html += '<div class="executive-summary">' +
            '<div class="executive-summary-header">' +
                '<span class="executive-summary-title">Executive Summary</span>' +
                '<span class="executive-summary-meta">' + articleCount + ' articles - Generated ' + generatedAt + '</span>' +
            '</div>' +
            '<p class="executive-summary-text">' + sanitizeHTML(categoryData.summary) + '</p>' +
        '</div>';
    } else {
        html += '<div class="summary-unavailable">' +
            '<p class="summary-unavailable-text">Executive summaries not yet generated.</p>' +
            '<p class="summary-unavailable-text">Run <code>python news-summarizer.py</code> to create them.</p>' +
            '<button class="btn-secondary" onclick="showRegenerateInstructions()">How to Generate Summaries</button>' +
        '</div>';
    }

    const articles = (categoryData && categoryData.articles) ? categoryData.articles : (FALLBACK_NEWS[categoryKey] || []);

    // Split into top 5 and the rest
    const topArticles = articles.slice(0, 5);
    const moreArticles = articles.slice(5);

    // Render top 5 articles
    html += '<div class="top-articles-section">';
    topArticles.forEach(function(article) {
        html += renderArticleItem(article);
    });
    html += '</div>';

    // Render remaining articles in collapsible section
    if (moreArticles.length > 0) {
        html += '<button id="more-toggle-' + categoryKey + '" class="more-articles-toggle" onclick="toggleMoreArticles(\'' + categoryKey + '\')">' +
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

// Show instructions modal for regenerating summaries
function showRegenerateInstructions() {
    const modal = document.createElement('div');
    modal.id = 'instructions-modal';
    modal.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.8);display:flex;align-items:center;justify-content:center;z-index:1000;';

    modal.innerHTML = '<div style="background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:12px;padding:2rem;max-width:500px;margin:1rem;">' +
        '<h3 style="font-family:var(--font-display);margin-bottom:1.5rem;color:var(--accent-amber);">Generate Executive Summaries</h3>' +
        '<p style="color:var(--text-secondary);margin-bottom:1rem;">Follow these steps to generate AI-powered summaries:</p>' +
        '<ol style="color:var(--text-secondary);margin-left:1.5rem;margin-bottom:1.5rem;line-height:2;">' +
            '<li>Open a terminal/command prompt</li>' +
            '<li>Navigate to this dashboard folder</li>' +
            '<li>Ensure you have a <code style="background:var(--bg-primary);padding:0.1rem 0.3rem;border-radius:3px;">.env</code> file with your Groq API key</li>' +
            '<li>Run: <code style="background:var(--bg-primary);padding:0.1rem 0.3rem;border-radius:3px;">python news-summarizer.py</code></li>' +
            '<li>Refresh this page to see the summaries</li>' +
        '</ol>' +
        '<p style="color:var(--text-tertiary);font-size:0.85rem;margin-bottom:1.5rem;">Need a Groq API key? Visit <a href="https://console.groq.com/keys" target="_blank" style="color:var(--accent-cyan);">console.groq.com/keys</a> (free tier available)</p>' +
        '<button class="btn" onclick="document.getElementById(\'instructions-modal\').remove();">Got it!</button>' +
    '</div>';

    document.body.appendChild(modal);

    modal.addEventListener('click', function(e) {
        if (e.target === modal) modal.remove();
    });

    document.addEventListener('keydown', function closeOnEscape(e) {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', closeOnEscape);
        }
    });
}

// Reflection
function loadDailyReflection() {
    const today = new Date().toISOString().split('T')[0];

    if (state.reflections[today]) {
        renderSavedReflection(today, state.reflections[today]);
        return;
    }

    const available = REFLECTIONS.filter(function(r) { return state.seenReflections.indexOf(r.id) === -1; });
    if (available.length === 0) {
        state.seenReflections = [];
        loadDailyReflection();
        return;
    }

    const reflection = available[Math.floor(Math.random() * available.length)];
    state.currentReflection = reflection;
    state.seenReflections.push(reflection.id);
    saveState();

    renderReflection(reflection);
}

function renderReflection(reflection) {
    const today = new Date().toISOString().split('T')[0];
    const saved = state.reflections[today];

    document.getElementById('reflectionDisplay').innerHTML =
        '<p class="reflection-question">' + reflection.question + '</p>' +
        '<textarea id="reflectionText" class="reflection-textarea" placeholder="Take your time... this is for you.">' + (saved ? saved.response : '') + '</textarea>' +
        '<div class="reflection-actions" style="margin-top: 1rem;">' +
            '<button class="btn" onclick="saveReflection()">Save Reflection</button>' +
            '<button class="btn" onclick="exportReflections()">Export as Markdown</button>' +
        '</div>';
}

function renderSavedReflection(date, data) {
    document.getElementById('reflectionDisplay').innerHTML =
        '<p class="reflection-question">' + data.question + '</p>' +
        '<textarea id="reflectionText" class="reflection-textarea">' + data.response + '</textarea>' +
        '<div class="reflection-actions" style="margin-top: 1rem;">' +
            '<button class="btn" onclick="saveReflection()">Update Reflection</button>' +
            '<button class="btn" onclick="exportReflections()">Export as Markdown</button>' +
        '</div>' +
        '<p style="color: var(--text-tertiary); font-size: 0.85rem; margin-top: 1rem;">Last saved: ' + new Date(data.timestamp).toLocaleString() + '</p>';
}

function saveReflection() {
    const today = new Date().toISOString().split('T')[0];
    const text = document.getElementById('reflectionText').value;

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
    alert('Reflection saved!');
}

// Reflection Modal Functions
function openReflectionModal() {
    document.getElementById('reflectionModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeReflectionModal() {
    document.getElementById('reflectionModal').classList.remove('active');
    document.body.style.overflow = '';
}

function updateReflectionTrigger() {
    const today = new Date().toISOString().split('T')[0];
    const trigger = document.getElementById('reflectionTrigger');
    const hasResponse = state.reflections[today] && state.reflections[today].response;

    if (hasResponse) {
        trigger.classList.add('has-response');
        trigger.innerHTML = '<span>&#10003; Reflection Complete</span>';
    } else {
        trigger.classList.remove('has-response');
        trigger.innerHTML = '<span>Daily Reflection</span>';
    }
}

function exportReflections() {
    const entries = Object.entries(state.reflections).sort(function(a, b) { return b[0].localeCompare(a[0]); });

    if (entries.length === 0) {
        alert('No reflections to export');
        return;
    }

    let markdown = '# Daily Reflections\n\n';
    entries.forEach(function(entry) {
        const date = entry[0];
        const data = entry[1];
        const formatted = new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        markdown += '## ' + formatted + '\n\n';
        markdown += '**Question:** ' + data.question + '\n\n';
        markdown += data.response + '\n\n';
        markdown += '---\n\n';
    });

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'reflections-' + new Date().toISOString().split('T')[0] + '.md';
    a.click();
    URL.revokeObjectURL(url);
}

// Start App
window.addEventListener('DOMContentLoaded', init);
