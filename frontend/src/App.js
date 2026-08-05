import React, { useState, useEffect, useContext } from 'react';
import API from './services/api';
import Header from './components/Header';
import AdminForm from './components/AdminForm';
import SignalTable from './components/SignalTable';
import MetricsBar from './components/MetricsBar';
import DailyRecap from './components/DailyRecap';
import TradingRules from './components/TradingRules';
import LoginModal from './components/LoginModal';
import { AuthContext } from './context/AuthContext';

export default function App() {
  const [signals, setSignals] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const { isAdmin } = useContext(AuthContext);

  const fetchSignals = async () => {
    try {
      const res = await API.get('/signals');
      setSignals(res.data);
    } catch (err) {
      showToast('Gagal memuat data dari database', 'error');
    }
  };

  useEffect(() => {
    fetchSignals();
  }, []);

  const showToast = (msg, type = 'info') => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/signals/${id}`);
      setSignals(signals.filter((item) => item.id !== id));
      showToast('Sinyal berhasil dihapus', 'info');
    } catch (err) {
      showToast('Gagal menghapus sinyal', 'error');
    }
  };

  return (
    <div className="min-h-screen pb-16 bg-[#090d16] text-slate-100 font-sans">
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce">
          <div className={`px-4 py-3 rounded-xl shadow-2xl border text-xs font-bold flex items-center gap-2 ${
            toastMessage.type === 'success' ? 'bg-emerald-950 border-emerald-500 text-emerald-300' :
            toastMessage.type === 'error' ? 'bg-rose-950 border-rose-500 text-rose-300' :
            'bg-slate-900 border-slate-700 text-slate-200'
          }`}>
            <span>{toastMessage.msg}</span>
          </div>
        </div>
      )}

      <Header setShowLoginModal={setShowLoginModal} showToast={showToast} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        <SignalTable signals={signals} onDelete={handleDelete} isAdmin={isAdmin} />
        <MetricsBar signals={signals} />
        <DailyRecap signals={signals} />
        <AdminForm onSignalAdded={(newSig) => setSignals([newSig, ...signals])} showToast={showToast} setShowLoginModal={setShowLoginModal} />
        <TradingRules />
      </main>

      {showLoginModal && <LoginModal setShowLoginModal={setShowLoginModal} showToast={showToast} />}
    </div>
  );
}
