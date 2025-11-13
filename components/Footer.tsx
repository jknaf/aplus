import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-surface text-brand-text">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="lg:col-span-1">
            <h2 className="text-4xl font-black font-heading tracking-tighter text-brand-heading">
              A+<span className="text-brand-orange"> Urban Design</span>
            </h2>
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