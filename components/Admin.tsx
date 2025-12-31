
import React, { useState, useEffect } from 'react';
import { Lock, LogOut, Plus, Trash2, Image as ImageIcon, CheckCircle, ArrowLeft } from 'lucide-react';
import { GalleryItem } from '../types';

const Admin: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [newItem, setNewItem] = useState({ imageUrl: '', title: '', category: 'Drone Çekimi' });
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('drone_gallery');
    if (saved) {
      setItems(JSON.parse(saved));
    } else {
      // Varsayılan verileri yükle (ilk seferde)
      const initial = [
        { id: '1', imageUrl: "https://picsum.photos/id/1015/800/1200", title: "Kapadokya Balonlar", category: "Drone Çekimi" },
        { id: '2', imageUrl: "https://picsum.photos/id/1036/800/600", title: "Peri Bacaları", category: "Drone Çekimi" },
      ];
      setItems(initial);
      localStorage.setItem('drone_gallery', JSON.stringify(initial));
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin50') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Hatalı şifre!');
    }
  };

  const addItem = (e: React.FormEvent) => {
    e.preventDefault();
    const item: GalleryItem = {
      id: Date.now().toString(),
      ...newItem
    };
    const updated = [item, ...items];
    setItems(updated);
    localStorage.setItem('drone_gallery', JSON.stringify(updated));
    setNewItem({ imageUrl: '', title: '', category: 'Drone Çekimi' });
  };

  const removeItem = (id: string) => {
    const updated = items.filter(i => i.id !== id);
    setItems(updated);
    localStorage.setItem('drone_gallery', JSON.stringify(updated));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="w-full max-w-md glass-strong p-8 rounded-3xl border border-white/10">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-brand-500/20 rounded-full flex items-center justify-center mb-4">
              <Lock className="text-brand-500 w-8 h-8" />
            </div>
            <h1 className="text-2xl font-bold text-white">Yönetim Paneli</h1>
            <p className="text-gray-500 text-sm">Devam etmek için şifreyi girin</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="password" 
              placeholder="Şifre"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500"
            />
            {error && <p className="text-red-500 text-xs">{error}</p>}
            <button className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 rounded-xl transition-all">
              Giriş Yap
            </button>
            <button type="button" onClick={onExit} className="w-full text-gray-500 text-sm hover:text-white transition-colors flex items-center justify-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Siteye Dön
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <ImageIcon className="text-brand-500" /> Galeri Yönetimi
            </h1>
            <p className="text-gray-500">Seçilmiş işler bölümünü buradan düzenleyebilirsiniz.</p>
          </div>
          <button onClick={onExit} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-6 py-2 rounded-full border border-white/10 transition-all">
            <LogOut className="w-4 h-4" /> Çıkış Yap
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Form */}
          <div className="lg:col-span-1">
            <div className="glass-strong p-6 rounded-2xl border border-white/10 sticky top-24">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Plus className="text-brand-500" /> Yeni Ekle
              </h2>
              <form onSubmit={addItem} className="space-y-4">
                <div>
                  <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Fotoğraf URL</label>
                  <input 
                    required
                    value={newItem.imageUrl}
                    onChange={(e) => setNewItem({...newItem, imageUrl: e.target.value})}
                    placeholder="https://..."
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-brand-500 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase font-bold mb-1 block">Başlık</label>
                  <input 
                    required
                    value={newItem.title}
                    onChange={(e) => setNewItem({...newItem, title: e.target.value})}
                    placeholder="Örn: Kapadokya Gün Batımı"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm focus:border-brand-500 outline-none"
                  />
                </div>
                <button className="w-full bg-brand-600 hover:bg-brand-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-all">
                  <CheckCircle className="w-4 h-4" /> Listeye Ekle
                </button>
              </form>
            </div>
          </div>

          {/* List */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((item) => (
                <div key={item.id} className="relative group rounded-xl overflow-hidden border border-white/10 bg-white/5">
                  <img src={item.imageUrl} className="w-full h-48 object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt={item.title} />
                  <div className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-sm">{item.title}</h3>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest">{item.category}</p>
                    </div>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
