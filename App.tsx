import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Navigate, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import PrivacyBanner from './components/PrivacyBanner';
import { LANGS, LangProvider, localizePath } from './i18n';

// --- CORE PAGES (ALL Static Imports for INSTANT Navigation) ---
// Switching to Eager Loading to eliminate "Loading..." spinners during navigation.
// This increases initial load slightly but makes the app feel "native" and instant afterwards.
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProductGrillPage from './pages/ProductGrillPage';
import ProductGrillAssemblyPage from './pages/ProductGrillAssemblyPage';
import ProductChangingCabinePage from './pages/ProductChangingCabinePage';
import ProductChangingCabineAssemblyPage from './pages/ProductChangingCabineAssemblyPage';
import ProductHockeyRinkPage from './pages/ProductHockeyRinkPage';
import ProductPumptrackPage from './pages/ProductPumptrackPage';
import ProductSkateAnlagenPage from './pages/ProductSkateAnlagenPage';
import ProductSkateBowlsPage from './pages/ProductSkateBowlsPage';
import ProductSkatePipesPage from './pages/ProductSkatePipesPage';
import ProductPavilionPage from './pages/ProductPavilionPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ImpressumPage from './pages/ImpressumPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import NotFoundPage from './pages/NotFoundPage';
import PlanningPage from './pages/PlanningPage';
import ProductOverviewPage from './pages/ProductOverviewPage';
import PressePage from './pages/PressePage';
import KatalogPage from './pages/KatalogPage';

// Konfigurator lädt three.js; deshalb als einzige Seite erst beim Aufruf
const KonfiguratorPage = lazy(() => import('./pages/KonfiguratorPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const lazyFallback = (el: React.ReactNode) => <Suspense fallback={<div className="min-h-screen" />}>{el}</Suspense>;

// Jede Route gibt es dreimal: ohne Präfix (Deutsch), unter /en und unter /fr.
const ROUTES: [string, React.ReactNode][] = [
  ['/', <HomePage />],
  ['/projekte', <ProjectsPage />],
  ['/ueber-uns', <AboutPage />],
  ['/kontakt', <ContactPage />],
  ['/planung', <PlanningPage />],
  ['/referenzen-presse', <PressePage />],
  ['/katalog', <KatalogPage />],
  ['/katalog/:slug', <KatalogPage />],
  ['/admin', lazyFallback(<AdminPage />)],
  ['/codes', <Navigate to="/admin" replace />],
  ['/konfigurator', lazyFallback(<KonfiguratorPage />)],
  ['/produkte', <ProductOverviewPage />],
  ['/produkte/skate-anlagen', <ProductSkateAnlagenPage />],
  ['/produkte/skate-bowls-beton', <ProductSkateBowlsPage />],
  ['/produkte/skate-pipes-beton', <ProductSkatePipesPage />],
  ['/produkte/pumptrack-beton', <ProductPumptrackPage />],
  ['/produkte/hockey-banden', <ProductHockeyRinkPage />],
  ['/produkte/grillstelle-beton', <ProductGrillPage />],
  ['/produkte/grillstelle-beton/montageanleitung', <ProductGrillAssemblyPage />],
  ['/produkte/umkleidekabine-beton', <ProductChangingCabinePage />],
  ['/produkte/umkleidekabine-beton/montageanleitung', <ProductChangingCabineAssemblyPage />],
  ['/produkte/ueberdachung-beton', <ProductPavilionPage />],
  ['/projekte/:projectId', <ProjectDetailPage />],
  ['/impressum', <ImpressumPage />],
  ['/datenschutz', <PrivacyPolicyPage />],
];

const App: React.FC = () => {
  
  // Note: Background preloading logic removed as it is no longer needed 
  // with static imports. All code is available immediately.

  return (
    <BrowserRouter>
      <LangProvider>
      <ScrollToTop />
      
      {/* --- GLOBAL ATMOSPHERE LAYER --- */}
      {/* Z-Index 0 to sit ON TOP of body bg, but BEHIND content (z-10) */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none transform-gpu">

          {/* 1. Subtle Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(44,53,48,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(44,53,48,0.03)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,black_40%,transparent_100%)]"></div>

          {/* 2. Warm Accent Glow (Top Left): Verlauf statt blur-[150px], Safari rendert große Blur-Filter sehr langsam */}
          <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-[radial-gradient(closest-side,rgba(107,143,74,0.05),transparent)]"></div>

          {/* 3. Cool Green-Gray Glow (Bottom Right) */}
          <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-[radial-gradient(closest-side,rgba(122,154,126,0.05),transparent)]"></div>

          {/* 4. Noise Texture */}
          <div className="absolute inset-0 bg-noise-overlay opacity-[0.08] mix-blend-multiply"></div>
      </div>
      
      {/* Main Content Area */}
      {/* Kein eigener Stacking-Kontext hier: Header (fixed z-50) und Seiteninhalte
          leben direkt im Root. Das z-[10] hat vorher den fixed Header eingeklammert,
          wodurch Seiten-Container mit z-10 ihn geometrisch überdeckt haben und
          Header-Dropdown-Klicks auf Projekt-/Produktseiten ins Leere liefen. */}
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            {LANGS.flatMap((l) =>
              ROUTES.map(([path, element]) => (
                <Route key={`${l}${path}`} path={localizePath(l, path)} element={element} />
              )),
            )}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
        <PrivacyBanner />
      </div>
      </LangProvider>
    </BrowserRouter>
  );
};

export default App;