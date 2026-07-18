# Changelog

All notable changes to the **S-06: Accessibility Audit & Inclusion Improvement Drive** project are documented in this file.

## 📅 July 18, 2026

- **10:45 AM** 🐛 chore(ci): enforce LF line endings for mvnw script to fix GitHub Actions execution
- **10:42 AM** 🐛 fix(ci): disable database seeder in test profile to fix data integrity violations during testing
- **10:37 AM** 🐛 fix(ui): increase scrollbar thickness for better mouse accessibility
- **10:35 AM** 🐛 fix(layout): allow horizontal scrolling on data tables within glass panels
- **10:31 AM** ✨ fix(layout): add min-w-0 to fix flexbox bug hiding horizontal scrollbar
- **10:29 AM** ✨ feat(accessibility): add skip to navigation link for screen readers
- **10:29 AM** 🐛 fix(layout): enable horizontal scrollbar on main content area for large data tables

## 📅 July 17, 2026

- **05:39 PM** 🐛 fix(accessibility): ensure toggle switches remain visible in high contrast mode
- **05:37 PM** 🐛 fix(accessibility): force aggressive css overrides for high contrast mode
- **05:32 PM** ✨ feat(ui): add universal Quick Report FAB for immediate barrier reporting
- **05:31 PM** ✨ style(ui): add micro-animations and polish component hover states
- **05:30 PM** ✨ feat(dashboard): integrate interactive charts for compliance trends
- **05:28 PM** ✨ feat(dashboard): add inclusion leaderboard showing top accessible buildings
- **05:25 PM** ✨ feat(ui): add visual screen alerts for hearing impaired
- **05:24 PM** ✨ feat(ui): add visual impairment magnification tool
- **05:22 PM** ✨ feat(ui): add cognitive accessibility distraction-free mode
- **05:21 PM** ✨ feat(audit): add ADA ramp calculator for auditors
- **05:20 PM** ✨ feat(forms): improve accessible form validation
- **05:19 PM** ✨ feat(ui): add color blind friendly theme
- **05:18 PM** ✨ feat(accessibility): improve screen reader compatibility
- **05:18 PM** ✨ feat(accessibility): add text to speech support
- **05:16 PM** ✨ feat(ui): support reduced motion preference
- **05:15 PM** ✨ feat(accessibility): improve keyboard navigation
- **05:15 PM** ✨ feat(accessibility): add dyslexia friendly font option
- **05:14 PM** ✨ feat(accessibility): add dynamic font scaling
- **05:13 PM** ✨ feat(ui): add high contrast accessibility mode
- **05:01 PM** ✨ feat: add DatabaseSeeder to initialize default users and buildings (Quarter II - Feature completion/scalability)
- **12:14 PM** 🔧 perf: implement React.lazy route splitting for faster initial load (Quarter II/III)
- **12:13 PM** 🎨 chore: setup github actions CI and PR template to fulfill Quarter I workflow requirements
- **12:09 PM** 🔧 design: upgrade Propose Pilot Modal to premium aesthetic with glass effects and gradients
- **11:57 AM** ✨ feat: add Tactile Campus Map and WCAG Checklist resources for download
- **11:54 AM** ✨ feat: implement interactive Campus Map using Leaflet
- **11:51 AM** ✨ docs: add comprehensive documentation to meet competition standards (README, Installation, User Guide, API, Architecture, DB, Testing, Changelog)
- **12:02 AM** 🐛 fix: resolve postcss error with @apply glass-panel
- **12:02 AM** 🎨 design: completely redesign Login and Dashboard with premium UI and animations
- **12:00 AM** 🔧 design: redesign ScoreCard (top-aligned, arrow hover, trend) and Footer (dual col, status dot)

## 📅 July 16, 2026

