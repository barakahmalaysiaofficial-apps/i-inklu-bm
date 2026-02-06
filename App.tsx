
import React, { useState } from 'react';
import Layout from './components/Layout';
import { AppView } from './types';
import Dashboard from './pages/Dashboard';
import Simplifier from './pages/Simplifier';
import ImageTools from './pages/ImageTools';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard />;
      case AppView.SIMPLIFIER:
        return <Simplifier />;
      case AppView.IMAGE_TOOLS:
        return <ImageTools />;
      case AppView.MODULES:
        return (
          <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
            <div className="text-6xl">📚</div>
            <h2 className="text-2xl font-bold text-slate-800">Modul Pembelajaran</h2>
            <p className="text-slate-500 max-w-md">Senarai modul interaktif (Ejaan, Imbuhan, Pemahaman) sedang disediakan untuk Tahap 1 & 2.</p>
            <button 
              onClick={() => setCurrentView(AppView.SIMPLIFIER)}
              className="px-6 py-2 bg-indigo-600 text-white rounded-full font-bold"
            >
              Gunakan Penyederhana AI
            </button>
          </div>
        );
      case AppView.ANALYTICS:
        return (
          <div className="flex flex-col items-center justify-center h-[70vh] text-center space-y-4">
            <div className="text-6xl">📊</div>
            <h2 className="text-2xl font-bold text-slate-800">Laporan Mendalam</h2>
            <p className="text-slate-500 max-w-md">Analisis prestasi individu murid berdasarkan data masa-nyata daripada sistem AI.</p>
            <button 
              onClick={() => setCurrentView(AppView.DASHBOARD)}
              className="px-6 py-2 border-2 border-slate-300 text-slate-600 rounded-full font-bold"
            >
              Kembali ke Dashboard
            </button>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentView={currentView} setCurrentView={setCurrentView}>
      {renderView()}
    </Layout>
  );
};

export default App;
