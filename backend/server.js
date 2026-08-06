const express = require('express');
const cors = require('cors');
const app = express();

// Izinkan akses dari mana saja (termasuk Vercel)
app.use(cors());

app.use(express.json());
require('dotenv').config();

// Impor koneksi database PostgreSQL (Neon.tech)
// Sesuaikan path './config/db' jika file db.js Anda berada di folder lain (misal: './db')
const db = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/signals', require('./routes/signalRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