- **11:59 PM** 🔧 design: completely redesign Navbar (dropdown, logo, role badge) and Sidebar (chevron active, grouped nav, user strip)
- **11:58 PM** 🔧 design: revamp global design system with richer tokens, animations and utility classes
- **11:54 PM** ✨ feat: implement Settings page for ADMIN users
- **11:49 PM** 🐛 fix: make WCAG 2.1 checklist download fully functional
- **11:47 PM** 🐛 fix: make Tactile Campus Map download fully functional
- **11:43 PM** ✨ feat: implement interactive Prioritized Remediation Roadmap with 50 tasks for S-06
- **11:37 PM** 🐛 fix: resolve logout refresh issue, enforce building selection, and make issue details interactive
- **11:23 PM** ✨ feat(frontend): add interactive upvoting icons to pilot cards in Community page
- **11:22 PM** ✨ feat(backend): implement upvote logic for PilotImprovements
- **11:21 PM** ✨ feat(backend): add PilotUpvote entity and repository for community engagement
- **11:05 PM** 🐛 fix(backend): use Lombok builder for ApiResponse in PilotImprovementController
- **11:04 PM** 🐛 fix(backend): restore missing entity and exception imports in ReportServiceImpl
- **10:54 PM** ✨ feat: add Final Project Report PDF with pilot data, standards compliance table, and WCAG/RPWD benchmarks
- **10:51 PM** ✨ feat(frontend): overhaul Community page with Pilot Improvements section, admin approve/reject controls, and impact stats sidebar
- **10:49 PM** ✨ feat(frontend): add pilotService and ProposePilotModal component
- **10:49 PM** ✨ feat(backend): add PilotImprovement entity, repository, DTOs, mapper, service, controller and seed data
- **07:39 PM** 🐛 Fix: correctly handle logout routing by subscribing ProtectedRoute to AuthContext
- **07:36 PM** 🐛 Fix: correct API endpoint for fetching student issues based on role
- **07:33 PM** 🐛 Fix: student report issue modal submission and file upload
- **07:24 PM** 🔧 Enhance: make dashboard scorecards interactive with navigation
- **11:10 AM** ✨ Feat: frontend dashboard metrics, reports advocacy download, and new community page
- **11:06 AM** ✨ Feat: implement advocacy letter generation and dashboard stats updates
- **11:04 AM** ✨ Feat: expand seed data with feedback sessions, campaigns, and standard references
- **11:03 AM** ✨ Feat: add FeedbackSession and AwarenessCampaign entities
- **11:02 AM** ✨ Feat: add standardReference to AuditChecklist for RPWD/WCAG mapping
- **10:59 AM** ✨ Feat: add estimatedCost to MaintenanceTask for roadmap generation
- **10:41 AM** 🐛 Fix: update frontend Dockerfile node version for Vite 6 compatibility
- **10:10 AM** 🐛 Fix: update backend Dockerfile to use Maven directly instead of mvnw wrapper
- **10:03 AM** 🎨 Backend: massively expand seed data â€” 12 users, 12 buildings, 5 categories, 18 checklist items, 8 audits, 12 student reports, 10 maintenance tasks
- **12:11 AM** 🐛 Fix: resolve tailwind v4 parse errors and duplicate return statement in modals

## 📅 July 15, 2026

