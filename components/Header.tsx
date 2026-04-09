import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  // Handle scroll effect for floating navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsDropdownOpen(false);
  }, [location]);

  const toggleDropdown = () => {
    setIsDropdownOpen(prev => !prev);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };
  
  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && !dropdownButtonRef.current?.contains(event.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
          scrolled ? 'py-0' : 'py-0'
        }`}
      >
        <div
          className={`mx-auto border-b transition-all duration-500 bg-brand-bg/95 backdrop-blur-md ${
            scrolled
              ? 'border-brand-dark/10 shadow-lg shadow-brand-dark/5'
              : 'border-brand-dark/5'
          }`}
        >
          <div className="flex items-center justify-between h-14 md:h-20 px-4 md:px-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0 z-50 group" aria-label="A+ Urban Design Home">
              <img
                src="/aplus-logo.svg"
                alt="A+ Urban Design Logo"
                width={160}
                height={45}
                className="h-8 md:h-10 w-auto transition-transform duration-700 ease-in-out group-hover:scale-105"
              />
            </Link>

            {/* Desktop Nav - Semantic HTML Upgrade */}
            <nav className="hidden md:block" aria-label="Main Navigation">
              <ul className="flex items-center gap-8">
              {NAV_LINKS.map((link) =>
                link.subLinks ? (
                  <li key={link.name} className="relative group">
                    <button 
                      ref={dropdownButtonRef}
                      onClick={toggleDropdown}
                      onMouseEnter={() => setIsDropdownOpen(true)}
                      className="text-brand-dark/70 hover:text-brand-dark py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-200 flex items-center gap-1"
                      aria-expanded={isDropdownOpen}
                    >
                      {link.name}
                      <span className={`bg-brand-orange h-1 w-1 rounded-full transition-opacity ${isDropdownOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
                    </button>
                    
                    {/* Modern Dropdown */}
                    <div
                      ref={dropdownRef}
                      onMouseLeave={() => setIsDropdownOpen(false)}
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 p-2 bg-white border border-brand-dark/10 rounded-xl shadow-2xl backdrop-blur-md transition-all duration-300 origin-top transform ${
                        isDropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                      }`}
                    >
                      <ul className="flex flex-col gap-1">
                        {link.subLinks.map(subLink => (
                           <li key={subLink.name}>
                             <Link
                                to={subLink.href}
                                className="block px-4 py-3 text-sm text-brand-muted hover:text-brand-dark hover:bg-brand-surface/50 rounded-lg transition-all duration-200 group/item"
                              >
                                <span className="block font-bold text-brand-dark group-hover/item:text-brand-orange transition-colors">{subLink.name}</span>
                              </Link>
                           </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ) : (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="relative inline-flex items-center py-2 text-brand-dark/70 hover:text-brand-dark text-xs font-bold uppercase tracking-widest transition-colors duration-200 group"
                    >
                      {link.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-orange transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  </li>
                )
              )}
              </ul>
            </nav>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <Link 
                to="/kontakt" 
                className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-xs font-extrabold uppercase tracking-widest bg-brand-orange text-white hover:bg-brand-dark hover:text-white transition-all duration-300 rounded-lg transform hover:-translate-y-0.5 shadow-lg hover:shadow-brand-orange/20"
              >
                Kontakt
              </Link>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden relative z-50 p-2 text-brand-dark hover:text-brand-orange transition-colors"
                aria-label="Menu"
              >
                <div className="w-6 flex flex-col items-end gap-1.5">
                  <span className={`block h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'w-6 rotate-45 translate-y-2' : 'w-6'}`}></span>
                  <span className={`block h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'w-4'}`}></span>
                  <span className={`block h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'w-6 -rotate-45 -translate-y-2' : 'w-2'}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full Screen Mobile Menu - Hidden on Desktop */}
      <div 
        className={`fixed inset-0 z-40 bg-brand-bg transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] md:hidden ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto h-full flex flex-col justify-center px-6 pb-20 pt-32 overflow-y-auto">
          <nav className="flex flex-col gap-6" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link, idx) => (
              <div key={link.name} className="overflow-hidden">
                {link.subLinks ? (
                   <div className="flex flex-col gap-4">
                      <span className="text-sm font-bold text-brand-orange uppercase tracking-widest border-b border-brand-dark/10 pb-2">{link.name}</span>
                      <div className="pl-4 border-l border-brand-dark/10 flex flex-col gap-4">
                        {link.subLinks.map((sub, subIdx) => (
                           <Link
                            key={sub.name}
                            to={sub.href}
                            onClick={() => setIsMenuOpen(false)}
                            className={`text-xl font-bold uppercase tracking-wide text-brand-muted hover:text-brand-dark transition-all duration-300 translate-y-full animate-[fade-in-up_0.5s_forwards]`}
                            style={{ animationDelay: `${100 + (subIdx * 50)}ms` }}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                   </div>
                ) : (
                  <Link
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block text-4xl sm:text-6xl font-extrabold uppercase tracking-tighter text-brand-dark hover:text-brand-orange transition-all duration-300 translate-y-full ${isMenuOpen ? 'animate-[fade-in-up_0.5s_forwards]' : ''}`}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <div className="mt-12 pt-8 border-t border-brand-dark/10 grid grid-cols-1 gap-8 animate-fade-in-up [animation-delay:600ms]">
            <div>
              <span className="block text-xs text-brand-muted uppercase tracking-widest mb-2">Kontakt</span>
              <a href="mailto:post@aplusurbandesign.com" className="block text-brand-dark font-bold text-lg">post@aplusurbandesign.com</a>
            </div>
            <div>
              <span className="block text-xs text-brand-muted uppercase tracking-widest mb-2">Social</span>
              <div className="flex gap-4">
                <a href="#" className="text-brand-dark hover:text-brand-orange text-lg font-bold">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;