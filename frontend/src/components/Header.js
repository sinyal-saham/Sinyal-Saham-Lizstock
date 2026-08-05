import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Header({ setShowLoginModal, showToast }) {
  const { isAdmin, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    showToast('Anda telah keluar dari Mode Admin', 'info');
  };

  return (
    <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-emerald-500/20">
            <i className="fa-solid fa-chart-line"></i>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400">
              LIZSTOCK VVIP SIGNAL RECAP
            </h1>
            <p className="text-xs text-slate-400 font-medium">Real-time Stock Trading Performance & Signals Management</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isAdmin ? (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold">
                <i className="fa-solid fa-shield-halved text-amber-400"></i> Admin Mode
              </span>
              <button 
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-xs font-semibold transition border border-rose-500/30 flex items-center gap-1.5">
                <i className="fa-solid fa-right-from-bracket"></i> Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Member View
              </span>
              <button 
                onClick={() => setShowLoginModal(true)}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition flex items-center gap-1.5">
                <i className="fa-solid fa-user-gear"></i> Login Admin
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
