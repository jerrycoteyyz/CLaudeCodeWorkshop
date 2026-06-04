# Security Rules

These rules apply to every file in this project. No exceptions.

## Secrets & Credentials
- Never hardcode API keys, tokens, passwords, or secrets in any file
- All secrets live in `.env` — loaded at runtime via `process.env` or equivalent
- `.env` must be in `.gitignore` before the first commit
- Never commit `.env`, even accidentally — check `git status` before every commit
- Use `.env.example` to document required variables (placeholder values only)
- If a secret is accidentally committed, rotate it immediately — assume it is compromised

## Git Hygiene
- Review `git diff --staged` before every commit
- Never force-push to `main` or `production` branches
- Keep secrets out of commit messages, PR descriptions, and issue comments

## Dependencies
- Pin production dependencies to exact versions where stability matters
- Run `npm audit` (or equivalent) before shipping
- Never install packages from untrusted sources

## Input Validation
- Validate all user input at the boundary — never trust client-supplied data
- Sanitize before storing or rendering; never interpolate raw input into SQL or HTML
- Use parameterized queries — never string-concatenate SQL

## Common Vulnerabilities to Avoid (OWASP Top 10)
- **Injection**: Use parameterized queries, ORMs, or prepared statements
- **Broken Auth**: Use short-lived tokens; never store plain-text passwords
- **Sensitive Data Exposure**: Encrypt at rest and in transit; never log PII
- **XSS**: Escape output; use framework-level sanitization
- **CSRF**: Use same-site cookies and CSRF tokens for state-changing requests
- **Security Misconfiguration**: Remove default credentials; disable debug in production

## Claude Code Rules
- Never read `.env` unless explicitly authorized by the user
- Never log secrets to the terminal or any output file
- Surface security issues immediately — do not mask or work around them
- If a suspected secret is detected in code, stop and flag it before continuing
