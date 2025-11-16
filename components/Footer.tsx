import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../constants';

const Footer: React.FC = () => {
  const productLinks = NAV_LINKS.find(link => link.name === 'Produkte')?.subLinks || [];

  const handlePrivacySettingsClick = () => {
    // Dispatch a custom event to be caught by the PrivacyBanner component
    window.dispatchEvent(new CustomEvent('showPrivacySettings'));
  };

  return (
    <footer className="bg-brand-surface text-brand-text">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
          
          {/* Brand Info Column */}
          <div className="sm:col-span-2 md:col-span-4">
            <Link to="/" className="flex items-center gap-4 inline-block">
              <img
                src="https://i.ibb.co/whMmCDk9/apluslogo.png"
                alt="A+ Urban Design Logo"
                width={80}
                height={80}
                className="inline-block align-middle"
                loading="eager"
                decoding="sync"
                fetchPriority="high"
              />
              <span className="text-3xl sm:text-4xl text-brand-orange font-black font-heading tracking-tighter">
                Urban Design
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-brand-muted">
              ARCHITEKTUR UND URBANES DESIGN – BETON UND STAHL FÜR FREIZEIT UND SPORT.
            </p>
             <div className="mt-8 text-sm text-brand-muted">
              <p>&copy; {new Date().getFullYear()} A+ Urban Design</p>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-heading">Navigation</h3>
            <ul className="mt-6 space-y-4">
              <li><Link to="/" className="text-base text-brand-muted hover:text-brand-orange transition-colors">Home</Link></li>
              <li><Link to="/projekte" className="text-base text-brand-muted hover:text-brand-orange transition-colors">Projekte</Link></li>
              <li><Link to="/ueber-uns" className="text-base text-brand-muted hover:text-brand-orange transition-colors">Über Uns</Link></li>
              <li><Link to="/kontakt" className="text-base text-brand-muted hover:text-brand-orange transition-colors">Kontakt</Link></li>
            </ul>
          </div>

          {/* Product Links Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-heading">Produkte</h3>
            <ul className="mt-6 space-y-4">
              {productLinks.map(link => (
                  <li key={link.name}><Link to={link.href} className="text-base text-brand-muted hover:text-brand-orange transition-colors">{link.name}</Link></li>
              ))}
            </ul>
          </div>
          
          {/* Contact Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-heading">Kontakt</h3>
            <ul className="mt-6 space-y-4">
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-5 h-5 mr-3 text-white mt-1" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                <a href="tel:+4915560090966" className="text-brand-muted hover:text-brand-orange transition-colors">+49 155 600 909 66</a>
              </li>
              <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-5 h-5 mr-3 text-white mt-1" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                <a href="mailto:post@aplusurbandesign.com" className="text-brand-muted hover:text-brand-orange transition-colors">post@aplusurbandesign.com</a>
              </li>
              <li className="flex items-start">
                <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-5 h-5 mr-3 text-white mt-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                <span className="text-brand-muted">Talstrasse 41, 70188 Stuttgart</span>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-heading">Rechtliches</h3>
            <ul className="mt-6 space-y-4">
              <li><Link to="/impressum" className="text-base text-brand-muted hover:text-brand-orange transition-colors">Impressum</Link></li>
              <li><Link to="/datenschutz" className="text-base text-brand-muted hover:text-brand-orange transition-colors">Datenschutz</Link></li>
              <li><button onClick={handlePrivacySettingsClick} className="text-base text-brand-muted hover:text-brand-orange transition-colors">Cookie-Einstellungen</button></li>
            </ul>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;