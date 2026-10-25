# Project Deliverable 4: Review Cycle Progress Reports

## CUSoC 2026: Chandigarh University Summer / Semester of Code
### Track S-06: Accessibility Audit & Inclusion Improvement Drive on Campus

---

| Review Cycle | Timeframe | Primary Engineering Focus | Milestones Achieved | Status |
|:---:|:---:|:---|:---|:---:|
| **Cycle 1** | Weeks 1 – 3 | In-Situ Campus Audit & Literature Review | 29 buildings surveyed; 1,102 checkpoints logged | **Completed** |
| **Cycle 2** | Weeks 4 – 6 | Backend Architecture, Security & Database | Spring Boot 3.4.1 API; PostgreSQL schema on Neon | **Completed** |
| **Cycle 3** | Weeks 7 – 9 | Frontend UI, Leaflet GIS & Assistive Engine | React 18 SPA, Campus Map, 5-Stage Kanban | **Completed** |
| **Cycle 4** | Weeks 10 – 12 | Multi-Cloud Deployment, Hardening & Final | Vercel CDN, Render API, End-to-End Verification | **Completed** |

---

## 1. Review Cycle 1: Problem Identification, Ground Survey & Field Research

### 1.1 Objectives for Cycle 1
- Perform exhaustive statutory literature review of the **Rights of Persons with Disabilities (RPWD) Act, 2016** and **MoHUA Harmonised Guidelines 2021**.
- Formulate standardized 42-parameter physical audit measurement protocols.
- Execute solo in-situ physical survey across 29 academic blocks and facilities at Chandigarh University.

### 1.2 Key Activities & Engineering Accomplishments
1. **Physical Measurement Protocol Formulation:**
   - Established precise tolerance limits: maximum allowable threshold height (25mm), statutory ramp slope (1:12 maximum gradient), corridor clear width (minimum 1500mm for two wheelchairs to pass), door push force (maximum 30N).
2. **On-Ground Empirical Survey Execution:**
   - Personally conducted solo physical inspections of **29 university buildings** spanning Academic Blocks (A1–A7), Engineering Blocks (B1–B4), Science Complex (C1–C3), Central Library, Student Activity Center, and Administrative offices.
   - Collected **1,102 metric checkpoints** using a physical steel measuring tape, digital surface level inclinometer, and photographic logging.
   - Identified **187 critical barrier points** (e.g., lack of dual-height handrails at North Plaza, unchamfered entrance steps at Block A1, non-slip tape deficiencies at chemistry labs).
3. **Data Archival & Seed Formatting:**
   - Structured survey findings into `Campus_Accessibility_Audit_Survey.xlsx` and generated automated SQL database ingestion scripts (`data.sql`).

### 1.3 Cycle 1 Deliverables
- [x] Standardized 42-Parameter Audit Metric Checklist
- [x] Digitized Survey Dataset covering 29 campus structures
- [x] Baseline Campus Compliance Index Score (68.2%)

---

## 2. Review Cycle 2: Backend Architecture, Database Modeling & Security

### 2.1 Objectives for Cycle 2
- Design normalized PostgreSQL schema on Neon Serverless Cloud.
- Develop enterprise-grade Spring Boot 3.4.1 REST API running on Java 21 LTS.
- Implement stateless JWT authentication with multi-role access control (RBAC).

### 2.2 Key Activities & Engineering Accomplishments
1. **Relational Database Engineering:**
   - Modeled 8 relational entities: `User`, `Building`, `Audit`, `AuditCheckpoint`, `Issue`, `MaintenanceTask`, `Comment`, and `AuditLog`.
   - Provisioned Neon Serverless PostgreSQL instance in AWS `ap-southeast-1` region with zero operational overhead.
   - Configured HikariCP connection pooling with SSL encryption enabled.
2. **Spring Boot Enterprise Microservices Implementation:**
   - Implemented Service and Repository layers following strict Clean Architecture principles.
   - Formulated mathematical audit scoring service: weighted arithmetic compliance calculation based on 42 evaluation checkpoints.
3. **Security Perimeter & Defense Hardening:**
   - Integrated Spring Security 6 with stateless `SessionCreationPolicy.STATELESS`.
   - Developed custom `JwtAuthenticationFilter` verifying HMAC-SHA256 signatures.
   - Implemented `RateLimitingFilter` (Bucket4j token bucket algorithm: 60 req/min per IP) to mitigate DoS and credential stuffing attacks.
   - Integrated `XssSanitizationFilter` utilizing OWASP HTML sanitizers to prevent cross-site scripting vulnerabilities.

