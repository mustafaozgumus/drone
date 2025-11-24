import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-900 border-t border-gray-800 py-12">
      <div className="container mx-auto px-6 text-center md:text-left">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold text-white tracking-tighter">
              DRONE ÇEKİMİ <span className="text-brand-500">NEVŞEHİR</span>
            </h3>
            <p className="text-gray-500 text-sm mt-1">Profesyonel Havadan Görüntüleme Çözümleri</p>
          </div>
          
          <div className="flex space-x-6 text-gray-400 text-sm">
            <a href="#" className="hover:text-white transition-colors">Gizlilik Politikası</a>
            <a href="#" className="hover:text-white transition-colors">Kullanım Şartları</a>
            <a href="#" className="hover:text-white transition-colors">S.S.S</a>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Drone Çekimi Nevşehir. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
};

export default Footer;