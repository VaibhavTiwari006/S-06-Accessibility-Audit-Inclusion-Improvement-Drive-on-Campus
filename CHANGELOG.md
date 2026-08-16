# Changelog

All notable changes to the S-06: Accessibility Audit & Inclusion Improvement Drive project are documented in this file.

## August 17, 2026

- **12:07 AM** - Create Final Technical Report document (`docs/TECHNICAL_REPORT.md`)
- **12:06 AM** - Create Security Policy (`SECURITY.md`) with vulnerability disclosure guidelines
- **12:06 AM** - Create User Stories specification (`docs/requirements/user-stories.md`) — 21 stories across 5 roles
- **12:06 AM** - Create Production Deployment Guide (`docs/DEPLOYMENT.md`) with Docker, Nginx, SSL, and backup instructions
- **12:05 AM** - Fix CI pipeline: use system Maven instead of wrapper to eliminate CRLF issues
- **12:04 AM** - Fix CI pipeline: add `cache-dependency-path` for Maven cache resolution
- **12:03 AM** - Fix CI pipeline: configure `working-directory: backend` for Maven steps
- **12:02 AM** - Fix compilation error: declare `altRow` variable in `ReportServiceImpl.java`
- **12:01 AM** - Configure `.gitattributes` for LF line endings on shell scripts

## August 16, 2026

- Configure comprehensive `.gitignore` for Maven, Node, IDEs, and Docker assets
- Document screen-reader Verbal Map design (`docs/features/VERBAL_MAP.md`)
- Document profanity filter moderation logic (`docs/features/PROFANITY_FILTER.md`)
- Integrate contributing, code of conduct, and CI/CD sections in `README.md`
- Create `run_dev.ps1` PowerShell launcher script for development environment
- Create `PULL_REQUEST_TEMPLATE.md` for standardized PR review
- Create `bug_report.md` issue template for structured bug reporting
- Create `CODE_OF_CONDUCT.md` with Contributor Covenant guidelines
- Create `CONTRIBUTING.md` with project setup and branching conventions
- Configure GitHub Actions CI workflow for backend tests and frontend builds
- Remove hardcoded impact metric targets from README, SRS, and PDF generator
- Remove target metrics card from Reports page; adjust layout

## August 7–15, 2026

- Add JavaDoc comments to 10 backend service interfaces
- Add JavaDoc comments to 12 backend REST controllers
- Add JSDoc comments to 10 frontend page components
- Add JSDoc comments to feature documentation in components
- Expand `API_DOCUMENTATION.md` with complete REST endpoint schemas
- Update `TESTING_REPORT.md` with Leaflet map and JUnit test results
- Expand `ARCHITECTURE_DIAGRAM.md` with proxy and security configurations
- Expand `DATABASE_SCHEMA.md` with column data-types and foreign keys
- Create Verbal Map page with screen-reader speech-guided navigation
- Create Audit Scheduler Modal for recurring audit configurations
- Build Disability Ally Network join registration and directory
- Strengthen profanity filter for spacing, punctuation, and character replacement bypasses
- Block duplicate barrier report submissions with uniqueness confirmation
- Support keyword-guessing fallback for duplicate checking of pre-seeded issues
- Replace static tactile-map download with interactive map link
- Restrict Quiz Challenge access to STUDENT role only
- Remove estimated cost calculations from pilot proposals
- Remove QR Code manager, scanner, and poster generator features
- Remove Interactive English-to-Braille Translator from Community page
- Relocate Braille Translator to Accessibility Preferences page
- Remove Low-Cost Improvement Calculator feature
- Remove all estimated cost calculations and displays

## July 25 – August 6, 2026

- Add staggered spring entry animations to Login role selection cards
- Add hero-gradient-text dark mode layout and color rules
- Fix dark mode styles for scrollbars, filter pills, tables, and gradients
- Stabilize header layout and unify pills styling for Trends Chart
- Hide default scrollbars in Sidebar navigation menu
- Redesign Evidence Gallery with advanced filtering and lightbox viewer
- Rebuild issue reporting with floor/category selectors and upvoting
- Improve dark mode support across all components


## July 18, 2026

- **10:29 AM** - Add skip to navigation link for screen readers

## July 17, 2026

