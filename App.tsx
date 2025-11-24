import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import AIPlanner from './components/AIPlanner';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-white selection:bg-brand-500 selection:text-white">
      <Header />
      <main>
        <Hero />
        <Services />
        <AIPlanner />
        <Gallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default App;