### 2.3 Cycle 2 Deliverables
- [x] Working Spring Boot 3.4.1 REST API with 30+ endpoints
- [x] Neon PostgreSQL Cloud Schema with pre-seeded campus dataset
- [x] Comprehensive Postman API Collection ([`docs/AccessAudit_Postman_Collection.json`](../docs/AccessAudit_Postman_Collection.json))

---

## 3. Review Cycle 3: Frontend Development, Geospatial GIS & Assistive Tech

### 3.1 Objectives for Cycle 3
- Build a responsive React 18 Single-Page Application using Vite and Tailwind CSS.
- Implement interactive Leaflet geospatial campus navigation with wheelchair routing.
- Construct the 5-Stage Remediation Kanban board and client-side accessibility engine.

### 3.2 Key Activities & Engineering Accomplishments
1. **UI/UX Design System:**
   - Engineered custom brand design system matching Chandigarh University Crimson (`#C8102E`) and high-contrast accessible palettes.
   - Developed component library: reusable accessible Cards, Buttons, Inputs, Modals, Badges, and Alert boxes.
2. **Geospatial Campus Navigation Engine:**
   - Integrated Leaflet GIS with calibrated geographic coordinates for all 29 Chandigarh University campus buildings.
   - Formulated Dijkstra-style barrier-free shortest path algorithm: routes avoid staircases and construction zones to guarantee accessible paths for wheelchair users.
3. **5-Stage Remediation Roadmap:**
   - Designed institutional Kanban board tracking physical repair workflows:
     *Reported* (`OPEN`) → *Assigned* (`ASSIGNED`) → *Work in Progress* (`IN_PROGRESS`) → *Fixed* (`FIXED`) → *Verified* (`COMPLETED`).
   - Implemented resilient fallback dataset (`DEFAULT_ROADMAP_TASKS`) ensuring 100% operational uptime during backend cold starts.
4. **Assistive Inclusivity Engine:**
   - Integrated client-side accessibility suite in `AccessibilityContext.jsx`:
     - Atkinson Hyperlegible dyslexia font mode
     - High-contrast monochromatic black/yellow mode
     - Protanopia, Deuteranopia, and Tritanopia color-blind filter matrices
     - Web Speech API integration for synthetic text-to-speech reading

### 3.3 Cycle 3 Deliverables
- [x] Fully functional React 18 SPA with 15+ interactive pages
- [x] Leaflet GIS Campus Map with step-free wheelchair routing
- [x] 5-Stage Remediation Kanban Board with instant status progression

---

## 4. Review Cycle 4: Production Deployment, Multi-Cloud Hardening & Final Defense

### 4.1 Objectives for Cycle 4
- Deploy frontend to Vercel Global Edge Network with custom university domain routing.
- Deploy backend to Render Cloud Container runtime.
- Perform rigorous security reviews, cross-browser contrast audits, and final evaluation preparations.

### 4.2 Key Activities & Engineering Accomplishments
1. **Production Multi-Cloud Deployment:**
   - Deployed frontend to Vercel CDN with instant edge caching and gzip compression.
   - Bound 3 custom production domains:
     - Primary: [`https://accessaudit-cu.vercel.app/`](https://accessaudit-cu.vercel.app/)
     - Secondary: [`https://cu-accessaudit.vercel.app/`](https://cu-accessaudit.vercel.app/)
     - Tertiary: [`https://accessaudit-cusoc.vercel.app/`](https://accessaudit-cusoc.vercel.app/)
   - Deployed backend Docker container to Render Cloud (`https://s-06-accessibility-audit-inclusion.onrender.com`).
2. **Security & Route Guard Hardening:**
   - Upgraded `ProtectedRoute.jsx` and `AuthContext.jsx` with cryptographic JWT expiration verification (`parseJwt` and `isTokenValid`).
   - Blocked manual URL route tampering: unauthorized visitors attempting direct URL navigation to `/roadmap` or `/dashboard` are immediately intercepted and redirected to `/login`.
3. **Color Contrast & Theme Polish:**
   - Guaranteed 100% WCAG 2.1 AA contrast compliance across both Light and Dark themes.
   - Fixed hero subtitle visibility with solid luminous rose (`#fb7185`) on dark mode and signature gradient on light mode.
   - Built interactive 10-slide CUSoC Presentation Deck directly into the live application at `/presentation`.

### 4.3 Cycle 4 Deliverables
- [x] Live Multi-Cloud Production Deployment across 3 custom Vercel domains
- [x] 100% Passing Automated Test Suite (JUnit 5, Mockito, Vite build)
- [x] Comprehensive Documentation Dossier (CUSoC Section 6 Deliverables Suite)
