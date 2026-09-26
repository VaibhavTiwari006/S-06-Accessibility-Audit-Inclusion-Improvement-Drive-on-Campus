# Security Policy

The **AccessAudit** team is dedicated to safeguarding campus accessibility data, user credentials, and application infrastructure. We take security seriously and appreciate the assistance of the security research and developer community in responsibly reporting security vulnerabilities.

---

## 🛡️ Supported Versions

Only the latest active release versions of AccessAudit receive security patches and updates.

| Version | Supported          | Security Maintenance Status |
| :------ | :----------------- | :-------------------------- |
| 1.0.x   | :white_check_mark: | Active Security Support     |
| < 1.0.0 | :x:                | Unsupported                 |

---

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability in AccessAudit, we appreciate your prompt and confidential disclosure.

- **Security Contact Email**: [vaibhav.cse006@gmail.com](mailto:vaibhav.cse006@gmail.com)
- **Initial Response SLA**: Within **48 hours**
- **Public Disclosure**: Please **do not** open public GitHub issues, discussions, or pull requests disclosing vulnerabilities until we have analyzed, addressed, and patched the vulnerability.

### What to Include in Your Report

To help us triage and resolve the issue quickly, please include:
1. **Summary & Impact**: Description of the vulnerability and its potential severity/impact.
2. **Steps to Reproduce**: Step-by-step instructions or proof-of-concept (PoC) scripts.
3. **Affected Components**: Specific backend endpoints, frontend components, or database models.
4. **Environment**: Operating system, browser, Java version, and AccessAudit release version.
5. **Mitigation Suggestion** *(Optional)*: Recommended remediation steps or PR concepts if available.

---

## 🔒 Comprehensive Multi-Layer Cyber Security Architecture

AccessAudit adheres to rigorous defense-in-depth security principles across frontend, backend, network, and data persistence layers:

### 1. Authentication & Brute-Force Defense
- **BCrypt Password Hashing**: All user passwords are salted and hashed using Spring Security's `BCryptPasswordEncoder` (cost factor 10) before database persistence. Passwords are never stored or logged in plain text.
- **Brute-Force & Credential Stuffing Defense (`BruteForceProtectionService`)**: Automatic tracking of consecutive failed login attempts by username and IP address. Accounts and IP addresses are temporarily locked out for 15 minutes after 5 consecutive failed authentication attempts.
- **Enforced Password Complexity Policy**: Public and user registrations mandate minimum 8 characters with at least one uppercase letter, one lowercase letter, and one number.
- **JWT Cryptographic Integrity**: Stateless authentication using JSON Web Tokens (JWT) signed with HMAC-SHA256 algorithms and cryptographically verified on every inbound request.

### 2. Network & Request Protection
- **Sliding-Window Rate Limiting (`RateLimitingFilter`)**: Throttles burst requests to sensitive authentication endpoints (`/api/auth/**`) to 20 requests per minute per IP, preventing automated credential spraying and DoS floods with standardized HTTP 429 responses.
- **Strict Cross-Origin Resource Sharing (CORS)**: Strict origin allowlisting restricted to `http://localhost:5173` and `http://localhost:3000` with explicit HTTP methods and credential permissions.
- **Session Inactivity Watchdog**: Client-side background listener terminates sessions and clears memory storage after 30 minutes of complete inactivity on public or shared workstations.

### 3. Application Security & Injection Defenses
- **Cross-Site Scripting (XSS) Sanitization Filter (`XssSanitizationFilter` & `XssRequestWrapper`)**: Deep inspection and neutralization of incoming request parameters, headers, and query strings, stripping `<script>`, `javascript:`, and malicious event handlers (`onload`, `onerror`).
- **SQL Injection Prevention**: 100% of database interactions leverage Spring Data JPA and Hibernate object-relational mapping with parameterized prepared statements.
- **Input Validation & Content Moderation**: Comprehensive payload validation using Jakarta Bean Validation (`@Valid`, `@NotNull`, `@NotBlank`, `@Size`) combined with an automated profanity filter for student reports and forum proposals.
- **PII Data Masking**: Automated masking of sensitive email addresses and confidential identifiers in logs and client UI components.

### 4. Enterprise HTTP Security Headers (Backend & Nginx)
Both the Spring Boot backend (`SecurityConfig`) and Nginx reverse proxy enforce zero-trust HTTP security headers:
- `Content-Security-Policy (CSP)`: Enforces strict source directives for scripts, styles, fonts, and connects while disallowing unauthorized framing (`frame-ancestors 'none'`).
- `X-Frame-Options: DENY`: Fully mitigates Clickjacking attacks.
- `X-Content-Type-Options: nosniff`: Prevents MIME-type confusion and sniffing attacks.
- `Strict-Transport-Security (HSTS)`: Enforces `max-age=31536000; includeSubDomains; preload` for SSL/TLS connections.
- `Referrer-Policy: strict-origin-when-cross-origin`: Restricts sensitive URL parameter leakage in referer headers.
- `Permissions-Policy`: Blocks unauthorized hardware access (`microphone=(), payment=()`).
- `server_tokens off`: Conceals Nginx and server version details from reconnaissance tools.
- **File System Shields**: Strict blocking of hidden dotfiles (`.git`, `.env`) and server artifacts (`.sql`, `.log`, `.yml`).

---

## 🤝 Responsible Disclosure Policy

We follow a coordinated and responsible disclosure framework:

1. **Private Notification**: Researchers must give the maintainers reasonable time to investigate and remediate vulnerabilities before disclosing details publicly.
2. **Good Faith Research**: Security testing should focus on demonstration of vulnerabilities without degrading service performance, compromising user privacy, or altering persistent data without consent.
3. **No Retaliation**: We will not initiate legal action against researchers who conduct security research and report findings in good faith compliance with this policy.
4. **Attribution & Recognition**: With your permission, we are pleased to credit your responsible contribution in our release notes and changelog once the fix is deployed.