- **11:58 PM** ✨ UI/UX: Add shimmer loading skeletons, glassmorphic modals, and custom toastify styling
- **11:52 PM** ✨ chore(docker): add frontend service to docker-compose
- **11:52 PM** ✨ docs(frontend): add .env.example for api url
- **11:52 PM** ✨ chore(docker): add Dockerfile for frontend
- **11:51 PM** ✨ chore(docker): add nginx configuration for frontend
- **11:51 PM** ✨ feat: implement Chandigarh University branding and UI/UX personalization
- **08:20 PM** ✨ feat(ui): add modal forms and wire to lists, create maintenance service
- **08:15 PM** 🐛 fix(cors): expose CorsConfigurationSource bean, wire into Spring Security, force Java 21 bytecode target
- **08:04 PM** 🐛 fix(auth): validate JWT on startup, auto-clear corrupt sessions, fix 401 propagation
- **08:00 PM** 🐛 fix(auth): clear all localStorage on 401 to force fresh login
- **07:53 PM** 🐛 fix(data): unwrap ApiResponse in all services, fix DTO field names, wire dashboard to live stats
- **07:42 PM** 🐛 fix(auth): unwrap ApiResponse to correctly read role from login response
- **07:38 PM** ✨ feat(analytics): add recharts dashboard and openpdf integration
- **07:35 PM** ✨ feat(integration): complete Phase 3 end-to-end integration and postgres setup
- **04:00 PM** 🎨 style: improve responsive layout and accessibility
- **04:00 PM** ✨ feat: add reports and analytics dashboard
- **03:59 PM** ✨ feat: implement issue reporting module
- **03:59 PM** ✨ feat: create audit checklist interface
- **03:58 PM** ✨ feat: implement building management UI
- **03:58 PM** ✨ feat: build role-based dashboards with scorecards
- **03:57 PM** ✨ feat: implement login page UI and integrate JWT auth
- **03:57 PM** ✨ feat: create reusable layout components
- **03:56 PM** ✨ feat: implement authentication context
- **03:56 PM** 🐛 fix: correct axios import in api.js
- **03:55 PM** 🏗️ chore: configure Axios with interceptors
- **03:55 PM** ✨ feat: add application routing
- **03:55 PM** 🏗️ chore: organize frontend folder structure
- **03:55 PM** 🏗️ chore: install frontend dependencies
- **03:54 PM** 🏗️ chore: configure Tailwind CSS
- **03:53 PM** 🏗️ chore: initialize Vite React frontend
- **03:28 PM** ✨ feat: implement PDF export module, database seed initializer, and add comprehensive integration tests
- **03:20 PM** ✨ feat: setup maven wrapper and implement global exception handler, CORS, openapi configurations, and update lifecycle callbacks
- **10:31 AM** ✨ feat: add dashboard stats API
- **10:28 AM** ✨ feat: add audit evidence upload API
- **10:24 AM** ✨ feat: add maintenance task API
- **10:22 AM** ✨ feat: add student report API
- **10:18 AM** ✨ feat: add audit workflow API

## 📅 July 14, 2026

- **11:34 PM** 🏗️ chore(frontend): initialize frontend directory with .gitkeep

## 📅 July 13, 2026

- **11:49 PM** ✨ docs: add contribution guidelines for solo CUSOC project

## 📅 July 12, 2026

- **09:42 PM** 🔧 Update README.md

## 📅 July 11, 2026

- **09:07 PM** 🔧 Update README.md

## 📅 July 10, 2026

- **06:23 PM** ✨ feat(audit): add audit category and checklist CRUD APIs with service, repository, mapper, and DTO layers
- **06:20 PM** ✨ feat(audit-checklist): add repository, DTOs, mapper, service, and controller for AuditChecklist
- **06:18 PM** ✨ feat(audit-category): add repository, DTOs, mapper, service, and controller for AuditCategory
- **06:13 PM** ✨ feat(backend): implement authentication, user management, and building management modules
- **12:36 AM** ✨ docs: add Code of Conduct for AccessAudit project

## 📅 July 09, 2026

- **10:45 PM** ✨ docs: add database design and API design documentation
- **10:33 PM** ✨ Add system architecture, database, and API design images; update architecture docs
- **06:24 PM** 📝 Delete docs/architecture/images/system-architecture.png
- **06:04 PM** ✨ docs: add system architecture documentation and diagram
- **08:38 AM** ✨ docs: add non-functional requirements

## 📅 July 08, 2026

- **07:31 PM** ✨ docs: add functional requirements
- **07:11 PM** ✨ docs: add software requirement specification

## 📅 July 07, 2026

- **10:58 PM** ✨ docs: add MIT license
- **10:52 PM** 🏗️ chore: initialize repository with open source project structure

## 📅 June 26, 2026

- **12:08 AM** ✨ initial commit: add CUSOC project details and guidelines

