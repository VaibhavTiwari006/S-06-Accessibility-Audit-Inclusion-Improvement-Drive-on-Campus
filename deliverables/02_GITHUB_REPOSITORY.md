# Project Deliverable 2: GitHub Repository Documentation

## CUSoC 2026: Chandigarh University Summer / Semester of Code
### Track S-06: Accessibility Audit & Inclusion Improvement Drive on Campus

---

| Metadata Field | Project Specification |
|:---|:---|
| **Repository Name** | `S-06-Accessibility-Audit-Inclusion-Improvement-Drive-on-Campus` |
| **Repository Owner** | `VaibhavTiwari006` (Vaibhav Tiwari) |
| **Repository URL** | [https://github.com/VaibhavTiwari006/S-06-Accessibility-Audit-Inclusion-Improvement-Drive-on-Campus](https://github.com/VaibhavTiwari006/S-06-Accessibility-Audit-Inclusion-Improvement-Drive-on-Campus) |
| **Default Branch** | `main` (Protected, Production-Ready) |
| **Total Git Commits** | 680+ Atomic Commits |
| **License** | MIT License |
| **Primary Languages** | Java 21 (Backend), JavaScript / JSX (Frontend), SQL, CSS3, Markdown |

---

## 1. Repository Structure & Monorepo Organization

The project is organized as a clean, modular full-stack monorepo separating presentation logic, enterprise business services, database migration scripts, and exhaustive documentation.

```
AccessAudit Monorepo Root
├── .github/
│   ├── ISSUE_TEMPLATE/           # Standardized GitHub issue reporting templates
│   └── workflows/                # GitHub Actions automated build & test CI pipelines
├── backend/                      # Spring Boot 3.4.1 (Java 21 LTS) Application
│   ├── src/
│   │   ├── main/java/com/cusoc/accessaudit/
│   │   │   ├── config/           # SecurityConfig, CorsConfig, SwaggerConfig, Auditing
│   │   │   ├── controller/       # REST Controllers (Auth, Audit, Building, Issue, etc.)
│   │   │   ├── dto/              # Request / Response Transfer Objects with Validation
│   │   │   ├── entity/           # JPA Entities (User, Building, Audit, Task, etc.)
│   │   │   ├── exception/        # GlobalExceptionHandler & Custom Error Responses
│   │   │   ├── mapper/           # Entity <-> DTO Mapping Layer
│   │   │   ├── repository/       # Spring Data JPA Data Access Layer
│   │   │   ├── security/         # JWT Provider, Auth Filters, XSS & Rate Limiting
│   │   │   └── service/          # Business Logic & Service Interfaces / Implementations
│   │   └── main/resources/
│   │       ├── application.properties    # Base Spring Configuration
│   │       ├── application-prod.properties # Cloud Production Configuration (Neon DB)
│   │       └── data.sql                  # Seed data for campus buildings and checkpoints
│   ├── Dockerfile                # Multi-stage production container build (Temurin 21)
│   └── pom.xml                   # Maven dependencies and build plugins
├── frontend/                     # React 18 Single-Page Application (Vite 8.1.4)
│   ├── src/
│   │   ├── assets/               # Branding graphics, icons, and SVG illustrations
│   │   ├── components/           # Reusable UI library (Button, Card, Input, Modal, etc.)
│   │   ├── context/              # Global React Contexts (AuthContext, AccessibilityContext)
│   │   ├── hooks/                # Custom React Hooks (usePageTitle, useDebounce, etc.)
│   │   ├── layout/               # MainLayout, Sidebar, Navbar, Breadcrumbs
│   │   ├── pages/                # Screen Views (Landing, Dashboard, CampusMap, Roadmap, etc.)
│   │   ├── routes/               # AppRoutes.jsx, ProtectedRoute.jsx
│   │   ├── services/             # Axios API client services (api.js, authService.js, etc.)
│   │   └── utils/                # Toast notifications, profanity filter, formatting
│   ├── package.json              # NPM dependencies and build scripts
│   ├── vite.config.js            # Vite build configuration with proxy rules
│   └── Dockerfile                # Production NGINX web server container
├── docs/                         # Institutional Architecture & Research Dossiers
│   ├── architecture/             # System Architecture, Database Schema, API Design Diagrams
│   ├── requirements/             # SRS, User Stories, Functional & Non-Functional Specs
│   ├── AccessAudit_Postman_Collection.json # Ready-to-import Postman API test suite
│   ├── Campus_Accessibility_Audit_Survey.xlsx # In-situ survey raw field data
│   ├── CUSOC_FINAL_EVALUATION.md # Comprehensive final assessment dossier
│   ├── DEPLOYMENT.md             # Multi-cloud deployment handbook
│   ├── TECHNICAL_REPORT.md       # Full engineering technical report
│   └── VIVA_VOCE_DEFENSE.md      # Comprehensive Viva defense Q&A preparation
├── deliverables/                 # CUSoC Section 6 Master Deliverables Suite
│   ├── 01_PROJECT_PROPOSAL.md    # Approved Problem Statement & WBS
│   ├── 02_GITHUB_REPOSITORY.md   # Repository Guide & Version History
│   ├── 03_DOCUMENTATION.md       # Technical Specs & Architecture Manual
│   ├── 04_PROGRESS_REPORTS.md    # Review Cycles & Milestone Reports
│   ├── 05_TESTING_REPORT.md      # Test Cases, Results & Defect Resolution
│   ├── 06_PRESENTATION.md        # Mid-Term & Final Presentation Deck
│   ├── 07_FINAL_REPORT.md        # Publication-Grade Final Technical Report
│   └── 08_DEPLOYMENT_LINK.md     # Production Cloud Deployment Inventory
├── scripts/                      # Deployment verification & test automation utilities
├── docker-compose.yml            # Local multi-container development environment
└── README.md                     # Comprehensive project readme with badges & guides
```

---

## 2. Version Control Strategy & Commit History

### 2.1 Git Workflow & Branch Model
The repository adheres to a strict **Trunk-Based / Linear Feature Branch** model:
- `main`: Always production-ready, verified against automated tests, directly mirrored to Vercel and Render deployments.
- Commit messages follow the **Conventional Commits 1.0.0** specification:
  - `feat(<scope>):` New user-facing feature or API capability.
  - `fix(<scope>):` Bug resolution, security hardening, or accessibility fix.
  - `docs(<scope>):` Documentation updates, deliverables, architectural diagrams.
  - `test(<scope>):` Unit, integration, or end-to-end test suites.
  - `refactor(<scope>):` Code cleanup without behavioral changes.

### 2.2 Commit History Evidence
The repository contains **over 680 commits** authored 100% by **Vaibhav Tiwari**, chronicling every phase of the project:
1. Initial repository scaffolding, Docker definitions, and base configuration.
2. In-situ audit survey digitization (29 buildings, 1,102 checkpoints).
3. Backend domain entities, repositories, and Liquibase/Hibernate ORM mappings.
4. Spring Security 6 authentication engine with JWT, XSS filters, and rate limiters.
5. React 18 UI components, theme engine, and accessibility controls.
6. Leaflet geospatial campus mapping and Dijkstra wheelchair pathfinding.
7. 5-Stage remediation Kanban board and automated scoring algorithms.
8. Multi-cloud deployment automation on Vercel, Render, and Neon.

---

## 3. Local Installation & Quick Start

### 3.1 Prerequisites
- **Java Development Kit (JDK):** Version 21 LTS (e.g., Eclipse Temurin 21)
- **Node.js:** Version 18.x or 20.x LTS + NPM 9+
- **PostgreSQL Database:** Version 15+ (or use Docker Compose)
- **Git:** Version 2.30+

### 3.2 Running Backend Locally
```bash
# Clone the repository
git clone https://github.com/VaibhavTiwari006/S-06-Accessibility-Audit-Inclusion-Improvement-Drive-on-Campus.git
cd S-06-Accessibility-Audit-Inclusion-Improvement-Drive-on-Campus/backend

# Run with Maven wrapper (configured for H2 or local PostgreSQL)
./mvnw spring-boot:run
```
The backend server initializes on `http://localhost:8080`. Interactive Swagger UI documentation is available at `http://localhost:8080/swagger-ui.html`.

### 3.3 Running Frontend Locally
```bash
# Navigate to frontend directory
cd ../frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
The web client starts at `http://localhost:3000` or `http://localhost:5173` with instant Vite Hot Module Replacement (HMR).

### 3.4 One-Command Docker Compose Launch
```bash
# From the repository root
docker-compose up --build
```
This spins up:
1. `accessaudit-db`: PostgreSQL 16 on port `5432` with pre-configured schemas.
2. `accessaudit-backend`: Spring Boot 3.4.1 container on port `8080`.
3. `accessaudit-frontend`: React 18 production NGINX container on port `3000`.

---

## 4. Continuous Integration & Code Quality

The GitHub repository incorporates automated continuous integration pipelines via GitHub Actions:
- **Build Verification:** Executes on every push and pull request to verify Java 21 compilation and Maven package building.
- **Automated Test Suite:** Runs JUnit 5 test cases and MockMvc integration validations.
- **Frontend Build & Lint:** Validates Vite production bundling (`npm run build`) and detects syntax regressions.

---

## 5. Security & Vulnerability Reporting
A dedicated `SECURITY.md` policy is maintained in the repository root detailing:
- Supported versions and security patch lifecycles.
- Responsible disclosure protocol for vulnerabilities.
- Cryptographic hashing specifications (BCrypt 12 rounds for passwords, HMAC-SHA256 for JWT tokens).
- Content Security Policy (CSP), HTTP Strict Transport Security (HSTS), and XSS prevention headers.
