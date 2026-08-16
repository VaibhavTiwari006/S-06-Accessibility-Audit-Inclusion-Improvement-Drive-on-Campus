# 🗄️ Database Entity Schema Design

The Access Audit platform uses PostgreSQL as its primary transactional database. The schema design is managed via Spring Data JPA mappings.

---

## 1. Entity Relationship (ER) Diagram

```mermaid
erDiagram
    USERS {
        bigint id PK
        string email UK
        string password
        string full_name
        string role "ADMIN, AUDITOR, STUDENT, MAINTENANCE"
        timestamp created_at
    }
    
    BUILDINGS {
        bigint id PK
        string building_code UK
        string building_name
        int number_of_floors
        string location
        string description
        string status "ACTIVE, INACTIVE"
        timestamp created_at
    }
    
    AUDITS {
        bigint id PK
        bigint building_id FK
        bigint auditor_id FK
        timestamp audit_date
        string status "DRAFT, SUBMITTED, APPROVED, REJECTED"
        float overall_accessibility_score
        text remarks
    }

    AUDIT_RESPONSES {
        bigint id PK
        bigint audit_id FK
        bigint checklist_id FK
        int score
        text comments
    }

    AUDIT_CHECKLISTS {
        bigint id PK
        bigint category_id FK
        string question_text
        int maximum_score
    }

    AUDIT_CATEGORIES {
        bigint id PK
        string name UK
        string description
    }
    
    STUDENT_REPORTS {
        bigint id PK
        bigint student_id FK
        bigint building_id FK
        text description
        string location_details
        string photo_url
        string status "OPEN, IN_PROGRESS, RESOLVED"
        timestamp reported_at
    }
    
    ROADMAP_TASKS {
        bigint id PK
        bigint building_id FK
        string title
        text description
        string category "PHYSICAL, DIGITAL, GENERAL"
        string status "TODO, IN_PROGRESS, DONE"
        string priority "LOW, MEDIUM, HIGH, CRITICAL"
        timestamp created_at
    }

    USERS ||--o{ AUDITS : "conducts"
    BUILDINGS ||--o{ AUDITS : "inspected"
    AUDITS ||--o{ AUDIT_RESPONSES : "contains"
    AUDIT_CHECKLISTS ||--o{ AUDIT_RESPONSES : "scored_by"
    AUDIT_CATEGORIES ||--o{ AUDIT_CHECKLISTS : "groups"
    USERS ||--o{ STUDENT_REPORTS : "reports"
    BUILDINGS ||--o{ STUDENT_REPORTS : "locates"
    BUILDINGS ||--o{ ROADMAP_TASKS : "remediates"
```

---

## 2. Table Schemas & Fields Details

### A. USERS Table
*   `id` (BIGINT, Primary Key, Auto-increment)
*   `email` (VARCHAR(150), Unique Constraint, Not Null)
*   `password` (VARCHAR(255), BCrypt Hashed, Not Null)
*   `full_name` (VARCHAR(100), Not Null)
*   `role` (VARCHAR(50), Constraint: `ADMIN`, `AUDITOR`, `STUDENT`, `MAINTENANCE`)
*   `created_at` (TIMESTAMP, Default: current_timestamp)

### B. BUILDINGS Table
*   `id` (BIGINT, Primary Key, Auto-increment)
*   `building_code` (VARCHAR(50), Unique Constraint, Not Null)
*   `building_name` (VARCHAR(100), Not Null)
*   `number_of_floors` (INT, Not Null)
*   `location` (VARCHAR(255))
*   `description` (TEXT)
*   `status` (VARCHAR(20), Default: `'ACTIVE'`)
*   `created_at` (TIMESTAMP, Default: current_timestamp)

### C. AUDITS Table
*   `id` (BIGINT, Primary Key, Auto-increment)
*   `building_id` (BIGINT, Foreign Key referencing `BUILDINGS(id)`, Not Null)
*   `auditor_id` (BIGINT, Foreign Key referencing `USERS(id)`, Not Null)
*   `audit_date` (TIMESTAMP, Not Null)
*   `status` (VARCHAR(30), Default: `'DRAFT'`)
*   `overall_accessibility_score` (DOUBLE PRECISION)
*   `remarks` (TEXT)

### D. AUDIT_RESPONSES Table
*   `id` (BIGINT, Primary Key, Auto-increment)
*   `audit_id` (BIGINT, Foreign Key referencing `AUDITS(id)`, Cascaded Delete)
*   `checklist_id` (BIGINT, Foreign Key referencing `AUDIT_CHECKLISTS(id)`)
*   `score` (INT, Constraint: `0` to max checklist possible score)
*   `comments` (TEXT)
