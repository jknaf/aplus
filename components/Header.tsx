import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && !dropdownButtonRef.current?.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <header className="bg-brand-bg/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link to="/" className="flex-shrink-0" aria-label="A+ Urban Design Homepage">
            <div className="flex items-center font-black font-heading tracking-tighter">
              <span className="text-2xl sm:text-3xl text-white">A+</span>
              <span className="ml-2 text-xl sm:text-2xl text-brand-orange">Urban Design</span>
            </div>
          </Link>
          <nav className="hidden md:block" aria-label="Hauptnavigation">
            <div className="ml-10 flex items-baseline space-x-8">
              {NAV_LINKS.map((link) =>
                link.subLinks ? (
                  <div key={link.name} className="relative">
                    <button 
                      ref={dropdownButtonRef}
                      onClick={toggleDropdown} 
                      className="text-brand-heading hover:text-brand-orange px-1 py-2 text-sm font-bold uppercase tracking-wider transition-colors duration-200 flex items-center"
                      aria-haspopup="true"
                      aria-expanded={isDropdownOpen}
                      aria-controls="product-dropdown"
                    >
                      {link.name}
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 inline-block ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    {isDropdownOpen && (
                      <div id="product-dropdown" ref={dropdownRef} className="absolute left-0 mt-2 w-64 rounded-md shadow-2xl bg-brand-surface ring-1 ring-white/5 origin-top-left animate-[fade-in-up_0.3s_ease-out]">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          {link.subLinks.map(subLink => (
                             <Link 
                                key={subLink.name} 
                                to={subLink.href} 
                                onClick={closeDropdown}
                                className="block px-4 py-3 text-sm text-brand-text hover:bg-brand-bg hover:text-brand-orange transition-colors duration-200" 
                                role="menuitem"
                              >
                                {subLink.name}
                              </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link key={link.name} to={link.href} className="text-brand-heading hover:text-brand-orange px-1 py-2 text-sm font-bold uppercase tracking-wider transition-colors duration-200">
                    {link.name}
                  </Link>
                )
              )}
            </div>
          </nav>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-brand-surface inline-flex items-center justify-center p-2 rounded-md text-brand-heading hover:bg-brand-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-bg focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Hauptmenü öffnen</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden" id="mobile-menu" aria-label="Mobiles Hauptmenü">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
                link.subLinks ? (
                    <div key={link.name}>
                        <p className="text-brand-heading block px-3 py-2 rounded-md text-base font-bold uppercase" aria-hidden="true">{link.name}</p>
                        {link.subLinks.map(subLink => (
                            <Link 
                              key={subLink.name} 
                              to={subLink.href} 
                              onClick={() => setIsMenuOpen(false)}
                              className="text-brand-muted hover:text-brand-orange block pl-6 pr-3 py-2 rounded-md text-base font-medium"
                            >
                              {subLink.name}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <Link 
                      key={link.name} 
                      to={link.href} 
                      onClick={() => setIsMenuOpen(false)}
                      className="text-brand-heading hover:text-brand-orange block px-3 py-2 rounded-md text-base font-bold uppercase"
                    >
                        {link.name}
                    </Link>
                )
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;