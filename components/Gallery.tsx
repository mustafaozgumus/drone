import React from 'react';

const Gallery: React.FC = () => {
  // Picsum images
  const images = [
    { src: "https://picsum.photos/id/1015/800/1200", title: "Kapadokya Balonlar", height: "h-96" },
    { src: "https://picsum.photos/id/1036/800/600", title: "Peri Bacaları", height: "h-64" },
    { src: "https://picsum.photos/id/16/800/800", title: "Doğa Yürüyüşü", height: "h-80" },
    { src: "https://picsum.photos/id/1040/800/1000", title: "Ürgüp Kalesi", height: "h-[450px]" },
    { src: "https://picsum.photos/id/106/800/600", title: "Gün Batımı", height: "h-64" },
    { src: "https://picsum.photos/id/1018/800/900", title: "Göl Manzarası", height: "h-96" },
  ];

  return (
    <section id="gallery" className="py-32 bg-dark-900 relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">SEÇİLMİŞ <span className="text-brand-500">İŞLER</span></h2>
            <p className="text-gray-400 max-w-md">Sanat ve teknolojinin buluştuğu nokta.</p>
          </div>
          <button className="hidden md:flex items-center space-x-2 text-white border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all font-medium text-sm tracking-wide">
            <span>TÜM GALERİYİ GÖR</span>
          </button>
        </div>

        {/* Masonry Layout Imitation with Columns */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className="break-inside-avoid relative group overflow-hidden rounded-2xl cursor-zoom-in"
            >
              <img 
                src={img.src} 
                alt={img.title} 
                className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-90 group-hover:brightness-100"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                <span className="text-brand-500 text-xs font-bold tracking-widest uppercase mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">Drone Çekimi</span>
                <h3 className="text-white text-2xl font-bold font-display transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">{img.title}</h3>
              </div>
            </div>
          ))}
        </div>
        
        <button className="md:hidden mt-12 w-full py-4 border border-gray-800 text-white font-bold rounded-xl hover:bg-gray-800 transition-colors">
          DAHA FAZLA GÖSTER
        </button>
      </div>
    </section>
  );
};

export default Gallery;