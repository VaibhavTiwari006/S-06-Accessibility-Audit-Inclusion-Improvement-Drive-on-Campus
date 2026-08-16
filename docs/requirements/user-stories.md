# AccessAudit — Comprehensive User Stories Specification

**Document Version:** 1.0.0  
**Project:** AccessAudit — Campus Accessibility Audit & Inclusion Improvement Platform  
**Target Standards:** Rights of Persons with Disabilities (RPWD) Act 2016, Harmonised Guidelines and Standards for Universal Accessibility in India (2021), Web Content Accessibility Guidelines (WCAG) 2.1 AA/AAA  
**Last Updated:** 2026-08-17  

---

## 1. Overview & System Context

**AccessAudit** is an enterprise-grade campus accessibility audit, participatory barrier reporting, and remediation management platform. It bridges the gap between statutory accessibility compliance (RPWD Act 2016, Harmonised Guidelines 2021, and WCAG 2.1 digital standards) and physical/digital campus realities.

### System User Roles & Personas

| Role | Persona / Description | Core Responsibilities |
| :--- | :--- | :--- |
| **Administrator** | System Administrator, IT & Compliance Data Manager | Master campus configuration, checklist rubric management, RBAC, awareness campaigns. |
| **Auditor** | Certified Accessibility Specialist, Field Surveyor, Student Accessibility Lead | Performing structured audits, capturing evidence, calculating compliance scores, post-fix validation. |
| **Student** | Students, Faculty, Staff, Campus Visitors (including Persons with Disabilities - PwD) | Barrier reporting, accessible routing, personalized UI preferences, participating in feedback & drives. |
| **Maintenance** | Facilities Management, Estate Office, Civil/Electrical Works Engineers | Managing remediation roadmap (Kanban), estimating costs/timelines, executing repairs, submitting fix proof. |
| **University Administration** | Deans, Vice-Chancellor Office, Estate Directors, Statutory Compliance Officers | Strategic analytics, campus accessibility heatmaps, regulatory export (NAAC/NIRF/RPWD), budget approval. |

---

## 2. Traceability Matrix Summary

