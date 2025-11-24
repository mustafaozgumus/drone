import React, { useState } from 'react';
import { Sparkles, Loader2, Send, Plane, Cpu, BarChart3, Aperture } from 'lucide-react';
import { generateShootPlan } from '../services/geminiService';
import { AIPlanningResponse } from '../types';

const AIPlanner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AIPlanningResponse | null>(null);
  
  // Form States
  const [shootType, setShootType] = useState('Düğün / Dış Çekim');
  const [location, setLocation] = useState('');
  const [details, setDetails] = useState('');

  const handlePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!location) return;

    setLoading(true);
    setResult(null);

    const plan = await generateShootPlan(shootType, location, details);
    setResult(plan);
    setLoading(false);
  };

  return (
    <section id="ai-planner" className="py-32 relative overflow-hidden bg-[#050505]">
        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]"></div>
        
        {/* Glowing Orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-500/10 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          
          {/* Left Side: Control Panel */}
          <div className="lg:w-1/2">
            <div className="bg-dark-800/50 backdrop-blur-md border border-gray-800 rounded-3xl p-8 lg:p-12 h-full">
              <div className="flex items-center space-x-3 text-brand-500 mb-6">
                <Cpu className="w-6 h-6 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.2em]">AI Operasyon Merkezi</span>
              </div>
              
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
                Akıllı Çekim <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">Asistanı</span>
              </h2>
              
              <p className="text-gray-400 text-lg mb-10 leading-relaxed">
                Gemini AI motorunu kullanarak çekim yapacağınız lokasyon ve konsept için anlık uçuş planı, ışık analizi ve kompozisyon önerileri oluşturun.
              </p>

              <form onSubmit={handlePlan} className="space-y-6">
                <div className="group">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1 group-hover:text-brand-500 transition-colors">Çekim Türü</label>
                  <div className="relative">
                    <select 
                      value={shootType}
                      onChange={(e) => setShootType(e.target.value)}
                      className="w-full bg-black/40 border border-gray-700 rounded-xl px-6 py-4 text-white appearance-none focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                    >
                      <option>Düğün / Dış Çekim</option>
                      <option>Emlak / Arsa</option>
                      <option>Tanıtım Filmi</option>
                      <option>Etkinlik</option>
                      <option>Belgesel</option>
                    </select>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500">
                      <Aperture className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1 group-hover:text-brand-500 transition-colors">Lokasyon</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Örn: Aşk Vadisi, Göreme..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-black/40 border border-gray-700 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder-gray-600"
                  />
                </div>

                <div className="group">
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 ml-1 group-hover:text-brand-500 transition-colors">Özel İstekler</label>
                  <textarea 
                    rows={3}
                    placeholder="Örn: Gün batımı saatinde, romantik atmosfer..."
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="w-full bg-black/40 border border-gray-700 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all placeholder-gray-600 resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full mt-4 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 text-white font-bold py-5 rounded-xl flex items-center justify-center space-x-3 transition-all shadow-lg hover:shadow-brand-500/25 transform hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Analiz Yapılıyor...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>ROTAYI OLUŞTUR</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Side: HUD Result Display */}
          <div className="lg:w-1/2 w-full">
            <div className={`h-full relative rounded-3xl border border-gray-800 bg-black/80 overflow-hidden transition-all duration-500 ${result ? 'shadow-[0_0_50px_rgba(245,158,11,0.15)] border-brand-500/30' : ''}`}>
              
              {/* Decorative UI Elements */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-800 to-transparent"></div>
              <div className="absolute top-4 right-4 flex space-x-1">
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                 <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                 <div className="w-2 h-2 rounded-full bg-green-500"></div>
              </div>

              {result ? (
                <div className="p-8 lg:p-10 h-full flex flex-col relative z-10 animate-fade-in">
                   {/* Header */}
                   <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-6">
                      <div>
                        <h3 className="text-2xl font-display font-bold text-white tracking-tight">UÇUŞ PLANI</h3>
                        <span className="text-xs font-mono text-brand-500">{new Date().toLocaleDateString()} // {shootType.toUpperCase()}</span>
                      </div>
                      <Plane className="w-10 h-10 text-gray-700" />
                   </div>
                  
                  <div className="space-y-8 flex-grow font-mono text-sm">
                    <div className="bg-gray-900/50 p-5 rounded-xl border-l-2 border-brand-500">
                      <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-2 flex items-center gap-2">
                        <Sparkles className="w-3 h-3" /> Kreatif Direktör Notu
                      </h4>
                      <p className="text-gray-200 leading-relaxed text-base font-sans">{result.suggestion}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-gray-900/30 p-5 rounded-xl border border-gray-800">
                        <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-2 flex items-center gap-2">
                          <Aperture className="w-3 h-3" /> Teknik Ayarlar
                        </h4>
                        <p className="text-brand-400">{result.technicalTips}</p>
                      </div>
                      <div className="bg-gray-900/30 p-5 rounded-xl border border-gray-800">
                         <h4 className="text-xs uppercase tracking-widest text-gray-500 mb-2 flex items-center gap-2">
                          <BarChart3 className="w-3 h-3" /> Altın Saat
                        </h4>
                        <p className="text-white text-xl font-bold">{result.bestTime}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-6 text-center">
                     <p className="text-[10px] text-gray-600 uppercase tracking-[0.3em]">
                        System Status: Operational // Gemini v2.5
                     </p>
                  </div>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-12">
                  <div className="w-24 h-24 rounded-full border border-gray-800 flex items-center justify-center mb-6 relative">
                     <div className="absolute inset-0 rounded-full border border-brand-500/20 border-t-brand-500 animate-spin"></div>
                     <Send className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Veri Girişi Bekleniyor</h3>
                  <p className="text-gray-600 text-sm max-w-xs font-mono">
                    _sistem hazır.
                    _lokasyon bilgisi giriniz.
                    _analiz başlatılıyor...
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AIPlanner;