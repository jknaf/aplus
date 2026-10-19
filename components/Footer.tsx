import React from 'react';
import { Link, useT } from '../i18n';
import { useNavLinks } from '../localized';

// Footer im Plankopf-Stil: Zellen mit Haarlinien (gap-px auf hellem Grund), Text in einer Größe.
const kopf = 'px-5 py-2.5 font-mono text-[11px] tracking-[0.14em] uppercase text-[#A9C98A] border-[rgba(242,240,235,0.22)] border-b';
const verweis = 'text-[15px] text-brand-bg hover:text-[#A9C98A] transition-colors';
const label = 'text-xs text-[#A9ADA6] mb-0.5';

const Liste: React.FC<{ links: { name: string; href: string }[] }> = ({ links }) => (
  <ul className="px-5 py-5 flex flex-col gap-2.5">
    {links.map(link => (
      <li key={link.href}><Link to={link.href} className={verweis}>{link.name}</Link></li>
    ))}
  </ul>
);

const Footer: React.FC = () => {
  const t = useT();
  const NAV_LINKS = useNavLinks();
  const unter = (href: string) => NAV_LINKS.find(link => link.href === href)?.subLinks || [];
  const name = (href: string) => NAV_LINKS.find(link => link.href === href)?.name || '';
  const planer = unter('/planung').find(l => l.href === '/konfigurator');

  const handlePrivacySettingsClick = () => {
    window.dispatchEvent(new CustomEvent('showPrivacySettings'));
  };

  return (
    <footer className="bg-brand-dark text-brand-bg relative z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-10 flex flex-col gap-12">

        <div className="flex flex-wrap items-end justify-between gap-8">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs tracking-[0.14em] uppercase text-[#A9C98A]">{t('350+ Anlagen seit 1998', '350+ installations since 1998', '350+ installations depuis 1998')}</span>
            <h2 className="font-heading font-extrabold uppercase text-4xl md:text-[56px] leading-none" style={{ wordSpacing: '0.12em' }}>
              {t(<>Planen wir<br />Ihre Anlage.</>, <>Let's plan<br />your installation.</>, <>Planifions<br />votre installation.</>)}
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/kontakt" className="inline-flex items-center min-h-[52px] px-7 rounded-lg bg-brand-orange text-white font-heading font-bold text-sm uppercase tracking-[0.08em] hover:bg-[#5A7A3D] transition-colors">
              {t('Kontakt aufnehmen', 'Get in touch', 'Nous contacter')}
            </Link>
            {planer && (
              <Link to={planer.href} className="inline-flex items-center min-h-[52px] px-7 rounded-lg border border-[rgba(242,240,235,0.4)] font-heading font-bold text-sm uppercase tracking-[0.08em] hover:border-brand-bg transition-colors">
                {t(`${planer.name} öffnen`, `Open ${planer.name}`, `Ouvrir : ${planer.name}`)}
              </Link>
            )}
          </div>
        </div>

        <div className="border border-[rgba(242,240,235,0.22)] rounded-xl overflow-hidden grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.2fr] gap-px bg-[rgba(242,240,235,0.22)]">

          <div className="bg-brand-dark p-7 flex flex-col justify-between gap-6">
            <Link to="/" className="block self-start">
              <img src="/aplus-logo.svg" alt="A+ Urban Design" width={170} height={48} className="h-12 w-auto brightness-0 invert" />
            </Link>
            <p className="text-[15px] leading-relaxed text-[#C9CCC4] max-w-xs">
              {t('Wir stellen modulare Betonelemente für den öffentlichen Raum her. Sie sind robust und für Jahrzehnte gebaut.', 'We make modular concrete elements for public spaces. They are robust and built to last for decades.', "Nous fabriquons des éléments modulaires en béton pour l'espace public. Ils sont robustes et conçus pour durer des décennies.")}
            </p>
          </div>

          <div className="bg-brand-dark">
            <h3 className={kopf}>{t('Produkte', 'Products', 'Produits')}</h3>
            <Liste links={unter('/produkte')} />
          </div>

          <div className="bg-brand-dark">
            <h3 className={kopf}>{t('Planung', 'Planning', 'Planification')}</h3>
            <Liste links={[...unter('/planung'), { name: name('/katalog'), href: '/katalog' }]} />
            <h3 className={`${kopf} border-t`}>{t('Unternehmen', 'Company', 'Entreprise')}</h3>
            <Liste links={[
              { name: name('/projekte'), href: '/projekte' },
              { name: name('/ueber-uns'), href: '/ueber-uns' },
              { name: t('Presse', 'Press', 'Presse'), href: '/referenzen-presse' },
            ]} />
          </div>

          <div className="bg-brand-dark">
            <h3 className={kopf}>{t('Kontakt', 'Contact', 'Contact')}</h3>
            <div className="px-5 py-5 flex flex-col gap-3.5 text-[15px]">
              <div>
                <p className={label}>{t('Telefon', 'Phone', 'Téléphone')}</p>
                <a href="tel:+4915560090966" className={verweis}>+49 155 600 909 66</a>
              </div>
              <div>
                <p className={label}>{t('E-Mail', 'Email', 'E-mail')}</p>
                <a href="mailto:post@aplusurbandesign.com" className={verweis}>post@aplusurbandesign.com</a>
              </div>
              <div>
                <p className={label}>{t('Adresse', 'Address', 'Adresse')}</p>
                <p className="leading-normal">Talstrasse 41<br />70188 Stuttgart</p>
              </div>
              <a href="https://www.linkedin.com/in/cüneyit-akcakoca-6577673/" target="_blank" rel="noopener noreferrer" className="self-start text-[#A9C98A] hover:text-brand-bg transition-colors">
                LinkedIn &rarr;
              </a>
            </div>
          </div>

          <div className="sm:col-span-2 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.2fr] gap-px font-mono text-[11px] tracking-[0.12em] uppercase text-[#C9CCC4]">
            <p className="bg-brand-dark px-7 py-3.5">&copy; {new Date().getFullYear()} A+ Urban Design</p>
            <p className="bg-brand-dark px-5 py-3.5">{t('Made in Europe · aus Stuttgart', 'Made in Europe · from Stuttgart', 'Made in Europe · depuis Stuttgart')}</p>
            <p className="bg-brand-dark px-5 py-2.5 flex items-center gap-2.5">
              <img src="/images/details/tuev-gs.png" alt={t('GS-Zeichen von TÜV SÜD', 'GS mark from TÜV SÜD', 'Marque GS du TÜV SÜD')} width={22} height={22} loading="lazy" className="w-[22px] h-[22px] bg-white rounded-sm p-px" />
              <span>EN 14974</span>
            </p>
            <div className="bg-brand-dark px-5 py-3.5 flex flex-wrap gap-5">
              <Link to="/impressum" className="hover:text-[#A9C98A] transition-colors">{t('Impressum', 'Legal notice', 'Mentions légales')}</Link>
              <Link to="/datenschutz" className="hover:text-[#A9C98A] transition-colors">{t('Datenschutz', 'Privacy', 'Confidentialité')}</Link>
              <button onClick={handlePrivacySettingsClick} className="uppercase tracking-[0.12em] hover:text-[#A9C98A] transition-colors">Cookies</button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
