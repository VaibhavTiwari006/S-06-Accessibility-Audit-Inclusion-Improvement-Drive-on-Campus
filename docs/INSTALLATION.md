# Installation & Deployment Guide: AccessAudit
## Quick Start, Docker Compose & Local Development Instructions

> **Project:** S-06: Accessibility Audit & Inclusion Improvement Drive on Campus  
> **Author & Sole Contributor:** **Vaibhav Tiwari** (Chandigarh University • CUSoC 2026)  
> **Evaluation Dossier:** [`docs/CUSOC_FINAL_EVALUATION.md`](CUSOC_FINAL_EVALUATION.md) | **Live Presentation Deck:** [`/presentation`](http://localhost:3000/presentation)  

---

## 🛠️ Prerequisites

* **Docker & Docker Compose** (Recommended for instant single-command evaluation)
* **Git** (for repository cloning)
* *(Optional for manual local run)*: Java 21 JDK, Maven 3.9+, Node.js 20+, and PostgreSQL 16

---

## 🚀 Recommended: 1-Command Docker Deployment

The fastest way to launch the full AccessAudit platform for evaluation:

```bash
# 1. Clone the repository
git clone https://github.com/VaibhavTiwari006/S-06-Accessibility-Audit-Inclusion-Improvement-Drive-on-Campus.git
cd S-06-Accessibility-Audit-Inclusion-Improvement-Drive-on-Campus

# 2. Build and launch all multi-container services
docker-compose up -d --build
```

### What Docker Compose Automates:
* 🗄️ **PostgreSQL 16 Database (`accessaudit_db` on port 5432):** Automatically initializes database schemas and seeds 29 real campus buildings, 42-parameter audit checklists, users, and roadmap tasks.
* ☕ **Spring Boot 3.4.1 Backend (`accessaudit_backend` on port 8080):** Multi-stage Java 21 build with Spring Security, JWT authentication, and cybersecurity filters.
* ⚡ **React 18 Frontend (`accessaudit_frontend` on port 3000):** Built with Vite and served via an optimized, hardened Nginx reverse proxy.

---

## 🌐 Evaluation Endpoints & Live Services

Once containers are active, access the platform at:

* **🏆 CUSoC 2026 Presentation Deck:** [http://localhost:3000/presentation](http://localhost:3000/presentation)
* **🌐 Web Application Portal:** [http://localhost:3000](http://localhost:3000)
* **🔗 Backend REST API Base:** [http://localhost:8080/api](http://localhost:8080/api)
* **📖 Interactive Swagger API Docs:** [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)
* **💓 Health Check & Uptime Probe:** [http://localhost:8080/api/health](http://localhost:8080/api/health)

---

## 🔑 Default Pre-Seeded Accounts

| User Role | Email Address | Password | Permissions & Scope |
|:---|:---|:---|:---|
| **Administrator** | `admin@campus.edu` | `password` | Full system access, department analytics, user roles |
| **Campus Auditor** | `auditor@campus.edu` | `password` | 42-parameter checklist conductor, draft saving, photo evidence |
| **Student / Staff** | `student@campus.edu` | `password` | Barrier reporting, QR tracker, community voting, quiz |
| **Maintenance** | `maintenance@campus.edu` | `password` | 5-stage Kanban remediation roadmap, work order updates |

---

## 💻 Manual Local Development (Without Docker)

### Backend (Spring Boot + Java 21):
```bash
cd backend
# Ensure local PostgreSQL is running with database 'accessaudit'
./mvnw spring-boot:run
# Server starts on http://localhost:8080
```

### Frontend (React 18 + Vite):
```bash
cd frontend
npm install
npm run dev
# Dev server starts on http://localhost:5173 (with automated API proxy to port 8080)
```

---

## 🛑 Managing & Teardown

```bash
# Stop all running containers (preserves database data volume)
docker-compose down

# Stop containers and wipe database volume for a clean fresh re-seed
docker-compose down -v
```
