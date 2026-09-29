# ♿ AccessAudit (Track S-06)
### Campus Accessibility Audit & Inclusion Improvement Platform
#### Comprehensive Empirical Ground Research & Full-Stack Cloud Engineering Suite for CUSoC 2026

[![CI Build and Verification](https://github.com/VaibhavTiwari006/S-06-Accessibility-Audit-Inclusion-Improvement-Drive-on-Campus/actions/workflows/ci.yml/badge.svg)](https://github.com/VaibhavTiwari006/S-06-Accessibility-Audit-Inclusion-Improvement-Drive-on-Campus/actions/workflows/ci.yml)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.1-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)
![Deployment: Multi-Cloud](https://img.shields.io/badge/Deployment-Vercel%20%7C%20Render%20%7C%20Neon-success)

> A comprehensive campus accessibility assessment platform designed to identify, document, and remediate physical and digital barriers across university campuses in accordance with the **Rights of Persons with Disabilities (RPWD) Act, 2016** and **WCAG 2.1 AA** standards.
> 
> **👤 Lead Researcher, Field Auditor & Sole Developer:** **Vaibhav Tiwari**  
> **Institution:** Chandigarh University, Gharuan, Mohali, Punjab (QS World Rank #575, NIRF Ranked #19)  
> **Project Scope:** Independent solo capstone combining in-situ physical accessibility field audits across 29 campus buildings with end-to-end full-stack cloud software engineering.

---

## 🌐 Live Production Platform & Evaluator Access

| Resource | Direct Access Link | Description & Usage |
|:---|:---|:---|
| 🚀 **Live Web Platform** | **[👉 Click Here to Access the Live Website (https://accessaudit-cu.vercel.app)](https://accessaudit-cu.vercel.app)** | Production frontend deployed on Vercel Global Edge CDN with sub-second response times. |
| 🏆 **CUSoC Presentation Deck** | **[👉 Click Here to View Interactive Presentation Deck](https://accessaudit-cu.vercel.app/presentation)** | In-app 8-slide presentation detailing methodology, field survey findings, and architecture. |
| 🔗 **Production Backend API** | **[`https://s-06-accessibility-audit-inclusion.onrender.com/api`](https://s-06-accessibility-audit-inclusion.onrender.com/api)** | Spring Boot 3.4.1 (Java 21) REST microservice container hosted on Render Cloud. |
| 📖 **Swagger / OpenAPI Specs** | **[`https://s-06-accessibility-audit-inclusion.onrender.com/swagger-ui.html`](https://s-06-accessibility-audit-inclusion.onrender.com/swagger-ui.html)** | Interactive API documentation and testing sandbox for all 38 endpoints. |
| 📋 **Evaluation Dossier** | [**`docs/CUSOC_FINAL_EVALUATION.md`**](docs/CUSOC_FINAL_EVALUATION.md) | Official CUSoC milestone verification framework, delivery evidence, and 5-min demo script. |
| 🎓 **Viva Voce Defense Guide** | [**`docs/VIVA_VOCE_DEFENSE.md`**](docs/VIVA_VOCE_DEFENSE.md) | 25 in-depth technical Q&A defense answers covering architecture, RPWD law, and cybersecurity. |

---

### 🔑 Instant Demonstration Credentials & Role Access

The platform features Role-Based Access Control (RBAC) across 4 operational roles. Evaluators and visitors can **[Create a New Account](https://accessaudit-cu.vercel.app/login)** via the in-app Sign Up tab or use the pre-configured credentials below:

| Role | Email | Password | Primary Capabilities & What to Test |
|:---|:---|:---:|:---|
| **System Administrator** | `admin@campus.edu` | `admin123` | Institutional radar analytics, departmental compliance, building registry, user management |
| **Campus Auditor** | `auditor@campus.edu` | `auditor123` | Conduct live 42-parameter audits, score sliders, draft autosaving, evidence photo logger |
| **Student / Campus Citizen** | `student@campus.edu` | `student123` | Geotagged barrier reporting, community proposals & upvoting, accessibility quiz, public QR tracking |
| **Maintenance Engineer** | `maintenance@campus.edu` | `maintenance123` | 5-stage interactive remediation Kanban roadmap (`REPORTED` → `ASSIGNED` → `IN_PROGRESS` → `FIXED` → `VERIFIED`) |

> 💡 **Quick Login Feature:** On the [Sign In Page](https://accessaudit-cu.vercel.app/login), click any of the 4 role cards at the top for instant 1-click credential auto-fill!

---

## 🏆 CUSoC 2026 Milestone & Deliverable Verification Matrix

| Milestone & Deliverable Pillar | Scope & Technical Focus | Verification & Proof Artifact |
|:---|:---|:---|
| **Engineering Velocity & CI/CD** | Continuous atomic version control, test-driven rigor, and build automation | ✅ **675+ Git Commits** with granular atomic commit hygiene; passing GitHub Actions automated CI/CD pipeline. |
| **Full-Stack Enterprise Architecture** | Production-grade Spring Boot 3.4.1 backend, PostgreSQL 16 relational model, React 18 SPA | ✅ Production REST API, normalized schema (29 buildings, 42-parameter checklists), JWT authentication & 4-role RBAC. |
| **Quarterly Milestone Completion (Q1–Q3)** | Statutory research (Q1) &rarr; Product engineering & cybersecurity (Q2) &rarr; Cloud deployment & GIS routing (Q3) | ✅ Foundation, cybersecurity hardening (rate limiting, brute-force guard, XSS sanitize, CSP), and serverless cloud deployment complete. |
| **Empirical Ground Research** | Comprehensive on-site physical auditing of Chandigarh University infrastructure | ✅ **29 campus buildings surveyed**, 1,218 audited checkpoints, 187 discovered physical barriers, and 400-line empirical technical report. |
| **Live Production Cloud Deployment** | Zero-downtime, fully accessible web service deployed on modern cloud infrastructure | ✅ Live on Render (Java 21 container) + Neon Serverless PostgreSQL 16 + Vercel Edge CDN with responsive UX. |

---

## ⚡ Local Quick Start (Docker Compose)

For local development and testing, run the full stack locally via Docker Compose:

```bash
# Clone repository
git clone https://github.com/VaibhavTiwari006/S-06-Accessibility-Audit-Inclusion-Improvement-Drive-on-Campus.git
cd S-06-Accessibility-Audit-Inclusion-Improvement-Drive-on-Campus

# Launch all 3 services (PostgreSQL 16 + Spring Boot API + React Vite Nginx)
docker-compose up -d --build
```

- 🌐 **Local Web App:** `http://localhost:3000`
- 🔗 **Local API:** `http://localhost:8080/api`
- 📖 **Local Swagger Docs:** `http://localhost:8080/swagger-ui.html`
*(Use the demonstration credentials listed in the table above to log in)*

---

## 🌐 100% Free Cloud Deployment ($0.00 / month)

Deploy AccessAudit to the live public web completely free of cost with zero credit card required:

- **Database:** [Neon.tech](https://neon.tech) (Free Serverless PostgreSQL 16)
- **Backend API:** [Render.com](https://render.com) (Free Spring Boot Java 21 Web Service)
- **Frontend SPA:** [Vercel](https://vercel.com) (Free React 18 Vite Global Edge CDN)

👉 **Follow the step-by-step [100% Free Cloud Deployment Guide (`docs/FREE_DEPLOYMENT_GUIDE.md`)](docs/FREE_DEPLOYMENT_GUIDE.md)** for a 7-minute setup walkthrough!

Or deploy directly via Render Blueprint:  
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

## 🛠️ Comprehensive Overview of Work Done

AccessAudit (S-06) is an end-to-end, production-grade initiative designed, researched, and engineered independently by **Vaibhav Tiwari**. The project bridges empirical on-ground disability research across Chandigarh University campus with enterprise full-stack cloud software engineering.

### 1. 🔬 Empirical On-Ground Fieldwork & Campus Audit Drive
* **29 Academic Buildings Surveyed In-Situ:** Conducted comprehensive physical audits across 100% of campus academic blocks (Blocks A, B, C, D, NC, Zakir Husain, DD).
* **1,218 Quantitative Checkpoints:** Manually evaluated 42 standardized criteria per building spanning building approaches, entrance ramps, corridor clearances, elevator accessibility, tactile ground surface indicators (TGSI), accessible washrooms, and emergency evacuation routes.
* **Rigorous Physical Measurement Protocol:**
  - Steel measuring tape utilized for doorway widths ($\ge 900\text{ mm}$), corridor clearances ($\ge 1500\text{ mm}$), and handrail heights ($750\text{ mm} / 900\text{ mm}$).
  - Exact slope ratio calculations ($\Delta h / \Delta d$) for ramp gradients against the statutory $1:12$ ($8.33\%$) maximum limit under the CPWD Harmonised Guidelines (2021).
* **187 Physical Barriers Discovered & Geotagged:** Cataloged into 4 severity tiers (24 Critical Tier 1 blockades, 61 High Tier 2 barriers, 73 Medium Tier 3 deficiencies, and 29 Low Tier 4 maintenance defects).
* **Open Quantitative Dataset:** Published the complete raw evaluation matrix in [`docs/Campus_Accessibility_Audit_Survey.xlsx`](docs/Campus_Accessibility_Audit_Survey.xlsx) with extensive analysis in [`docs/TECHNICAL_REPORT.md`](docs/TECHNICAL_REPORT.md).

### 2. 💻 Full-Stack Enterprise Software Architecture
* **High-Performance Spring Boot 3.4.1 (Java 21) Backend:**
  - Engineered 38 RESTful API endpoints across 8 dedicated resource controllers (`BuildingController`, `AuditController`, `IssueController`, `EvidenceController`, `CommunityController`, `ReportController`, `AnalyticsController`, `AuthController`).
  - Stateless JWT token-based authentication with expiration handling and BCrypt password encryption.
  - Strict 4-Role RBAC authorization enforced via Spring Security 6 filter chains.
  - Layered enterprise architecture: Controller → Service → Repository → PostgreSQL Entity.
  - Database schema in Third Normal Form (3NF) with 12 relational entities, composite unique indexes, and audit logging.
* **Modern React 18 + Vite SPA Frontend:**
  - Custom design system styled with Tailwind CSS, glassmorphic surfaces, and Radix UI accessible primitives.
  - Staggered page transitions and fluid micro-interactions powered by Framer Motion.
  - Interactive Leaflet campus geospatial map with 29 building pins, dynamic RPWD score pills, and accessible wheelchair routing.
  - Interactive 42-parameter audit conductor with score sliders, autosave draft persistence, category grouping, and submission confetti.
  - 5-stage maintenance remediation Kanban board supporting ticket lifecycle management from reporting to auditor verification.
  - WCAG Accessibility Preferences toolbar: High Contrast Mode, OpenDyslexic typography, Web Speech API text-to-speech, and reduced motion toggles.
* **Multi-Layer Cybersecurity Hardening:**
  - Sliding-window in-memory IP rate limiting (`RateLimitingFilter.java`) to prevent Denial of Service.
  - Automated brute-force login attack protection with progressive lockouts (`BruteForceProtectionService.java`).
  - Strict input sanitization and XSS protection filters (`XssSanitizationFilter.java`).
  - Hardened HTTP security headers: Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), X-Frame-Options (DENY), and X-Content-Type-Options (nosniff).
  - Automated 30-minute client inactivity session timeout watchdog.

### 3. 🌐 Cloud Production Deployment & DevOps
* **Zero-Cost Multi-Cloud Production Architecture:**
  - **Global Edge CDN:** Frontend built with Vite and distributed globally via Vercel Edge CDN with sub-second page loads.
  - **Serverless PostgreSQL 16:** Database hosted on Neon with automated connection pooling and serverless compute scaling.
  - **Containerized Backend:** Spring Boot 3.4.1 microservice containerized with multi-stage Docker and deployed on Render cloud.
* **Engineering Velocity & CI/CD:**
  - Over 650 atomic commits following Conventional Commits syntax (`feat`, `fix`, `docs`, `chore`, `security`, `refactor`).
  - Automated GitHub Actions workflow compiling Java 21, running JUnit 5 test suites, and validating frontend builds on every commit.

---

# 🎯 Problem Statement

Despite legal accessibility requirements, many university campuses continue to contain barriers that restrict equal participation for individuals with disabilities.

Common challenges include:

- Inaccessible entrances and pathways
- Missing ramps or elevators
- Poor tactile guidance for visually impaired users
- Lack of accessible washrooms
- Inadequate classroom accessibility
- Poor website accessibility
- LMS platforms not compliant with accessibility standards
- Insufficient disability awareness among students and staff


These issues reduce educational accessibility and negatively impact the overall campus experience.

---

## 🧠 Design Thinking & Project Strategy

Our platform was built using a structured **IBM Enterprise Design Thinking** approach — from stakeholder analysis through prioritized implementation.

### 💡 Big Idea Vignettes
> *"What if users could report accessibility barriers in seconds?"* — The 12 "What If" questions that sparked the platform.

![Big Idea Vignettes](docs/big-idea-vignettes.jpg)

### 👥 Stakeholder Need Statements
> Each stakeholder's core need mapped to a platform feature — ensuring no user group is left behind.

![Need Statements](docs/need-statements.jpg)

### 🗺️ User Journey Empathy Map
> Tracking what users **Do**, **Think**, and **Feel** across every step of the audit workflow.

![User Journey Map](docs/user-journey-map.png)

### 🏔️ Hills Statements (Who / What / Wow)
> Measurable outcomes for each stakeholder — connecting *who* benefits, *what* we deliver, and *wow* impact.

![Hills Statements](docs/hills-statements.jpg)

### 📊 Prioritization Grid
> Mapping every initiative against **User Importance** vs **Team Feasibility** to focus on what matters most.

![Prioritization Grid](docs/prioritization-grid.jpg)

---


# 🚀 Project Objectives

The primary objectives of this project are to:

- Conduct comprehensive physical accessibility audits across campus
- Evaluate digital platforms using WCAG 2.1 AA guidelines
- Identify accessibility barriers through evidence-based assessments
- Engage students and staff with disabilities throughout the audit process
- Produce actionable remediation recommendations
- Increase campus-wide awareness regarding accessibility and inclusion
- Support university administration with data-driven decision making
- Promote long-term accessibility improvements

---

# ✨ Key Features

## Physical Accessibility Audit

- Building accessibility inspections
- Ramp evaluation
- Elevator accessibility
- Washroom accessibility
- Classroom accessibility
- Library accessibility
- Laboratory accessibility
- Parking accessibility
- Signage assessment
- Emergency evacuation accessibility

### 🔬 Solo Empirical Ground Research & Physical Audit Drive

AccessAudit is grounded in extensive on-site physical field research conceived, planned, and executed individually by **Vaibhav Tiwari** across 29 academic and departmental buildings at Chandigarh University. The audit evaluates campus infrastructure against statutory benchmarks defined in the **Rights of Persons with Disabilities (RPWD) Act, 2016** and the **Harmonised Guidelines and Standards for Universal Accessibility in India (2021)**.

#### 🛠️ Manual Fieldwork Methodology & Tools
Rather than relying on theoretical estimates, the entire audit was conducted manually and directly on-site:
* **Standard Steel Measuring Tape:** Measured clear door opening widths ($\ge 900\text{ mm}$), corridor clearances ($\ge 1500\text{ mm}$), step risers ($\le 150\text{ mm}$) and tread depths, grab rail heights ($750\text{ mm} / 900\text{ mm}$), and washroom interior clearances.
* **Manual Rise & Run Slope Calculations:** Verified exterior ramp gradients and threshold transitions by measuring vertical rise ($\Delta h$) and horizontal run ($\Delta d$) to calculate exact slope ratios against the statutory $1:12$ ($8.33\%$) maximum limit.
* **In-Situ Photographic Defect Logging:** Documented physical barriers, missing handrails, broken tactile ground tiles, and threshold step obstacles with localized building notes.
* **42-Parameter Statutory Checklist:** Evaluated 42 specific parameters across 8 architectural domains (Entrances, Vertical Circulation, Corridors, Restrooms, Signage, Emergency Egress, Instructional Spaces, Amenities).
* **Direct Student & Peer Interactions:** Captured real-world navigation challenges directly from campus peers navigating physical barriers on a daily basis.

#### 📊 Ground Survey Summary & Empirical Findings
* **Total Buildings Audited:** **29 buildings** across 7 campus clusters (100% academic blocks surveyed)
* **Checkpoints Evaluated:** **1,218 distinct checkpoints** (42 standardized criteria per building)
* **Identified Physical Barriers:** **187 discrete barriers** classified into 4 severity tiers:
  * 🔴 **24 Critical (Tier 1):** Complete access blockades (e.g., upper floors of Block DD lacking any elevator, steep entrance ramps exceeding $1:9$, inward-swinging washroom doors).
  * 🟠 **61 High (Tier 2):** Severe loss of independence (e.g., elevators lacking braille keys/audio voice synthesizers, tall floor cable threshold channels).
  * 🟡 **73 Medium (Tier 3):** Sub-optimal standards (e.g., missing tactile warning tiles at stair landings, high drinking water coolers).
  * 🟢 **29 Low (Tier 4):** Minor maintenance deficits (e.g., faded parking paint, signage glare).
* **Campus-Wide Weighted Accessibility Score:** **68.2%**
* **Primary Quantitative Dataset:** Complete 29-building survey matrix with raw scores and checkpoint ratings is maintained in [`docs/Campus_Accessibility_Audit_Survey.xlsx`](docs/Campus_Accessibility_Audit_Survey.xlsx), with full analysis in [`docs/TECHNICAL_REPORT.md`](docs/TECHNICAL_REPORT.md).

| Block | Buildings Audited | Overall Score | RPWD Compliance Status | Key Findings & Ground Assessment |
|---|---|---|---|---|
| **A Block** | A1, A2, A3 | **96.7%** | 🟢 Compliant | State-of-the-art universal design: full lift & ramp access, braille indicators, accessible washrooms, lowered reception |
| **C Block** | C1, C2, C3 | **73.2%** | 🟡 Partial | C1/C2 (79.7%) feature excellent signage & wide doors; C3 (60.3%) requires washroom grab bar upgrades |
| **D Block** | D1, D2, D3, D4, D5, D6, D7, D8 | **74.8%** | 🟡 Partial | Step-free ramp entrances, broad corridors, accessible parking bays, and accessible washroom stalls |
| **Nek Chand (NC)** | NC 1, NC 2, NC 3, NC 4, NC 5 | **62.9%** | 🟡 Partial | Modern academic complex with step-free entrances & spacious lifts; lacks tactile room numbering and visual alarms |
| **B Block** | B1, B2, B3, B4, B5 | **59.8%** | 🟡 Partial | Wide double-door entrances and obstruction-free pathways; active retrofit drive underway |
| **Zakir Husain** | Zakir A, Zakir B, Zakir C | **57.2%** | 🟡 Partial | High-capacity lecture complex; requires portico entrance ramp reconstruction and elevator auditory floor voice units |
| **DD Block** | DD1, DD2 | **41.6%** | 🔴 Non-Compliant | Multi-story wing lacking elevator infrastructure; upper floor access restricted to stairs (priority 1 remediation) |

#### 📊 Audits by Lifecycle Status (29 Total Audits)
* 🟢 **APPROVED (18 Audits · 62%)**: A1–A3, C1–C3, D1–D8, NC 1, NC 3, NC 4, NC 5 meeting statutory thresholds.
* 🔵 **IN PROGRESS (5 Audits · 17%)**: B1–B5 undergoing active on-site physical accessibility retrofits.
* 🟡 **PENDING (4 Audits · 14%)**: Zakir A–C & NC 2 awaiting tactile signage verification and final sign-off.
* 🔴 **REJECTED (2 Audits · 7%)**: DD1 & DD2 non-compliant due to lack of multi-storey elevator vertical circulation.

---

### 🏆 Departmental Accessibility Comparison (Ground Survey Benchmarks)

Empirical WCAG 2.1 & RPWD compliance metrics across university academic departments:

| Department Code | Academic Department Name | Campus Block Location | Compliance Score | Status Rating | Barriers Fixed / Pending | 12-Wk Growth |
|:---:|:---|:---|:---:|:---:|:---:|:---:|
| **CSE** | **Computer Science & Engineering** | **Block A (A1–A3)** | **96.7%** 🏆 | 🟢 Compliant (Universal Design) | 26 Fixed • 1 Pending | **+8.2%** |
| **UIC** | **University Institute of Computing** | **Block C (C1–C3)** | **79.7%** | 🟢 Substantially Compliant | 21 Fixed • 3 Pending | **+4.8%** |
| **CBS** | **Chandigarh Business School** | **Block D (D1–D8)** | **74.8%** | 🟡 Partial Compliance | 18 Fixed • 5 Pending | **+3.8%** |
| **UIPS** | **Pharmaceutical Sciences** | **Nek Chand (NC 1–5)** | **62.9%** | 🟡 Partial Compliance | 13 Fixed • 8 Pending | **+5.2%** |
| **UIET** | **Engineering & Technology** | **Block B (B1–B5)** | **59.8%** | 🔵 In Progress (Retrofit Drive) | 11 Fixed • 9 Pending | **+3.4%** |

> **Campus Average Departmental Growth:** **+5.1%** progress across academic complexes.

---

## Digital Accessibility Audit

- University Website Audit
- Learning Management System (LMS)
- Student Portal
- Mobile Responsiveness
- Keyboard Navigation
- Screen Reader Compatibility
- Color Contrast Analysis
- Image Alt Text Validation
- Form Accessibility
- ARIA Compliance

---

## Survey & Feedback System

- Student accessibility surveys
- Faculty feedback
- Staff feedback
- Anonymous reporting
- Issue categorization
- Suggestion collection

---

## Dashboard & Reporting

- Accessibility statistics
- Audit progress tracking
- Barrier categorization
- Priority-based issue management
- Report generation
- Visual analytics

---

# 🏗️ Technology Stack & Cloud Infrastructure

| Layer / Domain | Technologies & Libraries | Key Highlights & Architectural Role |
|:---|:---|:---|
| **Frontend Framework** | **React 18.3**, **Vite 6** | Fast HMR, component tree virtualization, lazy code-splitting chunks |
| **UI & Styling System** | **Tailwind CSS 3.4**, **Radix UI Primitives** | Custom glassmorphic design system, accessible WAI-ARIA modals & menus |
| **Motion & Micro-interactions** | **Framer Motion 11**, **Canvas-Confetti** | Spring-animated layout transitions, celebratory submission feedback |
| **Geospatial & Mapping** | **Leaflet**, **React-Leaflet**, **OpenStreetMap** | Interactive 29-building campus map, dynamic barrier overlays & route guidance |
| **Backend Framework** | **Spring Boot 3.4.1**, **Java 21 (LTS)** | Production REST controllers, unified exception handler, DTO validation |
| **Security & Cryptography** | **Spring Security 6**, **JJWT**, **BCrypt** | Stateless JWT tokens, 4-role RBAC, IP rate limiting, XSS sanitization |
| **Persistence & Database** | **PostgreSQL 16**, **Spring Data JPA / Hibernate** | 3NF normalized schema, criteria builder queries, automated database seeder |
| **Cloud Hosting & CDN** | **Vercel Edge**, **Render Cloud**, **Neon Serverless** | Multi-cloud global edge delivery, serverless PostgreSQL with autoscaling |
| **Containerization & CI/CD** | **Docker**, **Docker Compose**, **GitHub Actions** | Multi-stage container builds, automated build verification & JUnit 5 testing |

---

# 📂 Project Structure

```
S-06-Accessibility-Audit/
│
├── frontend/                   # React 18 + Vite + Tailwind CSS + Framer Motion UI
├── backend/                    # Spring Boot 3.4.1 (Java 21) REST API + Spring Security
├── database/                   # PostgreSQL schemas and seed initialization
├── docs/                       # Architectural, requirements, and compliance specs
│   ├── architecture/           # System architecture, DB schema & component diagrams
│   ├── requirements/           # SRS, user stories & functional requirements
│   ├── Campus_Accessibility_Audit_Survey.xlsx # Complete quantitative Excel audit dataset
│   ├── TECHNICAL_REPORT.md     # Comprehensive project technical report
│   ├── API_DOCUMENTATION.md    # REST API endpoints & Swagger schemas
│   ├── INSTALLATION.md         # Local & Docker installation guide
│   ├── DEPLOYMENT.md           # Production deployment & Nginx guide
│   └── TESTING_REPORT.md       # JUnit test suite & coverage documentation
│
├── CHANGELOG.md                # Detailed version release notes
├── SECURITY.md                 # Security policy & vulnerability reporting
├── CONTRIBUTING.md             # Open source contribution guidelines
├── CODE_OF_CONDUCT.md          # Contributor code of conduct
├── README.md                   # Project overview & quick start
└── LICENSE                     # MIT License
```

---

# 👥 Stakeholders

| Stakeholder | Responsibility |
|------------|----------------|
| Students with Disabilities | Primary beneficiaries and participants |
| Faculty Members | Feedback and implementation support |
| University Administration | Decision making and policy implementation |
| Campus Facilities Team | Infrastructure improvements |
| Disability Rights Organizations | Advisory support |
| General Student Community | Awareness and participation |

---

# 📋 Audit Scope

## Physical Infrastructure

- Academic Blocks
- Administrative Buildings
- Libraries
- Laboratories
- Hostels
- Cafeterias
- Parking Areas
- Walkways
- Entrances
- Emergency Exits

---

## Digital Platforms

- University Website
- Student Portal
- Learning Management System
- Online Forms
- Internal Web Applications

---

# 📅 Implementation Timeline

| Week | Milestone |
|------|-----------|
| Week 1 | Research, stakeholder analysis, audit planning |
| Week 2 | Physical accessibility assessment |
| Week 3 | Digital accessibility evaluation |
| Week 4 | User surveys and participatory sessions |
| Week 5 | Awareness campaign and remediation planning |
| Week 6 | Final reporting and presentation |

---



---

# 📦 Expected Deliverables

- Comprehensive Physical Accessibility Audit
- Digital Accessibility Compliance Report
- Accessibility Scorecard
- Evidence-Based Documentation
- Student Survey Analysis
- Priority-wise Remediation Roadmap
- Awareness Campaign Materials
- Administrative Policy Recommendations
- Final Project Report

---

# 📚 Documentation

Detailed project documentation is available below.

| Document | Description |
|----------|-------------|
| [🏆 CUSoC Final Evaluation Dossier](docs/CUSOC_FINAL_EVALUATION.md) | Official CUSoC milestone evaluation framework mapping and live demo script |
| [📋 CUSoC Milestone Verification Matrix](docs/EVALUATION_SCORECARD.md) | Verifiable deliverable matrix and repository audit trail for CUSoC evaluators |
| [🎓 Viva Voce & Technical Defense](docs/VIVA_VOCE_DEFENSE.md) | 25 in-depth technical Q&A defense answers covering architecture, law, and security |
| [📊 Campus Audit Survey Dataset](docs/Campus_Accessibility_Audit_Survey.xlsx) | Complete quantitative Excel audit dataset across 29 buildings |
| [📋 Technical Report](docs/TECHNICAL_REPORT.md) | Comprehensive project report with empirical field research analysis |
| [📖 Installation Guide](docs/INSTALLATION.md) | Setup and deployment instructions |
| [👤 User Guide](docs/USER_GUIDE.md) | Role-based usage instructions |
| [📑 API Documentation](docs/API_DOCUMENTATION.md) | REST endpoint specifications |
| [🏗️ System Architecture](docs/architecture/system-architecture.md) | Three-tier architecture overview |
| [🗄️ Database Schema](docs/architecture/DATABASE_SCHEMA.md) | ER diagrams and table definitions |
| [🧪 Testing Report](docs/TESTING_REPORT.md) | Test strategy and results |
| [🚀 Deployment Guide](docs/DEPLOYMENT.md) | Production deployment with Docker & Nginx |
| [🌐 Free Cloud Deployment Guide](docs/FREE_DEPLOYMENT_GUIDE.md) | 100% Free deployment walkthrough (Neon + Render + Vercel) |
| [📝 Changelog](CHANGELOG.md) | Version history and release notes |
| [🔒 Security Policy](SECURITY.md) | Vulnerability disclosure and security measures |
| [📖 SRS](docs/requirements/software-requirement-specification.md) | Software Requirement Specification |
| [📋 User Stories](docs/requirements/user-stories.md) | 21 user stories across 5 roles |
| [✅ Functional Requirements](docs/requirements/functional-requirements.md) | 19 functional requirements |
| [⚙️ Non-Functional Requirements](docs/requirements/non-functional-requirements.md) | 8 non-functional requirements |

---

# ⚖️ Compliance Standards

This project follows internationally recognized accessibility standards, including:

- Rights of Persons with Disabilities (RPWD) Act, 2016
- Web Content Accessibility Guidelines (WCAG) 2.1 Level AA
- Universal Design Principles
- Inclusive Education Best Practices

---

# 🌍 Expected Impact

This initiative aims to create a more inclusive university ecosystem by:

- Improving accessibility awareness
- Supporting evidence-based infrastructure improvements
- Encouraging participatory governance
- Enhancing digital accessibility
- Promoting equal educational opportunities
- Assisting institutions in meeting legal accessibility requirements

---

# 🛡️ CI/CD & Security Architecture

To support scalability and code reliability, this repository integrates:
*   **GitHub Actions CI Workflow**: Automates Spring Boot unit tests and Node.js Vite asset compilation on every push or pull request.
*   **BCrypt Password Encryption**: Implemented for all user credential storage.
*   **SQL Parameterization**: Enforced via Spring Data JPA Hibernate layers to prevent SQL injections.
*   **Security Contact Email**: [vaibhav.cse006@gmail.com](mailto:vaibhav.cse006@gmail.com) (48-hour SLA for confidential vulnerability disclosure)

---

# 🤝 Contributing & Community

We welcome community collaborations! Please review our:
*   [**Contributing Guidelines**](CONTRIBUTING.md)
*   [**Code of Conduct**](CODE_OF_CONDUCT.md)
*   [**Security Policy**](SECURITY.md) — Security Contact: [vaibhav.cse006@gmail.com](mailto:vaibhav.cse006@gmail.com)

---

# 📄 License

This project is developed as part of the **CUSOC Social Innovation Initiative** for educational and research purposes.
