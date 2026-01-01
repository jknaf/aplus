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
    <HashRouter>
      <LegacyRedirectHandler />
      <ScrollToTop />
      
      {/* --- GLOBAL ATMOSPHERE LAYER --- */}
      {/* 
          Grid is now in index.html CSS to guarantee it's always there.
          This layer creates the "Clow" (Glow) and depth.
          Fixed position z-[-1] puts it behind all content but fixed to viewport.
      */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          
          {/* Main Orange Glow (Top Left) */}
          <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-brand-orange/30 rounded-full blur-[120px] opacity-80 mix-blend-screen animate-pulse-slow"></div>
          
          {/* Secondary Cool Glow (Bottom Right) */}
          <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] opacity-60 mix-blend-screen"></div>
          
          {/* Center Ambient Light */}
          <div className="absolute top-[30%] left-[50%] transform -translate-x-1/2 w-[600px] h-[600px] bg-brand-orange/10 rounded-full blur-[100px] opacity-40"></div>

          {/* Noise Texture */}
          <div className="absolute inset-0 bg-noise-overlay opacity-30 mix-blend-overlay"></div>
      </div>
      
      {/* Main Content Area - Must remain transparent! */}
      <div className="flex flex-col min-h-screen relative z-[10]">
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