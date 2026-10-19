import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Link, useT, useLang } from '../i18n';
import { useNavLinks } from '../localized';
import LanguageSwitch from './LanguageSwitch';

type NavLink = ReturnType<typeof useNavLinks>[number];
type SubLink = NonNullable<NavLink['subLinks']>[number];

const Pfeil: React.FC<{ offen?: boolean; className?: string }> = ({ offen, className = 'w-3 h-3' }) => (
  <svg viewBox="0 0 12 12" aria-hidden="true" className={`${className} transition-transform duration-200 ${offen ? 'rotate-180' : ''}`}>
    <path d="M2.5 4.5 6 8l3.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const NAV_TEXT = 'font-heading font-bold text-sm uppercase tracking-widest transition-colors duration-200';
const GRUPPE_TEXT = 'text-xs font-semibold uppercase tracking-[0.14em] text-[#5F6159]';

const Header: React.FC = () => {
  const t = useT();
  const lang = useLang();
  const NAV_LINKS = useNavLinks();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Name des offenen Untermenüs am Desktop (Produkte, Planung), sonst null
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  // Aufgeklappter Bereich im Handy-Menü
  const [mobilOffen, setMobilOffen] = useState<string | null>('/produkte');
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const location = useLocation();

  const gruppen = [
    { id: 'skate', name: t('Skate und Bike', 'Skate and bike', 'Skate et vélo') },
    { id: 'freizeit', name: t('Freizeit und Sport', 'Leisure and sport', 'Loisirs et sport') },
  ];
  const planungText: Record<string, string> = {
    '/planung': t(
      'Sie nennen uns Fläche und Budget. Wir erstellen den Entwurf mit Draufsicht, 3D-Zeichnung und Kostenübersicht.',
      'You tell us the area and the budget. We prepare the design with plan view, 3D drawing and cost overview.',
      'Vous nous indiquez la surface et le budget. Nous établissons le projet avec plan de masse, dessin 3D et aperçu des coûts.',
    ),
    '/konfigurator': t(
      'Selbst planen: mit einer Vorlage starten und anpassen. Geländer und Pflichtteile ergänzt der Planer.',
      'Plan it yourself: start with a template and adapt it. The planner adds railings and mandatory parts.',
      "Planifiez vous-même : partez d'un modèle et adaptez-le. Le configurateur ajoute les garde-corps et les pièces obligatoires.",
    ),
  };

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
    setOpenDropdown(null);
  }, [location]);

  // Klick außerhalb des Headers oder Escape schließt das Untermenü
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpenDropdown(null);
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenDropdown(null);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKey);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const offenerLink = NAV_LINKS.find((link) => link.name === openDropdown);

  // Kachel mit Bild für das Produkte-Menü am Desktop
  const Kachel = (sub: SubLink) => (
    <Link key={sub.href} to={sub.href} className="group/k flex flex-col gap-3">
      <span className="block aspect-[16/10] rounded-lg overflow-hidden bg-brand-surface">
        <img src={sub.bild} alt="" decoding="async" width={480} height={300} className="w-full h-full object-cover transition-transform duration-500 group-hover/k:scale-105" />
      </span>
      <span className="font-heading font-bold text-[15px] leading-snug text-brand-dark group-hover/k:text-[#557A38] transition-colors">{sub.name}</span>
    </Link>
  );

  const produktePanel = (link: NavLink) => (
    // max-w: auf breiten Bildschirmen wachsen die Kacheln sonst mit
    <div className="max-w-[1200px] mx-auto grid grid-cols-[minmax(0,1fr)_240px] xl:grid-cols-[minmax(0,1fr)_280px] gap-10 xl:gap-14">
      <div className="flex flex-col gap-8">
        {gruppen.map((g) => (
          <div key={g.id} className="flex flex-col gap-4">
            <div className={GRUPPE_TEXT}>{g.name}</div>
            <div className="grid grid-cols-4 gap-4 xl:gap-5">{link.subLinks!.filter((s) => s.gruppe === g.id).map(Kachel)}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-5 border-l border-brand-dark/10 pl-8 xl:pl-10">
        <Link to="/katalog" className="group/k flex flex-col gap-4">
          <img
            src="/images/menue/katalog-cover.webp"
            alt={t('Titelseite Katalog 2026: Skate-Elemente aus Beton', '2026 catalogue cover: concrete skate elements', 'Couverture du catalogue 2026 : éléments de skate en béton')}
            decoding="async" width={480} height={680}
            className="w-[130px] xl:w-[150px] h-auto rounded shadow-[0_12px_28px_rgba(28,34,30,0.22)] ring-1 ring-brand-dark/10 transition-transform duration-500 group-hover/k:-translate-y-1"
          />
          <span className="flex flex-col gap-2 pb-1">
            <span className={GRUPPE_TEXT}>{t('Ausgabe 2026', '2026 edition', 'Édition 2026')}</span>
            <span className="font-heading font-extrabold text-[22px] text-brand-dark group-hover/k:text-[#557A38] transition-colors">{t('Katalog', 'Catalogue', 'Catalogue')}</span>
            <span className="text-[15px] leading-normal text-[#5F6159]">{t('Alle Skate-Elemente mit Maßen und Datenblatt.', 'All skate elements with dimensions and data sheet.', 'Tous les éléments de skate avec dimensions et fiche technique.')}</span>
          </span>
        </Link>
        <Link to="/produkte" className="mt-auto inline-flex items-center gap-2 min-h-11 font-heading font-bold text-sm text-[#557A38] hover:text-brand-dark transition-colors">
          {t('Alle Produkte im Überblick', 'All products at a glance', "Tous les produits en un coup d'œil")}
          <svg viewBox="0 0 16 16" aria-hidden="true" className="w-4 h-4"><path d="M3 8h10M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Link>
      </div>
    </div>
  );

  const planungPanel = (link: NavLink) => (
    <div className="max-w-[960px] mx-auto grid grid-cols-2 gap-8">
      {link.subLinks!.map((sub) => (
        <Link key={sub.href} to={sub.href} className="group/k flex items-center gap-6">
          <span className="block w-[200px] aspect-[10/7] shrink-0 rounded-lg overflow-hidden bg-brand-surface">
            <img src={sub.bild} alt="" decoding="async" width={480} height={336} className="w-full h-full object-cover transition-transform duration-500 group-hover/k:scale-105" />
          </span>
          <span className="flex flex-col gap-2">
            <span className="font-heading font-extrabold text-xl text-brand-dark group-hover/k:text-[#557A38] transition-colors">{sub.name}</span>
            <span className="text-[15px] leading-normal text-[#5F6159]">{planungText[sub.href]}</span>
          </span>
        </Link>
      ))}
    </div>
  );

  return (
    <>
      <header
        ref={headerRef}
        onMouseLeave={() => setOpenDropdown(null)}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div
          className={`mx-auto border-b transition-all duration-500 bg-brand-bg/95 backdrop-blur-md ${
            scrolled || openDropdown
              ? 'border-brand-dark/10 shadow-lg shadow-brand-dark/5'
              : 'border-brand-dark/5'
          }`}
        >
          <div className="flex items-center justify-between h-14 md:h-20 px-4 md:px-8">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0 z-50 group lg:w-[200px]" aria-label={t('Zur Startseite', 'Go to the home page', "Aller à l'accueil")}>
              <img
                src="/aplus-logo.svg"
                alt="A+ Urban Design"
                width={160}
                height={45}
                className="h-8 md:h-10 w-auto transition-transform duration-700 ease-in-out group-hover:scale-105"
              />
            </Link>

            {/* Desktop-Menü: Produkte und Planung klappen über die ganze Breite auf */}
            <nav className="hidden lg:block" aria-label={t('Hauptnavigation', 'Main navigation', 'Navigation principale')}>
              <ul className="flex items-center gap-1 xl:gap-3 whitespace-nowrap">
              {/* Kontakt steht rechts als Knopf, darum hier nicht doppelt */}
              {NAV_LINKS.filter((link) => link.href !== '/kontakt').map((link) => {
                const isOpen = openDropdown === link.name;
                return link.subLinks ? (
                  <li key={link.name} onMouseEnter={() => setOpenDropdown(link.name)}>
                    <button
                      type="button"
                      // Maus hat beim Überfahren schon geöffnet, Klick darf nicht wieder schließen.
                      // Nur Tastatur (detail === 0) schaltet um.
                      onClick={(e) => setOpenDropdown(isOpen && e.detail === 0 ? null : link.name)}
                      className={`${NAV_TEXT} flex items-center gap-1.5 h-11 px-3 xl:px-4 ${isOpen ? 'text-brand-dark shadow-[inset_0_-2px_0_#557A38]' : 'text-brand-dark/70 hover:text-brand-dark'}`}
                      aria-expanded={isOpen}
                    >
                      {link.name}
                      <Pfeil offen={isOpen} />
                    </button>
                  </li>
                ) : (
                  <li key={link.name} onMouseEnter={() => setOpenDropdown(null)}>
                    <Link
                      to={link.href}
                      className={`${NAV_TEXT} relative inline-flex items-center h-11 px-3 xl:px-4 text-brand-dark/70 hover:text-brand-dark group`}
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-3 xl:left-4 right-3 xl:right-4 h-0.5 bg-[#557A38] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
                    </Link>
                  </li>
                );
              })}
              </ul>
            </nav>

            {/* Sprache & Kontakt, Handy-Knopf */}
            <div className="flex items-center justify-end gap-3 lg:w-[200px]" onMouseEnter={() => setOpenDropdown(null)}>
              {/* Sprachwahl als kleines Auswahlfeld; key schließt es nach dem Wechsel */}
              <details key={location.pathname} className="relative hidden lg:block">
                <summary
                  className="list-none [&::-webkit-details-marker]:hidden flex items-center gap-1.5 h-11 px-3 rounded-lg border border-brand-dark/20 text-[13px] font-semibold uppercase text-brand-dark cursor-pointer hover:border-brand-dark/40"
                  aria-label={t('Sprache wählen, aktuell Deutsch', 'Choose language, currently English', 'Choisir la langue, actuellement français')}
                >
                  {lang}
                  <Pfeil className="w-2.5 h-2.5" />
                </summary>
                <div className="absolute right-0 top-full mt-2 p-1.5 bg-white rounded-lg border border-brand-dark/10 shadow-xl">
                  <LanguageSwitch className="flex-col !items-stretch" />
                </div>
              </details>
              <Link
                to="/kontakt"
                className="hidden lg:inline-flex items-center justify-center h-11 px-6 text-[13px] font-heading font-extrabold uppercase tracking-widest bg-[#557A38] text-white hover:bg-brand-dark transition-colors duration-300 rounded-lg"
              >
                {t('Kontakt', 'Contact', 'Contact')}
              </Link>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden relative z-50 w-11 h-11 flex items-center justify-center text-brand-dark hover:text-brand-orange transition-colors"
                aria-label={isMenuOpen ? t('Menü schließen', 'Close menu', 'Fermer le menu') : t('Menü öffnen', 'Open menu', 'Ouvrir le menu')}
                aria-expanded={isMenuOpen}
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

        {/* Aufgeklapptes Menü: erst beim Öffnen gerendert, damit die Bilder nicht mit jeder Seite laden */}
        {offenerLink?.subLinks && (
          <div className="hidden lg:block absolute left-0 right-0 top-full bg-[#FBFAF7] shadow-[0_24px_48px_rgba(28,34,30,0.18)] px-8 xl:px-12 pt-10 pb-9 animate-menue-auf">
            {offenerLink.href === '/produkte' ? produktePanel(offenerLink) : planungPanel(offenerLink)}
          </div>
        )}
      </header>

      {/* Abdunkeln hinter dem aufgeklappten Menü */}
      {openDropdown && (
        <div className="hidden lg:block fixed inset-0 z-40 bg-brand-dark/50" onClick={() => setOpenDropdown(null)} aria-hidden="true" />
      )}

      {/* Handy-Menü: Bereiche klappen auf, Sprache und Kontakt stehen unten fest */}
      <div
        className={`fixed inset-0 z-40 bg-brand-bg transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] lg:hidden flex flex-col pt-14 md:pt-20 ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <nav className="flex-1 overflow-y-auto px-5 md:px-8" aria-label={t('Mobile Navigation', 'Mobile navigation', 'Navigation mobile')}>
          {NAV_LINKS.filter((link) => link.href !== '/kontakt').map((link) => {
            const auf = mobilOffen === link.href;
            const produkte = link.href === '/produkte';
            return link.subLinks ? (
              <div key={link.name} className="border-b border-brand-dark/10">
                <button
                  type="button"
                  onClick={() => setMobilOffen(auf ? null : link.href)}
                  aria-expanded={auf}
                  className="w-full h-[60px] flex items-center justify-between font-heading font-extrabold text-[22px] text-brand-dark"
                >
                  {link.name}
                  <Pfeil offen={auf} className="w-4 h-4" />
                </button>
                {/* erst bei offenem Menü gerendert, damit die Bilder nicht mit jeder Seite laden */}
                {auf && isMenuOpen && (
                  <div className="flex flex-col gap-2.5 pb-3">
                    {(produkte ? gruppen : [{ id: undefined, name: '' }]).map((g) => (
                      <React.Fragment key={g.name}>
                        {g.name && <div className={`${GRUPPE_TEXT} !text-[11px] mt-1`}>{g.name}</div>}
                        <div className={`grid gap-2 ${produkte ? 'grid-cols-2' : 'grid-cols-1'}`}>
                          {link.subLinks!.filter((s) => s.gruppe === g.id).map((sub) => (
                            <Link key={sub.href} to={sub.href} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2.5 min-h-14 font-semibold text-sm leading-tight text-brand-dark">
                              <img src={sub.bild} alt="" decoding="async" width={52} height={52} className="w-[52px] h-[52px] rounded-md object-cover shrink-0" />
                              <span>{sub.name}</span>
                            </Link>
                          ))}
                        </div>
                      </React.Fragment>
                    ))}
                    {produkte && (
                      <Link to="/produkte" onClick={() => setIsMenuOpen(false)} className="inline-flex items-center gap-2 h-11 font-heading font-bold text-sm text-[#557A38]">
                        {t('Alle Produkte im Überblick', 'All products at a glance', "Tous les produits en un coup d'œil")} &rarr;
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="h-[60px] flex items-center border-b border-brand-dark/10 last:border-b-0 font-heading font-extrabold text-[22px] text-brand-dark"
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        <div className="shrink-0 flex items-center gap-3 px-5 md:px-8 pt-3.5 pb-5 border-t border-brand-dark/10 bg-brand-bg">
          <LanguageSwitch className="[&>a]:!px-3 [&>a]:!py-3.5" />
          <Link
            to="/kontakt"
            onClick={() => setIsMenuOpen(false)}
            className="flex-1 h-12 inline-flex items-center justify-center rounded-lg bg-[#557A38] text-white font-heading font-extrabold text-[13px] uppercase tracking-widest"
          >
            {t('Kontakt', 'Contact', 'Contact')}
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