| Role | User Story ID | Title | Primary Feature Area |
| :--- | :--- | :--- | :--- |
| **Administrator** | [US-01](#us-01-campus--building-infrastructure-master-management) | Campus & Building Infrastructure Master Management | Building Management & Mapping |
| **Administrator** | [US-02](#us-02-accessibility-standards--audit-checklist-configuration) | Accessibility Standards & Checklist Rubric Configuration | RPWD Act 2016 & WCAG 2.1 Rubrics |
| **Administrator** | [US-03](#us-03-user-role-permission--zone-assignment-management) | User Role, Permission & Zone Assignment Management | Access Control & Governance |
| **Administrator** | [US-04](#us-04-awareness-campaign--accessibility-drive-coordination) | Awareness Campaign & Accessibility Drive Coordination | Community Engagement & Drives |
| **Auditor** | [US-05](#us-05-standardized-digital-field-audit-execution) | Standardized Digital Field Audit Execution | Audit Checklists & Mobile Surveys |
| **Auditor** | [US-06](#us-06-multimedia-evidence-capture--geo-location-tagging) | Multimedia Evidence Capture & Geo-Location Tagging | Evidence & Location Tagging |
| **Auditor** | [US-07](#us-07-automated-compliance-scoring--accessibility-index-generation) | Automated Compliance Scoring & Accessibility Index Generation | Compliance Scoring Engine |
| **Auditor** | [US-08](#us-08-pilot-improvement-verification--post-remediation-sign-off) | Pilot Improvement Verification & Post-Remediation Sign-Off | Pilot Improvements & Verification |
| **Student** | [US-09](#us-09-crowdsourced-barrier--hazard-quick-reporting) | Crowdsourced Barrier & Hazard Quick Reporting | Participatory Barrier Reporting |
| **Student** | [US-10](#us-10-accessible-campus-navigation--building-profile-lookup) | Accessible Campus Navigation & Building Profile Lookup | Accessibility Profiles & Navigation |
| **Student** | [US-11](#us-11-personalized-inclusive-ui--assistive-reading-preferences) | Personalized Inclusive UI & Assistive Reading Preferences | Accessibility Preferences (WCAG 2.1) |
| **Student** | [US-12](#us-12-participatory-feedback-on-pilot-accessibility-remediations) | Participatory Feedback on Pilot Accessibility Remediations | Participatory Feedback & Rating |
| **Student** | [US-13](#us-13-community-drive-registration--volunteer-participation) | Community Drive Registration & Volunteer Participation | Community Engagement & Awareness |
| **Maintenance** | [US-14](#us-14-interactive-remediation-roadmap--kanban-workflow-board) | Interactive Remediation Roadmap & Kanban Workflow Board | Remediation Roadmap (Kanban) |
| **Maintenance** | [US-15](#us-15-work-order-cost-effort--material-procurement-estimation) | Work Order Cost, Effort & Material Procurement Estimation | Cost/Effort & SLA Estimation |
| **Maintenance** | [US-16](#us-16-remediation-status-logging--proof-of-fix-evidence-submission) | Remediation Status Logging & Proof-of-Fix Evidence Submission | Maintenance Logging & Verification |
| **Maintenance** | [US-17](#us-17-preventive-maintenance-alerts-for-assistive-infrastructure) | Preventive Maintenance Alerts for Assistive Infrastructure | Asset Inspection & Preventive Alerts |
| **Univ Admin** | [US-18](#us-18-executive-compliance-dashboard--campus-accessibility-heatmap) | Executive Compliance Dashboard & Campus Accessibility Heatmap | Dashboard Analytics & Heatmaps |
| **Univ Admin** | [US-19](#us-19-statutory-rpwd-act--institutional-accreditation-reporting) | Statutory RPWD Act & Institutional Accreditation Reporting | Regulatory & Accreditation Reports |
| **Univ Admin** | [US-20](#us-20-capital-allocation--remediation-budget-prioritization) | Capital Allocation & Remediation Budget Prioritization | CAPEX & Priority Planning |
| **Univ Admin** | [US-21](#us-21-longitudinal-compliance-trends--departmental-benchmarking) | Longitudinal Compliance Trends & Departmental Benchmarking | Trend Analytics & Performance Metrics |

---

## 3. Detailed User Stories

### Group 1: Administrator User Stories

```
Role: Administrator
Focus: Infrastructure Setup, Checklists, Security & Campaign Coordination
```

---

### US-01: Campus & Building Infrastructure Master Management
- **As an** Administrator
- **I want to** create, update, and organize campus zones, buildings, wings, floors, and specific physical/digital facilities in a hierarchical structure
- **So that** auditors and maintenance teams have an accurate, structured master directory for linking audit checklists and barrier tickets.
- **Acceptance Criteria:**
  1. The system shall provide a multi-tier hierarchy: Campus > Zone / Sector > Building > Wing / Block > Floor > Room / Facility.
  2. Each building profile must support metadata: construction year, primary usage (Academic, Residential, Administrative, Library, Sports), total floors, elevator availability, emergency exits, and coordinate boundaries (GIS polygon / lat-long).
  3. Administrators can bulk-import building lists and architectural floor plans via CSV or GeoJSON formats.
  4. System validates duplicate building codes and warns if mandatory accessibility zones (e.g., ground floor entrance, emergency muster point) are missing.
  5. Any structural modifications to building structures are recorded in an audit trail with timestamp, user ID, and reason for modification.

---

### US-02: Accessibility Standards & Audit Checklist Configuration
- **As an** Administrator
- **I want to** configure and maintain audit checklists mapped to statutory standards (RPWD Act 2016, Harmonised Guidelines 2021, and WCAG 2.1 AA/AAA)
- **So that** field auditors evaluate campus infrastructure against standardized, legally compliant, and customizable rubrics.
- **Acceptance Criteria:**
  1. The checklist builder must support categories: Pathway & Tactile Paving, Parking & Drop-off, Ramps & Handrails, Main Entrances & Doors, Corridors & Lobbies, Lifts & Elevators, Accessible Washrooms, Drinking Water & Canteens, Signage & Braille Displays, Emergency Evacuation, and Digital Kiosks/Web Portals.
  2. Each checklist item must allow setting: compliance weight (1–5), standard citation (e.g., *RPWD Sec 44 / Harmonised Cl. 4.2.1*), mandatory photo requirement, acceptable measurement tolerances (e.g., ramp slope <= 1:12, door width >= 900mm), and defect severity rating (Critical, High, Medium, Low).
  3. System supports versioning of checklists; modifying an active checklist creates a new version without corrupting historical audit data.
  4. Administrators can clone, activate, or archive checklist templates for specific audits (e.g., "Full Campus Drive 2026", "Digital Accessibility Audit").

---

### US-03: User Role, Permission & Zone Assignment Management
- **As an** Administrator
- **I want to** manage user accounts, assign role-based access control (RBAC), and delegate specific buildings/zones to designated auditors and maintenance engineers
- **So that** audit integrity is maintained, data privacy is upheld, and team members only access workflows relevant to their assigned scope.
- **Acceptance Criteria:**
  1. The platform supports 5 discrete roles: Administrator, Auditor, Student, Maintenance, University Administration, each with fine-grained CRUD permissions.
  2. Administrators can assign individual auditors or audit teams to specific buildings with audit time windows and deadlines.
  3. Maintenance teams can be partitioned by trade/domain (Civil, Electrical, IT, Signage) and building cluster.
  4. Supports Single Sign-On (SSO) integration via institutional OAuth2/SAML (e.g., Google Workspace, Microsoft Entra ID).
  5. Deactivation or role change takes effect immediately, revoking active session tokens.

---

### US-04: Awareness Campaign & Accessibility Drive Coordination
- **As an** Administrator
- **I want to** schedule, publish, and monitor campus-wide accessibility awareness campaigns, audit drives, and sensitivity workshops
- **So that** the university fosters a culture of universal design, student engagement, and participatory auditing.
- **Acceptance Criteria:**
  1. Admins can create campaign events with title, target objective, date/time, physical venue or webinar link, volunteer capacity limit, and downloadable briefing materials.
  2. System enables broadcasting push notifications and in-app banners to student and staff dashboards based on role and campus zone.
  3. Tracks real-time participant registrations, attendance check-ins (via QR code scan), and volunteer hours.
  4. Provides an automated post-event digital certificate generator for students who complete audit drive volunteer shifts.

---

### Group 2: Auditor User Stories

```
Role: Auditor
Focus: Digital Field Surveys, Measurement Verification, Evidence Upload & Compliance Calculations
```

---

### US-05: Standardized Digital Field Audit Execution
- **As an** Auditor
- **I want to** execute digital accessibility audits using pre-configured, standard-compliant checklists on my mobile device or tablet
- **So that** I can systematically record observations, measurements, and compliance statuses directly on-site without manual paper forms.
- **Acceptance Criteria:**
  1. The audit interface displays checklist items grouped by physical zone (e.g., Entrance, Ramp, Restroom) with intuitive responses: `Compliant`, `Non-Compliant`, `Partially Compliant`, or `Not Applicable (N/A)`.
  2. For numerical parameters (e.g., ramp gradient, handrail height, door clearance), input fields validate measured values against defined threshold ranges and auto-flag deviations.
  3. The mobile interface supports full offline caching; audits conducted in low-connectivity areas (e.g., basements) auto-sync once internet connectivity is restored.
  4. System prevents final submission if any mandatory criteria (or required defect notes) remain unanswered.
  5. Displays real-time section progress indicators (e.g., "Washroom Audit: 8/12 items completed").

---

### US-06: Multimedia Evidence Capture & Geo-Location Tagging
- **As an** Auditor
- **I want to** capture and attach high-resolution photos, short video clips, and precise spatial/GPS coordinates to non-compliant audit items
- **So that** maintenance engineers and administrators have irrefutable visual and spatial proof of identified accessibility barriers.
- **Acceptance Criteria:**
  1. Camera integration allows capturing photos directly within the app or uploading from gallery (max 5 photos and 1 video clip per checklist item).
  2. The app automatically extracts and embeds metadata: GPS coordinates, building/floor tag, timestamp, auditor ID, and camera azimuth.
  3. Auditors can annotate photos with freehand drawing or arrow markers to highlight specific defects (e.g., cracked tactile tile, missing braille plate, blocked ramp).
  4. Images are automatically compressed before upload without losing text/defect legibility to optimize bandwidth.

---

### US-07: Automated Compliance Scoring & Accessibility Index Generation
- **As an** Auditor
- **I want to** generate instant building-level and category-level compliance scores upon completing an audit
- **So that** the institution receives immediate, mathematically rigorous accessibility ratings without manual spreadsheet calculations.
- **Acceptance Criteria:**
  1. The scoring engine calculates:
     - Category Compliance Score (%) = $\frac{\sum (\text{Earned Weight})}{\sum (\text{Applicable Total Weight})} \times 100$
     - Overall Building Accessibility Index (0–100 score and Grade A+ to F).
  2. Critical safety violations (e.g., completely inaccessible fire exit, absent ramp at sole entrance) trigger a "Critical Barrier" warning flag irrespective of the numerical percentage.
  3. Generates an instant downloadable preliminary Audit Summary Sheet in PDF format with executive breakdown, radar chart of categories, and critical deficiency list.
  4. Auditor can append qualitative executive observations and specific recommendations before submitting for administrative sign-off.

---

### US-08: Pilot Improvement Verification & Post-Remediation Sign-Off
- **As an** Auditor
- **I want to** re-audit remediated barriers and pilot improvements against previous non-compliance baselines
- **So that** I can formally verify that repairs meet RPWD/WCAG standards before a work order is officially closed.
- **Acceptance Criteria:**
  1. The auditor can open a "Verification Queue" showing items marked as `Resolved / Ready for Audit` by the maintenance team.
  2. Displays side-by-side comparison of baseline defect photo/data versus maintenance proof-of-fix photo.
  3. Auditor can either:
     - `Approve & Certify`: Updates status to `Verified Closed` and recalibrates the building's live compliance index.
     - `Reject & Re-open`: Specifies precise non-compliance reasons (e.g., "Ramp slope built at 1:8 instead of 1:12 requirement") and returns item to maintenance backlog.
  4. System generates a formal digital Verification Certificate with cryptographic timestamp and auditor digital signature.

---

### Group 3: Student & Campus Community User Stories

```
Role: Student / PwD / Campus Community
Focus: Barrier Reporting, Accessible Navigation, UI Inclusivity & Participatory Voice
```

---

### US-09: Crowdsourced Barrier & Hazard Quick Reporting
- **As a** Student (or campus community member)
- **I want to** quickly report a physical or digital accessibility barrier (e.g., broken ramp, locked accessible toilet, broken lift, inaccessible course portal) via my phone
- **So that** facility managers are immediately alerted and campus hazards are resolved promptly.
- **Acceptance Criteria:**
  1. Reporting workflow takes under 60 seconds with simple fields: Category (Physical/Digital/Sensory), Building & Floor selection (or auto-detect via QR code scan / GPS), Description, and Photo upload.
  2. Users can choose to submit reports anonymously or link them to their student profile to receive resolution updates.
  3. Generates a unique Tracking Ticket ID and sends in-app/email confirmation.
  4. Duplicate detection: If another student reported the same barrier within 50 meters in the past 24 hours, the system offers an "Upvote / Me Too (+1)" option instead of creating redundant tickets.
  5. Real-time ticket status tracking (`Received` > `Under Review` > `In Remediation` > `Resolved`).

---

### US-10: Accessible Campus Navigation & Building Profile Lookup
- **As a** Student with mobility, visual, or hearing impairments
- **I want to** look up building accessibility profiles, functioning elevators, accessible restrooms, and wheelchair-friendly pathways
- **So that** I can plan safe, independent, and barrier-free routes across campus.
- **Acceptance Criteria:**
  1. Interactive campus map displays color-coded accessibility indicators for all buildings (e.g., Green = Fully Accessible, Amber = Partially Accessible, Red = Major Barriers).
  2. Detailed building view lists verified amenities: ramp locations, elevator status, braille signage, unisex accessible washrooms, hearing induction loops, and quiet sensory rooms.
  3. Displays live service outage alerts (e.g., "Lift B in Library undergoing maintenance; use Ramp West").
  4. Step-free route planner generates navigation paths avoiding stairs, steep inclines, and ongoing construction zones.

---

### US-11: Personalized Inclusive UI & Assistive Reading Preferences
- **As a** Student with diverse visual, cognitive, or physical abilities
- **I want to** customize the platform's visual presentation and assistive reading settings (high contrast, dyslexia fonts, screen reader optimization, reduced motion)
- **So that** I can comfortably interact with AccessAudit using my preferred accessibility modalities.
- **Acceptance Criteria:**
  1. The platform provides an instant Accessibility Preferences panel accessible from every screen.
  2. Preference options include:
     - **Contrast Modes:** Default, High Contrast Dark (Black & Yellow), High Contrast Light (Pure Black on White), Soft Low-Glare.
     - **Typography:** OpenDyslexic font toggle, adjustable font scaling (100% to 250%), line-height and letter-spacing sliders.
     - **Motion & Animations:** `prefers-reduced-motion` toggle to disable all non-essential transitions and animations.
     - **Text-to-Speech (TTS):** Integrated native speech synthesizer with play/pause, voice speed (0.75x to 2x), and section highlighting.
  3. Settings persist across browser sessions and sync to the user's authenticated cloud profile.
  4. All UI components strictly comply with WCAG 2.1 Level AAA color contrast ratios and keyboard-only navigation focus indicators.

---

### US-12: Participatory Feedback on Pilot Accessibility Remediations
- **As a** Student with disabilities
- **I want to** test and provide direct experiential feedback/ratings on recently completed pilot accessibility improvements
- **So that** university planners know if the installed accessibility features actually meet real user needs before large-scale rollout.
- **Acceptance Criteria:**
  1. Students receive invitations to rate completed pilot projects (e.g., new tactile path outside Science Block, newly adapted lab workstation).
  2. Feedback form includes 5-star ease-of-use rating, multiple-choice usability prompts, and open qualitative text/audio feedback submission.
  3. Aggregated student satisfaction scores are prominently displayed on the public pilot showcase page.
  4. Provides an upvote/downvote mechanism on proposed future campus improvement initiatives.

---

### US-13: Community Drive Registration & Volunteer Participation
- **As a** Student
- **I want to** register for upcoming accessibility audit drives, sensitivity workshops, and volunteer assistance programs
- **So that** I can actively contribute to making my campus inclusive and earn recognized experiential learning credits.
- **Acceptance Criteria:**
  1. Students can browse the calendar of upcoming drives, filter by zone or activity type, and RSVP with one click.
  2. Confirmed volunteers receive reminder notifications, preparation guides, and digital check-in passes.
  3. Tracks logged volunteer hours and tasks completed during audit drives.
  4. Generates an interactive "Inclusion Champion" badge on the student's profile upon achieving milestone volunteer contributions.

---

### Group 4: Maintenance & Facilities Team User Stories

```
Role: Maintenance & Facilities Management
Focus: Remediation Roadmap, Kanban Prioritization, Cost/SLA Tracking & Proof-of-Fix
```

---

### US-14: Interactive Remediation Roadmap & Kanban Workflow Board
- **As a** Maintenance Engineer / Facilities Manager
- **I want to** view, prioritize, and manage all identified accessibility defects on an interactive Kanban board
- **So that** my department can schedule repairs efficiently based on defect severity, statutory urgency, and campus impact.
- **Acceptance Criteria:**
  1. Kanban board columns: `Backlog / Triage`, `Estimated & Approved`, `In Progress`, `Under Quality Review`, `Ready for Auditor Verification`, `Closed`.
  2. Each card clearly displays: Defect Title, Building/Floor, Severity Tag (`Critical - RPWD Mandate`, `High`, `Medium`, `Low`), SLA countdown timer, and Assigned Contractor/Technician.
  3. Supports drag-and-drop card state transitions with mandatory validation checks (e.g., cannot move to `Ready for Auditor Verification` without uploading proof photo).
  4. Filters allow isolating tickets by building, trade (Civil, Carpentry, Electrical, IT), urgency, or budget code.

---

### US-15: Work Order Cost, Effort & Material Procurement Estimation
- **As a** Maintenance Manager
- **I want to** attach cost estimates, labor hours, material specifications, and target completion dates to remediation work orders
- **So that** the estate office can allocate funds, procure standard-compliant materials (e.g., 304-grade tactile studs, anti-skid ramp coatings), and manage budgets.
- **Acceptance Criteria:**
  1. Work order modal provides structured fields for: Estimated Labor Hours, Material Costs, Contractor Overhead, Target SLA Completion Date, and Account Head / Budget Source.
  2. System includes a pre-populated Rate Card library for standard accessibility retrofits (e.g., standard stainless-steel handrail per meter, tactile paving tile per sq. ft.).
  3. Work orders exceeding predefined budget thresholds automatically trigger an electronic approval request to University Administration.
  4. Generates standard Work Order / Purchase Requisition PDFs formatted for estate office procurement workflows.

---

### US-16: Remediation Status Logging & Proof-of-Fix Evidence Submission
- **As a** Maintenance Technician
- **I want to** log repair progress notes, upload post-remediation photos/measurements, and submit completed tasks for audit verification
- **So that** my completed work is documented transparently and validated against statutory standards.
- **Acceptance Criteria:**
  1. Technicians can update ticket logs with work progress, technician notes, and actual completion date.
  2. Mandatory proof submission requires at least one clear photo of the remediated site taken from the same vantage point as the original audit defect photo.
  3. Input fields capture critical post-fix measurements (e.g., "Adjusted door closer force to <= 22 N; clear opening width verified at 950 mm").
  4. Submitting marks the ticket `Ready for Auditor Verification` and triggers an automated notification to the assigned auditor.

---

### US-17: Preventive Maintenance Alerts for Assistive Infrastructure
- **As a** Maintenance Engineer
- **I want to** configure recurring preventive maintenance schedules and automatic inspection alerts for critical assistive equipment
- **So that** elevators, wheelchair stair lifts, automatic sensor doors, braille displays, and tactile ground indicators remain continuously functional.
- **Acceptance Criteria:**
  1. System supports recurring inspection intervals (Weekly, Monthly, Quarterly) for registered campus assistive assets.
  2. Automatically generates preventive maintenance tickets 7 days prior to due dates.
  3. If a high-priority assistive asset (e.g., sole elevator in academic block) fails a preventive check, the system auto-creates an emergency work order and issues a public outage notice on student navigation maps.
  4. Logs complete lifecycle history and mean-time-to-repair (MTTR) metrics for each piece of assistive equipment.

---

### Group 5: University Administration & Leadership User Stories

```
Role: University Administration (Deans, Directors, Compliance Officers)
Focus: Analytics, RPWD/Accreditation Compliance, Budgeting & Campus-Wide Governance
```

---

### US-18: Executive Compliance Dashboard & Campus Accessibility Heatmap
- **As a** University Administrator (Dean / Estate Director)
- **I want to** monitor overall campus compliance scores, geographic barrier heatmaps, and resolution velocity on a real-time executive dashboard
- **So that** I have instant visibility into institutional accessibility health and high-risk non-compliance zones.
- **Acceptance Criteria:**
  1. Dashboard displays high-level KPIs: Aggregate Campus Accessibility Index (0–100%), Total Audited Buildings, Open Critical Barriers, Remediation SLA Compliance Rate (%), and Community Satisfaction Index.
  2. Interactive GIS / 2D Campus Heatmap color-codes buildings and pathways based on live accessibility scores and density of unresolved grievances.
  3. Clicking any building opens an executive drawer showing historical score trajectory, pending capital works, and current audit status.
  4. Provides filters by academic faculty, campus sector, building age, and barrier type.

---

### US-19: Statutory RPWD Act & Institutional Accreditation Reporting
- **As a** University Compliance Officer
- **I want to** generate formal accessibility compliance audit reports tailored for statutory bodies (RPWD Act 2016, UGC, NAAC Criteria 7, NIRF)
- **So that** the university easily fulfills mandatory government submissions and accreditation documentation requirements.
- **Acceptance Criteria:**
  1. One-click report generator produces comprehensive PDF/Excel dossiers structured according to statutory guidelines (RPWD Act 2016 Section 44/45 and Harmonised Guidelines 2021).
  2. Includes required institutional disclosures: percentage of disabled-friendly washrooms, barrier-free entrance coverage, accessible website compliance (WCAG 2.1 AA certified), and lift accessibility percentage.
  3. Each report embeds an official institutional header, digital signatures, audit timestamps, and high-resolution photo evidence appendices.
  4. Supports automated scheduled report distribution (e.g., quarterly executive briefing sent via email to the Vice-Chancellor's office).

---

### US-20: Capital Allocation & Remediation Budget Prioritization
- **As a** University Chief Financial Officer / Estate Director
- **I want to** analyze cost-benefit projections and prioritize capital expenditure (CAPEX) on accessibility infrastructure based on student impact and statutory urgency
- **So that** financial resources are allocated to high-impact retrofits first.
- **Acceptance Criteria:**
  1. The platform provides a Capital Planning Matrix ranking pending remediation projects by a weighted score of: `(Severity × Student Traffic Footprint) ÷ Estimated Cost`.
  2. Multi-year budget simulation tool allows administrators to forecast campus accessibility score improvement under various funding scenarios (e.g., "Investing ₹25 Lakhs in Science Block lifts increases campus score by +4.8%").
  3. Tracks actual capital spent versus initial estimates across fiscal quarters.
  4. Provides exportable procurement forecast summaries for board approval meetings.

---

### US-21: Longitudinal Compliance Trends & Departmental Benchmarking
- **As a** University Administrator
- **I want to** analyze multi-year accessibility improvement trends and benchmark compliance performance across faculties and campus zones
- **So that** the university can maintain accountability, reward proactive departments, and ensure sustained continuous improvement.
- **Acceptance Criteria:**
  1. Longitudinal trend charts show quarterly and annual progression of campus-wide and departmental accessibility indices over a 5-year rolling window.
  2. Departmental Leaderboard ranks faculties by: audit completion rates, remediation turnaround speed, and participatory community satisfaction ratings.
  3. System identifies recurring bottleneck areas (e.g., recurring delay in tactile tile procurement or recurring elevator breakdown in Block C).
  4. Enables exporting clean presentation-ready charts and vector graphics for annual university governance reports.

---

## 4. Non-Functional & Cross-Cutting Requirements

### Accessibility & Universal Usability
- **NFR-01 (WCAG Compliance):** All web and mobile interfaces shall strictly conform to WCAG 2.1 Level AA at a minimum, with Level AAA contrast and font features in the dedicated accessible mode.
- **NFR-02 (Screen Reader Compatibility):** All interactive elements, charts, and image attachments must include semantic ARIA labels, descriptive alt text, and logical keyboard tab indexing.

### Performance & Offline Reliability
- **NFR-03 (Offline Field Auditing):** Field auditor mobile clients must cache up to 500 checklist items and 100 media files locally, ensuring zero data loss in zero-connectivity campus basements.
- **NFR-04 (Response Times):** Dashboard analytics and interactive map rendering must load within `< 1.5 seconds` on standard broadband connections.

### Security & Privacy
- **NFR-05 (Data Governance):** User identity data for crowdsourced barrier reports must support pseudonymous submission with encryption at rest (AES-256) and in transit (TLS 1.3).
- **NFR-06 (Immutable Audit Logs):** All audit score modifications, checklist changes, and work order closures are recorded in an immutable append-only ledger for compliance verification.
