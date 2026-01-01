import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivacyBanner from './components/PrivacyBanner';
import LegacyRedirectHandler from './components/LegacyRedirectHandler';
import SuspenseFallback from './components/SuspenseFallback';

// --- CORE PAGES (Direct Import for INSTANT Navigation) ---
// Kept direct to ensure the main menu feels like a native app.
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// --- PRODUCT & DETAIL PAGES (Lazy Load for Mobile Performance) ---
// Switched back to Lazy Loading to drastically reduce the initial bundle size for iPhone/Mobile users.
// This fixes the "slow load" issue and prevents memory spikes on mobile devices.
const ProductGrillPage = React.lazy(() => import('./pages/ProductGrillPage'));
const ProductChangingCabinePage = React.lazy(() => import('./pages/ProductChangingCabinePage'));
const ProductHockeyRinkPage = React.lazy(() => import('./pages/ProductHockeyRinkPage'));
const ProductPumptrackPage = React.lazy(() => import('./pages/ProductPumptrackPage'));
const ProductSkateAnlagenPage = React.lazy(() => import('./pages/ProductSkateAnlagenPage'));
const ProductBmxPage = React.lazy(() => import('./pages/ProductBmxPage'));
const ProductPavilionPage = React.lazy(() => import('./pages/ProductPavilionPage'));
const ProjectDetailPage = React.lazy(() => import('./pages/ProjectDetailPage'));

// --- LEGAL PAGES (Keep Lazy) ---
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
          <Routes>
            {/* Core Pages (Instant) */}
            <Route path="/" element={<HomePage />} />
            <Route path="/projekte" element={<ProjectsPage />} />
            <Route path="/ueber-uns" element={<AboutPage />} />
            <Route path="/kontakt" element={<ContactPage />} />

            {/* Product Pages (Lazy Loaded with Suspense) */}
            <Route path="/produkte/skate-anlagen" element={
                <Suspense fallback={<SuspenseFallback />}><ProductSkateAnlagenPage /></Suspense>
            } />
            <Route path="/produkte/pumptrack-beton" element={
                <Suspense fallback={<SuspenseFallback />}><ProductPumptrackPage /></Suspense>
            } />
            <Route path="/produkte/bmx-anlagen" element={
                <Suspense fallback={<SuspenseFallback />}><ProductBmxPage /></Suspense>
            } />
            <Route path="/produkte/hockey-banden" element={
                <Suspense fallback={<SuspenseFallback />}><ProductHockeyRinkPage /></Suspense>
            } />
            <Route path="/produkte/grillstelle-beton" element={
                <Suspense fallback={<SuspenseFallback />}><ProductGrillPage /></Suspense>
            } />
            <Route path="/produkte/umkleidekabine-beton" element={
                <Suspense fallback={<SuspenseFallback />}><ProductChangingCabinePage /></Suspense>
            } />
            <Route path="/produkte/ueberdachung-beton" element={
                <Suspense fallback={<SuspenseFallback />}><ProductPavilionPage /></Suspense>
            } />
            
            {/* Detail Page (Lazy Loaded) */}
            <Route path="/projekte/:projectId" element={
                <Suspense fallback={<SuspenseFallback />}><ProjectDetailPage /></Suspense>
            } />
            
            {/* Legal / System Pages (Lazy Loaded) */}
            <Route path="/impressum" element={
                <Suspense fallback={<SuspenseFallback />}><ImpressumPage /></Suspense>
            } />
            <Route path="/datenschutz" element={
                <Suspense fallback={<SuspenseFallback />}><PrivacyPolicyPage /></Suspense>
            } />
            <Route path="*" element={
                <Suspense fallback={<SuspenseFallback />}><NotFoundPage /></Suspense>
            } />
          </Routes>
        </main>
        <Footer />
        <PrivacyBanner />
      </div>
    </HashRouter>
  );
};

export default App;