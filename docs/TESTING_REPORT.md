# Testing Report

## Overview
This document summarizes the testing methodologies and results for the CU Access Audit project.

## 1. Unit Testing
### Backend
- **Frameworks**: JUnit 5, Mockito
- **Scope**: Services, Controllers, and Repositories.
- **Coverage Target**: 80%
- **Status**: Backend APIs for Authentication, Buildings, and Audits are passing unit tests for basic CRUD operations and constraint validations (e.g., `@NotNull` checking).

## 2. Integration Testing
### Backend + Database
- **Frameworks**: Spring Boot Test, Testcontainers (PostgreSQL)
- **Status**: JPA mappings and referential integrities successfully tested. No dangling foreign keys observed during stress testing.

## 3. Manual UI/UX Testing
- **Cross-browser Compatibility**: Tested on Chrome 114+, Firefox 113+, and Safari 16+.
- **Responsiveness**: The React application has been tested on mobile viewports (320px) to desktop viewports (1920px). Navigation correctly collapses into a hamburger menu on small devices.
- **Role-based Rendering**: Verified that Admin, Auditor, Maintenance, and Student roles properly receive different Dashboard views and sidebar links. Unauthorized access to protected routes (`/settings`, `/reports`) correctly redirects.

## 4. Known Issues
- Currently, image uploads for student reports are mocked and stored in frontend `public` instead of a dedicated object storage (e.g., AWS S3).
- The map view relies on a static SVG/JPG. Interactive leaflet maps are slated for Quarter 2.

## 5. Security Testing
- JWT token expiration verified.
- Passwords verified to be securely hashed via BCrypt before saving to PostgreSQL.
- SQL injection vulnerabilities mitigated by using Spring Data JPA Prepared Statements.
