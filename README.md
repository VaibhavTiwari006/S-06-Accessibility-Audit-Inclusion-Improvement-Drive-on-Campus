# ♿ S-06: Accessibility Audit & Inclusion Improvement Drive

[![CI Build and Verification](https://github.com/VaibhavTiwari006/S-06-Accessibility-Audit-Inclusion-Improvement-Drive-on-Campus/actions/workflows/ci.yml/badge.svg)](https://github.com/VaibhavTiwari006/S-06-Accessibility-Audit-Inclusion-Improvement-Drive-on-Campus/actions/workflows/ci.yml)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.1-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)

> A comprehensive campus accessibility assessment platform designed to identify, document, and improve physical and digital accessibility across university campuses in accordance with the **Rights of Persons with Disabilities (RPWD) Act, 2016** and **WCAG 2.1 AA** accessibility standards.

---

## ⚡ Quick Start

```bash
# Clone the repository
git clone https://github.com/VaibhavTiwari006/S-06-Accessibility-Audit-Inclusion-Improvement-Drive-on-Campus.git
cd S-06-Accessibility-Audit-Inclusion-Improvement-Drive-on-Campus

# Start all services (Frontend + Backend + Database)
docker-compose up -d --build
```

**Access the application:**
- 🌐 Frontend: http://localhost:3000
- 🔗 Backend API: http://localhost:8080/api
- 📖 API Docs: http://localhost:8080/swagger-ui.html

**Default Credentials:**
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@campus.edu | password |
| Auditor | auditor@campus.edu | password |
| Student | student@campus.edu | password |
| Maintenance | maintenance@campus.edu | password |

---

## 📌 Overview
Accessibility is a fundamental requirement for creating an inclusive educational environment. Many students and staff with disabilities continue to experience barriers while accessing classrooms, laboratories, libraries, administrative offices, campus facilities, and digital platforms.

This project provides a structured framework to evaluate campus accessibility, collect stakeholder feedback, generate actionable recommendations, and assist university administrators in planning accessibility improvements.

The project combines **field audits**, **digital accessibility assessments**, **student participation**, and **data-driven reporting** into a single platform.

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

# 🏗️ Technology Stack

### Frontend

- React.js
- Vite
- HTML5
- CSS3
- JavaScript (ES6)

### Backend

- Spring Boot
- Spring Security
- JWT Authentication
- Spring Data JPA
- REST APIs

### Database

- PostgreSQL

### Documentation

- OpenAPI / Swagger
- Markdown
- Architecture Diagrams

---

# 📂 Project Structure

```
S-06-Accessibility-Audit/
│
├── frontend/
├── backend/
├── database/
├── docs/
│   ├── architecture/
│   ├── API_DOCUMENTATION.md
│   ├── INSTALLATION.md
│   ├── TESTING_REPORT.md
│   └── USER_GUIDE.md
│
├── CHANGELOG.md
├── README.md
└── LICENSE
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
| [📖 Installation Guide](docs/INSTALLATION.md) | Setup and deployment instructions |
| [👤 User Guide](docs/USER_GUIDE.md) | Role-based usage instructions |
| [📑 API Documentation](docs/API_DOCUMENTATION.md) | REST endpoint specifications |
| [🏗️ System Architecture](docs/architecture/system-architecture.md) | Three-tier architecture overview |
| [🗄️ Database Schema](docs/architecture/DATABASE_SCHEMA.md) | ER diagrams and table definitions |
| [🧪 Testing Report](docs/TESTING_REPORT.md) | Test strategy and results |
| [📋 Technical Report](docs/TECHNICAL_REPORT.md) | Comprehensive final project report |
| [🚀 Deployment Guide](docs/DEPLOYMENT.md) | Production deployment with Docker & Nginx |
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

---

# 🤝 Contributing & Community

We welcome community collaborations! Please review our:
*   [**Contributing Guidelines**](CONTRIBUTING.md)
*   [**Code of Conduct**](CODE_OF_CONDUCT.md)
*   [**Security Policy**](SECURITY.md)

---

# 📄 License

This project is developed as part of the **CUSOC Social Innovation Initiative** for educational and research purposes.
