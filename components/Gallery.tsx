
import React, { useState, useEffect } from 'react';
import { GalleryItem } from '../types';

const Gallery: React.FC = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);

  useEffect(() => {
    const loadGallery = () => {
      const saved = localStorage.getItem('drone_gallery');
      if (saved) {
        setImages(JSON.parse(saved));
      } else {
        // Fallback initial data
        const initial = [
          { id: '1', imageUrl: "https://picsum.photos/id/1015/800/1200", title: "Kapadokya Balonlar", category: "Dış Çekim" },
          { id: '2', imageUrl: "https://picsum.photos/id/1036/800/600", title: "Peri Bacaları", category: "Turizm" },
          { id: '3', imageUrl: "https://picsum.photos/id/16/800/800", title: "Doğa Yürüyüşü", category: "Prodüksiyon" },
          { id: '4', imageUrl: "https://picsum.photos/id/1040/800/1000", title: "Ürgüp Kalesi", category: "Tanıtım" },
          { id: '5', imageUrl: "https://picsum.photos/id/106/800/600", title: "Gün Batımı", category: "Etkinlik" },
          { id: '6', imageUrl: "https://picsum.photos/id/1018/800/900", title: "Göl Manzarası", category: "Emlak" },
        ];
        setImages(initial);
      }
    };

    loadGallery();
    // Listen for changes (in case of multi-tab or local updates)
    window.addEventListener('storage', loadGallery);
    return () => window.removeEventListener('storage', loadGallery);
  }, []);

  return (
    <section id="gallery" className="py-24 md:py-32 bg-dark-900 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 md:mb-16 text-center md:text-left gap-4">
          <div>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4 uppercase tracking-tighter">
              SEÇİLMİŞ <span className="text-brand-500">İŞLER</span>
            </h2>
            <p className="text-gray-400 max-w-md mx-auto md:mx-0">Kapadokya'nın eşsiz manzarasında gerçekleştirdiğimiz bazı projeler.</p>
          </div>
          <a href="#contact" className="hidden md:flex items-center space-x-2 text-white border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all font-medium text-sm tracking-wide">
            <span>PROJENİZ İÇİN YAZIN</span>
          </a>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-8 space-y-4 md:space-y-8">
          {images.map((img) => (
            <div 
              key={img.id} 
              className="break-inside-avoid relative group overflow-hidden rounded-2xl cursor-zoom-in shadow-2xl"
            >
              <img 
                src={img.imageUrl} 
                alt={img.title} 
                loading="lazy"
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-75 group-hover:brightness-100"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6 md:p-8">
                <span className="text-brand-500 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">{img.category}</span>
                <h3 className="text-white text-xl md:text-2xl font-bold font-display">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
