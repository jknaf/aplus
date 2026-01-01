import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../constants';

const Footer: React.FC = () => {
  const productLinks = NAV_LINKS.find(link => link.name === 'Produkte')?.subLinks || [];

  const handlePrivacySettingsClick = () => {
    window.dispatchEvent(new CustomEvent('showPrivacySettings'));
  };

  return (
    <footer className="bg-brand-surface text-brand-text relative z-10 border-t border-white/10">
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Brand Column (Left) */}
          <div className="md:col-span-4 flex flex-col justify-between h-full">
            <div>
                <Link to="/" className="block mb-8 group">
                   <div className="flex items-center gap-3">
                        <img
                            src="https://i.ibb.co/whMmCDk9/apluslogo.png"
                            alt="A+ Urban Design Logo"
                            width={48}
                            height={48}
                            className="w-12 h-12 transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(360deg)]"
                        />
                         <div className="flex flex-col">
                            <span className="text-2xl text-white font-black font-heading leading-none tracking-tighter">A+ URBAN</span>
                            <span className="text-sm text-brand-orange font-bold font-heading leading-none tracking-widest">DESIGN</span>
                        </div>
                   </div>
                </Link>
                <p className="text-brand-muted leading-relaxed mb-8 max-w-sm">
                  Spezialisten für modulare Betonelemente im öffentlichen Raum. Robust, ästhetisch und für die Ewigkeit gebaut.
                </p>
            </div>
             <div className="flex gap-4">
                 <a href="#" className="text-sm font-bold text-white hover:text-brand-orange transition-colors uppercase tracking-wider">
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
                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-6">Menu</h3>
                <ul className="space-y-4">
                    {NAV_LINKS.filter(l => !l.subLinks).map(link => (
                        <li key={link.name}>
                            <Link to={link.href} className="text-sm font-bold text-gray-400 hover:text-white transition-colors uppercase tracking-wider block hover:translate-x-2 transition-transform duration-300">
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Products */}
             <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-6">Produkte</h3>
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
                            Alle ansehen &rarr;
                        </Link>
                    </li>
                </ul>
            </div>

             {/* Contact Info */}
            <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-brand-orange mb-6">Kontakt</h3>
                <ul className="space-y-6">
                     <li>
                        <p className="text-xs text-brand-muted uppercase mb-1">Adresse</p>
                        <p className="text-sm text-white font-medium">Talstrasse 41<br/>70188 Stuttgart</p>
                    </li>
                    <li>
                         <p className="text-xs text-brand-muted uppercase mb-1">Telefon</p>
                         <a href="tel:+4915560090966" className="text-sm text-white font-medium hover:text-brand-orange transition-colors block">
                            +49 155 600 909 66
                         </a>
                    </li>
                    <li>
                         <p className="text-xs text-brand-muted uppercase mb-1">Email</p>
                         <a href="mailto:post@aplusurbandesign.com" className="text-sm text-white font-medium hover:text-brand-orange transition-colors block">
                            post@aplusurbandesign.com
                         </a>
                    </li>
                </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
             <p className="text-xs text-brand-muted">
                &copy; {new Date().getFullYear()} A+ Urban Design. Alle Rechte vorbehalten. Aus Stuttgart.
            </p>
            <div className="flex gap-6">
                <Link to="/impressum" className="text-xs text-brand-muted hover:text-brand-orange transition-colors uppercase tracking-wider">Impressum</Link>
                <Link to="/datenschutz" className="text-xs text-brand-muted hover:text-brand-orange transition-colors uppercase tracking-wider">Datenschutz</Link>
                <button onClick={handlePrivacySettingsClick} className="text-xs text-brand-muted hover:text-brand-orange transition-colors uppercase tracking-wider">Cookies</button>
            </div>
        </div>
      </div>
      
      {/* Massive Background Text Decoration */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none opacity-[0.03] select-none leading-none">
          <span className="text-[18vw] font-black uppercase text-white whitespace-nowrap block translate-y-[20%]">
              Urban Design
          </span>
      </div>
    </footer>
  );
};

export default Footer;