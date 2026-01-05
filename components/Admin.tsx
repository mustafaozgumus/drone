
import React, { useState, useEffect } from 'react';
import { Lock, LogOut, Plus, Trash2, Image as ImageIcon, CheckCircle, ArrowLeft, Save, Loader2, Globe, RefreshCcw, AlertTriangle } from 'lucide-react';
import { GalleryItem } from '../types';
import { fetchGallery, updateFullGallery } from '../services/firebase';
import { siteData } from '../data';

const Admin: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [newItem, setNewItem] = useState({ imageUrl: '', title: '', category: 'Drone Çekimi' });
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadData();
    }
  }, [isAuthenticated]);

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchGallery();
      setItems(data);
    } catch (err) {
      setError('Veriler yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin50') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Hatalı şifre!');
    }
  };

  const addToLocalList = (e: React.FormEvent) => {
    e.preventDefault();
    const tempItem: GalleryItem = {
      id: Date.now().toString(),
      ...newItem
    };
    setItems([tempItem, ...items]);
    setNewItem({ imageUrl: '', title: '', category: 'Drone Çekimi' });
    setHasChanges(true);
  };

  const removeFromLocalList = (id: string) => {
    setItems(items.filter(i => i.id !== id));
    setHasChanges(true);
  };

  const handleFinalSave = async () => {
    setSyncing(true);
    try {
      await updateFullGallery(items);
      setHasChanges(false);
      alert("Tüm değişiklikler başarıyla yayınlandı!");
    } catch (err) {
      alert("Hata oluştu: " + err);
    } finally {
      setSyncing(false);
    }
  };

  const importDefaults = () => {
    if(window.confirm("Sitedeki varsayılan fotoğrafları listeye eklemek istiyor musunuz? (Mevcut listenin üzerine eklenir)")) {
      const defaultItems: GalleryItem[] = siteData.gallery.map((g, idx) => ({
        id: `default-${idx}`,
        imageUrl: g.src,
        title: g.title,
        category: "Kapadokya"
      }));
      setItems([...items, ...defaultItems]);
      setHasChanges(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6 font-sans">
        <div className="w-full max-w-md glass-strong p-10 rounded-[2.5rem] border border-white/10 shadow-2xl animate-fade-in">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-brand-500/10 rounded-full flex items-center justify-center mb-6 shadow-inner border border-brand-500/20">
              <Lock className="text-brand-500 w-10 h-10" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter">Panel Erişimi</h1>
            <p className="text-gray-500 text-sm mt-2">Drone Çekimi Nevşehir Yönetim</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <input 
              type="password" 
              placeholder="Yönetici Şifresi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-500 transition-all text-lg text-center tracking-[0.5em]"
            />
            {error && <p className="text-red-500 text-sm font-medium animate-pulse text-center">{error}</p>}
            <button className="w-full bg-brand-600 hover:bg-brand-500 text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-brand-600/20 active:scale-95 text-lg">
              SİSTEME GİRİŞ YAP
            </button>
            <button type="button" onClick={onExit} className="w-full text-gray-500 text-sm hover:text-white transition-colors flex items-center justify-center gap-2 font-medium">
              <ArrowLeft className="w-4 h-4" /> Web Sitesine Dön
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4 md:p-12 font-sans selection:bg-brand-500 selection:text-white">
      <div className="max-w-7xl mx-auto">
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-md py-6 border-b border-white/10 mb-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="animate-fade-in">
            <h1 className="text-3xl font-black tracking-tighter flex items-center gap-3">
              <ImageIcon className="text-brand-500" /> GALERİ YÖNETİMİ
            </h1>
            <p className="text-gray-500 text-sm mt-1">Yapılan her değişiklik 'KAYDET' butonuna basana kadar taslaktır.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
             <button onClick={importDefaults} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600/10 hover:bg-blue-600 text-blue-500 hover:text-white px-4 py-3 rounded-xl border border-blue-600/20 transition-all font-bold text-xs uppercase tracking-widest">
               <RefreshCcw className="w-4 h-4" /> Örnekleri Yükle
             </button>
             <button onClick={handleFinalSave} disabled={!hasChanges || syncing} className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-xl transition-all font-black text-sm uppercase tracking-widest shadow-xl ${hasChanges ? 'bg-brand-600 shadow-brand-600/20 animate-pulse' : 'bg-white/10 text-gray-500 cursor-not-allowed'}`}>
               {syncing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} {syncing ? 'KAYDEDİLİYOR...' : 'DEĞİŞİKLİKLERİ KAYDET'}
             </button>
             <button onClick={onExit} className="p-3 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all">
                <LogOut className="w-5 h-5" />
             </button>
          </div>
        </div>

        {hasChanges && (
          <div className="bg-brand-500/10 border border-brand-500/20 p-4 rounded-2xl mb-8 flex items-center gap-3 text-brand-500 animate-slide-up">
            <AlertTriangle className="w-5 h-5" />
            <span className="text-sm font-bold uppercase tracking-widest">Dikkat: Henüz kaydedilmemiş değişiklikleriniz var!</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Add Form */}
          <div className="lg:col-span-4">
            <div className="glass-strong p-8 rounded-[2rem] border border-white/10 sticky top-32 shadow-2xl">
              <h2 className="text-xl font-black mb-8 flex items-center gap-3 tracking-tight uppercase">
                <Plus className="text-brand-500" /> Listeye Yeni İş Ekle
              </h2>
              <form onSubmit={addToLocalList} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em] ml-1">Görsel Adresi (URL)</label>
                  <input 
                    required
                    value={newItem.imageUrl}
                    onChange={(e) => setNewItem({...newItem, imageUrl: e.target.value})}
                    placeholder="https://..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-brand-500 outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em] ml-1">Çekim Başlığı</label>
                  <input 
                    required
                    value={newItem.title}
                    onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                    placeholder="Örn: Kapadokya Düğün"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-4 text-sm focus:border-brand-500 outline-none transition-all"
                  />
                </div>
                <button 
                  className="w-full bg-white text-black font-black py-5 rounded-xl flex items-center justify-center gap-3 transition-all hover:bg-brand-500 hover:text-white active:scale-95"
                >
                  <Plus /> LİSTEYE EKLE
                </button>
              </form>
            </div>
          </div>

          {/* List Display */}
          <div className="lg:col-span-8">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-32">
                <Loader2 className="w-12 h-12 animate-spin text-brand-500 mb-4" />
                <p className="text-gray-500 font-black tracking-widest text-xs uppercase">Veritabanına bağlanılıyor...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {items.length === 0 && (
                  <div className="col-span-2 text-center py-32 bg-white/5 rounded-[2.5rem] border border-dashed border-white/10">
                    <ImageIcon className="w-16 h-16 text-gray-800 mx-auto mb-4" />
                    <p className="text-gray-600 font-bold uppercase tracking-widest text-xs">Şu an liste boş. Hemen eklemeye başlayın.</p>
                  </div>
                )}
                {items.map((item) => (
                  <div key={item.id} className="group relative rounded-3xl overflow-hidden border border-white/10 bg-dark-800 shadow-2xl transition-all hover:border-brand-500">
                    <div className="aspect-video relative overflow-hidden">
                       <img src={item.imageUrl} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-700" alt={item.title} />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                       <button 
                        onClick={() => removeFromLocalList(item.id)}
                        className="absolute top-4 right-4 p-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all shadow-xl active:scale-90"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="p-6">
                      <p className="text-[9px] text-brand-500 uppercase font-black tracking-widest mb-1">{item.category}</p>
                      <h3 className="font-black text-lg text-white tracking-tight leading-tight">{item.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
