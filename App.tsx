import React, { Suspense, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivacyBanner from './components/PrivacyBanner';
import LegacyRedirectHandler from './components/LegacyRedirectHandler';
import SuspenseFallback from './components/SuspenseFallback';

// --- CORE PAGES (Direct Import for INSTANT Navigation) ---
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

// --- LAZY LOADED PAGES ---
// We keep them lazy to make the INITIAL load fast (iPhone doesn't crash).
// BUT: We preload them in the useEffect below so navigation is instant later.
const ProductGrillPage = React.lazy(() => import('./pages/ProductGrillPage'));
const ProductChangingCabinePage = React.lazy(() => import('./pages/ProductChangingCabinePage'));
const ProductHockeyRinkPage = React.lazy(() => import('./pages/ProductHockeyRinkPage'));
const ProductPumptrackPage = React.lazy(() => import('./pages/ProductPumptrackPage'));
const ProductSkateAnlagenPage = React.lazy(() => import('./pages/ProductSkateAnlagenPage'));
const ProductBmxPage = React.lazy(() => import('./pages/ProductBmxPage'));
const ProductPavilionPage = React.lazy(() => import('./pages/ProductPavilionPage'));
const ProjectDetailPage = React.lazy(() => import('./pages/ProjectDetailPage'));

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
  
  // --- ARCHITECTURE FIX: BACKGROUND PRELOADING ---
  // Waits 2.5s after main load (so we don't slow down the start),
  // then silently fetches all other pages in the background.
  // Result: No "Loading..." spinners when clicking links.
  useEffect(() => {
    const preloadRoutes = () => {
        const routes = [
            import('./pages/ProductSkateAnlagenPage'),
            import('./pages/ProductPumptrackPage'),
            import('./pages/ProductHockeyRinkPage'),
            import('./pages/ProductBmxPage'),
            import('./pages/ProductGrillPage'),
            import('./pages/ProductChangingCabinePage'),
            import('./pages/ProductPavilionPage'),
            import('./pages/ProjectDetailPage')
        ];
    };

    if (document.readyState === 'complete') {
        setTimeout(preloadRoutes, 2500);
    } else {
        window.addEventListener('load', () => setTimeout(preloadRoutes, 2500));
    }
  }, []);

  return (
    <HashRouter>
      <LegacyRedirectHandler />
      <ScrollToTop />
      
      {/* --- GLOBAL ATMOSPHERE LAYER (Restored & Fixed) --- */}
      {/* Z-Index changed to 0 to sit ON TOP of body bg, but BEHIND content (z-10) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none transform-gpu">
          
          {/* 1. The Grid Pattern (Technical Look) */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)]"></div>

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
            {/* Core Pages (Instant) */}
            <Route path="/" element={<HomePage />} />
            <Route path="/projekte" element={<ProjectsPage />} />
            <Route path="/ueber-uns" element={<AboutPage />} />
            <Route path="/kontakt" element={<ContactPage />} />

            {/* Product Pages (Lazy Loaded but Preloaded) */}
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
            
            {/* Detail Page */}
            <Route path="/projekte/:projectId" element={
                <Suspense fallback={<SuspenseFallback />}><ProjectDetailPage /></Suspense>
            } />
            
            {/* Legal / System Pages */}
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