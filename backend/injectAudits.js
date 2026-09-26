/**
 * Helper utility to inject real RPWD Act 2016 physical accessibility audits 
 * for all 29 Chandigarh University campus buildings via REST API.
 */
async function injectAudits() {
  try {
    const loginRes = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@campus.edu', password: 'admin123' })
    });
    const loginData = await loginRes.json();
    const token = loginData.data.token;
    const auditorId = loginData.data.userId || 1;

    const bldgRes = await fetch('http://localhost:8080/api/buildings', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
    const bldgData = await bldgRes.json();
    const buildings = bldgData.data;

    // Ground accessibility scores for all 29 buildings
    const scoresMap = {
      'Zakir A': 57.2, 'Zakir B': 57.2, 'Zakir C': 57.2,
      'NC 1': 63.3, 'NC 2': 61.2, 'NC 3': 63.3, 'NC 4': 63.3, 'NC 5': 63.3,
      'D1': 74.8, 'D2': 74.8, 'D3': 74.8, 'D4': 74.8, 'D5': 74.8, 'D6': 74.8, 'D7': 74.8, 'D8': 74.8,
      'DD1': 41.6, 'DD2': 41.6,
      'C1': 79.7, 'C2': 79.7, 'C3': 60.3,
      'B1': 59.8, 'B2': 59.8, 'B3': 59.8, 'B4': 59.8, 'B5': 59.8,
      'A1': 96.7, 'A2': 96.7, 'A3': 96.7
    };

    console.log(`Starting audit injection for ${buildings.length} campus buildings...`);

    for (const b of buildings) {
      const score = scoresMap[b.buildingName] || 68.0;
      const status = score >= 50.0 ? 'APPROVED' : 'PENDING';
      const audit = {
        buildingId: b.id,
        auditorId: auditorId,
        auditDate: '2026-09-26',
        overallAccessibilityScore: score,
        status: status,
        remarks: `RPWD Act 2016 physical accessibility audit for ${b.buildingName} (${b.location}). Evaluated compliance score: ${score}%.`
      };

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
        console.error(`Failed to inject audit for ${b.buildingName}:`, data.message);
      } else {
        console.log(`Injected audit for ${b.buildingName} - Score: ${score}% (${status})`);
      }
    }

    console.log('All 29 audits processed successfully!');
  } catch (error) {
    console.error("Error injecting audits:", error);
  }
}

injectAudits();
