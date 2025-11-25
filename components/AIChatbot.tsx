import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, MessageCircle } from 'lucide-react';
import { chatWithAI } from '../services/geminiService';
import { ChatMessage } from '../types';
import { siteData } from '../data';

const AIChatbot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: `Merhaba! Ben ${siteData.general.brandNameHighlight} dijital asistanıyım. Düğün çekimi, emlak tanıtımı veya özel projeleriniz hakkında size nasıl yardımcı olabilirim?`,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim() || loading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    // Site verilerini context olarak hazırla
    const contextInfo = `
      Firma Adı: ${siteData.general.brandName} ${siteData.general.brandNameHighlight}
      Telefon: ${siteData.contact.phone}
      Email: ${siteData.contact.email}
      Adres: ${siteData.contact.address}
      Hizmetler: ${siteData.services.map(s => s.title).join(", ")}
    `;

    const responseText = await chatWithAI(messages, userMsg.text, contextInfo);

    const botMsg: ChatMessage = {
      role: 'model',
      text: responseText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  const suggestions = [
    "Düğün çekimi yapıyor musunuz?",
    "Fiyatlarınız nedir?",
    "Hangi bölgelerde çalışıyorsunuz?",
    "Video teslim süresi ne kadar?"
  ];

  return (
    <section id="ai-assistant" className="py-24 bg-dark-900 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Side: Text Info */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 py-1 px-3 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-500 text-xs font-bold tracking-widest uppercase mb-6">
              <Sparkles className="w-3 h-3" />
              <span>7/24 Canlı Destek</span>
            </div>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
              Sorularınız mı var? <br />
              <span className="text-gray-500">Yapay Zekaya Sorun.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Müsaitlik durumu, çekim paketleri veya aklınıza takılan diğer konular için asistanımızla sohbet edebilirsiniz. Size anında yardımcı olmak için burada.
            </p>
            
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {suggestions.map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInputText(suggestion);
                    // State update is async, wait a tick or call handle directly logic requires refactoring slightly or just letting user click send
                    // Let's just set text for user to send
                  }}
                  className="text-left p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-500/50 transition-all text-gray-300 text-sm"
                >
                  "{suggestion}"
                </button>
              ))}
            </div>
          </div>

          {/* Right Side: Chat Interface */}
          <div className="w-full lg:w-1/2 max-w-lg">
            <div className="bg-dark-800/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[600px]">
              
              {/* Chat Header */}
              <div className="bg-brand-600/20 border-b border-white/10 p-4 flex items-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg relative">
                  <Bot className="w-6 h-6 text-white" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-dark-800"></div>
                </div>
                <div>
                  <h3 className="font-bold text-white">DroneAsistan</h3>
                  <p className="text-xs text-brand-200">Çevrimiçi | Hızlı Yanıt</p>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-gray-700' : 'bg-brand-600'}`}>
                      {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                    </div>
                    <div
                      className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-white/10 text-white rounded-tr-none'
                          : 'bg-brand-600/10 border border-brand-500/20 text-gray-100 rounded-tl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex items-start gap-3">
                     <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-white" />
                     </div>
                     <div className="bg-brand-600/10 border border-brand-500/20 p-4 rounded-2xl rounded-tl-none">
                        <Loader2 className="w-4 h-4 text-brand-500 animate-spin" />
                     </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={handleSend} className="p-4 bg-black/20 border-t border-white/10">
                <div className="relative">
                  <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="Bir şeyler sorun..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={loading || !inputText.trim()}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-brand-600 text-white rounded-lg hover:bg-brand-500 disabled:opacity-50 disabled:hover:bg-brand-600 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIChatbot;