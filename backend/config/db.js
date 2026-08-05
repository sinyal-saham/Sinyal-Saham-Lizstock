const { Pool } = require('pg');
require('dotenv').config();

// Membuat connection pool menggunakan URL dari Neon.tech
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Wajib diaktifkan untuk koneksi SSL Neon.tech
  }
});

// Tes koneksi database PostgreSQL Neon.tech
pool.connect()
  .then(client => {
    console.log('Database PostgreSQL Neon.tech Connected!');
    client.release();
  })
  .catch(err => {
    console.error('Koneksi PostgreSQL Neon Gagal:', err.message);
  });

module.exports = pool;