import React, { useState, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function AdminForm({ onSignalAdded, showToast, setShowLoginModal }) {
  const { isAdmin } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    tanggal: new Date().toISOString().split('T')[0],
    emiten: '',
    strategi: 'Swing',
    status: 'OPEN',
    area_beli: '',
    harga_terbaru: '',
    area_tp: '',
    floating_tp: '',
    gain_loss: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/signals', formData);
      onSignalAdded(res.data);
      showToast(`Sinyal ${formData.emiten.toUpperCase()} berhasil dipublikasikan!`, 'success');
      setFormData({
        tanggal: new Date().toISOString().split('T')[0],
        emiten: '',
        strategi: 'Swing',
        status: 'OPEN',
        area_beli: '',
        harga_terbaru: '',
        area_tp: '',
        floating_tp: '',
        gain_loss: ''
      });
    } catch (err) {
      showToast('Gagal menambahkan sinyal: ' + (err.response?.data?.message || err.message), 'error');
    }
  };

  if (!isAdmin) {
    return (
      <section className="bg-slate-900/60 border border-slate-800 border-dashed rounded-2xl p-6 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center mx-auto text-slate-400 text-xl">
          <i className="fa-solid fa-lock"></i>
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-200">Form Update Sinyal Khusus Admin</h3>
          <p className="text-xs text-slate-400 mt-0.5">Pengunjung biasa hanya dapat melihat rekap sinyal. Login sebagai Admin untuk menambah atau mengubah data sinyal.</p>
        </div>
        <button 
          onClick={() => setShowLoginModal(true)}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/30 text-xs font-bold transition inline-flex items-center gap-2">
          <i className="fa-solid fa-key"></i> Masuk Sebagai Admin
        </button>
      </section>
    );
  }

  return (
    <section className="bg-gradient-to-b from-slate-900 to-slate-900/90 border-2 border-amber-500/40 rounded-2xl p-6 shadow-2xl shadow-amber-500/5 relative">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <h2 className="text-lg font-extrabold text-slate-100 flex items-center gap-2">
          <i className="fa-solid fa-pen-to-square text-amber-400"></i> Form Update Sinyal Harian <span className="text-xs bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded font-bold border border-amber-500/30">ADMIN PANEL</span>
        </h2>
      </div>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Tanggal</label>
          <input type="date" name="tanggal" value={formData.tanggal} onChange={handleInputChange} required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-amber-500" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Kode Emiten</label>
          <input type="text" name="emiten" placeholder="Contoh: BBRI" value={formData.emiten} onChange={handleInputChange} required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200 uppercase font-bold" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Strategi</label>
          <select name="strategi" value={formData.strategi} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200">
            <option value="Swing">Swing</option>
            <option value="Scalping">Scalping</option>
            <option value="BPJS">BPJS</option>
            <option value="BSJP">BSJP</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Status</label>
          <select name="status" value={formData.status} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200">
            <option value="OPEN">OPEN</option>
            <option value="HOLD">HOLD</option>
            <option value="TP">TP (Take Profit)</option>
            <option value="SL">SL (Stop Loss)</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Area Beli</label>
          <input type="text" name="area_beli" placeholder="5000 - 5100" value={formData.area_beli} onChange={handleInputChange} required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Harga (Update Terbaru)</label>
          <input type="number" name="harga_terbaru" placeholder="5250" value={formData.harga_terbaru} onChange={handleInputChange} required className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Area TP</label>
          <input type="text" name="area_tp" placeholder="5300 / 5500" value={formData.area_tp} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Floating / TP (%)</label>
          <input type="number" step="0.01" name="floating_tp" placeholder="3.5" value={formData.floating_tp} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-1">Gain / Loss (%)</label>
          <input type="number" step="0.01" name="gain_loss" placeholder="4.8" value={formData.gain_loss} onChange={handleInputChange} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-slate-200" />
        </div>
        <div className="flex items-end">
          <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-2.5 px-4 rounded-xl shadow-lg shadow-amber-500/20 text-xs flex items-center justify-center gap-2">
            <i className="fa-solid fa-plus"></i> Publish Sinyal
          </button>
        </div>
      </form>
    </section>
  );
}
