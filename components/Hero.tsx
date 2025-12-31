
import React from 'react';
import { ChevronDown, Play } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#0a0a0a] z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://picsum.photos/1920/1080?grayscale"
          className="w-full h-full object-cover opacity-60 scale-105"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-flying-over-turkey-mountains-at-sunset-40865-large.mp4" type="video/mp4" />
          <img src="https://picsum.photos/1920/1080" alt="Background" className="w-full h-full object-cover" />
        </video>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-20 text-center">
        <div className="inline-flex items-center space-x-2 py-2 px-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-brand-400 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-6 md:mb-8 animate-fade-in">
          <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse"></span>
          <span>Nevşehir & Kapadokya</span>
        </div>
        
        <h1 className="font-display text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white leading-[1.1] mb-6 md:mb-8 animate-slide-up tracking-tighter">
          GÖKYÜZÜNDEN<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-brand-500 to-brand-700 filter drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]">
            HİKAYELER
          </span>
        </h1>
        
        <p className="text-gray-300 text-base md:text-2xl max-w-3xl mx-auto mb-8 md:mb-12 animate-slide-up font-light tracking-wide px-4">
          Sinematik drone çekimleriyle markanızın ve anılarınızın sınırlarını zorlayın. 
          <span className="text-white font-medium block sm:inline"> 4K/60FPS profesyonel kalite.</span>
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 animate-slide-up">
          <a
            href="#contact"
            className="w-full sm:w-auto group relative px-8 py-4 bg-brand-600 text-white font-bold rounded-xl overflow-hidden shadow-lg transition-all active:scale-95"
          >
            <span className="relative z-10 flex items-center justify-center">
              PROJEYİ BAŞLAT
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-brand-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </a>
          
          <a
            href="#gallery"
            className="w-full sm:w-auto group px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all flex items-center justify-center space-x-3 active:scale-95"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
               <Play className="w-3 h-3 fill-current" />
            </div>
            <span>Portfolyo</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <a href="#services" className="flex flex-col items-center text-gray-500">
          <ChevronDown className="w-6 h-6" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
