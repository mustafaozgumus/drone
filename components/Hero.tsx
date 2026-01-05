
import React from 'react';
import { ChevronDown, Play } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/20 to-[#0a0a0a] z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://picsum.photos/1920/1080?grayscale"
          className="w-full h-full object-cover opacity-50 scale-100 md:scale-110 transition-transform duration-[20s]"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-flying-over-turkey-mountains-at-sunset-40865-large.mp4" type="video/mp4" />
          <img src="https://picsum.photos/1920/1080" alt="Background" className="w-full h-full object-cover" />
        </video>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-20 text-center flex flex-col items-center">
        <div className="inline-flex items-center space-x-2 py-2.5 px-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-brand-400 text-[10px] md:text-xs font-black tracking-[0.3em] uppercase mb-8 md:mb-12 animate-fade-in shadow-2xl">
          <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse shadow-[0_0_10px_rgba(245,158,11,1)]"></span>
          <span>Nevşehir & Kapadokya</span>
        </div>
        
        <h1 className="font-display text-[2.5rem] sm:text-6xl md:text-8xl lg:text-[10rem] font-black text-white leading-[0.9] mb-8 md:mb-12 animate-slide-up tracking-tighter drop-shadow-2xl">
          GÖKYÜZÜNDEN<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-brand-500 to-brand-700 filter drop-shadow-[0_0_30px_rgba(245,158,11,0.4)]">
            HİKAYELER
          </span>
        </h1>
        
        <p className="text-gray-400 text-lg md:text-3xl max-w-4xl mx-auto mb-12 md:mb-20 animate-slide-up font-medium tracking-tight px-4 leading-relaxed">
          Kapadokya'nın ruhunu sinematik drone çekimleriyle ölümsüzleştirin. 
          <span className="text-white font-bold block mt-2"> 4K Ultra-HD Profesyonel Bakış Açısı.</span>
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-8 w-full max-w-md md:max-w-none animate-slide-up">
          <a
            href="#contact"
            className="w-full sm:w-auto group relative px-12 py-5 bg-brand-600 text-white font-black rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(217,119,6,0.3)] transition-all active:scale-95 text-sm md:text-base uppercase tracking-widest"
          >
            <span className="relative z-10 flex items-center justify-center">
              PROJEYİ BAŞLAT
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-500 to-brand-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500"></div>
          </a>
          
          <a
            href="#gallery"
            className="w-full sm:w-auto group px-12 py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl backdrop-blur-xl hover:bg-white/10 transition-all flex items-center justify-center space-x-4 active:scale-95 text-sm md:text-base uppercase tracking-widest"
          >
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-brand-500 transition-colors">
               <Play className="w-4 h-4 fill-current ml-1" />
            </div>
            <span>İzleyin</span>
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <a href="#services" className="flex flex-col items-center text-gray-500 hover:text-white transition-colors">
          <span className="text-[10px] font-black uppercase tracking-[0.5em] mb-4">Keşfedin</span>
          <ChevronDown className="w-8 h-8" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
