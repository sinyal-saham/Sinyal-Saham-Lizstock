import React, { useState, useContext } from 'react';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

export default function LoginModal({ setShowLoginModal, showToast }) {
  const [adminPinInput, setAdminPinInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const { setToken } = useContext(AuthContext);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { pin: adminPinInput });
      setToken(res.data.token);
      setShowLoginModal(false);
      showToast(res.data.message, 'success');
    } catch (err) {
      setLoginError(err.response?.data?.message || 'Gagal login admin');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-5">
        <button 
          onClick={() => { setShowLoginModal(false); setLoginError(''); }}
          className="absolute right-4 top-4 text-slate-400 hover:text-slate-200">
          <i className="fa-solid fa-xmark text-lg"></i>
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto text-amber-400 text-xl shadow-lg shadow-amber-500/10">
            <i className="fa-solid fa-user-shield"></i>
          </div>
          <h3 className="text-lg font-extrabold text-slate-100">Login Admin Panel</h3>
          <p className="text-xs text-slate-400">Masukkan kata sandi admin untuk mengakses form input sinyal.</p>
        </div>

        <form onSubmit={handleAdminLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Kata Sandi / PIN Admin</label>
            <input 
              type="password" 
              placeholder="Masukkan kata sandi..." 
              value={adminPinInput}
              onChange={(e) => setAdminPinInput(e.target.value)}
              autoFocus
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 focus:outline-none focus:border-amber-500 transition"
            />
            <p className="text-[11px] text-slate-500 mt-1">Hint Default Admin: <code className="text-amber-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">admin</code> atau <code className="text-amber-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">Admin</code></p>
          </div>

          {loginError && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs p-3 rounded-xl flex items-center gap-2">
              <i className="fa-solid fa-triangle-exclamation"></i>
              <span>{loginError}</span>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button 
              type="button" 
              onClick={() => { setShowLoginModal(false); setLoginError(''); }}
              className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold py-2.5 rounded-xl text-xs transition">
              Batal
            </button>
            <button 
              type="submit" 
              className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-2.5 rounded-xl text-xs transition shadow-lg shadow-amber-500/20">
              Masuk Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
