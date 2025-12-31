
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import AIChatbot from './components/AIChatbot';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Admin from './components/Admin';

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  // Sayfa yüklendiğinde URL'de /admin varsa admin paneline geç
  useEffect(() => {
    const path = window.location.hash;
    if (path === '#admin') {
      setIsAdmin(true);
    }
    
    const handleHashChange = () => {
      setIsAdmin(window.location.hash === '#admin');
    };
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isAdmin) {
    return <Admin onExit={() => {
      window.location.hash = '';
      setIsAdmin(false);
    }} />;
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white selection:bg-brand-500 selection:text-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <AIChatbot />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
