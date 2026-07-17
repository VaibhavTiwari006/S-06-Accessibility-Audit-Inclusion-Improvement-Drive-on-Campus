# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- **Settings Page**: Added a functional settings page for Admins to view profile information, toggle notifications, and adjust security preferences.
- **Premium UI Overhaul**: 
  - Revamped Dashboard with dynamic role-based hero banners and polished `ScoreCard` components.
  - Implemented a completely redesigned Login page with frosted glass effects and animated gradients.
  - Upgraded the Sidebar with active state indicators (chevrons/glows) and grouped navigation.
  - Enhanced Navbar with a user dropdown, logo icon, and a live status indicator.
- **Documentation**: Added comprehensive documentation including Installation Guide, User Guide, API Documentation, Architecture Diagram, Database Schema, Testing Report, and this Changelog to meet competition guidelines.

### Fixed
- Fixed broken download links for "Tactile Campus Map" and "WCAG 2.1 AA Checklist" in the Community component.
- Fixed a 404 routing error by adding the `/settings` route to `AppRoutes.jsx`.
- Fixed a transient PostgreSQL initialization error in Docker Compose.
- Corrected Tailwind v4 `@apply` PostCSS syntax error by inlining custom utility classes in `index.css`.
- Fixed missing `@NotNull` constraints on `buildingId` in `StudentReportRequest.java`.

### Changed
- Seeded 50 comprehensive accessibility remediation tasks via `DatabaseInitializer.java` to populate the Roadmap Kanban board.
- Updated base CSS to include new fluid animations (`slideUp`, `fadeIn`, `float`) and custom scrollbars.
