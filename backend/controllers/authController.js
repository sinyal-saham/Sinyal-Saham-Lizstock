const pool = require('../config/db');
const jwt = require('jsonwebtoken');

exports.loginAdmin = async (req, res) => {
  const { pin } = req.body;
  try {
    if (pin === 'Unipiqucuan$' || pin === 'sudahmudah$') {
      const token = jwt.sign({ role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return res.json({ token, message: 'Berhasil masuk sebagai Admin!' });
    }
    
    return res.status(401).json({ message: 'Sandi Admin salah! Gunakan PIN: admin123 atau 1234' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
