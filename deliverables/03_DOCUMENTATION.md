# Project Deliverable 3: Technical Documentation & Architecture

## CUSoC 2026: Chandigarh University Summer / Semester of Code
### Track S-06: Accessibility Audit & Inclusion Improvement Drive on Campus

---

| Metadata Field | Project Specification |
|:---|:---|
| **Deliverable Name** | Technical Documentation, Architecture Diagrams & Implementation Details |
| **Track** | S-06 (CUSoC 2026 Finalist) |
| **Author** | **Vaibhav Tiwari** (Chandigarh University) |
| **Architecture Pattern** | Multi-Tier Enterprise Layered Architecture (REST / Micro-Ready Monolith) |
| **Standards Compliance** | RPWD Act 2016, MoHUA Harmonised Guidelines 2021, WCAG 2.1 AA |

---

## 1. System Architecture Overview

AccessAudit is structured around the **C4 Architectural Model** providing visibility across Context, Container, Component, and Data layers.

```
+===================================================================================+
|                                    CLIENT LAYER                                   |
|                                                                                   |
|  [Admin Console]      [Auditor Checklist]    [Student Forum]    [Maintenance]     |
|          \                     |                    |                  /          |
|           +--------------------+--------------------+-----------------+           |
|                                        |                                          |
|                     [React 18 + Vite SPA Single-Page App]                         |
|                     * Tailwind CSS Brand System (CU Crimson)                     |
|                     * Leaflet Geospatial Interactive GIS Engine                   |
|                     * Assistive Engine (Dyslexia, TTS, Contrast, Presets)         |
+========================================|==========================================+
                                         | HTTPS (TLS 1.3) / JSON
                                         v
+===================================================================================+
|                                  SECURITY PERIMETER                               |
|  - RateLimitingFilter (Bucket4j Token Bucket Algorithm: 60 req/min/IP)            |
|  - XssSanitizationFilter (OWASP Sanitizer strips script, eval, onerror)          |
|  - JwtAuthenticationFilter (HMAC-SHA256 signature and cryptographic exp check)   |
|  - Strict CORS Policy (Whitelisted Vercel production and local origins)           |
+========================================|==========================================+
                                         v
+===================================================================================+
|                              SPRING BOOT APPLICATION LAYER                        |
|                                                                                   |
|  +--------------------+  +--------------------+  +--------------------+           |
|  |   AuthController   |  |  BuildingController|  |   AuditController  |           |
|  +--------------------+  +--------------------+  +--------------------+           |
|  +--------------------+  +--------------------+  +--------------------+           |
|  |  IssueController   |  | MaintenanceTaskCtrl|  |  ReportController  |           |
|  +--------------------+  +--------------------+  +--------------------+           |
|                                        |                                          |
|                       Service Layer (Business Logic & Scoring)                    |
|             * AuditScoringEngine (RPWD statutory weighted algorithms)             |
|             * BarrierRoutingEngine (Dijkstra step-free pathfinding)               |
|             * MaintenanceWorkflowEngine (5-stage state transitions)               |
+========================================|==========================================+
                                         | HikariCP Connection Pool (SSL enabled)
                                         v
+===================================================================================+
|                                DATABASE PERSISTENCE                               |
|                  PostgreSQL 16 on Neon Serverless Cloud (AWS ap-southeast-1)       |
|                  * users            * buildings           * audits                |
|                  * audit_checkpoints* issues              * maintenance_tasks     |
|                  * issue_upvotes    * comments            * audit_logs            |
+===================================================================================+
```

---

## 2. Database Design & Entity Relationship Specifications

The database schema is normalized to **Third Normal Form (3NF)** with strict referential integrity, foreign key constraints, cascading policies, and B-tree indexes on frequent query paths (`building_id`, `audit_id`, `status`).

