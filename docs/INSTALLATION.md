# Installation Guide

## Prerequisites
- **Docker** and **Docker Compose** installed on your system.
- **Git** (for cloning the repository).
- (Optional) Java 21 and Node.js 20 if you plan to run the services outside of Docker.

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/VaibhavTiwari006/S-06-Accessibility-Audit-Inclusion-Improvement-Drive-on-Campus.git
cd S-06-Accessibility-Audit-Inclusion-Improvement-Drive-on-Campus
```

### 2. Start Services with Docker Compose
The project uses Docker Compose to easily orchestrate the Frontend, Backend, and Database containers.

```bash
docker-compose up -d --build
```
This command will:
- Start a PostgreSQL database instance.
- Build and start the Spring Boot backend service.
- Build and serve the React Vite frontend via Nginx.
- Seed the database with initial users, buildings, audits, and roadmap tasks on the first run.

### 3. Access the Application
Once the containers are running, you can access the portal at:
- **Frontend Portal**: http://localhost:3000
- **Backend API Base**: http://localhost:8080/api

### 4. Default Credentials (Seeded)
Use the following credentials to log in:
- **Admin**: `admin@campus.edu` (Password: `password`)
- **Auditor**: `auditor@campus.edu` (Password: `password`)
- **Student**: `student@campus.edu` (Password: `password`)
- **Maintenance**: `maintenance@campus.edu` (Password: `password`)

## Stopping the Application
To stop the application and keep the data:
```bash
docker-compose down
```
To stop the application and wipe the database volume:
```bash
docker-compose down -v
```
