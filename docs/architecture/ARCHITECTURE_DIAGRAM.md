# Architecture Diagram

The Access Audit platform uses a standard multi-tier micro-architecture orchestrated by Docker Compose.

```mermaid
graph TD
    Client[Web Browser] -->|HTTP / React| Nginx[Nginx Reverse Proxy]
    Nginx --> Frontend[Frontend - React + Vite]
    Nginx --> Backend[Backend API - Spring Boot 3]
    Backend --> DB[(Database - PostgreSQL)]
    
    subgraph "Docker Compose Setup"
        Frontend
        Backend
        DB
    end
```

## Components
1. **Frontend**: React 18, Vite, Tailwind CSS v4, React Router v6.
2. **Backend**: Java 21, Spring Boot 3, Spring Security (JWT), Spring Data JPA.
3. **Database**: PostgreSQL 16 database storing relational entities.
4. **Nginx**: Static file server and proxy for the frontend.
