# Functional Requirements

The following functional requirements define the core capabilities of **AccessAudit**. Each requirement specifies the functionality the system must provide and identifies the primary user(s) involved.

| ID        | Functional Requirement                                                                                  | Primary User(s)                                   |
| --------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| **FR-01** | The system shall support secure user registration and login with role-based access control.             | Administrator, Auditor, Student, Maintenance Team |
| **FR-02** | The system shall authenticate users using JWT and restrict access to protected resources.               | All Authenticated Users                           |
| **FR-03** | The administrator shall create, update, activate, or deactivate user accounts.                          | Administrator                                     |
| **FR-04** | The administrator shall create, update, view, and archive building and location records.                | Administrator                                     |
| **FR-05** | The system shall maintain building metadata, including name, location, type, and floor count.           | Administrator                                     |
| **FR-06** | The administrator shall assign accessibility audits to auditors with a target building and due date.    | Administrator                                     |
| **FR-07** | Auditors shall complete standardized physical and digital accessibility checklists.                     | Auditor                                           |
| **FR-08** | Auditors shall upload photographic evidence to support audit findings.                                  | Auditor                                           |
| **FR-09** | The system shall automatically calculate accessibility compliance scores based on completed checklists. | System                                            |
| **FR-10** | Auditors shall save partially completed audits as drafts before final submission.                       | Auditor                                           |
| **FR-11** | The administrator shall review, approve, or reject submitted audits.                                    | Administrator                                     |
| **FR-12** | Students shall view accessibility information and audit summaries for campus buildings.                 | Student                                           |
| **FR-13** | Students shall report accessibility barriers with descriptions, photographs, and location details.      | Student                                           |
| **FR-14** | Students shall track the status of their submitted accessibility reports.                               | Student                                           |
| **FR-15** | The system shall generate maintenance tasks from approved audit findings or verified student reports.   | System                                            |
| **FR-16** | Maintenance personnel shall update task status, completion notes, and supporting photographs.           | Maintenance Team                                  |
| **FR-17** | The administrator shall assign severity and priority levels to maintenance tasks.                       | Administrator                                     |
| **FR-18** | The system shall display dashboards showing accessibility scores, audit progress, and key statistics.   | Administrator                                     |
| **FR-19** | The administrator shall export accessibility compliance reports in PDF format.                          | Administrator                                     |
