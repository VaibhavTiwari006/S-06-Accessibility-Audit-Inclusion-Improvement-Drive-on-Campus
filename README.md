# CU Access Audit

[![CI Build and Verification](https://github.com/VaibhavTiwari006/S-06-Accessibility-Audit-Inclusion-Improvement-Drive-on-Campus/actions/workflows/ci.yml/badge.svg)](https://github.com/VaibhavTiwari006/S-06-Accessibility-Audit-Inclusion-Improvement-Drive-on-Campus/actions/workflows/ci.yml)
![Java](https://img.shields.io/badge/Java-21-orange)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.1-brightgreen)
![React](https://img.shields.io/badge/React-19-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue)
![License](https://img.shields.io/badge/License-MIT-blue)

A full-stack platform for conducting campus accessibility audits, documenting physical and digital barriers, collecting evidence, and tracking remediation work.

![CU Access Audit interface](frontend/src/assets/hero.png)

## Project Status

**Status:** Functional development build  
**Production demo:** Not currently deployed  
**Implemented:** Authentication, role-based workflows, building and audit management, evidence handling, student reports, maintenance tasks, dashboards, PDF reports, and API documentation  
**Planned:** Production deployment, automated frontend component tests, expanded backend test coverage, and a verified role-based screenshot gallery

## Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React 19, Vite, Tailwind CSS, Axios, React Router |
| Backend | Java 21, Spring Boot 3.4.1, Spring Security, Spring Data JPA |
| Database | PostgreSQL 15; H2 for automated tests |
| Security | JWT authentication, BCrypt password hashing, role-based authorization |
| Tooling | Docker Compose, Maven, OpenAPI/Swagger, GitHub Actions |

## Key Engineering Features

- Four application roles: Administrator, Auditor, Student, and Maintenance
- Stateless JWT authentication and protected REST endpoints
- Physical and digital audit workflows with evidence records
- Student barrier reporting and maintenance-task tracking
- Dashboard metrics and PDF report generation
- Interactive campus map and accessibility-related views
- Automated backend tests and frontend build/lint checks in CI
- Docker Compose setup for frontend, backend, and PostgreSQL

## My Contributions

My work in this repository includes:

- Designing and implementing the React and Spring Boot application structure
- Building role-based screens and API integrations
- Implementing JWT authentication and authorization
- Modelling PostgreSQL entities and Spring Data repositories
- Creating automated backend tests and GitHub Actions workflows
- Producing the SRS, architecture, API, testing, deployment, and user documentation
- Applying IBM Enterprise Design Thinking artifacts to requirements and feature prioritization

## Quick Start

### Requirements

- Docker Desktop with Docker Compose

### Run the complete application

```bash
git clone https://github.com/VaibhavTiwari006/S-06-Accessibility-Audit-Inclusion-Improvement-Drive-on-Campus.git
cd S-06-Accessibility-Audit-Inclusion-Improvement-Drive-on-Campus
docker compose up -d --build
```

| Service | Local URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8080/api |
| Swagger UI | http://localhost:8080/swagger-ui.html |

<details>
<summary>Development-only sample accounts</summary>

> **Security notice:** These credentials are seeded exclusively for local development and demonstration. Never reuse them in a public or production deployment.

| Role | Email | Password |
|---|---|---|
| Administrator | admin@campus.edu | password |
| Auditor | auditor@campus.edu | password |
| Student | student@campus.edu | password |
| Maintenance | maintenance@campus.edu | password |

</details>

## Testing and Quality

### Backend

```bash
cd backend
./mvnw clean verify
```

The backend test suite uses JUnit 5, Mockito, Spring Boot Test, Spring Security Test, and H2. JaCoCo generates the coverage report during `verify`.

### Frontend

```bash
cd frontend
npm ci
npm run lint
npm run build
```

Lint errors fail CI. Automated React component testing remains planned and is tracked as an explicit project-status item.

## Requirements Summary

- 19 functional requirements
- 8 non-functional requirements
- 21 user stories
- Requirements informed by the Rights of Persons with Disabilities Act, 2016 and WCAG 2.1 AA

## Documentation

| Document | Purpose |
|---|---|
| [Installation Guide](docs/INSTALLATION.md) | Local setup |
| [User Guide](docs/USER_GUIDE.md) | Role-based workflows |
| [API Documentation](docs/API_DOCUMENTATION.md) | REST endpoints |
| [System Architecture](docs/architecture/system-architecture.md) | Application architecture |
| [Database Schema](docs/architecture/DATABASE_SCHEMA.md) | Entities and relationships |
| [Testing Report](docs/TESTING_REPORT.md) | Test scope and results |
| [Technical Report](docs/TECHNICAL_REPORT.md) | Complete project report |
| [Deployment Guide](docs/DEPLOYMENT.md) | Docker and Nginx deployment |
| [Software Requirements Specification](docs/requirements/software-requirement-specification.md) | Formal requirements |

Design-thinking canvases and extended project analysis remain available under [docs](docs/).

## Contributing and Security

- [Contributing Guidelines](CONTRIBUTING.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Security Policy](SECURITY.md)

## License

Licensed under the [MIT License](LICENSE).
