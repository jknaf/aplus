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
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        
        {/* 1. Base Dark Color */}
        <div className="absolute inset-0 bg-brand-bg"></div>
        
        {/* 2. Technical Engineering Grid */}
        <div className="absolute inset-0 bg-grid-pattern bg-[length:60px_60px] opacity-[0.07]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-transparent to-brand-bg"></div>

        {/* 3. Ambient Lighting / Glows */}
        {/* Top Left: Subtle warm brand glow (Sunlight on concrete feel) */}
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-brand-orange/5 rounded-full blur-[120px] opacity-60"></div>
        
        {/* Bottom Right: Cool industrial/steel glow for depth */}
        <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] bg-blue-900/10 rounded-full blur-[120px] opacity-40"></div>

      </div>

      {/* 4. Global Noise Overlay (Texture) - Kept on top but z-index adjusted in CSS */}
      <div className="bg-noise-overlay fixed inset-0 z-50 pointer-events-none"></div>
      
      <div className="text-brand-text font-sans flex flex-col min-h-screen relative z-0">
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