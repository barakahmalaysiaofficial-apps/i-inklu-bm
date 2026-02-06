
import React, { useState } from 'react';
import { analyzeBookPage, editLearningImage } from '../services/geminiService';

const ImageTools: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [editPrompt, setEditPrompt] = useState('');
  const [editedImage, setEditedImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setAnalysis('');
        setEditedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const runAnalysis = async () => {
    if (!selectedImage) return;
    setLoading(true);
    try {
      const base64 = selectedImage.split(',')[1];
      const result = await analyzeBookPage(base64);
      setAnalysis(result);
    } catch (err) {
      alert("Gagal menganalisis imej.");
    } finally {
      setLoading(false);
    }
  };

  const runEdit = async () => {
    if (!selectedImage || !editPrompt) return;
    setLoading(true);
    try {
      const base64 = selectedImage.split(',')[1];
      const result = await editLearningImage(base64, editPrompt);
      setEditedImage(result);
    } catch (err) {
      alert("Gagal mengedit imej.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-2xl font-bold text-slate-800">Alat Visual & Imbasan Buku</h2>
        <p className="text-slate-500">Gunakan kamera atau muat naik foto buku untuk dianalisis oleh AI.</p>
      </header>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="p-8 border-2 border-dashed border-slate-300 rounded-3xl bg-white text-center">
            {selectedImage ? (
              <div className="space-y-4">
                <img src={selectedImage} alt="Preview" className="max-h-64 mx-auto rounded-2xl shadow-md" />
                <button 
                  onClick={() => setSelectedImage(null)}
                  className="text-rose-500 font-bold text-sm"
                >
                  Ganti Imej
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-2xl text-slate-400">
                  📸
                </div>
                <div>
                  <p className="font-bold text-slate-700">Muat naik gambar</p>
                  <p className="text-xs text-slate-500">Ambil gambar muka surat buku BM</p>
                </div>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileChange}
                  className="hidden" 
                  id="image-upload" 
                />
                <label 
                  htmlFor="image-upload"
                  className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold cursor-pointer hover:bg-indigo-700"
                >
                  Pilih Gambar
                </label>
              </div>
            )}
          </div>

          {selectedImage && (
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <span className="text-xl">🪄</span> Ubah Imej Pembelajaran
              </h3>
              <p className="text-xs text-slate-500">Tambah elemen visual (cth: "tambah gambar kartun kucing di sebelah teks" atau "buat latar belakang lebih ceria")</p>
              <input 
                type="text" 
                placeholder="Apa yang anda mahu AI buat?"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={editPrompt}
                onChange={(e) => setEditPrompt(e.target.value)}
              />
              <button 
                onClick={runEdit}
                disabled={loading || !editPrompt}
                className="w-full py-3 bg-indigo-100 text-indigo-700 font-bold rounded-xl hover:bg-indigo-200 disabled:opacity-50"
              >
                Ubah Suai Imej
              </button>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <button
            onClick={runAnalysis}
            disabled={loading || !selectedImage}
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 disabled:opacity-50 shadow-lg shadow-emerald-100"
          >
            {loading ? 'Sila tunggu...' : '🔍 Analisis & Ekstrak Teks'}
          </button>

          {editedImage && (
            <div className="bg-white p-4 rounded-3xl border border-indigo-200 shadow-xl overflow-hidden animate-in zoom-in-95">
              <p className="text-xs font-bold text-indigo-600 mb-2 uppercase">Imej Yang Telah Diubah Suai</p>
              <img src={editedImage} alt="Edited" className="w-full rounded-2xl" />
            </div>
          )}

          {analysis && (
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4 animate-in slide-in-from-right-4">
              <h3 className="text-xl font-bold text-slate-800">Keputusan Analisis AI</h3>
              <div className="prose prose-slate max-w-none">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 whitespace-pre-wrap text-slate-700">
                  {analysis}
                </div>
              </div>
              <button 
                onClick={() => alert("Teks telah dihantar ke modul pembelajaran!")}
                className="w-full py-3 border-2 border-indigo-600 text-indigo-600 font-bold rounded-xl hover:bg-indigo-50"
              >
                Gunakan Dalam Modul
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageTools;
