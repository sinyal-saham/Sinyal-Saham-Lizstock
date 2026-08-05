import React, { useMemo } from 'react';

export default function MetricsBar({ signals }) {
  const overallStats = useMemo(() => {
    const total = signals.length;
    const win = signals.filter(s => s.status === 'TP' || parseFloat(s.gain_loss) > 0).length;
    const loss = signals.filter(s => s.status === 'SL' || parseFloat(s.gain_loss) < 0).length;
    const totalGain = signals.reduce((acc, s) => acc + (parseFloat(s.gain_loss) || 0), 0);
    const winRate = (win + loss) > 0 ? ((win / (win + loss)) * 100).toFixed(1) : '0.0';

    return { total, win, loss, totalGain: totalGain.toFixed(2), winRate };
  }, [signals]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
        <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Total Signals</div>
        <div className="text-2xl sm:text-3xl font-extrabold text-slate-100">{overallStats.total} <span className="text-xs font-normal text-slate-400">Emiten</span></div>
        <div className="absolute right-4 bottom-4 text-slate-800 text-4xl"><i className="fa-solid fa-list-check"></i></div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
        <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Win Rate</div>
        <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">{overallStats.winRate}%</div>
        <div className="text-xs text-slate-400 mt-1"><span className="text-emerald-400 font-bold">{overallStats.win} TP</span> vs <span className="text-rose-400 font-bold">{overallStats.loss} SL</span></div>
        <div className="absolute right-4 bottom-4 text-slate-800 text-4xl"><i className="fa-solid fa-bullseye"></i></div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
        <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Total Return (%)</div>
        <div className={`text-2xl sm:text-3xl font-extrabold ${parseFloat(overallStats.totalGain) >= 0 ? 'text-emerald-400' : 'text-rose-500'}`}>
          {parseFloat(overallStats.totalGain) >= 0 ? `+${overallStats.totalGain}%` : `${overallStats.totalGain}%`}
        </div>
        <div className="text-xs text-slate-400 mt-1">Akumulasi seluruh sinyal</div>
        <div className="absolute right-4 bottom-4 text-slate-800 text-4xl"><i className="fa-solid fa-arrow-trend-up"></i></div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 relative overflow-hidden">
        <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Active / Hold</div>
        <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">
          {signals.filter(s => s.status === 'OPEN' || s.status === 'HOLD').length} <span className="text-xs font-normal text-slate-400">Sinyal</span>
        </div>
        <div className="text-xs text-slate-400 mt-1">Sedang berjalan</div>
        <div className="absolute right-4 bottom-4 text-slate-800 text-4xl"><i className="fa-solid fa-clock font-normal"></i></div>
      </div>
    </div>
  );
}
