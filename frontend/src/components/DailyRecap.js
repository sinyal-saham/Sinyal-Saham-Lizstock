import React, { useMemo } from 'react';

export default function DailyRecap({ signals }) {
  const dailyRecap = useMemo(() => {
    const map = {};
    signals.forEach(item => {
      const date = item.tanggal?.split('T')[0] || item.tanggal;
      if (!map[date]) {
        map[date] = {
          date,
          totalEmiten: 0,
          totalGainLossPercent: 0,
          winCount: 0,
          lossCount: 0,
          holdCount: 0,
          openCount: 0
        };
      }
      map[date].totalEmiten += 1;
      const gl = parseFloat(item.gain_loss) || 0;
      map[date].totalGainLossPercent += gl;

      if (item.status === 'TP' || gl > 0) map[date].winCount += 1;
      else if (item.status === 'SL' || gl < 0) map[date].lossCount += 1;
      else if (item.status === 'HOLD') map[date].holdCount += 1;
      else map[date].openCount += 1;
    });

    return Object.values(map).sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [signals]);

  return (
    <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-5 border-b border-slate-800 pb-4">
        <div>
          <h2 className="text-lg font-extrabold text-slate-100 flex items-center gap-2">
            <i className="fa-solid fa-calendar-days text-cyan-400"></i> Persentase Total Return Perhari
          </h2>
          <p className="text-xs text-slate-400">Rekap total persentase gain/loss gabungan seluruh emiten per tanggal</p>
        </div>
        <span className="text-xs font-semibold text-slate-400 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
          {dailyRecap.length} Hari Aktif
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {dailyRecap.length === 0 ? (
          <p className="text-slate-500 text-sm col-span-full text-center py-4">Belum ada data rekapitulasi harian.</p>
        ) : (
          dailyRecap.map(item => {
            const isPositive = item.totalGainLossPercent >= 0;
            return (
              <div key={item.date} className="bg-slate-950/70 border border-slate-800 hover:border-slate-700 p-4 rounded-xl space-y-3 transition group">
                <div className="flex justify-between items-center text-xs font-bold text-slate-300 border-b border-slate-800/80 pb-2">
                  <span className="flex items-center gap-2 text-cyan-400">
                    <i className="fa-regular fa-calendar"></i> {item.date}
                  </span>
                  <span className="bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                    {item.totalEmiten} Emiten
                  </span>
                </div>

                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Total Return Hari Ini</div>
                    <div className={`text-xl font-black ${isPositive ? 'text-emerald-400' : 'text-rose-500'}`}>
                      {isPositive ? `+${item.totalGainLossPercent.toFixed(2)}%` : `${item.totalGainLossPercent.toFixed(2)}%`}
                    </div>
                  </div>
                  <div className={`text-sm font-extrabold p-2 rounded-lg ${isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-500'}`}>
                    <i className={`fa-solid ${isPositive ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down'}`}></i>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/50">
                  <span><strong className="text-emerald-400">{item.winCount}</strong> Win</span>
                  <span><strong className="text-rose-400">{item.lossCount}</strong> Loss</span>
                  <span><strong className="text-amber-400">{item.holdCount + item.openCount}</strong> Active</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
