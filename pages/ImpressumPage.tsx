import React, { useEffect } from 'react';
import PageShell from '../components/PageShell';

const ImpressumPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageShell title="Impressum">
      <div className="max-w-4xl mx-auto py-12">
         <div className="text-center mb-24">
            <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">
                Rechtliches
            </span>
            <h1 className="text-5xl md:text-7xl font-black font-heading text-white uppercase tracking-tighter leading-none">
                Impres<span className="text-outline-orange">sum.</span>
            </h1>
         </div>

        <div className="mt-16 text-brand-muted space-y-12">
            <div>
              <h2 className="text-2xl font-bold font-heading text-white uppercase tracking-wider border-b border-white/10 pb-4 mb-6">A+ URBAN DESIGN</h2>
              <p className="text-lg leading-relaxed">
                Dipl.-Ing. Cüneyit Akcakoca<br />
                Freier Architekt<br />
                Talstrasse 41<br />
                70188 Stuttgart
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold font-heading text-white uppercase tracking-wider border-b border-white/10 pb-4 mb-6">Kontakt</h2>
              <p className="text-lg leading-relaxed">
                Telefon: +49-(0)155 600 909 66<br />
                E-Mail: post@aplusurbandesign.com
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold font-heading text-white uppercase tracking-wider border-b border-white/10 pb-4 mb-6">Umsatzsteuer-ID</h2>
              <p className="text-lg leading-relaxed">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                <strong className="text-white">DE243482047</strong>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold font-heading text-white uppercase tracking-wider border-b border-white/10 pb-4 mb-6">Verantwortlich für den Inhalt</h2>
              <p className="text-lg leading-relaxed">
                Verantwortlich im Sinne des § 18 Abs. 2 MStV:<br />
                Dipl.-Ing. Cüneyit Akcakoca<br />
                Talstrasse 41<br />
                70188 Stuttgart
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold font-heading text-white uppercase tracking-wider border-b border-white/10 pb-4 mb-6">EU-Streitschlichtung</h2>
              <p className="text-lg leading-relaxed">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <br/>
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline font-bold">
                    https://ec.europa.eu/consumers/odr/
                </a>.<br/>
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold font-heading text-white uppercase tracking-wider border-b border-white/10 pb-4 mb-6">Rechtliche Hinweise</h2>
              <p className="text-lg leading-relaxed">
                Die Inhalte dieser Seiten sollen nur als Information dienen; sie sind unverbindlich und können von der tatsächlichen Ausführung abweichen.
                Der Inhalt dieser Seiten ist geschützt und darf nicht von Dritten ohne schriftliche Erlaubnis verwendet werden.
              </p>
            </div>
        </div>
      </div>
    </PageShell>
  );
};

export default ImpressumPage;