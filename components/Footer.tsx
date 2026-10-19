import React from 'react';
import { Link, useT } from '../i18n';
import { useNavLinks } from '../localized';

const Footer: React.FC = () => {
  const t = useT();
  const NAV_LINKS = useNavLinks();
  const productLinks = NAV_LINKS.find(link => link.href === '/produkte')?.subLinks || [];

  const handlePrivacySettingsClick = () => {
    window.dispatchEvent(new CustomEvent('showPrivacySettings'));
  };

  return (
    <footer className="bg-brand-dark text-white relative z-10 border-t border-brand-dark/10">
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Brand Column (Left) */}
          <div className="md:col-span-4 flex flex-col justify-between h-full">
            <div>
                <Link to="/" className="block mb-8 group">
                   <div className="flex items-center gap-3">
                        <img
                            src="/aplus-logo.svg"
                            alt="A+ Urban Design"
                            width={160}
                            height={45}
                            className="h-10 w-auto brightness-0 invert transition-transform duration-700 ease-in-out group-hover:scale-105"
                        />
                   </div>
                </Link>
                <p className="text-brand-muted leading-relaxed mb-8 max-w-sm">
                  {t('Wir stellen modulare Betonelemente für den öffentlichen Raum her. Sie sind robust und für Jahrzehnte gebaut.', 'We make modular concrete elements for public spaces. They are robust and built to last for decades.', "Nous fabriquons des éléments modulaires en béton pour l'espace public. Ils sont robustes et conçus pour durer des décennies.")}
                </p>
            </div>
             <div className="flex gap-4">
                 <a href="https://www.linkedin.com/in/cüneyit-akcakoca-6577673/" target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-white hover:text-brand-orange transition-colors uppercase tracking-wider">
                    LinkedIn &rarr;
                 </a>
             </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1"></div>

          {/* Links Grid (Right) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            
            {/* Navigation */}
            <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-6">{t('Menü', 'Menu', 'Menu')}</h3>
                <ul className="space-y-4">
                    {NAV_LINKS.filter(l => l.href !== '/produkte').map(link => (
                        <li key={link.name}>
                            <Link to={link.href} className="text-sm font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-wider block hover:translate-x-2 transition-transform duration-300">
                                {link.name}
                            </Link>
                        </li>
                    ))}
                    {/* Presse steht nicht im Hauptmenü, darum hier */}
                    <li>
                        <Link to="/referenzen-presse" className="text-sm font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-wider block hover:translate-x-2 transition-transform duration-300">
                            {t('Presse', 'Press', 'Presse')}
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Products */}
             <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-6">{t('Produkte', 'Products', 'Produits')}</h3>
                <ul className="space-y-4">
                    {productLinks.slice(0, 5).map(link => (
                         <li key={link.name}>
                            <Link to={link.href} className="text-sm font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-wider block hover:translate-x-2 transition-transform duration-300">
                                {link.name}
                            </Link>
                        </li>
                    ))}
                     <li>
                        <Link to="/produkte/skate-anlagen" className="text-sm font-bold text-brand-orange hover:text-white transition-colors uppercase tracking-wider block hover:translate-x-2 transition-transform duration-300">
                            {t('Alle ansehen', 'View all', 'Tout voir')} &rarr;
                        </Link>
                    </li>
                </ul>
            </div>

             {/* Contact Info */}
            <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-6">{t('Kontakt', 'Contact', 'Contact')}</h3>
                <ul className="space-y-6">
                     <li>
                        <p className="text-xs text-brand-muted uppercase mb-1">{t('Adresse', 'Address', 'Adresse')}</p>
                        <p className="text-sm text-white font-medium">Talstrasse 41<br/>70188 Stuttgart</p>
                    </li>
                    <li>
                         <p className="text-xs text-brand-muted uppercase mb-1">{t('Telefon', 'Phone', 'Téléphone')}</p>
                         <a href="tel:+4915560090966" className="text-sm text-white font-medium hover:text-brand-orange transition-colors block">
                            +49 155 600 909 66
                         </a>
                    </li>
                    <li>
                         <p className="text-xs text-brand-muted uppercase mb-1">{t('E-Mail', 'Email', 'E-mail')}</p>
                         <a href="mailto:post@aplusurbandesign.com" className="text-sm text-white font-medium hover:text-brand-orange transition-colors block">
                            post@aplusurbandesign.com
                         </a>
                    </li>
                </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/60">
             <p className="text-xs text-brand-muted">
                &copy; {new Date().getFullYear()} A+ Urban Design. {t('Alle Rechte vorbehalten. Aus Stuttgart.', 'All rights reserved. From Stuttgart.', 'Tous droits réservés. Depuis Stuttgart.')}
            </p>
            <div className="flex gap-6">
                <Link to="/impressum" className="text-xs text-brand-muted hover:text-brand-orange transition-colors uppercase tracking-wider">{t('Impressum', 'Legal notice', 'Mentions légales')}</Link>
                <Link to="/datenschutz" className="text-xs text-brand-muted hover:text-brand-orange transition-colors uppercase tracking-wider">{t('Datenschutz', 'Privacy', 'Confidentialité')}</Link>
                <button onClick={handlePrivacySettingsClick} className="text-xs text-brand-muted hover:text-brand-orange transition-colors uppercase tracking-wider">Cookies</button>
            </div>
        </div>
      </div>
      
      {/* Massive Background Text Decoration */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none opacity-[0.03] select-none leading-none">
          <span className="text-[18vw] font-extrabold uppercase text-white whitespace-nowrap block translate-y-[20%]">
              Urban Design
          </span>
      </div>
    </footer>
  );
};

export default Footer;