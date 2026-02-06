
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
  { name: 'M1', score: 45 },
  { name: 'M2', score: 52 },
  { name: 'M3', score: 48 },
  { name: 'M4', score: 65 },
  { name: 'M5', score: 72 },
  { name: 'M6', score: 78 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-3xl font-extrabold text-slate-800">Selamat Kembali, Cikgu Aminah</h2>
        <p className="text-slate-500 mt-1">Berikut adalah rumusan prestasi murid Program Pendidikan Khas Integrasi (PPKI).</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Jumlah Murid', value: '45', color: 'bg-blue-500', icon: '👥' },
          { label: 'Modul Selesai', value: '128', color: 'bg-emerald-500', icon: '✅' },
          { label: 'Kadar Peningkatan', value: '+24%', color: 'bg-indigo-500', icon: '📈' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-5">
            <div className={`${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center text-2xl text-white shadow-lg`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Peningkatan Kefahaman (Purata)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="score" radius={[8, 8, 0, 0]} barSize={40}>
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === data.length - 1 ? '#4f46e5' : '#818cf8'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <h3 className="text-xl font-bold text-slate-800 mb-4">Murid Yang Memerlukan Perhatian</h3>
          <div className="space-y-4">
            {[
              { name: 'Irfan Bin Zakaria', issue: 'Kesukaran imbuhan "meN-"', level: 'Disleksia' },
              { name: 'Siti Nurhaliza', issue: 'Kadar bacaan perlahan', level: 'Slow Learner' },
              { name: 'Adam Harith', issue: 'Kesalahan ejaan vokal', level: 'Disleksia' },
            ].map((m, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                <div>
                  <p className="font-bold text-slate-800">{m.name}</p>
                  <p className="text-xs text-rose-500 font-medium">{m.issue}</p>
                </div>
                <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-500 uppercase">
                  {m.level}
                </span>
              </div>
            ))}
            <button className="w-full py-3 text-indigo-600 font-bold text-sm hover:bg-indigo-50 rounded-xl transition-colors">
              Lihat Semua Analitik
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
