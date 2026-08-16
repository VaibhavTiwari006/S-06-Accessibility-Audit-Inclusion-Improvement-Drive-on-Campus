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

- **Security Contact Email**: [vaibhavtiwari@cusoc.edu](mailto:vaibhavtiwari@cusoc.edu)
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

## 🔒 Security Measures Already Implemented

AccessAudit incorporates security-by-design principles across both frontend and backend layers:

- **BCrypt Password Hashing**: All user passwords are salted and hashed using Spring Security's `BCryptPasswordEncoder` before persistence. Passwords are never stored or logged in plain text.
- **JWT Token-Based Authentication**: Secure, stateless authentication utilizing JSON Web Tokens (JWT) with configured expiration times, cryptographic signature validation, and authorization headers.
- **Role-Based Access Control (RBAC)**: Fine-grained method-level and endpoint security enforced by Spring Security across four distinct user roles:
  - `ADMIN`: Full administrative control, user management, and system configuration.
  - `AUDITOR`: Conducting campus audits, logging checklist items, and submitting audit reports.
  - `STUDENT`: Submitting accessibility feedback, reports, and participating in campus surveys.
  - `MAINTENANCE`: Managing and resolving remediation tasks and work orders.
- **SQL Injection Prevention**: Data persistence is implemented with Spring Data JPA and Hibernate, leveraging parameterized queries and object-relational mapping to prevent SQL injection vulnerabilities.
- **CORS Configuration**: Restrictive Cross-Origin Resource Sharing (CORS) rules configured on backend controllers allowing only authorized origins, headers, and HTTP methods.
- **Input Validation & Sanitization**: Comprehensive request payload validation using Jakarta Bean Validation (`@Valid`, `@NotNull`, `@NotBlank`, `@Size`, etc.) and sanitization to prevent XSS (Cross-Site Scripting) and payload tampering.
- **Real-Time Profanity & Content Moderation Filter**: Automated scanning and filtering on user-submitted audit feedback, student reports, and comments to ensure safe and respectful discourse across campus.

---

## 🤝 Responsible Disclosure Policy

We follow a coordinated and responsible disclosure framework:

1. **Private Notification**: Researchers must give the maintainers reasonable time to investigate and remediate vulnerabilities before disclosing details publicly.
2. **Good Faith Research**: Security testing should focus on demonstration of vulnerabilities without degrading service performance, compromising user privacy, or altering persistent data without consent.
3. **No Retaliation**: We will not initiate legal action against researchers who conduct security research and report findings in good faith compliance with this policy.
4. **Attribution & Recognition**: With your permission, we are pleased to credit your responsible contribution in our release notes and changelog once the fix is deployed.
