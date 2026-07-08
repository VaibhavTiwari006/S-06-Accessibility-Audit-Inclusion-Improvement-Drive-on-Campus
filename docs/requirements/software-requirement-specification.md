# Software Requirement Specification (SRS)

> **Project:** AccessAudit — Open-Source Campus Accessibility Audit & Compliance Management System
> **Version:** 1.0
> **Status:** Draft
> **Repository:** CUSOC S-06 Accessibility Audit & Inclusion Improvement Drive on Campus

---

# 1. Purpose

This Software Requirement Specification (SRS) defines the functional scope, system objectives, stakeholder requirements, constraints, and quality expectations for **AccessAudit**.

The document serves as the primary reference for developers, contributors, auditors, project mentors, and university stakeholders throughout the software development lifecycle.

Detailed Functional Requirements (FR), Non-Functional Requirements (NFR), and User Stories are maintained in separate documents to improve maintainability and version control.

---

# 2. Problem Statement

People with disabilities—including those with mobility, visual, and hearing impairments—continue to encounter barriers within university campuses that limit equal participation in education and campus life.

Common accessibility challenges include:

* Inaccessible building entrances
* Improper ramp design
* Lack of tactile pathways
* Inaccessible washrooms
* Poor signage
* Digital platforms that do not comply with accessibility standards

Many institutions lack a structured, standards-based system for identifying these barriers, documenting evidence, prioritizing improvements, and monitoring remediation over time.

**AccessAudit** addresses this gap by providing a centralized platform for conducting structured accessibility audits, documenting findings, collecting evidence, generating compliance reports, and supporting institutional decision-making.

---

# 3. Project Scope

AccessAudit is an **open-source web-based accessibility audit and compliance management system** designed to support universities in conducting standardized accessibility assessments.

The platform supports the complete documentation lifecycle of an accessibility audit but does **not** replace the real-world activities performed by auditors and stakeholders.

## The system will:

* Provide standardized accessibility audit checklists.
* Record physical and digital accessibility observations.
* Store photographic evidence.
* Calculate accessibility compliance scores.
* Track accessibility issues.
* Generate remediation recommendations.
* Produce audit reports.
* Support participatory feedback from students and staff with disabilities.
* Assist university administration in planning accessibility improvements.

## The system will not:

* Automatically perform physical accessibility inspections.
* Replace human auditors or accessibility experts.
* Simulate stakeholder feedback.
* Replace university maintenance or facilities management systems.
* Perform construction planning or engineering calculations.

---

# 4. Product Perspective

AccessAudit is intended to serve as a digital companion for campus accessibility initiatives.

The system aligns with the objectives of the **CUSOC S-06 Accessibility Audit & Inclusion Improvement Drive on Campus** challenge by providing a structured platform for:

* Accessibility auditing
* Compliance assessment
* Evidence collection
* Reporting
* Advocacy support
* Progress tracking

The software complements field activities rather than replacing them.

---

# 5. Product Functions

The initial version of AccessAudit is expected to provide the following capabilities:

| ID    | Function                          |
| ----- | --------------------------------- |
| PF-01 | Building Management               |
| PF-02 | Accessibility Audit Management    |
| PF-03 | Physical Accessibility Checklist  |
| PF-04 | Digital Accessibility Checklist   |
| PF-05 | Accessibility Scoring             |
| PF-06 | Photo Evidence Management         |
| PF-07 | Accessibility Issue Tracking      |
| PF-08 | Report Generation                 |
| PF-09 | Participatory Feedback Collection |
| PF-10 | Remediation Roadmap Generation    |
| PF-11 | Dashboard & Analytics             |
| PF-12 | User & Role Management            |

---

# 6. Stakeholders

| Stakeholder                     | Responsibility                               |
| -------------------------------- | --------------------------------------------- |
| Students with Disabilities      | Primary beneficiaries and feedback providers |
| University Staff                | Accessibility feedback and reporting         |
| Accessibility Auditors          | Conduct campus audits                        |
| University Administration       | Review reports and approve remediation       |
| Facilities Management           | Execute accessibility improvements           |
| Disability Rights Organizations | Advisory and consultation                    |
| Project Contributors            | Develop and maintain the platform            |

> **Note:** This table expands on the stakeholder groups defined in the original CuSoC S-06 problem statement (Students/staff with disabilities; University facilities management; University administration; Disability rights NGOs; General student body) into more granular project roles.

