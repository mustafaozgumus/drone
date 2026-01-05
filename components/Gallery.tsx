
import React, { useState, useEffect } from 'react';
import { GalleryItem } from '../types';
import { subscribeToGallery } from '../services/firebase';
import { Loader2, ImageIcon } from 'lucide-react';

const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Firebase real-time subscription
    const unsubscribe = subscribeToGallery((data) => {
      setImages(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="py-40 flex flex-col items-center justify-center bg-dark-900">
        <Loader2 className="w-12 h-12 text-brand-500 animate-spin mb-6" />
        <p className="text-gray-500 text-[10px] font-black tracking-[0.4em] uppercase">Sinerji Yükleniyor</p>
      </div>
    );
  }

  return (
    <section id="gallery" className="py-24 md:py-32 bg-dark-900 relative">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 md:mb-24 text-center md:text-left gap-8">
          <div className="animate-fade-in max-w-2xl">
            <h2 className="font-display text-4xl md:text-8xl font-black text-white mb-6 uppercase tracking-tighter leading-[0.85]">
              SEÇİLMİŞ <span className="text-brand-500">İŞLER</span>
            </h2>
            <div className="h-1.5 w-24 bg-brand-500 mb-6 mx-auto md:mx-0"></div>
            <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed">
              Kapadokya'nın masalsı dokusunu gökyüzünden yakaladığımız profesyonel prodüksiyonlarımız.
            </p>
          </div>
          <a href="#contact" className="group flex items-center gap-4 bg-white text-black px-10 py-5 rounded-2xl hover:bg-brand-500 hover:text-white transition-all font-black text-sm tracking-widest uppercase active:scale-95 shadow-2xl shadow-white/5">
            <span>YENİ PROJE BAŞLAT</span>
          </a>
        </div>

        {images.length === 0 ? (
          <div className="text-center py-32 border border-dashed border-white/10 rounded-[3rem] animate-pulse">
             <ImageIcon className="w-16 h-16 text-gray-800 mx-auto mb-4" />
             <p className="text-gray-600 font-black uppercase tracking-widest text-xs">Henüz sergilenecek iş bulunmuyor.</p>
          </div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-12 space-y-6 md:space-y-12 animate-fade-in">
            {images.map((img) => (
              <div 
                key={img.id} 
                className="break-inside-avoid relative group overflow-hidden rounded-[2.5rem] cursor-zoom-in shadow-2xl border border-white/5 bg-dark-800/50 backdrop-blur-sm"
              >
                <img 
                  src={img.imageUrl} 
                  alt={img.title} 
                  loading="lazy"
                  className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-[1.5s] ease-out filter brightness-75 group-hover:brightness-100"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 flex flex-col justify-end p-8 md:p-12 translate-y-8 group-hover:translate-y-0">
                  <span className="text-brand-500 text-[10px] font-black tracking-[0.4em] uppercase mb-3">{img.category}</span>
                  <h3 className="text-white text-2xl md:text-4xl font-black font-display tracking-tighter leading-tight">{img.title}</h3>
                  <div className="w-0 h-1 bg-brand-500 mt-6 group-hover:w-full transition-all duration-1000"></div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
