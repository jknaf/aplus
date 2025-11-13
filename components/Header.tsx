import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-extrabold font-heading text-brand-anthracite tracking-tighter">
              A+<span className="text-brand-orange"> Urban Design</span>
            </h1>
          </Link>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {NAV_LINKS.map((link) =>
                link.subLinks ? (
                  <div key={link.name} className="relative" ref={dropdownRef}>
                    <button onClick={toggleDropdown} className="text-brand-anthracite hover:text-brand-orange px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-colors duration-200 flex items-center">
                      {link.name}
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 inline-block ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    {isDropdownOpen && (
                      <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                          {link.subLinks.map(subLink => (
                             <Link 
                                key={subLink.name} 
                                to={subLink.href} 
                                onClick={closeDropdown}
                                className="block px-4 py-2 text-sm text-brand-anthracite hover:bg-brand-gray-light hover:text-brand-orange" 
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
                  <Link key={link.name} to={link.href} className="text-brand-anthracite hover:text-brand-orange px-3 py-2 rounded-md text-sm font-bold uppercase tracking-wider transition-colors duration-200">
                    {link.name}
                  </Link>
                )
              )}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="bg-brand-anthracite inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-brand-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
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
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map((link) => (
                link.subLinks ? (
                    <div key={link.name}>
                        <p className="text-brand-anthracite block px-3 py-2 rounded-md text-base font-bold uppercase">{link.name}</p>
                        {link.subLinks.map(subLink => (
                            <Link 
                              key={subLink.name} 
                              to={subLink.href} 
                              onClick={() => setIsMenuOpen(false)}
                              className="text-gray-500 hover:text-brand-orange block pl-6 pr-3 py-2 rounded-md text-base font-medium"
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
                      className="text-brand-anthracite hover:text-brand-orange block px-3 py-2 rounded-md text-base font-bold uppercase"
                    >
                        {link.name}
                    </Link>
                )
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;