---

# 7. User Roles

The system currently defines the following primary user roles:

| Role                      | Description                                                         |
| ------------------------- | --------------------------------------------------------------------- |
| Administrator             | Manages users, buildings, reports, and overall system configuration |
| Auditor                   | Performs accessibility audits and uploads findings                  |
| Student                   | Reports accessibility barriers and submits feedback                 |
| Maintenance Team          | Reviews assigned accessibility issues and remediation tasks         |
| University Administration | Reviews dashboards, reports, and remediation roadmaps               |

---

# 8. Operating Environment

The platform is intended to operate within the following environment:

* Modern web browsers
* Desktop and laptop computers
* Mobile devices
* Internet-connected environments
* Cloud-hosted backend infrastructure
* Responsive web interface

---

# 9. Standards and Compliance

AccessAudit is designed to support compliance with the following standards:

| Standard                      | Purpose                                                       |
| ------------------------------ | --------------------------------------------------------------- |
| RPWD Act 2016                 | Accessibility requirements for public infrastructure in India |
| WCAG 2.1 Level AA             | Web accessibility guidelines for digital resources            |
| CUSOC S-06 Project Guidelines | Competition objectives and expected deliverables              |

---

# 10. Project Objectives

The platform supports the following objectives:

* Conduct comprehensive accessibility audits.
* Benchmark infrastructure against recognized accessibility standards.
* Generate evidence-based remediation roadmaps.
* Facilitate participatory accessibility feedback.
* Improve accessibility awareness across campus.
* Support long-term accessibility planning.

---

# 11. Target Impact Metrics

The software is designed to support measurement and tracking of the following project targets:

| Metric                           | Target                                          |
| ---------------------------------- | -------------------------------------------------- |
| Buildings/hostels audited        | 15 (10 hostels + 5 academic buildings)          |
| Digital assets audited           | ≥ 5 (website, LMS, portals)                     |
| Accessibility issues identified  | ≥ 50 remediation items                          |
| Students & staff engaged         | ≥ 20                                            |
| Awareness campaign reach         | ≥ 300 students                                  |

These figures are sourced from the CuSoC S-06 problem statement, with location counts reflecting the confirmed audit plan for this project cycle. All figures represent real-world data collection targets that the platform's audit, reporting, and roadmap modules are built to capture and track — not simulated or placeholder values.

---

# 12. Assumptions

The system assumes that:

* Accessibility audits are conducted by trained auditors.
* Audit findings accurately represent field observations.
* University administration permits building access.
* Internet connectivity is available for data synchronization.
* Users provide authentic information.

---

# 13. Constraints

The project is developed under the following constraints:

* Compliance with RPWD Act 2016.
* Compliance with WCAG 2.1 Level AA.
* Open-source licensing.
* Availability of campus infrastructure for auditing.
* Resource and time limitations during project execution.

---

# 14. Requirements Reference

Detailed software requirements are maintained separately.

| Document                         | Description                                |
| ----------------------------------- | ---------------------------------------------- |
| `functional-requirements.md`     | Complete Functional Requirements (FR)      |
| `non-functional-requirements.md` | Complete Non-Functional Requirements (NFR) |
| `user-stories.md`                | User Stories and Acceptance Criteria       |

---

# 15. Alignment with Evaluation Criteria

| Evaluation Criterion (README)                    | Marks | Supported By                        |
| --------------------------------------------------- | ------- | -------------------------------------- |
| Audit Thoroughness & Standard Compliance         | 30    | PF-02, PF-03, PF-04, PF-05          |
| Participatory Approach Quality                   | 25    | PF-09                                |
| Remediation Roadmap Practicality                 | 20    | PF-07, PF-10                        |
| Advocacy Impact (admin engagement)                | 10    | PF-08                                |
| Documentation & Presentation                      | 15    | This SRS, `user-stories.md`, FR/NFR docs |

---

# 16. Future Scope

Future releases of AccessAudit may include:

* GIS-based campus accessibility mapping
* Mobile application support
* Offline audit synchronization
* AI-assisted accessibility analysis
* QR-code-based location audits
* Predictive accessibility analytics
* Integration with university facility management systems
* Multi-campus support
* Public accessibility dashboards

---

# Document Status

**Current Version:** Draft v1.0

This document will evolve throughout the development lifecycle as new requirements are identified, validated, and approved.