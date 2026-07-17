# API Documentation

The Access Audit backend is built with Spring Boot and exposes a RESTful API.

## Base URL
`/api`

## Authentication
Most endpoints require a JWT token passed in the `Authorization` header.
`Authorization: Bearer <token>`

## Endpoints

### 1. Authentication (`/api/auth`)
- `POST /login` - Authenticate a user and receive a JWT.
- `POST /register` - Register a new user.

### 2. Dashboard Stats (`/api/dashboard`)
- `GET /stats` - Returns aggregated system statistics based on the requester's role.

### 3. Buildings (`/api/buildings`)
- `GET /` - List all buildings.
- `POST /` - Create a new building (Admin only).
- `GET /{id}` - Get a specific building by ID.
- `PUT /{id}` - Update a building.

### 4. Audits (`/api/audits`)
- `GET /` - List all audits.
- `POST /` - Create a new audit record.
- `GET /{id}` - Get audit details.

### 5. Issues (`/api/issues`)
- `GET /` - List reported issues.
- `POST /` - Report a new accessibility barrier.
- `PUT /{id}/status` - Update the status of an issue.

### 6. Roadmap Tasks (`/api/tasks`)
- `GET /` - List remediation roadmap tasks.
- `PUT /{id}/status` - Update task status (TODO, IN_PROGRESS, DONE).
