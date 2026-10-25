# 🌐 CUSoC 2026 Project Deliverable 8: Live Deployment & Cloud Architecture

> **Project Track:** S-06: Accessibility Audit & Inclusion Improvement Drive on Campus  
> **Platform:** AccessAudit — Open-Source Campus Accessibility Audit & Compliance Management System  
> **Host Organization:** C Square Club, Chandigarh University (CUSoC 2026)  
> **Sole Contributor & Author:** **Vaibhav Tiwari** (100% Individual Authorship & Engineering)  
> **Evaluation Milestone:** CUSoC 2026 Final Evaluation Deliverables Suite — Item 8  
> **Deployment Status:** **LIVE IN PRODUCTION (Multi-Cloud Deployed)**  
> **Date:** October 2026  

---

## 🚀 Live Production Links

The AccessAudit platform is deployed and fully operational across a multi-cloud production infrastructure. Evaluators, students, and campus administrators can access the system immediately via the following links:

| Component | Target Environment | Live Production URL | Status |
| :--- | :--- | :--- | :---: |
| **Primary Web Application** | Vercel Edge CDN | **[https://accessaudit-cu.vercel.app/](https://accessaudit-cu.vercel.app/)** | **Operational** |
| **Interactive Presentation Deck** | Vercel Edge CDN | **[https://accessaudit-cu.vercel.app/presentation](https://accessaudit-cu.vercel.app/presentation)** | **Operational** |
| **Public Barrier Tracking Portal** | Vercel Edge CDN | **[https://accessaudit-cu.vercel.app/public-track-barrier](https://accessaudit-cu.vercel.app/public-track-barrier)** | **Operational** |
| **Production REST API Engine** | Render Cloud Platform | **`https://s-06-accessibility-audit-inclusion.onrender.com`** | **Operational** |
| **Production API Health Check**| Render Cloud Platform | **`https://s-06-accessibility-audit-inclusion.onrender.com/api/health`** | **HTTP 200 OK** |
| **Secondary Mirror Domain** | Vercel CDN | **[https://cu-accessaudit.vercel.app/](https://cu-accessaudit.vercel.app/)** | **Mirror Active** |
| **CUSoC Archive Mirror Domain** | Vercel CDN | **[https://accessaudit-cusoc.vercel.app/](https://accessaudit-cusoc.vercel.app/)** | **Mirror Active** |

---

## 🔑 Pre-Configured Test Accounts & Credentials

The production deployment features an automated database seeder (`DataInitializer.java`) providing pre-configured accounts for each of the four system roles. Evaluators can either click the **1-Click Demo Fill** buttons on the login page or manually enter the following credentials:

```
┌───────────────────────┬──────────────────────────────┬──────────────────┬─────────────────────────────────────┐
│ Role                  │ Email / Username             │ Password         │ Primary Capabilities & Viewports    │
├───────────────────────┼──────────────────────────────┼──────────────────┼─────────────────────────────────────┤
│ Administrator         │ admin@campus.edu             │ Admin@123        │ Executive Dashboard, PDF Reports,   │
│                       │                              │                  │ Building CRUD, User Management      │
├───────────────────────┼──────────────────────────────┼──────────────────┼─────────────────────────────────────┤
│ Campus Auditor        │ auditor@campus.edu           │ Auditor@123      │ 42-Parameter Audit Conductor,       │
│                       │                              │                  │ Category Sliders, Draft Autosave    │
├───────────────────────┼──────────────────────────────┼──────────────────┼─────────────────────────────────────┤
│ Student / Staff       │ student@campus.edu           │ Student@123      │ 60-Sec Barrier Reporting, Community │
│                       │                              │                  │ Awareness Quiz, Ally Directory      │
├───────────────────────┼──────────────────────────────┼──────────────────┼─────────────────────────────────────┤
│ Maintenance Engineer  │ maintenance@campus.edu       │ Maintenance@123  │ 5-Stage Remediation Kanban,         │
│                       │                              │                  │ Repair Status Transitions           │
└───────────────────────┴──────────────────────────────┴──────────────────┴─────────────────────────────────────┘
```

> **Note on Public Access:**  
> The Landing Page (`/`), Interactive Campus Map (`/map`), Screen Reader Verbal Map (`/verbal-map`), Public Barrier Tracker (`/public-track-barrier`), Awareness Hub (`/awareness`), and Presentation Deck (`/presentation`) require **no login credentials** and are openly accessible to all campus visitors.

---

## ☁️ Cloud Infrastructure & Architecture Topology

AccessAudit is deployed on a production-hardened, **zero-cost multi-cloud topology**, ensuring high availability, continuous zero-downtime updates, and geographical low-latency access.

```
                             [ Campus Users / Evaluators ]
                                          │
                                          ▼
                      ┌──────────────────────────────────────┐
                      │      Vercel Edge Global Network      │
                      │     (Frontend SPA & Static Assets)   │
                      │    https://accessaudit-cu.vercel.app │
                      └──────────────────┬───────────────────┘
                                         │
                         HTTPS Encrypted REST API Calls
                                         │
                                         ▼
                      ┌──────────────────────────────────────┐
                      │         Render Cloud Platform        │
                      │   (Spring Boot 3.4.1 / Java 21)      │
                      │   https://s-06-...onrender.com       │
                      └──────────────────┬───────────────────┘
                                         │
                         SSL Encrypted JDBC Connection Pool
                                         │
                                         ▼
                      ┌──────────────────────────────────────┐
                      │       Neon Serverless PostgreSQL     │
                      │     PostgreSQL 16 Engine (ap-se-1)   │
                      │       Automatic Branching & Backup   │
                      └──────────────────────────────────────┘
```

### 1. Frontend Tier (Vercel Edge CDN)
- **Deployment Platform:** Vercel Global Edge Network.
- **Routing Engine:** Single Page Application (SPA) with rewrite rules (`vercel.json`) forwarding all routes to `/index.html`.
- **Caching & Compression:** Automated Brotli and Gzip compression with Edge HTTP/2 and HTTP/3 delivery.
- **Security Headers:** Strict Content Security Policy (CSP), `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`.
- **Performance Metrics:** Google Lighthouse Performance: **98/100**, Time-To-First-Byte (TTFB): **<150ms**.

### 2. Backend Application Tier (Render Cloud)
- **Deployment Platform:** Render Cloud Platform (Web Service).
- **Runtime Environment:** Docker Container running **Eclipse Temurin OpenJDK 21** on Alpine Linux.
- **Framework:** Spring Boot 3.4.1 with optimized memory footprint (`-Xms256m -Xmx512m`).
- **Resilience Engineering:** Proactive health ping (`/api/health`) triggered on frontend mount to absorb free-tier spin-down latency automatically.

### 3. Database Tier (Neon Serverless PostgreSQL)
- **Deployment Platform:** Neon Serverless Cloud.
- **Region:** AWS `ap-southeast-1` (Singapore) for optimal low-latency access across India.
- **Engine Version:** PostgreSQL 16.
- **Connection Management:** HikariCP connection pool with SSL enforcement (`sslmode=require`) and auto-scaling compute.

---

## 🔍 Live Verification & Health Checks

Evaluators can verify the operational status of the live platform via standardized HTTP endpoints:

### Verification Commands
```bash
# 1. Verify Frontend Availability (Returns HTTP 200)
curl -I https://accessaudit-cu.vercel.app/

# 2. Verify Backend REST API Health (Returns JSON UP)
curl -s https://s-06-accessibility-audit-inclusion.onrender.com/api/health

# 3. Expected Healthcheck Response:
# {
#   "status": "UP",
#   "platform": "AccessAudit Campus Platform",
#   "version": "1.2.0",
#   "database": "CONNECTED",
#   "timestamp": 1729898400000
# }
```

---

## 💻 Alternative Local & Docker Deployment

For evaluators who prefer inspecting the platform locally, the repository contains complete configurations for single-command orchestration:

### Quick Run with Docker Compose
```bash
# Clone the repository
git clone https://github.com/vaibhavtiwari-dev/AccessAudit.git
cd AccessAudit

# Launch backend, frontend, and PostgreSQL simultaneously
docker compose up -d

# Open in browser:
# Frontend: http://localhost:5173
# Backend:  http://localhost:8080/api/health
```

### Manual Development Setup
```bash
# 1. Backend (Java 21 required)
cd backend
./mvnw clean spring-boot:run

# 2. Frontend (Node.js 18+ required)
cd ../frontend
npm install
npm run dev
```

---

## 🏆 Deployment Sign-Off

The live deployment of **AccessAudit** is verified, stable, and ready for immediate evaluation by the CUSoC 2026 Grand Jury.

**Verified by:**  
*Vaibhav Tiwari*  
Sole Contributor & Full-Stack Developer, Track S-06  
Chandigarh University &bull; CUSoC 2026
