import React from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProductGrillPage from './pages/ProductGrillPage';
import ProductChangingCabinePage from './pages/ProductChangingCabinePage';
import ProductHockeyRinkPage from './pages/ProductHockeyRinkPage';
import ProductPumptrackPage from './pages/ProductPumptrackPage';
import ProductSkateAnlagenPage from './pages/ProductSkateAnlagenPage';
import ProductBmxPage from './pages/ProductBmxPage';
import ProductPavilionPage from './pages/ProductPavilionPage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ImpressumPage from './pages/ImpressumPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import PrivacyBanner from './components/PrivacyBanner';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      
      {/* --- MODERN BACKGROUND SYSTEM --- */}
      {/* Layer 0: Deep Background & Glows */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#050505]">
        
        {/* 1. Base Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] to-[#1a1a1a]"></div>
        
        {/* 2. Technical Grid */}
        <div className="absolute inset-0 bg-grid-pattern bg-[length:60px_60px] opacity-[0.25]"></div>

        {/* 3. Ambient Lighting / Glows */}
        <div className="absolute -top-[10%] -left-[10%] w-[80vw] h-[80vw] bg-brand-orange/30 rounded-full blur-[120px] opacity-100 mix-blend-screen animate-pulse-slow"></div>
        <div className="absolute top-[20%] -right-[20%] w-[90vw] h-[90vw] bg-slate-800/40 rounded-full blur-[150px] opacity-100 mix-blend-screen"></div>
        <div className="absolute -bottom-[20%] left-[20%] w-[60vw] h-[60vw] bg-brand-orange/20 rounded-full blur-[100px] opacity-80 mix-blend-screen"></div>

      </div>

      {/* Layer 1: Noise Overlay (Moved down to z-20 to sit BEHIND content but above BG) */}
      <div className="bg-noise-overlay fixed inset-0 z-20 pointer-events-none opacity-40"></div>
      
      {/* Layer 2: Main Content (z-30 ensures it is strictly above the noise layer) */}
      <div className="text-brand-text font-sans flex flex-col min-h-screen relative z-30">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/produkte/skate-anlagen" element={<ProductSkateAnlagenPage />} />
            <Route path="/produkte/pumptrack-beton" element={<ProductPumptrackPage />} />
            <Route path="/produkte/bmx-anlagen" element={<ProductBmxPage />} />
            <Route path="/produkte/hockey-banden" element={<ProductHockeyRinkPage />} />
            <Route path="/produkte/grillstelle-beton" element={<ProductGrillPage />} />
            <Route path="/produkte/umkleidekabine-beton" element={<ProductChangingCabinePage />} />
            <Route path="/produkte/ueberdachung-beton" element={<ProductPavilionPage />} />
            <Route path="/projekte" element={<ProjectsPage />} />
            <Route path="/projekte/:projectId" element={<ProjectDetailPage />} />
            <Route path="/ueber-uns" element={<AboutPage />} />
            <Route path="/kontakt" element={<ContactPage />} />
            <Route path="/impressum" element={<ImpressumPage />} />
            <Route path="/datenschutz" element={<PrivacyPolicyPage />} />
          </Routes>
        </main>
        <Footer />
        <PrivacyBanner />
      </div>
    </HashRouter>
  );
};

export default App;