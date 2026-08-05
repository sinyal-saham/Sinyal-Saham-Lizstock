const pool = require('../config/db');

// 1. Ambil Semua Sinyal
exports.getAllSignals = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM signals ORDER BY tanggal DESC, id DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error getAllSignals:', err);
    res.status(500).json({ message: 'Gagal mengambil data: ' + err.message });
  }
};

// 2. Tambah Sinyal Baru
exports.createSignal = async (req, res) => {
  const { tanggal, emiten, strategi, status, area_beli, harga_terbaru, area_tp, floating_tp, gain_loss } = req.body;

  try {
    const query = `
      INSERT INTO signals (tanggal, emiten, strategi, status, area_beli, harga_terbaru, area_tp, floating_tp, gain_loss)
      VALUES (?, UPPER(?), ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      tanggal,
      emiten,
      strategi,
      status || 'OPEN',
      area_beli,
      parseFloat(harga_terbaru) || 0,
      area_tp || '',
      parseFloat(floating_tp) || 0,
      parseFloat(gain_loss) || 0
    ];

    const [result] = await pool.query(query, values);

    // Ambil data yang baru saja dimasukkan berdasarkan insertId MySQL
    const [newSignal] = await pool.query('SELECT * FROM signals WHERE id = ?', [result.insertId]);

    res.status(201).json(newSignal[0]);
  } catch (err) {
    console.error('Error createSignal:', err);
    res.status(500).json({ message: 'Gagal menyimpan data: ' + err.message });
  }
};

// 3. Update Sinyal
exports.updateSignal = async (req, res) => {
  const { id } = req.params;
  const { tanggal, emiten, strategi, status, area_beli, harga_terbaru, area_tp, floating_tp, gain_loss } = req.body;

  try {
    const query = `
      UPDATE signals 
      SET tanggal=?, emiten=UPPER(?), strategi=?, status=?, area_beli=?, harga_terbaru=?, area_tp=?, floating_tp=?, gain_loss=?
      WHERE id=?
    `;

    const values = [
      tanggal,
      emiten,
      strategi,
      status,
      area_beli,
      parseFloat(harga_terbaru) || 0,
      area_tp || '',
      parseFloat(floating_tp) || 0,
      parseFloat(gain_loss) || 0,
      id
    ];

    const [result] = await pool.query(query, values);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }

    const [updatedSignal] = await pool.query('SELECT * FROM signals WHERE id = ?', [id]);
    res.json(updatedSignal[0]);
  } catch (err) {
    console.error('Error updateSignal:', err);
    res.status(500).json({ message: 'Gagal memperbarui data: ' + err.message });
  }
};

// 4. Hapus Sinyal
exports.deleteSignal = async (req, res) => {
  const { id } = req.params;

  try {
    // Ambil data sebelum dihapus untuk respon
    const [existing] = await pool.query('SELECT * FROM signals WHERE id = ?', [id]);

    if (existing.length === 0) {
      return res.status(404).json({ message: 'Data tidak ditemukan' });
    }

    await pool.query('DELETE FROM signals WHERE id = ?', [id]);

    res.json({ message: 'Sinyal berhasil dihapus', deleted: existing[0] });
  } catch (err) {
    console.error('Error deleteSignal:', err);
    res.status(500).json({ message: 'Gagal menghapus data: ' + err.message });
  }
};