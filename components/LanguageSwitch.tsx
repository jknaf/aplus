import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { LANGS, LANG_NAMES, localizePath, stripLang, useLang } from '../i18n';

// Wechselt die Sprache und bleibt auf derselben Seite (Pfad, Suche und Anker bleiben erhalten).
const LanguageSwitch: React.FC<{ className?: string }> = ({ className = '' }) => {
  const lang = useLang();
  const { pathname, search, hash } = useLocation();
  const base = stripLang(pathname);

  return (
    <div className={`flex items-center gap-1 ${className}`} role="group" aria-label="Language / Sprache / Langue">
      {LANGS.map((l) => (
        <RouterLink
          key={l}
          to={`${localizePath(l, base)}${search}${hash}`}
          hrefLang={l}
          lang={l}
          title={LANG_NAMES[l]}
          aria-current={l === lang ? 'true' : undefined}
          className={`px-2 py-1 rounded text-xs font-extrabold uppercase tracking-widest transition-colors ${
            l === lang ? 'bg-brand-dark text-white' : 'text-brand-dark/60 hover:text-brand-dark'
          }`}
        >
          {l}
        </RouterLink>
      ))}
    </div>
  );
};

export default LanguageSwitch;
