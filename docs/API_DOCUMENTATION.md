# 📑 Access Audit API Specifications

The Access Audit backend is built with Spring Boot and exposes a RESTful API.

## Base URL
All API requests must be prefixed with:
`/api`

## Authentication
Most endpoints require a JWT token passed in the HTTP headers:
```http
Authorization: Bearer <your_jwt_token>
```

---

## 🛠️ API Endpoints Reference

### 1. Authentication (`/api/auth`)

#### Register a Student Account
*   **Method & Path**: `POST /auth/register`
*   **Request Headers**: `Content-Type: application/json`
*   **Request Body**:
    ```json
    {
      "email": "student@campus.edu",
      "password": "password",
      "fullName": "Student User"
    }
    ```
*   **Success Response**: `201 Created`
    ```json
    {
      "success": true,
      "message": "User registered successfully",
      "data": {
        "id": 1,
        "email": "student@campus.edu",
        "fullName": "Student User",
        "role": "STUDENT"
      }
    }
    ```
*   **Error Responses**:
    *   `400 Bad Request` (Email already in use, password strength failure).

#### Login / Request JWT Token
*   **Method & Path**: `POST /auth/login`
*   **Request Body**:
    ```json
    {
      "email": "admin@campus.edu",
      "password": "password"
    }
    ```
*   **Success Response**: `200 OK`
    ```json
    {
      "success": true,
      "message": "Authentication successful",
      "data": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        "role": "ADMIN",
        "email": "admin@campus.edu"
      }
    }
    ```
*   **Error Responses**:
    *   `401 Unauthorized` (Invalid credentials).

---

### 2. Dashboard Statistics (`/api/dashboard`)

#### Fetch Aggregate System Metrics
*   **Method & Path**: `GET /dashboard/stats`
*   **Success Response**: `200 OK`
    ```json
    {
      "success": true,
      "message": "Stats fetched successfully",
      "data": {
        "totalBuildings": 12,
        "completedAudits": 4,
        "pendingAudits": 3,
        "resolvedIssues": 15,
        "openIssues": 8,
        "averageComplianceScore": 76.5
      }
    }
    ```

---

### 3. Buildings Management (`/api/buildings`)

#### List All Campus Buildings
*   **Method & Path**: `GET /buildings`
*   **Success Response**: `200 OK`
    ```json
    {
      "success": true,
      "message": "Buildings fetched",
      "data": [
        {
          "id": 1,
          "buildingName": "Academic Block 1",
          "buildingCode": "AB1",
          "numberOfFloors": 5,
          "location": "North Campus",
          "description": "Main Engineering Block",
          "status": "ACTIVE"
        }
      ]
    }
    ```

#### Register a New Building (Admin Only)
*   **Method & Path**: `POST /buildings`
*   **Request Body**:
    ```json
    {
      "buildingName": "Academic Block 3",
      "buildingCode": "AB3",
      "numberOfFloors": 4,
      "location": "South Campus",
      "description": "Management & Architecture Block"
    }
    ```
*   **Success Response**: `201 Created`
    ```json
    {
      "success": true,
      "message": "Building registered",
      "data": {
        "id": 3,
        "buildingName": "Academic Block 3",
        "buildingCode": "AB3",
        "numberOfFloors": 4,
        "location": "South Campus",
        "description": "Management & Architecture Block"
      }
    }
    ```

---

### 4. Audits Management (`/api/audits`)

#### List Audits
*   **Method & Path**: `GET /audits`
*   **Success Response**: `200 OK`
    ```json
    {
      "success": true,
      "message": "Audits retrieved",
      "data": [
        {
          "id": 1,
          "buildingId": 1,
          "buildingName": "Academic Block 1",
          "auditorId": 2,
          "auditorName": "Auditor User",
          "auditDate": "2026-08-01",
          "status": "APPROVED",
          "overallAccessibilityScore": 82.0
        }
      ]
    }
    ```

#### Create or Update Audit Draft
*   **Method & Path**: `PUT /audits/{id}`
*   **Request Body**:
    ```json
    {
      "buildingId": 1,
      "auditorId": 2,
      "auditDate": "2026-08-01",
      "remarks": "Draft remarks",
      "responses": [
        { "checklistId": 1, "score": 8, "comments": "Ramp is functional but needs paint" }
      ]
    }
    ```
*   **Success Response**: `200 OK`

#### Submit Final Audit
*   **Method & Path**: `POST /audits/{id}/submit`
*   **Success Response**: `200 OK`

---

### 5. Barrier Issue Reporting (`/api/student-reports`)

#### Submit Accessibility Barrier
*   **Method & Path**: `POST /student-reports`
*   **Request Body**:
    ```json
    {
      "buildingId": 1,
      "description": "Tactile tiles are missing or broken at the building lobby entrance.",
      "locationDetails": "[Floor: Ground Floor | Type: Entrance] Near Main Gate Lobby",
      "photoUrl": "http://localhost:8080/api/evidence/preview.jpg"
    }
    ```
*   **Success Response**: `201 Created`

---

### 6. Remediation Tasks (`/api/maintenance-tasks`)

#### Create Maintenance Task
*   **Method & Path**: `POST /maintenance-tasks`
*   **Request Body**:
    ```json
    {
      "buildingId": 1,
      "title": "Fix Broken Ramp R1",
      "description": "Repair handrails and concrete cracks.",
      "category": "PHYSICAL",
      "priority": "HIGH"
    }
    ```
*   **Success Response**: `201 Created`
