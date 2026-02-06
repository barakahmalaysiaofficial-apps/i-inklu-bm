
import React, { useState, useRef } from 'react';
import { simplifyText, generateBMVoice, decodeAudioToBuffer } from '../services/geminiService';
import AffixHighlighter from '../components/AffixHighlighter';

const Simplifier: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [simplified, setSimplified] = useState('');
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [dyslexiaMode, setDyslexiaMode] = useState(true);

  const handleSimplify = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    try {
      const result = await simplifyText(inputText);
      setSimplified(result);
    } catch (error) {
      console.error(error);
      alert("Gagal memudahkan teks.");
    } finally {
      setLoading(false);
    }
  };

  const playAudio = async () => {
    if (!simplified) return;
    setPlaying(true);
    try {
      const audioData = await generateBMVoice(simplified);
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const buffer = await decodeAudioToBuffer(audioData, audioCtx);
      const source = audioCtx.createBufferSource();
      source.buffer = buffer;
      source.connect(audioCtx.destination);
      source.onended = () => setPlaying(false);
      source.start();
    } catch (error) {
      console.error(error);
      setPlaying(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Penyederhana AI</h2>
          <p className="text-slate-500">Tukar ayat susah kepada ayat yang senang difahami murid.</p>
        </div>
        <div className="flex gap-2">
           <button 
            onClick={() => setDyslexiaMode(!dyslexiaMode)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              dyslexiaMode ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-200 text-slate-600'
            }`}
          >
            Mod Disleksia: {dyslexiaMode ? 'Aktif' : 'Tutup'}
          </button>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label className="block text-sm font-bold text-slate-700 uppercase tracking-tight">Teks Asal (Susah)</label>
          <textarea
            className="w-full h-64 p-4 rounded-2xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg resize-none shadow-inner"
            placeholder="Masukkan ayat di sini..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            onClick={handleSimplify}
            disabled={loading}
            className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Menyederhanakan...
              </span>
            ) : (
              <>✨ Permudahkan Sekarang</>
            )}
          </button>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-bold text-slate-700 uppercase tracking-tight">Teks Inklusif (Senang)</label>
          {simplified ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
              <AffixHighlighter text={simplified} isDyslexiaMode={dyslexiaMode} />
              <div className="flex gap-4">
                <button
                  onClick={playAudio}
                  disabled={playing}
                  className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 disabled:opacity-50"
                >
                  {playing ? '🔊 Sedang Dibaca...' : '🔊 Dengar Sebutan'}
                </button>
              </div>
            </div>
          ) : (
            <div className="h-64 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 bg-white">
              Hasil akan muncul di sini
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Simplifier;
