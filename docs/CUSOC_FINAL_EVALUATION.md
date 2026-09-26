# 🏆 CUSoC 2026: Final Project Evaluation & Presentation Dossier
## S-06: Accessibility Audit & Inclusion Improvement Drive on Campus

> **Project Track:** CUSoC 2026 (Chandigarh University Summer / Semester of Code)  
> **Host Organization:** C Square Club & Chandigarh University  
> **Institutional Standing:** QS World University Rankings 2026 Global Rank #575 | NIRF Ranked #19 in India  
> **Sole Contributor & Researcher:** **Vaibhav Tiwari**  
> **Evaluation Band Target:** **Grade A+ (Elite Contributor, 950–1000 Marks / 95–100%)**  
> **Project Repository:** [`VaibhavTiwari006/S-06-Accessibility-Audit-Inclusion-Improvement-Drive-on-Campus`](https://github.com/VaibhavTiwari006/S-06-Accessibility-Audit-Inclusion-Improvement-Drive-on-Campus)  
> **Live Presentation Deck:** Accessible within the running web application at [`/presentation`](http://localhost:3000/presentation)  

---

## 📑 Executive Summary

**AccessAudit (S-06)** is a comprehensive, production-grade accessibility audit and inclusion platform conceived, designed, field-researched, and engineered as an independent solo capstone project by **Vaibhav Tiwari** for CUSoC 2026.

The project addresses a critical real-world problem: **mandatory compliance with the Rights of Persons with Disabilities (RPWD) Act, 2016 and WCAG 2.1 AA digital standards across university educational environments**. 

Unlike conventional academic prototypes that rely on mock data, AccessAudit bridges the gap between **on-ground empirical field research across 29 Chandigarh University campus buildings** and an **enterprise full-stack software system** featuring real-time compliance analytics, interactive Leaflet campus navigation, automated 42-parameter audit checklists, a 5-stage maintenance remediation Kanban board, and crowd-sourced student barrier reporting.

```
                      ┌──────────────────────────────────────────────┐
                      │    ACCESSAUDIT (S-06) ECOSYSTEM ARCHITECTURE │
                      └──────────────────────┬───────────────────────┘
                                             │
             ┌───────────────────────────────┴───────────────────────────────┐
             ▼                                                               ▼
┌─────────────────────────────┐                               ┌─────────────────────────────┐
│ EMPIRICAL GROUND RESEARCH   │                               │ ENTERPRISE SOFTWARE SUITE   │
├─────────────────────────────┤                               ├─────────────────────────────┤
│ • 29 Buildings Audited Solo │                               │ • Spring Boot 3.4.1 + Java21│
│ • 1,218 Metric Checkpoints  │  ── [Data-Driven Ingestion] ─▶│ • React 18 + Tailwind UI   │
│ • 187 Barriers Discovered   │                               │ • PostgreSQL 16 + Hibernate │
│ • 100% In-Situ Manual Tape  │                               │ • Multi-Layer Cybersecurity │
│ • RPWD Act 2016 Checklists  │                               │ • Leaflet Geospatial Map    │
└─────────────────────────────┘                               └─────────────────────────────┘
```

---

## 🎯 CUSoC Final Evaluation Framework (1000 Marks Mapping)

This project has been structured and documented to satisfy 100% of the CUSoC Final Evaluation Criteria outlined in Section 14 of the CUSoC Contributor Guidelines:

| Evaluation Component | Maximum Marks | Weightage | Target Marks | Key Evidence & Repository Deliverables |
|:---|:---:|:---:|:---:|:---|
| **1. Bi-Weekly Evaluation Aggregate** | 250 | 25% | **250** | 615+ atomic Git commits demonstrating continuous technical progress; automated CI/CD pipeline with 100% passing tests. |
| **2. Monthly / Mid-Term Engineering Reviews** | 250 | 25% | **250** | Iterative sprint deliverables spanning database schema design, Spring Boot REST API, React 18 UI components, and authentication. |
| **3. Quarterly Evaluations (Q1, Q2, Q3)** | 250 | 25% | **250** | Milestone completion across Engineering Foundation (Q1), Product Engineering (Q2), and Production & Leadership (Q3). |
| **4. Final Project Demonstration & Technical Report** | 150 | 15% | **150** | Live multi-role application demonstration, interactive `/presentation` deck, and comprehensive 400-line `docs/TECHNICAL_REPORT.md`. |
| **5. Mentor Evaluation & Viva Voce** | 100 | 10% | **100** | 100% original solo contribution, rigorous academic integrity, defense script, and architectural mastery. |
| **TOTAL** | **1000** | **100%** | **1000 (A+)** | **Qualifies for Elite Contributor Band (95–100%)** |

---

## 🏛️ Quarterly Evaluation Framework Breakdown

### Quarter I — Engineering Foundation (200 Marks)
* **Problem Analysis & Regulatory Benchmarking:** Thorough analysis of the RPWD Act 2016 (§§ 8, 16, 40, 42, 45), CPWD Harmonised Guidelines (2021), and NBC 2016 standards.
* **Solo Ground Fieldwork Protocol:** Conceived and executed on-foot physical accessibility audits across 29 academic blocks using standard manual steel measuring tape, rise-over-run slope calculations ($\Delta h / \Delta d$), and in-situ photographic defect capture.
* **Project Planning & GitHub Workflow:** Structured repository setup with `.github/workflows/ci.yml`, branch protection rules, clear Git conventions, and continuous automated build verification.
* **Early Architecture:** Initial PostgreSQL database schema with relational models for Buildings, Audits, Checklists, Barriers, and Users.

### Quarter II — Product Engineering (250 Marks)
* **Backend API Quality & Scalability:** Engineered robust Spring Boot 3.4.1 (Java 21) REST controllers with DTO validation, service abstraction, and Spring Data JPA queries.
* **Comprehensive 4-Role RBAC:** Role-Based Access Control enforcing granular authorization across `ADMIN`, `AUDITOR`, `STUDENT`, and `MAINTENANCE`.
* **Frontend Component Architecture:** Rebuilt with React 18, Vite, Tailwind CSS, Framer Motion, and Radix UI primitives.
* **Testing & Quality Assurance:** Comprehensive test suite documented in `docs/TESTING_REPORT.md` including backend JUnit controller and service tests plus frontend linting.
* **Multi-Layer Cybersecurity Hardening:**
  - In-memory sliding-window IP rate limiting (`RateLimitingFilter.java`).
  - Automated brute-force login attack protection with progressive lockouts (`BruteForceProtectionService.java`).
  - Client- and server-side XSS request wrappers and HTML input sanitizers (`XssSanitizationFilter.java`).
  - Hardened HTTP security headers: Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), X-Frame-Options (DENY), and X-Content-Type-Options (nosniff).
  - 30-minute automated client inactivity session logout watchdog.

### Quarter III — Production, Leadership & Real-World Impact (300 Marks)
* **Interactive Campus Geospatial Map:** Custom Leaflet-based interactive campus map displaying 29 real building coordinates with dynamic RPWD compliance score pills, barrier layers, and accessible wheelchair navigation routing.
* **Interactive Audit Conductor:** Digitized 42-parameter audit checklist allowing auditors to adjust score sliders, save drafts, write commentary, and celebrate completed audits with celebratory confetti.
* **5-Stage Maintenance Kanban Board:** Drag-and-drop / column-based remediation roadmap tracking tasks through `REPORTED` → `ASSIGNED` → `IN_PROGRESS` → `FIXED` → `VERIFIED`.
* **Containerized Production Deployment:** Complete multi-container `docker-compose.yml` orchestrating React frontend on Nginx, Spring Boot API, and PostgreSQL 16.
* **Full Documentation Suite:** Delivered all 8 mandatory CUSoC documentation standards with zero omissions.

---

## 📚 Compliance with CUSoC Documentation Standards

Every document mandated under the CUSoC Documentation Standards (Image 4) is published and maintained in this repository:

| Mandatory Standard | Repository File Path | Description & Quality Highlights | Status |
|:---|:---|:---|:---:|
| **1. README.md** | [`README.md`](../README.md) | Flagship presentation with quick start, architecture, solo researcher attribution, 29-building benchmarks, and feature showcase. | ✅ Compliant |
| **2. Installation Guide** | [`docs/INSTALLATION.md`](INSTALLATION.md) | Step-by-step local setup (Node, Maven, PostgreSQL) and 1-command Docker Compose deployment guide. | ✅ Compliant |
| **3. User Guide** | [`docs/USER_GUIDE.md`](USER_GUIDE.md) | Role-by-role workflows for Admin, Auditor, Student, and Maintenance personnel with demo credentials. | ✅ Compliant |
| **4. API Documentation** | [`docs/API_DOCUMENTATION.md`](API_DOCUMENTATION.md) | Exhaustive REST endpoint documentation with request/response schemas, JWT auth, and Swagger UI reference. | ✅ Compliant |
| **5. Architecture Diagram** | [`docs/architecture/system-architecture.md`](architecture/system-architecture.md) & [`docs/architecture/ARCHITECTURE_DIAGRAM.md`](architecture/ARCHITECTURE_DIAGRAM.md) | High-resolution 3-tier architectural diagrams, component interactions, and data flow pipelines. | ✅ Compliant |
| **6. Database Schema** | [`docs/architecture/DATABASE_SCHEMA.md`](architecture/DATABASE_SCHEMA.md) & [`docs/architecture/database-design.md`](architecture/database-design.md) | Detailed relational entity-relationship diagrams, foreign key constraints, indexes, and table schemas. | ✅ Compliant |
| **7. Testing Report** | [`docs/TESTING_REPORT.md`](TESTING_REPORT.md) | Test suite breakdown, JUnit coverage metrics, security regression testing, and CI pipeline logs. | ✅ Compliant |
| **8. Change Log** | [`CHANGELOG.md`](../CHANGELOG.md) | Semantic versioning changelog documenting progressive enhancements across versions 1.0.0 through 1.2.0. | ✅ Compliant |

---

## 🎬 5-Minute Live Demonstration Walkthrough for Evaluators

When presenting this project to the CUSoC evaluation panel, follow this recommended walkthrough flow:

### Step 1: Landing Page & CUSoC Presentation Deck (0:00 – 1:00)
1. Open [`http://localhost:3000`](http://localhost:3000). Highlight the modern hero section, live stat counters (29 Buildings Audited, 187 Barriers, 68.2% RPWD Compliance Index).
2. Click **🏆 CUSoC Presentation** in the top navbar or hero to launch the dedicated slide-based showcase at `/presentation`. Demonstrate the slide overview of the problem, solo field research, and architecture.

### Step 2: Administrator & Analytics Dashboard (1:00 – 2:00)
1. Sign in as **Admin** (`admin@campus.edu` / `password`).
2. Show the **Executive Dashboard**: live scorecards, inclusion leaderboard, and the **Departmental Comparison** radar (CSE 96.7% Compliant vs. Block DD 41.6% Non-Compliant).
3. Open the **Campus Map** (`/map`): click any of the 29 building markers (e.g., A1, D4, DD1) to demonstrate dynamic compliance score badges, entrance photos, and barrier drill-downs.

### Step 3: Auditor Workflow & Interactive Checklist (2:00 – 3:00)
1. Sign in as **Auditor** (`auditor@campus.edu` / `password`).
2. Navigate to **Audits** (`/audits`) and open an in-progress audit (or conduct audit at `/audits/1/conduct`).
3. Demonstrate the 42-parameter checklist grouped by category: adjust score sliders, enter remarks, save draft, and submit to trigger celebratory canvas confetti.

### Step 4: Student Barrier Reporting & Public Tracking (3:00 – 4:00)
1. Sign in as **Student** (`student@campus.edu` / `password`).
2. Click **Report Barrier** (`/issues`): show the clean reporting modal with building selection, floor, severity tier, and photo upload.
3. Demonstrate public barrier tracking (`/track/1`) where any student can monitor repair progress via QR code without logging in.
4. Show the **Awareness & Quiz Portal** (`/quiz`) designed to educate the campus community on disability etiquette.

### Step 5: Maintenance Remediation Kanban Roadmap (4:00 – 5:00)
1. Sign in as **Maintenance** (`maintenance@campus.edu` / `password`).
2. Open the **Roadmap** (`/roadmap`): demonstrate the 5-column Kanban board moving tasks through assignment, work in progress, fix completion, and auditor verification.
3. Review the **Security Policy** (`SECURITY.md`) and demonstrate automated idle session timeout and brute-force lockout safeguards.

---

## 🛡️ Academic Integrity & Individual Authorship Declaration

> **Official Declaration:**  
> I hereby declare that the **AccessAudit (S-06)** project, encompassing the on-ground campus physical accessibility research across 29 Chandigarh University buildings, the quantitative survey spreadsheet, and the full-stack software implementation (Java Spring Boot, React, PostgreSQL, Docker, and Nginx), is **100% original work conceived and executed independently by me, Vaibhav Tiwari**. All external statutory frameworks (RPWD Act 2016, CPWD Harmonised Guidelines 2021, WCAG 2.1) and open-source libraries have been formally acknowledged and cited.

* **Contributor Name:** Vaibhav Tiwari  
* **Track:** CUSoC 2026 (C Square Club, Chandigarh University)  
* **Date:** September 2026  
