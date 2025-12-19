# Contributing to Daily Intelligence

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Set up the development environment (see [README.md](README.md))
4. Create a new branch for your feature or fix

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/daily-intelligence-chrome-extension.git
cd daily-intelligence-chrome-extension

# Install Python dependencies
pip install -r requirements.txt

# Copy environment template
cp env.example .env
# Add your Groq API key to .env
```

## How to Contribute

### Reporting Bugs

- Check existing issues to avoid duplicates
- Use the bug report template if available
- Include:
  - Browser and version
  - Steps to reproduce
  - Expected vs actual behavior
  - Screenshots if applicable

### Suggesting Features

- Open an issue describing the feature
- Explain the use case and benefits
- Be open to discussion and feedback

### Submitting Code

1. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**:
   - Follow the existing code style
   - Keep changes focused and atomic
   - Test your changes thoroughly

3. **Commit your changes**:
   ```bash
   git commit -m "Add: brief description of change"
   ```

   Commit message prefixes:
   - `Add:` - New feature
   - `Fix:` - Bug fix
   - `Update:` - Enhancement to existing feature
   - `Refactor:` - Code restructuring
   - `Docs:` - Documentation only
   - `Style:` - Formatting, no code change

4. **Push and create a Pull Request**:
   ```bash
   git push origin feature/your-feature-name
   ```

## Code Guidelines

### JavaScript (dashboard.js)

- Use vanilla JavaScript (no frameworks)
- Maintain CSP compliance (no inline handlers or eval)
- Use event delegation patterns
- Add JSDoc comments for public functions

### Python (news-summarizer.py)

- Follow PEP 8 style guidelines
- Use type hints where appropriate
- Handle errors gracefully with logging
- Keep API calls efficient (respect rate limits)

### HTML/CSS

- Keep styles in the embedded `<style>` block
- Use CSS custom properties for theming
- Maintain responsive design
- Test in Chrome, Firefox, and Edge

## Adding Content

### New Leadership Insights

Add to the `INSIGHTS` array in `dashboard.js`:

```javascript
{
    id: NEXT_ID,
    insight: "Your insight text...",
    category: "Category Name",
    sources: [
        { title: "Source Title", url: "https://..." }
    ]
}
```

### New Microlearnings

Add to the `MICROLEARNINGS` array:

```javascript
{
    id: NEXT_ID,
    topic: "Topic Title",
    category: "Category",
    content: "Learning content...",
    sources: [{ title: "...", url: "..." }],
    quiz: {
        question: "Quiz question?",
        options: ["A", "B", "C", "D"],
        correct: 0,
        explanation: "Why correct...",
        brushUpLink: { title: "...", url: "..." }
    },
    difficulty: "beginner|intermediate|advanced"
}
```

### New RSS Feeds

Add to `FEED_SOURCES` in `news-summarizer.py`:

```python
'category_name': [
    'https://feed-url.com/rss',
],
```

Requirements for new feeds:
- Must be publicly accessible (no paywall)
- Should provide full article summaries
- Must be from reputable sources

## Testing

### Manual Testing Checklist

- [ ] Dashboard loads without console errors
- [ ] All keyboard shortcuts work (1-6, Space, R, Esc)
- [ ] Theme toggle persists across reloads
- [ ] News summarizer runs without errors
- [ ] Quiz answers save correctly
- [ ] Reflections save and export properly

### Testing the Extension

1. Open Chrome and go to `chrome://extensions`
2. Enable "Developer mode"
3. Click "Load unpacked" and select the project folder
4. Open a new tab to test

## Pull Request Process

1. Ensure your code follows the guidelines above
2. Update documentation if needed
3. Test thoroughly before submitting
4. Fill out the PR template completely
5. Be responsive to review feedback

## Questions?

- Open a GitHub Discussion for general questions
- Check existing issues and discussions first
- Be respectful and constructive

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
