const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

async function main() {
  const sql = neon(process.env.DATABASE_URL);
  
  try {
    await sql`DROP TABLE IF EXISTS patients;`;
    await sql`DROP TABLE IF EXISTS reports;`;
    await sql`
      CREATE TABLE IF NOT EXISTS reports (
        id varchar(255) PRIMARY KEY,
        ref_id varchar(255) NOT NULL,
        name varchar(255) NOT NULL,
        age integer NOT NULL,
        sex varchar(20) DEFAULT 'Other' NOT NULL,
        mobile varchar(50) NOT NULL,
        date varchar(50) NOT NULL,
        time varchar(50) NOT NULL,
        hbs_ag varchar(50) NOT NULL,
        hcv varchar(50) NOT NULL,
        malaria varchar(50) NOT NULL,
        hiv varchar(50) NOT NULL,
        vdrl varchar(50) NOT NULL,
        blood_glucose varchar(50) NOT NULL,
        created_at bigint NOT NULL,
        updated_at bigint DEFAULT 0 NOT NULL,
        is_deleted boolean DEFAULT false NOT NULL,
        synced boolean DEFAULT true NOT NULL
      );
    `;
    console.log('Tables recreated successfully');
  } catch (e) {
    console.error('Error:', e);
  }
}
main();
