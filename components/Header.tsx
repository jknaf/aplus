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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4 md:px-6 ${
          scrolled ? 'py-2' : 'py-4 md:py-6'
        }`}
      >
        <div 
          className={`mx-auto max-w-7xl rounded-2xl border transition-all duration-500 ${
            scrolled 
              ? 'bg-brand-bg/80 border-white/10 backdrop-blur-md shadow-lg shadow-black/50' 
              : 'bg-transparent border-transparent md:bg-brand-bg/60 md:border-white/5 md:backdrop-blur-sm'
          }`}
        >
          <div className="flex items-center justify-between h-16 md:h-20 px-4 md:px-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0 z-50 group" aria-label="A+ Urban Design Home">
              <img
                src="https://i.ibb.co/whMmCDk9/apluslogo.png"
                alt="A+ Urban Design Logo"
                width={32}
                height={32}
                className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(360deg)]"
              />
              <div className="flex flex-col">
                <span className="text-lg md:text-xl text-white font-black font-heading leading-none tracking-tighter">A+ URBAN</span>
                <span className="text-xs md:text-sm text-brand-orange font-bold font-heading leading-none tracking-widest">DESIGN</span>
              </div>
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
                      className="text-gray-300 hover:text-white py-2 text-xs font-bold uppercase tracking-widest transition-colors duration-200 flex items-center gap-1"
                      aria-expanded={isDropdownOpen}
                    >
                      {link.name}
                      <span className={`bg-brand-orange h-1 w-1 rounded-full transition-opacity ${isDropdownOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
                    </button>
                    
                    {/* Modern Dropdown */}
                    <div 
                      ref={dropdownRef}
                      onMouseLeave={() => setIsDropdownOpen(false)}
                      className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-64 p-2 bg-[#121212] border border-white/10 rounded-xl shadow-2xl backdrop-blur-md transition-all duration-300 origin-top transform ${
                        isDropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
                      }`}
                    >
                      <ul className="flex flex-col gap-1">
                        {link.subLinks.map(subLink => (
                           <li key={subLink.name}>
                             <Link 
                                to={subLink.href} 
                                className="block px-4 py-3 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200 group/item" 
                              >
                                <span className="block font-bold text-white group-hover/item:text-brand-orange transition-colors">{subLink.name}</span>
                                <span className="text-xs opacity-50">Betonfertigteile</span>
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
                      className="relative text-gray-300 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors duration-200 group"
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
                className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-xs font-black uppercase tracking-widest bg-white text-black hover:bg-brand-orange hover:text-white transition-all duration-300 rounded-lg transform hover:-translate-y-0.5 shadow-lg hover:shadow-brand-orange/20"
              >
                Kontakt
              </Link>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden relative z-50 p-2 text-white hover:text-brand-orange transition-colors"
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
        className={`fixed inset-0 z-40 bg-brand-bg/95 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] md:hidden ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto h-full flex flex-col justify-center px-6 pb-20 pt-32">
          <nav className="flex flex-col gap-6" aria-label="Mobile Navigation">
            {NAV_LINKS.map((link, idx) => (
              <div key={link.name} className="overflow-hidden">
                {link.subLinks ? (
                   <div className="flex flex-col gap-4">
                      <span className="text-sm font-bold text-brand-muted uppercase tracking-widest border-b border-white/10 pb-2">{link.name}</span>
                      <div className="pl-4 border-l border-white/10 flex flex-col gap-4">
                        {link.subLinks.map((sub, subIdx) => (
                           <Link 
                            key={sub.name}
                            to={sub.href}
                            className={`text-2xl font-black uppercase tracking-tighter text-transparent text-outline hover:text-brand-orange hover:text-outline-none transition-all duration-300 translate-y-full animate-[fade-in-up_0.5s_forwards]`}
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
                    className={`block text-5xl sm:text-7xl font-black uppercase tracking-tighter text-transparent text-outline-bold hover:text-white hover:text-outline-none transition-all duration-300 translate-y-full ${isMenuOpen ? 'animate-[fade-in-up_0.5s_forwards]' : ''}`}
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    {link.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          
          <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 gap-8 animate-fade-in-up [animation-delay:600ms]">
            <div>
              <span className="block text-xs text-brand-muted uppercase tracking-widest mb-2">Kontakt</span>
              <a href="mailto:post@aplusurbandesign.com" className="block text-white font-bold">post@aplusurbandesign.com</a>
            </div>
            <div>
              <span className="block text-xs text-brand-muted uppercase tracking-widest mb-2">Social</span>
              <div className="flex gap-4">
                <a href="#" className="text-white hover:text-brand-orange">LinkedIn</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;