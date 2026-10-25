# Project Deliverable 1: Project Proposal

## CUSoC 2026: Chandigarh University Summer / Semester of Code
### Track S-06: Accessibility Audit & Inclusion Improvement Drive on Campus

---

| Metadata Field | Project Specification |
|:---|:---|
| **Project Title** | AccessAudit: Universal Accessibility Audit, Digital Twin & Remediation Platform |
| **Track Identifier** | S-06 (Accessibility Audit & Inclusion Improvement Drive) |
| **Program** | CUSoC 2026 (Chandigarh University Summer / Semester of Code) |
| **Host Institution** | Chandigarh University (QS World University Rankings 2026 #575, NIRF Ranked #19) |
| **Host Club** | C Square Club, Department of Computer Science & Engineering |
| **Sole Contributor & Author** | **Vaibhav Tiwari** (100% Individual Research, Engineering & Authorship) |
| **Primary Domain** | Smart Campus Infrastructure, Assistive Tech, RPWD Compliance, Geospatial GIS |
| **Project Repository** | [GitHub Repository](https://github.com/VaibhavTiwari006/S-06-Accessibility-Audit-Inclusion-Improvement-Drive-on-Campus) |
| **Live Production Link** | [https://accessaudit-cu.vercel.app/](https://accessaudit-cu.vercel.app/) |

---

## 1. Executive Summary & Problem Formulation

### 1.1 The Statutory Mandate
The **Rights of Persons with Disabilities (RPWD) Act, 2016** enacted by the Parliament of India, along with the **Harmonised Guidelines and Space Standards for Barrier-Free Built Environment for Persons with Disabilities and Elderly Persons (2021)** issued by the Ministry of Housing and Urban Affairs (MoHUA), establish a strict legal mandate: all public educational institutions must ensure complete barrier-free physical and digital access for individuals with physical, sensory, and cognitive impairments.

### 1.2 The Ground Reality at Higher Education Campuses
Higher education campuses such as Chandigarh University span sprawling multi-hectare territories featuring dozens of academic blocks, research wings, auditoriums, recreational zones, and dining plazas. Despite active administrative goodwill, campus accessibility faces critical operational bottlenecks:
1. **Paper-Driven, Infrequent Audits:** Accessibility surveys are historically conducted using disparate paper questionnaires or generic checklists, resulting in fragmented data that gathers dust in administrative files.
2. **Invisible Micro-Barriers:** Minor non-compliances (e.g., entrance thresholds exceeding 25mm, steep ramp gradients exceeding statutory 1:12 slope, absent stair-nosing contrast strips, silent elevator voice announcers) severely hinder manual and motorized wheelchair users but remain unnoticed by able-bodied facilities managers.
3. **Absence of Barrier-Free Navigation:** Conventional campus maps (e.g., Google Maps) provide routing for vehicular traffic or pedestrian sidewalks without considering physical obstacles like stairs, unpaved terrain, curb drops, or locked lift lobbies.
4. **Disconnect Between Reporting and Maintenance:** Students with disabilities encounter physical obstacles daily but lack an immediate, verifiable channel to log geolocated defect tickets, track work orders, and receive resolution notifications.

### 1.3 Project Proposition: AccessAudit (Track S-06)
**AccessAudit** was conceived as an end-to-end, production-hardened software ecosystem bridging **rigorous in-situ empirical campus fieldwork** with a **scalable full-stack multi-cloud architecture**. It transforms physical measurements gathered across **29 Chandigarh University buildings** into actionable digital compliance indices, interactive barrier-free routing, an automated 42-parameter audit conductor, and an institutional 5-stage maintenance remediation pipeline.

---

## 2. Project Objectives & Target Outcomes

| Objective | Target Deliverable | Metric for Success |
|:---|:---|:---|
| **O1: Empirical Ground Research** | Comprehensive physical survey of 29 buildings at CU using standard steel tape measurements, digital inclinometer slope assessments, and photographic logging. | 1,100+ checkpoint data points logged; baseline campus compliance index established. |
| **O2: Enterprise Digital Platform** | Production-ready full-stack application built with Spring Boot 3.4.1 (Java 21) and React 18 + Vite. | Sub-200ms API response times; zero-downtime deployment on multi-cloud infrastructure. |
| **O3: Interactive Geospatial Navigation** | Dynamic campus map with custom geo-coordinates, wheelchair pathfinding, and multi-layer accessibility filters. | Instant Dijkstra-style shortest barrier-free path computation avoiding all steps and obstacles. |
| **O4: Automated 42-Parameter Audit Conductor** | Standardized digital checklist assessing Entrances, Corridors, Stairs, Elevators, Restrooms, Parking, Signage, and Emergency Egress against RPWD standards. | Dynamic automatic percentage scoring with instant defect ticket generation upon failed checks. |
| **O5: 5-Stage Remediative Workflow** | Institutional Kanban lifecycle tracking barrier tickets from *Reported* → *Assigned* → *Work in Progress* → *Fixed* → *Verified*. | Transparent remediation tracking with estimated cost metrics and audit sign-off. |
| **O6: Assistive Inclusivity Suite** | Client-side accessibility controls including high-contrast modes, Atkinson Hyperlegible dyslexia font, color-blind presets, text-to-speech, and verbal maps. | 100% WCAG 2.1 AA digital compliance conformance. |

---

## 3. Scope of Work

### 3.1 In-Scope Capabilities
- **29 Chandigarh University Academic & Administrative Facilities:** Audited across Academic Blocks (A1 to A7), Engineering Complex (B1 to B4), Science Blocks (C1 to C3), Central Library, Student Center, Sports Arena, Central Auditorium, and Administrative Gateways.
- **Role-Based Access Control (RBAC):** Distinct workflows and dashboards for `ADMIN`, `AUDITOR`, `STUDENT`, and `MAINTENANCE` personas.
- **Physical Defect Logging & Upvoting:** Community portal allowing students and faculty to submit geotagged barrier photos, upvote urgent repairs, and monitor live maintenance status.
- **Executive Analytics & Reporting:** Automated generation of departmental compliance rankings, VPAT documentation, and exportable remediation roadmaps.

### 3.2 Out-of-Scope Capabilities
- Physical construction or structural renovation works (the software produces engineering estimates and blueprints for university estate management).
- Off-campus residential facilities or external municipal access roads.

---

## 4. Technical Architecture & Technology Stack

```
+-----------------------------------------------------------------------------------+
|                              CLIENT / PRESENTATION LAYER                          |
|  - React 18 SPA (Vite 8.1.4, Tailwind CSS, Lucide Icons, Framer Motion)           |
|  - Leaflet GIS Geospatial Engine + Custom Chandigarh University SVG / Tile Layers  |
|  - Assistive Toolkit: High-Contrast, Color-Blind Matrices, Web Speech TTS, Dyslexia|
+-----------------------------------------------------------------------------------+
                                         |  HTTPS / REST / JSON
                                         v
+-----------------------------------------------------------------------------------+
|                              API & APPLICATION LAYER                              |
|  - Spring Boot 3.4.1 (Java 21 LTS) Enterprise Architecture                         |
|  - Spring Security 6 + Stateless JWT Authentication & Role-Based Guarding         |
|  - Custom Security Filters: Rate Limiting, XSS Sanitization, CORS Policies       |
|  - Hibernate ORM / JPA with Domain Validation (Bean Validation JSR 380)           |
+-----------------------------------------------------------------------------------+
                                         |  Connection Pooling (HikariCP)
                                         v
+-----------------------------------------------------------------------------------+
|                                 PERSISTENCE LAYER                                 |
|  - PostgreSQL 16 (Hosted on Neon Serverless Cloud, AWS ap-southeast-1)            |
|  - Relational Schema: 8 Core Entities (Users, Buildings, Audits, Checkpoints,     |
|    Issues, Maintenance Tasks, Comments, Audit Logs)                              |
+-----------------------------------------------------------------------------------+
```

---

## 5. Work Breakdown Structure (WBS) & Timeline

```
AccessAudit Project Timeline (12-Week Execution Plan)
===================================================================================
Weeks 1 - 3: Foundation & Fieldwork
  * Literature review of RPWD Act 2016 and MoHUA Harmonised Guidelines 2021.
  * Solo physical audit drive across 29 Chandigarh University campus buildings.
  * In-situ measurement collection: steel tape door widths, ramp slopes, stair nosings.
  * Photo evidence archiving and baseline spreadsheet digitization.

Weeks 4 - 6: Backend Engine & Architecture
  * Domain modeling in PostgreSQL (Buildings, Audits, Checkpoints, Issues, Tasks).
  * Implementation of Spring Boot 3.4.1 REST API with Java 21 LTS.
  * Stateless JWT authentication engine with RBAC security filters.
  * Unit and integration testing with JUnit 5 and Mockito (95%+ target coverage).

Weeks 7 - 9: Frontend Development & Geospatial Mapping
  * React 18 single-page application setup with Vite and Tailwind CSS.
  * Interactive Leaflet geospatial map integration with campus geo-coordinates.
  * Dynamic 42-parameter audit checklist conductor with automated scoring algorithms.
  * 5-Stage remediation Kanban board implementation with optimistic UI updates.
  * Client-side accessibility engine (TTS, Dyslexia Font, Contrast, Color-Blindness).

Weeks 10 - 12: Hardening, Multi-Cloud Deployment & Final Evaluation
  * Multi-cloud production deployment (Frontend on Vercel CDN, Backend on Render).
  * PostgreSQL cloud provisioning on Neon Serverless (AWS Asia-Pacific).
  * Performance profiling, bundle tree-shaking, and gzip compression.
  * Comprehensive CUSoC documentation package and Viva Voce defense preparation.
```

---

## 6. Risk Assessment & Mitigation Matrix

| Risk Event | Severity | Likelihood | Mitigation Strategy Implemented |
|:---|:---:|:---:|:---|
| **Free-tier cloud cold starts on Render API** | Medium | High | Implemented background keep-alive heartbeat triggers and optimistic client-side fallback caching (`DEFAULT_ROADMAP_TASKS`). |
| **Inaccurate GPS reception near tall buildings** | High | Medium | Employed dual-reference building landmarks and manual pin drop calibration on interactive Leaflet maps. |
| **Cross-browser CSS contrast clipping in dark mode** | Medium | Medium | Implemented explicit inline hex fallbacks (`#fb7185`) and semantic theme tokens to ensure 100% WCAG 2.1 AA legibility. |
| **Unauthorized manual URL route tampering** | High | Low | Enforced cryptographic JWT payload expiration verification in `ProtectedRoute.jsx` and `AuthContext.jsx`. |

---

## 7. Declaration of Solo Authorship

I hereby declare that this project proposal, its associated research methodology, empirical physical audits, software design, and engineering execution represent **100% individual work conducted by Vaibhav Tiwari** for CUSoC 2026 under Track S-06.

**Author:** Vaibhav Tiwari  
**Role:** Sole Contributor & Researcher  
**Institution:** Chandigarh University, Punjab, India  
**Date of Submission:** October 2026  
