# Non-Functional Requirements

The following non-functional requirements define the quality attributes and operational characteristics of **AccessAudit**.

| ID         | Non-Functional Requirement                                                                                                                                                           | Category        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| **NFR-01** | The system shall securely store user passwords using industry-standard hashing algorithms and enforce role-based access control with JWT authentication for all protected resources. | Security        |
| **NFR-02** | The system shall respond to standard API requests within approximately 500 ms under normal operating conditions.                                                                     | Performance     |
| **NFR-03** | The system shall support scalable data retrieval by implementing pagination for list-based resources such as audits, reports, and buildings.                                         | Scalability     |
| **NFR-04** | The system shall provide reliable operation by returning appropriate HTTP status codes and structured error messages for all request failures.                                       | Reliability     |
| **NFR-05** | The user interface shall be responsive and usable across desktop, laptop, and tablet devices to support on-site accessibility audits.                                                | Usability       |
| **NFR-06** | The backend shall follow a layered architecture (Controller → Service → Repository) to promote maintainability and separation of concerns.                                           | Maintainability |
| **NFR-07** | The system shall provide comprehensive API documentation using the OpenAPI (Swagger) specification.                                                                                  | Documentation   |
| **NFR-08** | The deployed application shall be accessible through a publicly available URL with sufficient availability for project demonstration and evaluation.                                 | Availability    |
