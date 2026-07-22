const { Client } = require('pg');

async function fixAudits() {
  const client = new Client({
    user: 'postgres',
    password: '0006',
    host: 'localhost',
    port: 5432,
    database: 'accessaudit'
  });

  try {
    await client.connect();
    
    console.log("Updating audit scores...");
    
    // Set some realistic mock scores and statuses
    await client.query(`UPDATE audits SET overall_accessibility_score = 85.5, status = 'COMPLETED' WHERE id = 1;`);
    await client.query(`UPDATE audits SET overall_accessibility_score = 62.0, status = 'IN_PROGRESS' WHERE id = 2;`);
    await client.query(`UPDATE audits SET overall_accessibility_score = 92.0, status = 'COMPLETED' WHERE id = 3;`);
    await client.query(`UPDATE audits SET overall_accessibility_score = 45.5, status = 'PLANNED' WHERE id = 4;`);
    
    // Let's also check the actual rows
    const res = await client.query('SELECT id, status, overall_accessibility_score FROM audits');
    console.log("Current audits:", res.rows);
    
    console.log("Successfully fixed audits in the database!");
  } catch (err) {
    console.error("Error executing query", err.stack);
  } finally {
    await client.end();
  }
}

fixAudits();
