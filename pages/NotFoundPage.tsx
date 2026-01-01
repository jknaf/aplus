import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';

const NotFoundPage: React.FC = () => {
  useEffect(() => {
    // Optional: Log 404 occurrence to analytics here
  }, []);

  return (
    <PageShell title="404 - Seite nicht gefunden" noIndex={true}>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-9xl font-black text-outline-orange mb-4">404</h1>
        <h2 className="text-3xl font-bold text-white mb-6">Diese Seite existiert nicht.</h2>
        <p className="text-brand-muted max-w-md mb-8">
          Möglicherweise wurde sie verschoben oder gelöscht. Überprüfen Sie die URL oder kehren Sie zur Startseite zurück.
        </p>
        <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-brand-orange text-black font-black uppercase tracking-widest text-sm py-4 px-8 rounded-lg hover:bg-white hover:text-brand-orange transition-all duration-300"
        >
            Zur Startseite
        </Link>
      </div>
    </PageShell>
  );
};

export default NotFoundPage;