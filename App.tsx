import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivacyBanner from './components/PrivacyBanner';
import LegacyRedirectHandler from './components/LegacyRedirectHandler';
import SuspenseFallback from './components/SuspenseFallback';

// --- LAZY LOADING (CODE SPLITTING) ---
// Loading these pages only when the user navigates to them, 
// reducing the initial JavaScript bundle size significantly.
const HomePage = React.lazy(() => import('./pages/HomePage'));
const ProductGrillPage = React.lazy(() => import('./pages/ProductGrillPage'));
const ProductChangingCabinePage = React.lazy(() => import('./pages/ProductChangingCabinePage'));
const ProductHockeyRinkPage = React.lazy(() => import('./pages/ProductHockeyRinkPage'));
const ProductPumptrackPage = React.lazy(() => import('./pages/ProductPumptrackPage'));
const ProductSkateAnlagenPage = React.lazy(() => import('./pages/ProductSkateAnlagenPage'));
const ProductBmxPage = React.lazy(() => import('./pages/ProductBmxPage'));
const ProductPavilionPage = React.lazy(() => import('./pages/ProductPavilionPage'));
const ProjectsPage = React.lazy(() => import('./pages/ProjectsPage'));
const ProjectDetailPage = React.lazy(() => import('./pages/ProjectDetailPage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const ImpressumPage = React.lazy(() => import('./pages/ImpressumPage'));
const PrivacyPolicyPage = React.lazy(() => import('./pages/PrivacyPolicyPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));

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
      
      {/* Main Content Area */}
      <div className="flex flex-col min-h-screen relative z-[10]">
        <Header />
        <main className="flex-grow">
          {/* Suspense wrapper handles the loading state between page transitions */}
          <Suspense fallback={<SuspenseFallback />}>
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
          </Suspense>
        </main>
        <Footer />
        <PrivacyBanner />
      </div>
    </HashRouter>
  );
};

export default App;