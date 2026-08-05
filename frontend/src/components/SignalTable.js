import React, { useState, useMemo } from 'react';

export default function SignalTable({ signals, onDelete, isAdmin }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStrategy, setFilterStrategy] = useState('ALL');
  const [filterStatus, setFilterStatus] = useState('ALL');

  const filteredSignals = useMemo(() => {
    return signals.filter(item => {
      const matchSearch = item.emiten.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStrat = filterStrategy === 'ALL' || item.strategi === filterStrategy;
      const matchStatus = filterStatus === 'ALL' || item.status === filterStatus;
      return matchSearch && matchStrat && matchStatus;
    });
  }, [signals, searchTerm, filterStrategy, filterStatus]);

  return (
    <section className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      <div className="p-5 border-b border-slate-800 flex flex-col md:flex-row justify-between items-stretch md:items-center gap-4">
        <div>
          <h2 className="text-lg font-extrabold text-slate-100 flex items-center gap-2">
            <i className="fa-solid fa-list-ul text-cyan-400"></i> Daftar Rekap Sinyal
          </h2>
          <p className="text-xs text-slate-400">Menampilkan {filteredSignals.length} dari total {signals.length} sinyal</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[180px]">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-xs"></i>
            <input 
              type="text" 
              placeholder="Cari Emiten..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <select 
            value={filterStrategy} 
            onChange={(e) => setFilterStrategy(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500">
            <option value="ALL">Semua Strategi</option>
            <option value="Swing">Swing</option>
            <option value="Scalping">Scalping</option>
            <option value="BPJS">BPJS</option>
            <option value="BSJP">BSJP</option>
          </select>

          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-cyan-500">
            <option value="ALL">Semua Status</option>
            <option value="OPEN">OPEN</option>
            <option value="HOLD">HOLD</option>
            <option value="TP">TP</option>
            <option value="SL">SL</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-950 text-slate-400 font-extrabold uppercase tracking-wider border-b border-slate-800 text-[10px]">
            <tr>
              <th className="p-4">Tanggal</th>
              <th className="p-4">Emiten</th>
              <th className="p-4">Strategi</th>
              <th className="p-4">Status</th>
              <th className="p-4">Area Beli</th>
              <th className="p-4">Harga Terbaru</th>
              <th className="p-4">Area TP</th>
              <th className="p-4">Floating / TP</th>
              <th className="p-4">Gain / Loss</th>
              {isAdmin && <th className="p-4 text-center">Aksi Admin</th>}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-medium">
            {filteredSignals.length === 0 ? (
              <tr>
                <td colSpan={isAdmin ? 10 : 9} className="p-8 text-center text-slate-500">
                  Tidak ada sinyal yang sesuai dengan kriteria.
                </td>
              </tr>
            ) : (
              filteredSignals.map((item) => {
                const gl = parseFloat(item.gain_loss) || 0;
                const fl = parseFloat(item.floating_tp) || 0;

                return (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-4 whitespace-nowrap text-slate-400">{item.tanggal?.split('T')[0] || item.tanggal}</td>
                    <td className="p-4">
                      <span className="font-extrabold text-slate-100 text-sm tracking-wide bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700">
                        {item.emiten}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="bg-slate-950 text-slate-300 px-2 py-1 rounded border border-slate-800 font-semibold">
                        {item.strategi}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-black tracking-wider ${
                        item.status === 'TP' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                        item.status === 'SL' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' :
                        item.status === 'HOLD' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
                        'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-300 font-mono">{item.area_beli}</td>
                    <td className="p-4 font-bold text-slate-100 font-mono">Rp {Number(item.harga_terbaru).toLocaleString()}</td>
                    <td className="p-4 text-slate-300 font-mono">{item.area_tp || '-'}</td>
                    <td className="p-4 font-mono font-semibold">
                      <span className={fl > 0 ? 'text-emerald-400' : fl < 0 ? 'text-rose-400' : 'text-slate-400'}>
                        {fl > 0 ? `+${fl}%` : `${fl}%`}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-bold text-sm">
                      <span className={`inline-flex items-center gap-1 ${gl > 0 ? 'text-emerald-400' : gl < 0 ? 'text-rose-400' : 'text-slate-400'}`}>
                        {gl > 0 ? <i className="fa-solid fa-caret-up"></i> : gl < 0 ? <i className="fa-solid fa-caret-down"></i> : null}
                        {gl > 0 ? `+${gl}%` : `${gl}%`}
                      </span>
                    </td>
                    {isAdmin && (
                      <td className="p-4 text-center">
                        <button 
                          onClick={() => onDelete(item.id)}
                          title="Hapus Sinyal"
                          className="text-slate-500 hover:text-rose-400 transition px-2 py-1">
                          <i className="fa-regular fa-trash-can"></i>
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
