
import React from 'react';
import { AppView } from '../types';

interface LayoutProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentView, setCurrentView, children }) => {
  const navItems = [
    { id: AppView.DASHBOARD, label: 'Rumah', icon: '🏠' },
    { id: AppView.MODULES, label: 'Modul', icon: '📚' },
    { id: AppView.SIMPLIFIER, label: 'Penyederhana AI', icon: '✨' },
    { id: AppView.IMAGE_TOOLS, label: 'Alat Visual', icon: '🖼️' },
    { id: AppView.ANALYTICS, label: 'Prestasi', icon: '📊' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
            <span className="text-3xl">i</span>-INKLU BM
          </h1>
          <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">Pendidikan Inklusif</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                currentView === item.id
                  ? 'bg-indigo-50 text-indigo-700 font-bold shadow-sm ring-1 ring-indigo-200'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 p-3 bg-slate-100 rounded-lg">
            <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs font-bold">G</div>
            <div>
              <p className="text-xs font-bold">Cikgu Aminah</p>
              <p className="text-[10px] text-slate-500">Guru BM Pendidikan Khas</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        <div className="max-w-5xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
