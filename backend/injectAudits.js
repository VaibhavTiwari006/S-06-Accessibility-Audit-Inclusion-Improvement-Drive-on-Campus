async function injectAudits() {
  try {
    const loginRes = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@campus.edu', password: 'admin123' })
    });
    const loginData = await loginRes.json();
    const token = loginData.data.token;
    
    // We'll use the logged-in admin's ID as the auditor for now
    // Wait, the login response has the user email/role but maybe not id?
    // Let's fetch /api/users/me or just set auditorId to 1 assuming admin is 1.
    // Let's decode the JWT to get the user ID, or just query /api/auth/me? No.
    // Instead I'll just guess auditorId: 1 for now. If it fails, I'll write a DB query.
    
    const bldgRes = await fetch('http://localhost:8080/api/buildings', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const bldgData = await bldgRes.json();
    const buildings = bldgData.data;

    const audits = [
      {
        buildingId: buildings[0].id,
        auditorId: 1, // Using 1 for admin
        auditDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString().split('T')[0],
        overallAccessibilityScore: 85.5,
        status: "COMPLETED",
        remarks: "Excellent ramp access, but tactile paving needs minor repairs."
      },
      {
        buildingId: buildings[1 % buildings.length].id,
        auditorId: 1,
        auditDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 12).toISOString().split('T')[0],
        overallAccessibilityScore: 62.0,
        status: "IN_PROGRESS",
        remarks: "Elevator buttons lack Braille. Washrooms are fully accessible."
      },
      {
        buildingId: buildings[2 % buildings.length].id,
        auditorId: 1,
        auditDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20).toISOString().split('T')[0],
        overallAccessibilityScore: 92.0,
        status: "COMPLETED",
        remarks: "Fully compliant with WCAG 2.1 AA physical infrastructure standards."
      },
      {
        buildingId: buildings[0].id,
        auditorId: 1,
        auditDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString().split('T')[0],
        overallAccessibilityScore: 45.5,
        status: "PLANNED",
        remarks: "Main entrance has steps without a ramp. Requires immediate attention."
      }
    ];

    for (const audit of audits) {
      const res = await fetch('http://localhost:8080/api/audits', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(audit)
      });
      const data = await res.json();
      if (!data.success) {
        console.error("Failed to inject:", data);
      } else {
        console.log("Injected audit successfully!");
      }
    }
    
  } catch (error) {
    console.error("Error:", error);
  }
}

injectAudits();
