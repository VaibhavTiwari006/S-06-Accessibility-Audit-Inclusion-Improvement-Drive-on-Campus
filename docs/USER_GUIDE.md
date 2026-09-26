# User Guide: AccessAudit Platform
## Role-Based Operations & Campus Inclusivity Workflows

> **Project:** S-06: Accessibility Audit & Inclusion Improvement Drive on Campus  
> **Author & Sole Contributor:** **Vaibhav Tiwari** (Chandigarh University • CUSoC 2026)  
> **Evaluation Dossier:** [`docs/CUSOC_FINAL_EVALUATION.md`](CUSOC_FINAL_EVALUATION.md) | **Live Presentation Deck:** [`/presentation`](http://localhost:3000/presentation)  

Welcome to the **CU Access Audit** portal! This system streamlines the accessibility auditing process for physical and digital infrastructure across the Chandigarh University campus in accordance with the **Rights of Persons with Disabilities (RPWD) Act, 2016** and **WCAG 2.1 Level AA**.

---

## 🔑 Demo User Accounts

| User Role | Email Address | Default Password | Primary Platform Focus |
|:---|:---|:---|:---|
| **Administrator** | `admin@campus.edu` | `password` | Executive intelligence, department comparison radar, user management, PDF reports |
| **Campus Auditor** | `auditor@campus.edu` | `password` | 42-parameter audit conductor with score sliders, photo evidence, draft saving |
| **Student / Staff** | `student@campus.edu` | `password` | Quick barrier reporting with photo upload, public QR code tracker, awareness quizzes |
| **Maintenance** | `maintenance@campus.edu` | `password` | 5-stage remediation Kanban roadmap (`REPORTED` &rarr; `VERIFIED`), work orders |

---

## 👥 Role-Based Workflows & User Guides

### 1. 🛡️ Administrator Workflow
1. **Executive Dashboard (`/dashboard`)**:
   - Monitor campus-wide compliance index (68.2%), total audited buildings (29), checkpoints evaluated (1,218), and barrier severity metrics.
   - Review the **Departmental Comparison** benchmark (CSE 96.7% vs. UIC 79.7% vs. CBS 74.8% vs. UIPS 62.9% vs. UIET 59.8%).
2. **Interactive Campus Map (`/map`)**:
   - Inspect all 29 building markers across 7 spatial clusters. Filter by accessibility layers (Ramps, Elevators, Washrooms, Parking).
   - Click building pills to inspect empirical scores and launch step-free wheelchair routing.
3. **Audit Oversight & Reports (`/reports`)**:
   - Review pending and approved audits. Download formal compliance certificates in PDF format.
4. **System Settings (`/settings`)**:
   - Manage institution-wide parameters, audit categories, and role permissions.

### 2. 📋 Auditor Workflow
1. **Starting an Audit (`/audits`)**:
   - View building audit register across Approved, In Progress, Pending, and Rejected states.
   - Click **Start Audit** or **Continue Audit** on any building to open the interactive checklist conductor.
2. **Conducting the Audit (`/audits/:id/conduct`)**:
   - Navigate 42 standardized criteria grouped into 8 physical domains (Entrances, Vertical Circulation, Corridors, Restrooms, Signage, Emergency Egress, Instructional Spaces, Amenities).
   - Use dynamic score sliders ($0.0$ Non-Compliant, $0.5$ Deficient, $1.0$ Compliant), type in-situ observations, and click **Save Draft**.
   - Click **Submit Audit** to trigger instant compliance calculation and celebratory confetti.
3. **Evidence Gallery (`/evidence`)**:
   - Review annotated barrier photographs and side-by-side before/after architectural remediation concepts.

### 3. 🎓 Student & Campus Community Workflow
1. **Barrier Reporting in Under 60 Seconds (`/issues`)**:
   - Click **Report Barrier** from the navigation bar or dashboard.
   - Select building, floor, category (Physical, Digital, Sensory), severity tier, and attach a mobile photo.
2. **Public QR Code Issue Tracking (`/track/:id`)**:
   - Scan any physical QR placard affixed to campus doors or water coolers to track repair status without logging in.
3. **Inclusive Community & Voting (`/community`)**:
   - Propose campus accessibility micro-pilots (e.g., braille menu cards, tactile walkway extensions) and upvote peer initiatives.
4. **Awareness & Quiz Challenge (`/awareness` & `/quiz`)**:
   - Learn disability etiquette and test WCAG / RPWD compliance knowledge with instant gamified feedback.
5. **Verbal Screen Reader Map (`/verbal-map`)**:
   - Audio-first campus navigation assistance designed for visually impaired navigators.

### 4. 🔧 Maintenance Engineering Workflow
1. **5-Stage Kanban Roadmap (`/roadmap`)**:
   - View all verified barrier tickets categorized across 5 columns:
     `REPORTED` &rarr; `ASSIGNED` &rarr; `IN_PROGRESS` &rarr; `FIXED` &rarr; `VERIFIED`.
   - Drag or update tickets as physical carpenters, masons, and technicians complete repairs on-site.
2. **Work Order Prioritization**:
   - Prioritize Critical Tier 1 barriers (e.g. inward-swinging washroom doors, non-compliant ramp slopes) to maintain life safety.

---

## 🏆 CUSoC 2026 Presentation Mode (`/presentation`)
At any time, evaluators, judges, and visitors can click **🏆 CUSoC '26 Presentation** in the top navbar or hero section (or navigate directly to [`/presentation`](http://localhost:3000/presentation)) to launch the interactive, slide-based evaluation deck with full keyboard navigation.
