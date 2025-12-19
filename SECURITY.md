# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take security seriously. If you discover a security vulnerability in this project, please report it responsibly.

### How to Report

1. **Do NOT** create a public GitHub issue for security vulnerabilities
2. Email the maintainer directly or use GitHub's private vulnerability reporting feature
3. Include as much detail as possible:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Acknowledgment**: We will acknowledge receipt of your report within 48 hours
- **Assessment**: We will assess the vulnerability and determine its severity
- **Resolution**: We aim to resolve critical vulnerabilities within 7 days
- **Disclosure**: We will coordinate with you on public disclosure timing

## Security Best Practices for Users

### API Key Protection

- **Never commit your `.env` file** to version control
- The `.gitignore` file is configured to exclude `.env` files
- If you accidentally commit an API key, rotate it immediately at [console.groq.com](https://console.groq.com/)
- Use environment variables or secure secret management in production

### Local Data Security

- All user data (reflections, progress) is stored in browser localStorage
- Data never leaves your machine except:
  - RSS feed requests to public news sources
  - Article text sent to Groq API for summarization
- Consider clearing localStorage if using a shared computer

### Chrome Extension Security

- This extension requests **no special permissions**
- It only overrides the new tab page
- No access to browsing history, cookies, or other sensitive data
- All JavaScript is CSP-compliant (no inline scripts or eval)

## Known Security Considerations

### RSS Feed Content

- News articles are fetched from external RSS feeds
- HTML content from feeds is sanitized before display
- URLs are validated before rendering as links

### Third-Party Dependencies

We use the following external dependencies:

**Python:**
- `feedparser` - RSS parsing
- `groq` - Groq API client
- `python-dotenv` - Environment variable management

**Frontend:**
- Google Fonts (external CDN)
- No JavaScript frameworks or external libraries

Run `pip list --outdated` periodically to check for security updates.

## Security Features

- XSS protection via HTML escaping and URL validation
- Content Security Policy (CSP) compliant architecture
- No inline event handlers or scripts
- Minimal Chrome extension permissions
- Environment-based secret management