### 2.1 Core Relational Entities
```
   +-------------------+          +-------------------+
   |       USERS       | 1      * |      AUDITS       |
   +-------------------+----------+-------------------+
   | PK id             |          | PK id             |
   |    email (UNIQUE) |          | FK auditor_id     |
   |    password_hash  |          | FK building_id    |
   |    full_name      |          |    audit_date     |
   |    role (ENUM)    |          |    score          |
   |    created_at     |          |    status         |
   +-------------------+          +-------------------+
             |                              |
             | 1                            | 1
             |                              |
             | *                            | *
   +-------------------+          +--------------------+
   | MAINTENANCE_TASKS |          | AUDIT_CHECKPOINTS  |
   +-------------------+          +--------------------+
   | PK id             |          | PK id              |
   | FK building_id    |          | FK audit_id        |
   | FK assignee_id    |          |    category (ENUM) |
   | FK source_audit_id|          |    parameter_name  |
   |    title          |          |    is_compliant    |
   |    status (ENUM)  |          |    measured_value  |
   |    estimated_cost |          |    standard_value  |
   |    priority       |          |    remedial_action |
   +-------------------+          +--------------------+
             |
             | *
   +-------------------+          +--------------------+
   |      ISSUES       | 1      * |   ISSUE_UPVOTES    |
   +-------------------+----------+--------------------+
   | PK id             |          | PK id              |
   | FK reporter_id    |          | FK user_id         |
   | FK building_id    |          | FK issue_id        |
   |    title          |          +--------------------+
   |    description    |
   |    severity (ENUM)|
   |    photo_url      |
   |    upvotes_count  |
   |    status (ENUM)  |
   +-------------------+
```

### 2.2 Entity Details & Validation Rules
1. **User (`users`):** Stores authentication identity. Passwords hashed using BCrypt (12 rounds). Roles: `ADMIN`, `AUDITOR`, `STUDENT`, `MAINTENANCE`.
2. **Building (`buildings`):** Stores 29 campus structures with geo-coordinates (`latitude`, `longitude`), department tags, total floors, year built, and aggregate compliance score.
3. **Audit (`audits`):** Represents an audit inspection event conducted by an authorized Auditor or Admin. Calculates compliance percentage automatically upon checkpoint submission.
4. **AuditCheckpoint (`audit_checkpoints`):** 42 granular evaluation checkpoints per audit spanning:
   - Category 1: Entrance & Approach (Thresholds, Ramps, Walkways)
   - Category 2: Vertical Circulation (Elevators, Lifts, Stair Handrails, Tactile Nosings)
   - Category 3: Restrooms & Sanitary Facilities (Grab Bars, Door Clearances, Basin Heights)
   - Category 4: Wayfinding & Emergency Egress (Braille, Audio Beacons, Visual Contrasts)
5. **Issue (`issues`):** Crowdsourced barrier reports submitted by students and faculty, including GPS tags and photo attachments.
6. **MaintenanceTask (`maintenance_tasks`):** Work orders dispatched to campus civil/electrical engineering divisions.

---

## 3. REST API Surface Documentation

All endpoints return uniform response envelopes adhering to `ApiResponse<T>`:
```json
{
  "success": true,
  "message": "Operation completed successfully",
  "data": { ... },
  "timestamp": "2026-10-26T01:30:00Z"
}
```

### 3.1 Authentication & Profile APIs
| Method | Endpoint | Authorization | Description |
|:---|:---|:---:|:---|
| `POST` | `/api/auth/register` | Public | Register new campus student/staff account. |
| `POST` | `/api/auth/login` | Public | Authenticate credentials; returns signed JWT token. |
| `GET` | `/api/health` | Public | Platform health probe and Neon DB connection test. |

### 3.2 Buildings & Geospatial Map APIs
| Method | Endpoint | Authorization | Description |
|:---|:---|:---:|:---|
| `GET` | `/api/buildings` | Authenticated | Retrieve all 29 campus buildings with scores. |
| `GET` | `/api/buildings/{id}` | Authenticated | Get detailed building profile, floors, and audits. |
| `POST` | `/api/buildings` | `ADMIN` | Register new campus structure or facility. |
| `PUT` | `/api/buildings/{id}` | `ADMIN` | Update building coordinates or metadata. |

