import { useState, useEffect } from 'react';
import Header from './components/Header';
import ScrollProgress from './components/ScrollProgress';
import Hero from './sections/Hero';
import About from './sections/About';
import Program from './sections/Program';
import Context from './sections/Context';
import FAQ from './sections/FAQ';
import Authors from './sections/Authors';
import Media from './sections/Media';
import InterferenceLab from './sections/InterferenceLab';
import PartnersStrip from './sections/PartnersStrip';
import PhotoArchive from './sections/PhotoArchive';
import Footer from './components/Footer';
import StyleGuide from './components/StyleGuide';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const scrollToSection = (id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-bg-primary text-text-primary font-mono">
      <div className="scanlines" />
      <div className="vignette" />
      <ScrollProgress />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} onNavigate={scrollToSection} />
      <main className="relative z-10">
        {import.meta.env.DEV && <StyleGuide />}
        <Hero onNavigate={scrollToSection} />
        <PartnersStrip />
        <PhotoArchive />
        <About />
        <Program />
        <Context />
        <InterferenceLab />
        <FAQ />
        <Authors />
        <Media />
      </main>
      <Footer onNavigate={scrollToSection} />
    </div>
  );
}

export default App;