- **05:32 PM** - Add universal Quick Report FAB for immediate barrier reporting
- **05:30 PM** - Integrate interactive charts for compliance trends
- **05:28 PM** - Add inclusion leaderboard showing top accessible buildings
- **05:25 PM** - Add visual screen alerts for hearing impaired
- **05:24 PM** - Add visual impairment magnification tool
- **05:22 PM** - Add cognitive accessibility distraction-free mode
- **05:21 PM** - Add ADA ramp calculator for auditors
- **05:20 PM** - Improve accessible form validation
- **05:19 PM** - Add color blind friendly theme
- **05:18 PM** - Improve screen reader compatibility
- **05:18 PM** - Add text to speech support
- **05:16 PM** - Support reduced motion preference
- **05:15 PM** - Improve keyboard navigation
- **05:15 PM** - Add dyslexia friendly font option
- **05:14 PM** - Add dynamic font scaling
- **05:13 PM** - Add high contrast accessibility mode
- **05:01 PM** - Add DatabaseSeeder to initialize default users and buildings (Quarter II - Feature completion/scalability)
- **11:57 AM** - Add Tactile Campus Map and WCAG Checklist resources for download
- **11:54 AM** - Implement interactive Campus Map using Leaflet
- **11:51 AM** - Add comprehensive documentation to meet competition standards (README, Installation, User Guide, API, Architecture, DB, Testing, Changelog)
- **12:02 AM** - Completely redesign Login and Dashboard with premium UI and animations

## July 16, 2026

- **11:59 PM** - Completely redesign Navbar (dropdown, logo, role badge) and Sidebar (chevron active, grouped nav, user strip)
- **11:58 PM** - Revamp global design system with richer tokens, animations and utility classes
- **11:54 PM** - Implement Settings page for ADMIN users
- **11:43 PM** - Implement interactive Prioritized Remediation Roadmap with 50 tasks for S-06
- **11:23 PM** - Add interactive upvoting icons to pilot cards in Community page
- **11:22 PM** - Implement upvote logic for PilotImprovements
- **11:21 PM** - Add PilotUpvote entity and repository for community engagement
- **10:54 PM** - Add Final Project Report PDF with pilot data, standards compliance table, and WCAG/RPWD benchmarks
- **10:51 PM** - Overhaul Community page with Pilot Improvements section, admin approve/reject controls, and impact stats sidebar
- **10:49 PM** - Add pilotService and ProposePilotModal component
- **10:49 PM** - Add PilotImprovement entity, repository, DTOs, mapper, service, controller and seed data
- **11:10 AM** - Frontend dashboard metrics, reports advocacy download, and new community page
- **11:06 AM** - Implement advocacy letter generation and dashboard stats updates
- **11:04 AM** - Expand seed data with feedback sessions, campaigns, and standard references
- **11:03 AM** - Add FeedbackSession and AwarenessCampaign entities
- **11:02 AM** - Add standardReference to AuditChecklist for RPWD/WCAG mapping
- **10:59 AM** - Add estimatedCost to MaintenanceTask for roadmap generation
- **10:03 AM** - Backend: massively expand seed data â€” 12 users, 12 buildings, 5 categories, 18 checklist items, 8 audits, 12 student reports, 10 maintenance tasks

## July 15, 2026

- **11:51 PM** - Implement Chandigarh University branding and UI/UX personalization
- **08:20 PM** - Add modal forms and wire to lists, create maintenance service
- **07:38 PM** - Add recharts dashboard and openpdf integration
- **07:35 PM** - Complete Phase 3 end-to-end integration and postgres setup
- **04:00 PM** - Add reports and analytics dashboard
- **03:59 PM** - Implement issue reporting module
- **03:59 PM** - Create audit checklist interface
- **03:58 PM** - Implement building management UI
- **03:58 PM** - Build role-based dashboards with scorecards
- **03:57 PM** - Implement login page UI and integrate JWT auth
- **03:57 PM** - Create reusable layout components
- **03:56 PM** - Implement authentication context
- **03:55 PM** - Add application routing
- **03:28 PM** - Implement PDF export module, database seed initializer, and add comprehensive integration tests
- **03:20 PM** - Setup maven wrapper and implement global exception handler, CORS, openapi configurations, and update lifecycle callbacks
- **10:31 AM** - Add dashboard stats API
- **10:28 AM** - Add audit evidence upload API
- **10:24 AM** - Add maintenance task API
- **10:22 AM** - Add student report API
- **10:18 AM** - Add audit workflow API

## July 10, 2026

- **06:23 PM** - Add audit category and checklist CRUD APIs with service, repository, mapper, and DTO layers
- **06:20 PM** - Add repository, DTOs, mapper, service, and controller for AuditChecklist
- **06:18 PM** - Add repository, DTOs, mapper, service, and controller for AuditCategory
- **06:13 PM** - Implement authentication, user management, and building management modules

## July 09, 2026

- **10:45 PM** - Add database design and API design documentation
- **06:04 PM** - Add system architecture documentation and diagram
- **08:38 AM** - Add non-functional requirements

## July 08, 2026

- **07:31 PM** - Add functional requirements
- **07:11 PM** - Add software requirement specification

## July 07, 2026

- **10:58 PM** - Add MIT license

## June 26, 2026

- **12:08 AM** - Initial commit: add CUSOC project details and guidelines