### 3.3 Accessibility Audits & Checkpoints APIs
| Method | Endpoint | Authorization | Description |
|:---|:---|:---:|:---|
| `GET` | `/api/audits` | Authenticated | List all historical and active campus audits. |
| `POST` | `/api/audits` | `ADMIN`, `AUDITOR` | Initialize new physical audit drive for a building. |
| `GET` | `/api/audits/{id}` | Authenticated | Retrieve audit details with 42 evaluated checkpoints. |
| `POST` | `/api/audits/{id}/checkpoints` | `ADMIN`, `AUDITOR` | Submit checkpoint evaluation with measurements. |

### 3.4 Community Issues & Reporting APIs
| Method | Endpoint | Authorization | Description |
|:---|:---|:---:|:---|
| `GET` | `/api/issues` | Authenticated | List campus barrier tickets with filtering. |
| `POST` | `/api/issues` | Authenticated | Report physical barrier with photo and description. |
| `POST` | `/api/issues/{id}/upvote` | Authenticated | Upvote barrier to elevate repair priority. |
| `PATCH`| `/api/issues/{id}/status`| `ADMIN`, `AUDITOR` | Update barrier status (REVIEW, CONFIRMED, RESOLVED). |

### 3.5 5-Stage Remediation Kanban APIs
| Method | Endpoint | Authorization | Description |
|:---|:---|:---:|:---|
| `GET` | `/api/maintenance-tasks` | `ADMIN`, `MAINTENANCE` | List all 5-stage remediation work orders. |
| `POST` | `/api/maintenance-tasks` | `ADMIN` | Dispatch repair task to engineering division. |
| `PATCH`| `/api/maintenance-tasks/{id}` | `ADMIN`, `MAINTENANCE` | Advance status (`OPEN` → `ASSIGNED` → `IN_PROGRESS` → `FIXED` → `COMPLETED`). |

---

## 4. Security Architecture & Threat Defense

1. **Stateless JWT Guard:**
   - Tokens signed using HMAC-SHA256 with 256-bit secret.
   - Front-end cryptographic expiration verification prevents session hijacking or replay of expired credentials.
2. **Rate Limiting Engine:**
   - IP-bucket based rate limiter restricting burst traffic to 60 requests per minute per IP to defend against brute force and DoS attacks.
3. **XSS & Input Sanitization:**
   - Custom `XssSanitizationFilter` strips dangerous HTML tags (`<script>`, `<iframe>`, `onerror=`) across all incoming JSON payloads before controller invocation.
4. **Content Security Policy & HTTP Headers:**
   - HSTS with 1-year preload, `frame-ancestors 'none'`, and strict referrer policies.

---

## 5. Supporting Technical Documents in Repository

| Document File | Purpose & Contents |
|:---|:---|
| [`docs/architecture/system-architecture.md`](../docs/architecture/system-architecture.md) | In-depth technical architecture breakdown and multi-cloud topology. |
| [`docs/architecture/DATABASE_SCHEMA.md`](../docs/architecture/DATABASE_SCHEMA.md) | Exhaustive DDL definitions, indexing strategies, and relational constraints. |
| [`docs/API_DOCUMENTATION.md`](../docs/API_DOCUMENTATION.md) | Complete curl examples and request/response payloads for every endpoint. |
| [`docs/requirements/software-requirement-specification.md`](../docs/requirements/software-requirement-specification.md) | IEEE 830-1998 compliant Software Requirements Specification (SRS). |
| [`docs/requirements/user-stories.md`](../docs/requirements/user-stories.md) | Exhaustive Agile user stories covering all 4 system roles with acceptance criteria. |
| [`docs/VPAT_ACCESSIBILITY_CONFORMANCE.md`](../docs/VPAT_ACCESSIBILITY_CONFORMANCE.md) | Voluntary Product Accessibility Template evaluating WCAG 2.1 AA success criteria. |
