import React from 'react';
import PageShell from '../components/PageShell';

const ImpressumPage: React.FC = () => {
  return (
    <PageShell title="Impressum">
      <div className="max-w-4xl mx-auto">
         <h1 className="text-4xl md:text-6xl font-black font-heading uppercase tracking-tighter text-center">Impressum</h1>
        <div className="mt-16 text-brand-muted space-y-8">
            <div>
              <h2 className="text-2xl font-bold font-heading text-brand-heading border-b border-white/10 pb-2 mb-4">A+ URBAN DESIGN</h2>
              <p>
                Cüneyit Akcakoca<br />
                Dipl. Ing., Freier Architekt<br />
                Talstrasse 41<br />
                70188 Stuttgart
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold font-heading text-brand-heading border-b border-white/10 pb-2 mb-4">Kontakt</h2>
              <p>
                Telefon: +49-(0)155 600 909 66<br />
                E-Mail: post@aplusurbandesign.com
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold font-heading text-brand-heading border-b border-white/10 pb-2 mb-4">Umsatzsteuer-ID</h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                <strong className="text-brand-text">DE243482047</strong>
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold font-heading text-brand-heading border-b border-white/10 pb-2 mb-4">Verantwortlich für den Inhalt</h2>
              <p>
                Verantwortlich im Sinne des § 18 Abs. 2 MStV:<br />
                Cüneyit Akcakoca<br />
                Talstrasse 41<br />
                70188 Stuttgart
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold font-heading text-brand-heading border-b border-white/10 pb-2 mb-4">EU-Streitschlichtung</h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <br/>
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">
                    https://ec.europa.eu/consumers/odr/
                </a>.<br/>
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold font-heading text-brand-heading border-b border-white/10 pb-2 mb-4">Rechtliche Hinweise</h2>
              <p>
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