const mysql = require('mysql2/promise');
require('dotenv').config();

const whatsappNumber = process.argv[2] || process.env.WHATSAPP_NUMBER || '256706506319';
const displayPhone = process.argv[3] || '0706506319';

async function main() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'agrabo_db'
  });

  await connection.query(
    'UPDATE site_settings SET whatsappNumber = ?, phonePrimary = ? WHERE id = 1',
    [whatsappNumber, displayPhone]
  );

  const [rows] = await connection.query(
    'SELECT whatsappNumber, phonePrimary FROM site_settings WHERE id = 1'
  );

  console.log(rows[0]);
  await connection.end();
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
