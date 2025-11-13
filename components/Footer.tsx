import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-surface text-brand-text">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block">
              <div className="flex items-center text-4xl font-black font-heading tracking-tighter text-brand-heading">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 140 100"
                  className="h-10 w-auto"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M0 100 L40 0 L55 0 L15 100 H0 Z" />
                  <path d="M80 40 H140 V60 H80 Z" />
                  <path d="M100 20 H120 V80 H100 Z" />
                </svg>
                <span className="ml-3 text-brand-orange">Urban Design</span>
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-brand-muted">
              ARCHITEKTUR UND URBANES DESIGN – BETON UND STAHL FÜR FREIZEIT UND SPORT.
            </p>
             <div className="mt-8 text-sm text-brand-muted">
              <p>&copy; {new Date().getFullYear()} A+ Urban Design</p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-heading">Navigation</h3>
              <ul className="mt-4 space-y-3">
                <li><Link to="/" className="text-base text-brand-muted hover:text-brand-orange transition-colors">Home</Link></li>
                <li><Link to="/projekte" className="text-base text-brand-muted hover:text-brand-orange transition-colors">Projekte</Link></li>
                <li><Link to="/ueber-uns" className="text-base text-brand-muted hover:text-brand-orange transition-colors">Über Uns</Link></li>
                <li><Link to="/kontakt" className="text-base text-brand-muted hover:text-brand-orange transition-colors">Kontakt</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-heading">Rechtliches</h3>
              <ul className="mt-4 space-y-3">
                <li><Link to="/impressum" className="text-base text-brand-muted hover:text-brand-orange transition-colors">Impressum</Link></li>
                <li><Link to="/datenschutz" className="text-base text-brand-muted hover:text-brand-orange transition-colors">Datenschutz</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-heading">Kontakt</h3>
              <ul className="mt-4 space-y-3 text-brand-muted">
                <li>
                  <a href="tel:+4915560090966" className="hover:text-brand-orange transition-colors">T: +49 155 600 909 66</a>
                </li>
                <li>
                  <a href="mailto:post@aplusurbandesign.com" className="hover:text-brand-orange transition-colors">M: post@aplusurbandesign.com</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;