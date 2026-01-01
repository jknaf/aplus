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
      
      {/* --- NEW BACKGROUND STRATEGY --- */}
      {/* This layer is fixed and sits behind everything. No solid colors on top of it will be allowed. */}
      <div className="fixed inset-0 z-[-1] bg-[#050505] overflow-hidden pointer-events-none">
          
          {/* 1. Industrial Grid - Explicit CSS for visibility */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
                backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px)',
                backgroundSize: '80px 80px'
            }}
          ></div>

          {/* 2. Ambient Glows - Behind the grid or blended */}
          {/* Top Left - Orange */}
          <div className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-brand-orange/20 blur-[120px] rounded-full mix-blend-screen"></div>
          
          {/* Bottom Right - Blue/White */}
          <div className="absolute -bottom-[10%] -right-[10%] w-[50vw] h-[50vw] bg-blue-500/10 blur-[120px] rounded-full mix-blend-screen"></div>
          
          {/* Center Subtle */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-brand-orange/5 blur-[100px] rounded-full"></div>

          {/* 3. Noise Texture Overlay */}
          <div className="absolute inset-0 bg-noise-overlay opacity-30 mix-blend-overlay"></div>
      </div>
      
      {/* Layer 2: Main Content - Transparent background to let the grid show */}
      <div className="text-brand-text font-sans flex flex-col min-h-screen relative z-[10] bg-transparent">
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