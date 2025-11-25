import React, { useState } from 'react';
import { Phone, Mail, MapPin, ArrowRight, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { siteData } from '../data';

const Contact: React.FC = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Endpoint kontrolü
    if (siteData.contact.formEndpoint.includes('FORM_ID_BURAYA')) {
      alert("Lütfen data.tsx dosyasındaki formEndpoint kısmına kendi Formspree linkinizi yapıştırın.");
      return;
    }

    setFormStatus('submitting');
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch(siteData.contact.formEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
        // 5 saniye sonra başarı mesajını kaldır
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

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
                <a href={`tel:${siteData.contact.phone.replace(/\s/g, '')}`} className="flex items-center space-x-6 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 group-hover:border-brand-500 group-hover:text-brand-500 transition-all">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-gray-500 text-xs uppercase tracking-widest mb-1">Telefon</h4>
                    <p className="text-white text-lg font-medium group-hover:text-brand-500 transition-colors">{siteData.contact.phone}</p>
                  </div>
                </a>

                <a href={`mailto:${siteData.contact.email}`} className="flex items-center space-x-6 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 group-hover:border-brand-500 group-hover:text-brand-500 transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-gray-500 text-xs uppercase tracking-widest mb-1">E-posta</h4>
                    <p className="text-white text-lg font-medium group-hover:text-brand-500 transition-colors">{siteData.contact.email}</p>
                  </div>
                </a>

                <div className="flex items-center space-x-6 group cursor-pointer">
                  <div className="w-12 h-12 rounded-full border border-gray-800 flex items-center justify-center text-gray-400 group-hover:border-brand-500 group-hover:text-brand-500 transition-all">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-gray-500 text-xs uppercase tracking-widest mb-1">Ofis</h4>
                    <p className="text-white text-lg font-medium group-hover:text-brand-500 transition-colors">{siteData.contact.address}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 flex gap-4">
               {siteData.contact.social.instagram && (
                 <a href={siteData.contact.social.instagram} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full border border-gray-800 text-gray-400 text-sm font-bold hover:bg-white hover:text-black hover:border-white transition-all">
                   Instagram
                 </a>
               )}
               {siteData.contact.social.facebook && (
                 <a href={siteData.contact.social.facebook} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full border border-gray-800 text-gray-400 text-sm font-bold hover:bg-white hover:text-black hover:border-white transition-all">
                   Facebook
                 </a>
               )}
               {siteData.contact.social.youtube && (
                 <a href={siteData.contact.social.youtube} target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full border border-gray-800 text-gray-400 text-sm font-bold hover:bg-white hover:text-black hover:border-white transition-all">
                   Youtube
                 </a>
               )}
            </div>
          </div>

          {/* Right: Form */}
          <div className="glass-strong p-10 rounded-3xl border border-gray-800/50 relative">
            {formStatus === 'success' ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20 animate-fade-in">
                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Mesajınız Alındı!</h3>
                <p className="text-gray-400">En kısa sürede sizinle iletişime geçeceğiz.</p>
                <button 
                  onClick={() => setFormStatus('idle')}
                  className="mt-8 text-sm text-brand-500 hover:text-white transition-colors underline"
                >
                  Yeni mesaj gönder
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative">
                    <input 
                      type="text" 
                      name="name"
                      required
                      className="peer w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors placeholder-transparent" 
                      placeholder="Ad" 
                      id="name" 
                    />
                    <label htmlFor="name" className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-brand-500 peer-focus:text-sm">Adınız</label>
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      name="surname"
                      required
                      className="peer w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors placeholder-transparent" 
                      placeholder="Soyad" 
                      id="surname" 
                    />
                    <label htmlFor="surname" className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-brand-500 peer-focus:text-sm">Soyadınız</label>
                  </div>
                </div>
                <div className="relative">
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="peer w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors placeholder-transparent" 
                    placeholder="Email" 
                    id="email" 
                  />
                  <label htmlFor="email" className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-brand-500 peer-focus:text-sm">E-posta Adresiniz</label>
                </div>
                <div className="relative">
                  <textarea 
                    rows={4} 
                    name="message"
                    required
                    className="peer w-full bg-transparent border-b border-gray-700 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors placeholder-transparent resize-none" 
                    placeholder="Mesaj" 
                    id="message"
                  ></textarea>
                  <label htmlFor="message" className="absolute left-0 -top-3.5 text-sm text-gray-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 peer-focus:text-brand-500 peer-focus:text-sm">Projenizden Bahsedin</label>
                </div>
                
                {formStatus === 'error' && (
                  <div className="flex items-center space-x-2 text-red-500 text-sm bg-red-500/10 p-4 rounded-lg">
                    <AlertCircle className="w-5 h-5" />
                    <span>Bir hata oluştu. Lütfen daha sonra tekrar deneyin veya telefonla ulaşın.</span>
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full bg-white text-black font-bold py-5 rounded-xl hover:bg-brand-500 hover:text-white transition-all flex items-center justify-center space-x-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>GÖNDERİLİYOR...</span>
                    </>
                  ) : (
                    <>
                      <span>GÖNDER</span>
                      <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;