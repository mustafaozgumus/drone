import React from 'react';
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 bg-black border-t border-gray-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Left: Info */}
          <div className="flex flex-col justify-between">
            <div>
              <h2 className="font-display text-5xl md:text-6xl font-bold text-white mb-8">
                BİRLİKTE <br/>
                <span className="text-gray-600">ÇALIŞALIM</span>
              </h2>
              <p className="text-xl text-gray-400 mb-12 leading-relaxed max-w-md">
                Projeniz için heyecanlıyız. Nevşehir'in en deneyimli drone ekibiyle tanışın ve fark yaratın.
              </p>

              <div className="space-y-8">
                <div className="flex items-center space-x-6 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 group-hover:border-brand-500 group-hover:text-brand-500 transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-gray-500 text-xs uppercase tracking-widest mb-1">Telefon</h4>
                    <p className="text-white text-lg font-medium group-hover:text-brand-500 transition-colors">+90 538 084 1450</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 group-hover:border-brand-500 group-hover:text-brand-500 transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-gray-500 text-xs uppercase tracking-widest mb-1">E-posta</h4>
                    <p className="text-white text-lg font-medium group-hover:text-brand-500 transition-colors">dronecekimi50@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 group-hover:border-brand-500 group-hover:text-brand-500 transition-all">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-gray-500 text-xs uppercase tracking-widest mb-1">Ofis</h4>
                    <p className="text-white text-lg font-medium group-hover:text-brand-500 transition-colors">Merkez, Nevşehir, Türkiye</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 flex gap-4">
               {['Instagram', 'Facebook', 'Youtube'].map((social, idx) => (
                 <a key={idx} href="#" className="px-6 py-3 rounded-full border border-gray-800 text-gray-400 text-sm font-bold hover:bg-white hover:text-black hover:border-white transition-all">
                   {social}
                 </a>
               ))}
            </div>
          </div>

          {/* Right: Form */}
          <div className="glass-strong p-10 rounded-3xl border border-gray-800/50 relative">
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative">
                  <input type="text" className="peer w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors placeholder-transparent" placeholder="Ad" id="name" />
                  <label htmlFor="name" className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-brand-500 peer-focus:text-sm">Adınız</label>
                </div>
                <div className="relative">
                  <input type="text" className="peer w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors placeholder-transparent" placeholder="Soyad" id="surname" />
                   <label htmlFor="surname" className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-brand-500 peer-focus:text-sm">Soyadınız</label>
                </div>
              </div>
              <div className="relative">
                <input type="email" className="peer w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors placeholder-transparent" placeholder="Email" id="email" />
                 <label htmlFor="email" className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-brand-500 peer-focus:text-sm">E-posta Adresiniz</label>
              </div>
              <div className="relative">
                <textarea rows={4} className="peer w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors placeholder-transparent resize-none" placeholder="Mesaj" id="message"></textarea>
                 <label htmlFor="message" className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-brand-500 peer-focus:text-sm">Projenizden Bahsedin</label>
              </div>
              
              <button className="w-full bg-white text-black font-bold py-5 rounded-xl hover:bg-brand-500 hover:text-white transition-all flex items-center justify-center space-x-2 group">
                <span>GÖNDER</span>
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;