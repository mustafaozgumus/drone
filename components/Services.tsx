import React from 'react';
import { Camera, Home, Building2, PartyPopper, Mountain, Film, ArrowUpRight } from 'lucide-react';
import { ServiceType } from '../types';

const servicesList = [
  {
    icon: <PartyPopper className="w-6 h-6" />,
    title: ServiceType.WEDDING,
    desc: "Kapadokya'nın masalsı atmosferinde, en özel gününüzü sinematik bir filmle ölümsüzleştirin.",
    colSpan: "md:col-span-2",
  },
  {
    icon: <Home className="w-6 h-6" />,
    title: ServiceType.REAL_ESTATE,
    desc: "Gayrimenkul portföyünüzü havadan detaylı görüntülerle daha hızlı pazarlayın.",
    colSpan: "md:col-span-1",
  },
  {
    icon: <Film className="w-6 h-6" />,
    title: ServiceType.COMMERCIAL,
    desc: "Markanızın prestijini artıracak, yüksek prodüksiyonlu reklam filmleri.",
    colSpan: "md:col-span-1",
  },
  {
    icon: <Mountain className="w-6 h-6" />,
    title: ServiceType.TOURISM,
    desc: "Turistik bölgeler ve oteller için büyüleyici hava çekimleri.",
    colSpan: "md:col-span-2",
  },
  {
    icon: <Building2 className="w-6 h-6" />,
    title: ServiceType.INSPECTION,
    desc: "Ulaşılması zor alanlar için endüstriyel denetim ve raporlama.",
    colSpan: "md:col-span-1",
  },
  {
    icon: <Camera className="w-6 h-6" />,
    title: "Prodüksiyon",
    desc: "Belgesel ve klipler için 4K/60fps RAW ve Log çekim desteği.",
    colSpan: "md:col-span-2 lg:col-span-2",
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 bg-[#0a0a0a] relative">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-0 w-1/2 h-1/2 bg-brand-900/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-2xl">
            <h4 className="text-brand-500 font-bold tracking-widest uppercase mb-4 text-sm">Hizmetlerimiz</h4>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
              Yaratıcı Vizyonunuzu <br />
              <span className="text-gray-500">Gökyüzüne Taşıyoruz</span>
            </h2>
          </div>
          <p className="text-gray-400 max-w-md mt-6 md:mt-0 text-sm leading-relaxed border-l border-gray-800 pl-6">
            Son teknoloji drone filomuz ve lisanslı pilotlarımızla, projenize özel çözümler üretiyoruz. Standartların ötesinde bir bakış açısı.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {servicesList.map((service, index) => (
            <div
              key={index}
              className={`group relative glass p-8 rounded-3xl hover-card-shadow cursor-pointer overflow-hidden ${service.colSpan}`}
            >
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <ArrowUpRight className="w-6 h-6 text-brand-500" />
              </div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-800 to-black border border-gray-700 flex items-center justify-center text-white mb-8 group-hover:scale-110 group-hover:border-brand-500/50 group-hover:text-brand-500 transition-all duration-300 shadow-lg">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 font-display">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors">
                  {service.desc}
                </p>
              </div>
              
              {/* Hover Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;