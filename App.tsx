import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivacyBanner from './components/PrivacyBanner';
import LegacyRedirectHandler from './components/LegacyRedirectHandler';

// --- CORE PAGES (ALL Static Imports for INSTANT Navigation) ---
// Switching to Eager Loading to eliminate "Loading..." spinners during navigation.
// This increases initial load slightly but makes the app feel "native" and instant afterwards.
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProductGrillPage from './pages/ProductGrillPage';
import ProductChangingCabinePage from './pages/ProductChangingCabinePage';
import ProductHockeyRinkPage from './pages/ProductHockeyRinkPage';
import ProductPumptrackPage from './pages/ProductPumptrackPage';
import ProductSkateAnlagenPage from './pages/ProductSkateAnlagenPage';
import ProductBmxPage from './pages/ProductBmxPage';
import ProductPavilionPage from './pages/ProductPavilionPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ImpressumPage from './pages/ImpressumPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import NotFoundPage from './pages/NotFoundPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  
  // Note: Background preloading logic removed as it is no longer needed 
  // with static imports. All code is available immediately.

  return (
    <HashRouter>
      <LegacyRedirectHandler />
      <ScrollToTop />
      
      {/* --- GLOBAL ATMOSPHERE LAYER --- */}
      {/* Z-Index 0 to sit ON TOP of body bg, but BEHIND content (z-10) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none transform-gpu">
          
          {/* 1. The Grid Pattern (Technical Look) */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)]"></div>

          {/* 2. Main Orange Glow (Top Left) */}
          <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-brand-orange/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow"></div>
          
          {/* 3. Secondary Cool Glow (Bottom Right) */}
          <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen"></div>
          
          {/* 4. Center Ambient Light */}
          <div className="absolute top-[30%] left-[50%] transform -translate-x-1/2 w-[600px] h-[600px] bg-brand-orange/5 rounded-full blur-[100px]"></div>

          {/* 5. Noise Texture (Film Grain) */}
          <div className="absolute inset-0 bg-noise-overlay opacity-20 mix-blend-overlay"></div>
      </div>
      
      {/* Main Content Area */}
      {/* Content needs explicit z-index > 0 to sit above atmosphere */}
      <div className="flex flex-col min-h-screen relative z-[10]">
        <Header />
        <main className="flex-grow">
          <Routes>
            {/* Core Pages */}
            <Route path="/" element={<HomePage />} />
            <Route path="/projekte" element={<ProjectsPage />} />
            <Route path="/ueber-uns" element={<AboutPage />} />
            <Route path="/kontakt" element={<ContactPage />} />

            {/* Product Pages (Now Instant) */}
            <Route path="/produkte/skate-anlagen" element={<ProductSkateAnlagenPage />} />
            <Route path="/produkte/pumptrack-beton" element={<ProductPumptrackPage />} />
            <Route path="/produkte/bmx-anlagen" element={<ProductBmxPage />} />
            <Route path="/produkte/hockey-banden" element={<ProductHockeyRinkPage />} />
            <Route path="/produkte/grillstelle-beton" element={<ProductGrillPage />} />
            <Route path="/produkte/umkleidekabine-beton" element={<ProductChangingCabinePage />} />
            <Route path="/produkte/ueberdachung-beton" element={<ProductPavilionPage />} />
            
            {/* Detail Page */}
            <Route path="/projekte/:projectId" element={<ProjectDetailPage />} />
            
            {/* Legal / System Pages */}
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