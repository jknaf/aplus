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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-y-12 gap-x-8">
          
          {/* Brand Info Column */}
          <div className="sm:col-span-2 md:col-span-4 lg:col-span-2">
            <Link to="/" className="flex items-center gap-4 inline-block">
              <img
                src="https://i.ibb.co/8L4v9mMQ/apluslogo.png"
                alt="A+ Urban Design Logo"
                width={80}
                height={80}
                className="inline-block align-middle"
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
          
          {/* Legal Links Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-heading">Rechtliches</h3>
            <ul className="mt-6 space-y-4">
              <li><Link to="/impressum" className="text-base text-brand-muted hover:text-brand-orange transition-colors">Impressum</Link></li>
              <li><Link to="/datenschutz" className="text-base text-brand-muted hover:text-brand-orange transition-colors">Datenschutz</Link></li>
              <li><button onClick={handlePrivacySettingsClick} className="text-base text-brand-muted hover:text-brand-orange transition-colors text-left">Datenschutz-Einstellungen</button></li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-brand-heading">Kontakt</h3>
            <ul className="mt-6 space-y-4 text-brand-muted">
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
    </footer>
  );
};

export default Footer;
