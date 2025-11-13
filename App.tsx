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
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ImpressumPage from './pages/ImpressumPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

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
      <div className="bg-brand-bg text-brand-text font-sans flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/produkte/grillstelle-beton" element={<ProductGrillPage />} />
            <Route path="/produkte/umkleidekabine-beton" element={<ProductChangingCabinePage />} />
            <Route path="/produkte/hockey-banden" element={<ProductHockeyRinkPage />} />
            <Route path="/produkte/pumptrack-beton" element={<ProductPumptrackPage />} />
            <Route path="/projekte" element={<ProjectsPage />} />
            <Route path="/projekte/:projectId" element={<ProjectDetailPage />} />
            <Route path="/ueber-uns" element={<AboutPage />} />
            <Route path="/kontakt" element={<ContactPage />} />
            <Route path="/impressum" element={<ImpressumPage />} />
            <Route path="/datenschutz" element={<PrivacyPolicyPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;