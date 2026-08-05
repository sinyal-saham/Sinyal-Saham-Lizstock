import React from 'react';

export default function TradingRules() {
  return (
    <footer className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="space-y-4">
        <h3 className="text-base font-extrabold text-amber-400 flex items-center gap-2 border-b border-slate-800 pb-3">
          <i className="fa-solid fa-shield-halved text-amber-400"></i> Trading Rules
        </h3>
        <ul className="text-xs text-slate-300 space-y-2.5 font-medium">
          <li className="flex items-start gap-2">
            <span className="font-bold text-amber-400 min-w-[65px]">Buy 1 :</span>
            <span>Cicil santai (High Risk)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-amber-400 min-w-[65px]">Buy 2 :</span>
            <span>Haka</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-rose-400 min-w-[65px]">SL :</span>
            <span>Disiplin 3%, mentok toleransi 5% (Wajib out)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-emerald-400 min-w-[65px]">Tp 1 :</span>
            <span>Jual 70% + SL PLUS di area modal</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="font-bold text-emerald-400 min-w-[65px]">Tp 2 :</span>
            <span>Jual semua</span>
          </li>
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="text-base font-extrabold text-cyan-400 flex items-center gap-2 border-b border-slate-800 pb-3">
          <i className="fa-solid fa-chess text-cyan-400"></i> Strategi & Money Management
        </h3>
        <div className="text-xs text-slate-300 space-y-2 font-medium">
          <p><strong className="text-cyan-400 font-bold">BPJS :</strong> Beli pagi jual sore</p>
          <p><strong className="text-cyan-400 font-bold">BSJP :</strong> Beli Sore Jual Pagi</p>
          <p><strong className="text-cyan-400 font-bold">Scalping :</strong> Ambil 1-5% SAJA, Tidak wajib inap</p>
          <p><strong className="text-cyan-400 font-bold">Swing :</strong> Sesuai plan, belum masuk plan, Jangan SL/TP</p>
          
          <div className="pt-3 border-t border-slate-800/80 mt-3">
            <p className="font-bold text-slate-200 mb-2">Money Management Masing-Masing:</p>
            <div className="flex flex-wrap gap-2">
              <span className="bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-lg text-emerald-400 font-bold text-xs">
                <i className="fa-solid fa-chart-pie mr-1.5"></i> Swing: 70% porto
              </span>
              <span className="bg-cyan-500/10 border border-cyan-500/30 px-3 py-1.5 rounded-lg text-cyan-400 font-bold text-xs">
                <i className="fa-solid fa-bolt mr-1.5"></i> Scalping: 30% porto
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
