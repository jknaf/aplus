
import React from 'react';
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-anthracite text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-extrabold font-heading tracking-tighter">
              A+<span className="text-brand-orange"> Urban Design</span>
            </h2>
            <p className="mt-4 max-w-sm text-gray-300">
              ARCHITEKTUR UND URBANES DESIGN – BETON UND STAHL FÜR FREIZEIT UND SPORT.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-200">Navigation</h3>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                   {link.href !== '#' ? (
                    <Link to={link.href} className="text-base text-gray-300 hover:text-brand-orange transition-colors duration-200">
                      {link.name}
                    </Link>
                   ) : (
                    <span className="text-base text-gray-300">{link.name}</span>
                   )}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-200">Kontakt</h3>
            <ul className="mt-4 space-y-2 text-gray-300">
              <li>A+ URBAN DESIGN</li>
              <li>Cüneyit Akcakoca</li>
              <li>Talstrasse 41</li>
              <li>70188 Stuttgart</li>
              <li className="pt-2">
                <a href="tel:+4915560090966" className="hover:text-brand-orange">Tel: +49 155 600 909 66</a>
              </li>
              <li>
                <a href="mailto:post@aplusurbandesign.com" className="hover:text-brand-orange">post@aplusurbandesign.com</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div className="flex space-x-4">
              <Link to="/impressum" className="hover:text-brand-orange transition-colors duration-200">Impressum</Link>
              <Link to="/datenschutz" className="hover:text-brand-orange transition-colors duration-200">Datenschutzerklärung</Link>
          </div>
          <p className="mt-4 md:mt-0">&copy; {new Date().getFullYear()} A+ Urban Design. Alle Rechte vorbehalten.</p>
        </div>
         <div className="mt-4 text-xs text-gray-500 text-center md:text-left">
              <p>Die Inhalte dieser Seiten sollen nur als Information dienen; sie sind unverbindlich und können von der tatsächlichen Ausführung abweichen.</p>
              <p>Der Inhalt dieser Seiten ist geschützt und darf nicht von Dritten ohne schriftliche Erlaubnis verwendet werden.</p>
          </div>
      </div>
    </footer>
  );
};

export default Footer;