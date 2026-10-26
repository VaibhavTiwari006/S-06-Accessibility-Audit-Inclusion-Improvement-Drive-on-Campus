# Contributing to CU Access Audit Portal

We welcome contributions from students, developers, and researchers looking to improve campus infrastructure and digital accessibility!

---

## 🚀 Quick Setup Instructions

### 1. Prerequisites
*   **Java**: JDK 21
*   **Node.js**: Node 20+
*   **Database**: PostgreSQL 15+ (or run via Docker)

### 2. Backend Setup
1.  Navigate to the `backend/` directory:
    ```bash
    cd backend
    ```
2.  Start the database container:
    ```bash
    docker-compose up -d db
    ```
3.  Run application tests to verify setup:
    ```bash
    ./mvnw test
    ```
4.  Launch the Spring Boot server:
    ```bash
    ./mvnw spring-boot:run
    ```

### 3. Frontend Setup
1.  Navigate to the `frontend/` directory:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Launch the Vite local dev server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:5173/](http://localhost:5173/) in your browser.

---

## 🤝 Code Guidelines & Submissions

### Branching Policy
*   Create distinct feature branches from `main`:
    ```bash
    git checkout -b feat/your-feature-name
    ```
*   Keep PR scopes granular and clear.

### Commit Guidelines
*   Use structured semantic commit prefixes:
    *   `feat()`: New application features.
    *   `fix()`: Bug fixes.
    *   `docs()`: Documentation changes.
    *   `refactor()`: Code restructuring without feature modifications.

### Testing Mandate
*   Run backend tests (`./mvnw test`) and compile a production bundle build (`npm run build`) before making PR submissions to prevent regression builds.