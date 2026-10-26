# 📊 CUSoC 2026 Project Deliverable 6: Mid-Term & Final Presentation Slides

> **Project Track:** S-06: Accessibility Audit & Inclusion Improvement Drive on Campus  
> **Host Organization:** C Square Club, Chandigarh University (CUSoC 2026)  
> **Sole Contributor & Author:** **Vaibhav Tiwari** (100% Individual Authorship & Engineering)  
> **Evaluation Milestone:** CUSoC 2026 Final Evaluation Deliverables Suite — Item 6  
> **Interactive Live Deck:** [https://accessaudit-cu.vercel.app/presentation](https://accessaudit-cu.vercel.app/presentation)  
> **Date:** October 2026  

---

## 🎯 Presentation Overview & Interactive Slide System

This deliverable contains the complete slide transcripts, visual layouts, speaker notes, and architectural defense scripts for both the **Mid-Term Review Presentation** (Week 6) and the **Final Grand Evaluation Presentation** (Week 12) of CUSoC 2026.

In addition to this static document, the platform features a native, accessible, full-screen **Interactive Presentation Deck** built into the web application at `/presentation`. It supports:
- Keyboard navigation (Left/Right arrow keys, Spacebar)
- Fullscreen mode toggle (`F` key)
- Responsive layout adapting to mobile and 4K conference displays
- Real-time backend wake-up ping to eliminate cold-start lag during panel evaluations

---

## 1. Part A: Mid-Term Evaluation Presentation Deck (Review Cycle 2)

**Theme:** *Foundation, Problem Formulation & Full-Stack Prototyping*  
**Date of Delivery:** Cycle 2 (Week 6)  
**Presenter:** Vaibhav Tiwari (Sole Contributor)  

### Slide M-1: Title & Agenda
- **Title:** S-06: Accessibility Audit & Inclusion Improvement Drive
- **Subtitle:** Mid-Term Architecture & Feasibility Demonstration
- **Key Points:**
  - Problem Context: Non-compliance with the Rights of Persons with Disabilities (RPWD) Act, 2016.
  - Objective: Construct an automated, data-driven campus accessibility scoring platform.
  - Agenda: Statutory mandate, preliminary physical audit, Spring Boot backend skeleton, React UI proof of concept.

### Slide M-2: Legal Mandate & Institutional Problem
- **Statutory Mandate:** Section 45 of RPWD Act 2016 mandates equal access across public educational buildings within 5 years.
- **Identified Deficiencies:**
  - Audits currently executed with ad-hoc paper notes or unstructured spreadsheets.
  - Zero centralized spatial mapping of barrier locations across university blocks.
  - Students with physical disabilities face unannounced elevator outages and blocked ramps without real-time reporting channels.

### Slide M-3: Research Methodology & Early Survey Data
- **Sample Buildings Audited:** Block A1 (Academic Core), Block B (Sciences), Block DD (Management).
- **Early Findings:**
  - 14 critical barriers identified in pilot buildings alone.
  - 60% of entrance ramps exceeded the maximum permissible 1:12 gradient.
  - Zero buildings possessed comprehensive tactile paving for blind students.

### Slide M-4: Target Architecture & Technology Stack
- **Backend:** Spring Boot 3.4.1 (Java 21) RESTful micro-architecture with Spring Security 6.
- **Frontend:** React 18, Vite, Tailwind CSS, Leaflet JS mapping engine.
- **Database:** PostgreSQL on Neon Serverless Cloud.
- **Security:** JWT stateless token authentication, role-based authorization model.

### Slide M-5: Mid-Term Deliverables Achieved & Next Steps
- **Completed:** Database schema finalized, Auth & Building REST APIs operational, interactive map canvas prototype rendered.
- **Roadmap for Final Term:** Complete 42-parameter audit conductor, implement 5-stage maintenance Kanban, survey remaining 26 campus buildings, conduct accessibility testing.

---

## 2. Part B: Final Grand Evaluation Presentation Deck (Week 12)

The final evaluation slide deck corresponds directly to the live, interactive presentation engine hosted at `/presentation`.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        CUSoC '26 EVALUATION DECK                       │
│  Slide 1: Project Overview & Sole Authorship Showcase                  │
│  Slide 2: The Campus Accessibility Challenge & Legal Mandate           │
│  Slide 3: Empirical On-Ground Field Audit Drive (29 Buildings)         │
│  Slide 4: Clean Full-Stack Architecture & Security Hardening           │
│  Slide 5: 4-Role Unified Operational Model (Admin, Auditor, Student, Maint)│
│  Slide 6: CUSoC Documentation Standards Checklist (100% Conformance)   │
│  Slide 7: Ready for Live Evaluation & Demonstration Platform           │
└────────────────────────────────────────────────────────────────────────┘
```

---

### Slide 1: Project Showcase & Overview
- **Category:** Project Showcase & Overview
- **Slide Title:** S-06: Accessibility Audit & Inclusion Improvement Drive
- **Subtitle:** CUSoC 2026 Grand Final Evaluation • C Square Club, Chandigarh University
- **Core Heading:** *Empowering Universal Campus Accessibility Through Empirical Audits & Intelligent Systems*
- **Summary Statement:** A production-grade full-stack accessibility platform bridging in-situ physical research across 29 Chandigarh University buildings with automated RPWD compliance scoring, interactive geospatial maps, and maintenance remediation.
- **Metadata Cards:**
  1. **Sole Contributor & Researcher:** Vaibhav Tiwari — Conceived, Researched & Built Solo (100% Individual Authorship & Engineering).
  2. **Host Organization:** C Square Club • CUSoC, Chandigarh University (QS World Rank #575, NIRF Ranked #19).
  3. **Production Architecture:** Live Multi-Cloud Deployed (Vercel CDN + Render API + Neon PostgreSQL DB).
- **Speaker Note:** *"Respected jury members, I am Vaibhav Tiwari, presenting Track S-06. Every line of backend code, frontend design, database schema, and in-situ physical measurement across 29 campus buildings was executed entirely by me as a solo engineering effort."*

---

### Slide 2: The Problem & Statutory Imperative
- **Category:** The Problem & Statutory Imperative
- **Slide Title:** The Campus Accessibility Challenge
- **Subtitle:** Bridging the Statutory Mandate of RPWD Act 2016 with University Ground Reality
- **Statutory Mandate Panel:**
  - **Section 45 of the RPWD Act, 2016** and the **CPWD Harmonised Guidelines (2021)** legally mandate universal accessibility across all public educational institutions.
  - **Mandatory Compliance Areas:**
    - Step-free building approaches and standardized 1:12 ramp gradients.
    - Tactile ground surface indicators (TGSI) for blind students.
    - Accessible washrooms with grab bars and outward-swinging doors.
    - Multi-story elevator access with bilingual voice announcements.
- **Empirical Ground Reality Panel:**
  - **Fragmented Data:** No centralized digital repository of campus accessibility audits or barrier logs.
  - **Hidden Bottlenecks:** Multi-story wings lacking elevator access, steep entrance ramps, and missing tactile markers.
  - **No Student Channel:** Students with disabilities lacked a fast, geotagged way to report hurdles from their phones.
  - **Unassigned Repairs:** Facilities teams lacked a structured Kanban workflow to resolve barriers systematically.

---

### Slide 3: Empirical Field Research
- **Category:** Empirical Field Research
- **Slide Title:** Solo On-Ground Physical Campus Audit Drive
- **Subtitle:** In-Situ Fieldwork by Vaibhav Tiwari Across 29 Chandigarh University Academic Buildings
- **Physical Fieldwork Methodology:**
  1. **Standard Steel Tape Measurements:** Doorway clear openings (≥900mm), corridor pathways (≥1500mm), step risers (≤150mm), and grab bar heights (750mm & 900mm).
  2. **Rise & Run Slope Calculations ($\Delta h / \Delta d$):** Calculated precise ramp slope ratios against the statutory 1:12 (8.33%) limit defined in CPWD Harmonised Guidelines.
  3. **In-Situ Photo Defect Documentation:** Captured photographic evidence of physical barriers, missing handrails, and threshold step obstacles.
- **Discovered Barriers by Severity Classification:**
  - **Tier 1 - Critical (Immediate Hazard):** Multi-story wings lacking lifts (Block DD), entrance ramps steeper than 1:9, inward-swinging washroom doors.
  - **Tier 2 - High (Severe Inconvenience):** Elevators lacking braille control plates or auditory voice announcements; floor threshold transitions > 25mm.
  - **Tier 3 - Medium (Partial Barrier):** Missing tactile warning pavers at top and bottom stair landings, high drinking water coolers lacking wheelchair approach.
  - **Tier 4 - Low (Maintenance Deficit):** Faded accessible parking bay demarcations, signage glare, or minor paint maintenance needs.

---

### Slide 4: Engineering Architecture
- **Category:** Engineering Architecture
- **Slide Title:** Clean Full-Stack Architecture & Security Hardening
- **Subtitle:** Spring Boot 3.4.1 (Java 21) • React 18 & Vite • PostgreSQL 16 • Multi-Cloud Production
- **Component Tiers:**
  - **API Layer:** Spring Boot 3.4.1 + Java 21 — Clean 3-tier REST architecture: Controllers, Service abstraction, Repository layer, DTO validation, and unified exception handling.
  - **UI Layer:** React 18 + Vite + Tailwind — Accessible design system built with Radix UI primitives, Framer Motion fluid animations, Leaflet geospatial mapping, and WCAG AA contrast.
  - **Data Layer:** PostgreSQL 16 on Neon — Normalized 3NF relational schema with 12 entities, composite indexes, foreign key constraints, automated seeder, and connection pooling.
- **Cybersecurity Defense Perimeter:**
  - **IP Rate Limiting:** Sliding-window IP request throttling to prevent DoS attacks.
  - **Brute Force Guard:** 5-attempt failed login threshold with progressive lockout.
  - **XSS Sanitization:** HTML character filtering and sanitization on all text inputs.
  - **Security Headers:** Strict CSP, HSTS, X-Frame-Options DENY, nosniff.

---

### Slide 5: Role-Based Workflows
- **Category:** Role-Based Workflows
- **Slide Title:** 4-Role Unified Operational Model
- **Subtitle:** Tailored Workflows for Administrator, Campus Auditor, Student, and Maintenance Roles
- **The Four Roles:**
  1. **Administrator (`admin@campus.edu`):** Campus Intelligence & Department Radar — Monitor real-time compliance indices across all 29 facilities, benchmark department performance, manage building records, configure user permissions, and export official PDF reports.
  2. **Campus Auditor (`auditor@campus.edu`):** Digitized 42-Parameter Audit Conductor — Conduct standardized in-situ inspections with grouped category score sliders, save in-progress drafts, input comments, and submit for automated weighted compliance calculation with confetti feedback.
  3. **Student / Staff (`student@campus.edu`):** Participatory Barrier Reporting & Awareness — Report physical barriers with photo evidence in under 60 seconds, track resolution progress via public QR codes without logging in, vote on community proposals, and take awareness quizzes.
  4. **Maintenance Engineer (`maintenance@campus.edu`):** 5-Stage Remediation Kanban Roadmap — Action items transition seamlessly across 5 lifecycle stages: Reported → Assigned → In Progress → Fixed → Verified, ensuring zero unaddressed accessibility deficiencies.

---

### Slide 6: Documentation Standards Compliance
- **Category:** Documentation Standards Compliance
- **Slide Title:** CUSoC Documentation Standards Checklist
- **Subtitle:** 100% Compliance with Section 4 of CUSoC Contributor Guidelines
- **Mandatory Documentation Inventory:**
  - `README.md` — Complete project overview, architecture diagram, live links, and setup instructions.
  - `docs/INSTALLATION.md` — Step-by-step local prerequisites, clone instructions, build and Docker Compose commands.
  - `docs/USER_GUIDE.md` — Comprehensive workflows, screenshots, and step-by-step guidance for all 4 roles.
  - `docs/API_DOCUMENTATION.md` — Exhaustive documentation for all 38 REST endpoints with curl examples.
  - `docs/architecture/system-architecture.md` — C4 model diagrams, data flow diagrams, and tech stack justifications.
  - `docs/architecture/DATABASE_SCHEMA.md` — Relational schema definitions, ER diagram, and constraints.
  - `docs/TESTING_REPORT.md` — Automated unit, integration, and UI test results with code coverage metrics.
  - `CHANGELOG.md` — Version history adhering to Keep a Changelog standards.
- **Additional Specialized Artifacts:**
  - `docs/VPAT_ACCESSIBILITY_CONFORMANCE.md`
  - `docs/Campus_Accessibility_Audit_Survey.xlsx`
  - `docs/CAMPUS_INCLUSION_POLICY_RECOMMENDATIONS.md`

---

### Slide 7: Evaluation & Live Demonstration
- **Category:** Evaluation & Live Platform Access
- **Slide Title:** Ready for Live Evaluation & Demonstration
- **Subtitle:** Production-Hardened, Fully Tested, and Ready for Review by the CUSoC Panel
- **Demonstration Invitation:** Experience the live production web application at [https://accessaudit-cu.vercel.app](https://accessaudit-cu.vercel.app).
- **Core Evaluation Scenarios for Jury:**
  - Sign in using pre-configured 1-click test credentials.
  - Explore the 29 campus building compliance scores on the interactive map.
  - Test wheelchair navigation routing between academic blocks.
  - Complete an in-situ audit simulation on the 42-parameter checklist.
  - Review the 5-stage maintenance remediation Kanban board.

---

## 3. Part C: Oral Viva Voce Defense Script & Panel Q&A Matrix

During the project defense, the following structured script guides the 10-minute presentation followed by the 5-minute panel defense.

### Viva Voce Script (10-Minute Timing Breakdown)
- **Minutes 00:00 – 01:30 | The Hook & Statutory Problem:**
  > "Good morning, respected judges. While Chandigarh University is renowned for state-of-the-art infrastructure, the RPWD Act of 2016 establishes that accessibility is not a luxury—it is a statutory right. Before AccessAudit, the university had no unified digital index of wheelchair routes, elevator voice announcements, or tactile pavements. I personally surveyed 29 academic buildings to solve this."
- **Minutes 01:30 – 04:00 | Architecture & Solo Engineering:**
  > "Rather than using mock templates, I built a production-grade 3-tier system: Java 21 and Spring Boot 3.4.1 for the core API, PostgreSQL on Neon Cloud for relational compliance metrics, and React 18 with Vite for a responsive, WCAG 2.1 AA accessible frontend. The architecture is protected by JWT tokens, sliding-window rate limiters, and strict CORS policies."
- **Minutes 04:00 – 07:00 | Live Functional Demonstration:**
  > "Let us look at the live deployment. As an Auditor, I open the 42-parameter checklist. Scores recalculate in real-time. As a Student, I report a broken ramp with photo evidence. That report immediately appears on the Maintenance Kanban board in the Reported column. The technician moves it to In Progress and Fixed, closing the feedback loop."
- **Minutes 07:00 – 09:00 | Empirical Data & Campus Impact:**
  > "My field survey of 29 buildings revealed an overall campus compliance index of 68.2%. The highest scoring facility is the Academic Block at 84%, while older wings lacked elevator access. This platform gives university leadership an empirical basis for targeted capital expenditure."
- **Minutes 09:00 – 10:00 | Summary & Conclusion:**
  > "AccessAudit is completely open-source, fully deployed on a zero-cost cloud architecture, and complies 100% with CUSoC documentation standards. I now welcome your questions."

### Panel Question Handling Matrix
| Anticipated Panel Question | Defensible Engineering Response |
| :--- | :--- |
| **"Why did you choose Spring Boot instead of Node/Express or Django?"** | "Spring Boot 3.4.1 with Java 21 provides enterprise-grade type safety, mature Spring Security filter chains for RBAC, declarative transaction management via Spring Data JPA, and high-performance multithreading via virtual threads. In an institutional compliance context where audit records require immutable audit trails, Spring Boot's robustness is unmatched." |
| **"How did you verify that the campus compliance scores are mathematically sound?"** | "The compliance index uses a statutory weighted multi-attribute utility model. The 7 categories (Ramps, Corridors, Restrooms, Lifts, Signage, Parking, Emergency) are weighted according to CPWD 2021 guidelines. The category weights sum exactly to 1.0, verified by automated JUnit tests (`AuditCategoryControllerTest`)." |
| **"What happens if the university network is down or an auditor loses connection?"** | "The Audit Conductor incorporates browser LocalStorage debouncing. If an auditor loses Wi-Fi while inspecting a basement or elevator shaft, all slider values and notes are cached locally every 2 seconds. Once connectivity returns, the submission syncs with the server." |
| **"How does the platform assist non-visual users who cannot read the visual campus map?"** | "We engineered a dedicated Screen Reader Verbal Map (`/verbal-map`). Instead of an inaccessible canvas or SVG layer, it presents an ARIA-labeled hierarchical table of all 29 buildings, accessible entrance descriptions, elevator status, and barrier notices, fully tested with NVDA." |

---

## 4. Verification & Slide Deck Availability

The final evaluation slides are permanently accessible in two forms:
1. **Interactive Web Application:** [https://accessaudit-cu.vercel.app/presentation](https://accessaudit-cu.vercel.app/presentation)
2. **Repository Markdown Deliverable:** [`deliverables/06_PRESENTATION.md`](file:///c:/Users/Vaibhav/Desktop/AccessAudit/deliverables/06_PRESENTATION.md)

**Presented and Defended By:**  
*Vaibhav Tiwari*  
Sole Contributor & Full-Stack Developer, Track S-06  
Chandigarh University &bull; CUSoC 2026
