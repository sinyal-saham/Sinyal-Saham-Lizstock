const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Impor koneksi database PostgreSQL (Neon.tech)
const db = require('./config/db');

// Inisialisasi Express App (HANYA 1 KALI)
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/signals', require('./routes/signalRoutes'));

// Root Endpoint Test
app.get('/', (req, res) => {
  res.send('API Sinyal Saham Lizstock Is Running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
