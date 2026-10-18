import React, { createContext, forwardRef, useCallback, useContext, useEffect } from 'react';
import {
  Link as RouterLink,
  useLocation,
  useNavigate as useRouterNavigate,
  type LinkProps,
  type NavigateOptions,
} from 'react-router-dom';

// Deutsch liegt ohne Präfix, Englisch unter /en, Französisch unter /fr.
// Texte stehen direkt an der Stelle: t('Deutsch', 'English', 'Français').
export type Lang = 'de' | 'en' | 'fr';
export const LANGS: Lang[] = ['de', 'en', 'fr'];
export const LANG_NAMES: Record<Lang, string> = { de: 'Deutsch', en: 'English', fr: 'Français' };
export const OG_LOCALE: Record<Lang, string> = { de: 'de_DE', en: 'en_GB', fr: 'fr_FR' };

export const langFromPath = (path: string): Lang => {
  if (path === '/en' || path.startsWith('/en/')) return 'en';
  if (path === '/fr' || path.startsWith('/fr/')) return 'fr';
  return 'de';
};

/** Pfad ohne Sprachpräfix: '/en/kontakt' wird '/kontakt', '/en' wird '/'. */
export const stripLang = (path: string): string => {
  const rest = path.replace(/^\/(en|fr)(?=\/|$)/, '');
  return rest === '' ? '/' : rest;
};

export const prefixFor = (lang: Lang): string => (lang === 'de' ? '' : `/${lang}`);

/** Interner Pfad in der Sprache: ('en', '/kontakt') wird '/en/kontakt'. */
export const localizePath = (lang: Lang, to: string): string => {
  if (!to.startsWith('/') || to.startsWith('//')) return to;
  const p = prefixFor(lang);
  if (!p) return to;
  return to === '/' ? p : p + to;
};

const LangContext = createContext<Lang>('de');

export const LangProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { pathname } = useLocation();
  const lang = langFromPath(pathname);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return <LangContext.Provider value={lang}>{children}</LangContext.Provider>;
};

export const useLang = (): Lang => useContext(LangContext);

/** t(de, en, fr): liefert den Text der aktuellen Sprache, auch JSX. */
export const useT = () => {
  const lang = useLang();
  return useCallback(
    <T,>(de: T, en: T, fr: T): T => (lang === 'en' ? en : lang === 'fr' ? fr : de),
    [lang],
  );
};

const localizeTo = (lang: Lang, to: LinkProps['to']): LinkProps['to'] => {
  if (typeof to === 'string') return localizePath(lang, to);
  if (to.pathname) return { ...to, pathname: localizePath(lang, to.pathname) };
  return to;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(({ to, ...rest }, ref) => {
  const lang = useLang();
  return <RouterLink ref={ref} to={localizeTo(lang, to)} {...rest} />;
});
Link.displayName = 'Link';

export const useNavigate = () => {
  const lang = useLang();
  const navigate = useRouterNavigate();
  return useCallback(
    (to: string, options?: NavigateOptions) => navigate(localizePath(lang, to), options),
    [lang, navigate],
  );
};
