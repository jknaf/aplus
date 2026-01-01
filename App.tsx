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
import NotFoundPage from './pages/NotFoundPage';
import PrivacyBanner from './components/PrivacyBanner';
import LegacyRedirectHandler from './components/LegacyRedirectHandler';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    // Fallback to HashRouter for maximum compatibility without server-side rewrites
    <HashRouter>
      <LegacyRedirectHandler />
      <ScrollToTop />
      
      {/* --- OPTIMIZED BACKGROUND SYSTEM (Safari Friendly) --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#0a0a0a]">
        
        {/* 1. Base Gradient - REDUCED OPACITY to let grid show */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020202]/80 via-[#080808]/80 to-[#121212]/80"></div>
        
        {/* 2. Technical Grid - INCREASED OPACITY & LIGHTER COLOR */}
        <div className="absolute inset-0 bg-grid-pattern bg-[length:60px_60px] opacity-[0.4]"></div>

        {/* 3. Static Glows - High Intensity */}
        {/* Top Left Orange Glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.25)_0%,transparent_60%)] blur-[100px]"></div>
        
        {/* Bottom Right White/Blueish Glow */}
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_60%)] blur-[100px]"></div>

        {/* Center Accent */}
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[40vw] h-[40vw] bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.08)_0%,transparent_70%)] blur-[80px]"></div>

      </div>

      {/* Layer 1: Noise Overlay (Static image, no filters) */}
      <div className="bg-noise-overlay fixed inset-0 z-[1] pointer-events-none opacity-40 mix-blend-overlay"></div>
      
      {/* Layer 2: Main Content */}
      <div className="text-brand-text font-sans flex flex-col min-h-screen relative z-[10]">
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
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <PrivacyBanner />
      </div>
    </HashRouter>
  );
};

export default App;