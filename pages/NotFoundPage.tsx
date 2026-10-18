import React, { useEffect } from 'react';
import { Link, useT } from '../i18n';
import PageShell from '../components/PageShell';

const NotFoundPage: React.FC = () => {
  const t = useT();
  useEffect(() => {
    // Optional: Log 404 occurrence to analytics here
  }, []);

  return (
    <PageShell title={t('404 - Seite nicht gefunden', '404 - Page not found', '404 - Page introuvable')} noIndex={true}>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-9xl font-extrabold text-brand-orange mb-4">404</h1>
        <h2 className="text-3xl font-bold text-brand-dark mb-6">{t('Diese Seite existiert nicht', 'This page does not exist', "Cette page n'existe pas")}</h2>
        <p className="text-brand-muted max-w-md mb-8">
          {t('Möglicherweise wurde sie verschoben oder gelöscht. Überprüfen Sie die URL oder kehren Sie zur Startseite zurück.', 'It may have been moved or deleted. Check the URL or go back to the home page.', "Elle a peut-être été déplacée ou supprimée. Vérifiez l'adresse ou revenez à la page d'accueil.")}
        </p>
        <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-brand-orange text-white font-extrabold uppercase tracking-widest text-sm py-4 px-8 rounded-lg hover:bg-brand-dark hover:text-white transition-all duration-300"
        >
            {t('Zur Startseite', 'Back to home', "Retour à l'accueil")}
        </Link>
      </div>
    </PageShell>
  );
};

export default NotFoundPage;