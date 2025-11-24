import React, { useState, useEffect } from 'react';
import { Menu, X, Plane } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Ana Sayfa', href: '#hero' },
    { name: 'Hizmetler', href: '#services' },
    { name: 'AI Planlayıcı', href: '#ai-planner' },
    { name: 'Galeri', href: '#gallery' },
    { name: 'İletişim', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'glass-strong py-4 shadow-2xl' : 'bg-transparent py-8'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center space-x-2 group">
          <div className="relative">
            <Plane className="text-white w-8 h-8 transform group-hover:-rotate-45 transition-transform duration-300" />
            <div className="absolute inset-0 bg-brand-500 blur-lg opacity-40 group-hover:opacity-70 transition-opacity"></div>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-black text-lg md:text-xl text-white tracking-tighter">
              DRONE ÇEKİMİ <span className="text-brand-500">NEVŞEHİR</span>
            </span>
            <span className="text-[0.6rem] text-gray-400 tracking-[0.2em] uppercase">Profesyonel Hizmetler</span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="relative text-sm font-medium text-gray-300 hover:text-white transition-colors uppercase tracking-widest group py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-500 transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(245,158,11,0.8)]"></span>
            </a>
          ))}
          <a 
            href="#contact"
            className="px-5 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-bold rounded-full transition-all shadow-[0_0_20px_rgba(217,119,6,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transform hover:-translate-y-0.5"
          >
            TEKLİF AL
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      <div className={`md:hidden absolute top-full left-0 w-full bg-dark-900/95 backdrop-blur-xl border-t border-white/10 transition-all duration-300 origin-top ${mobileMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 h-0'}`}>
        <nav className="flex flex-col p-8 space-y-6 items-center">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-brand-500 text-xl font-display font-bold tracking-wider"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;