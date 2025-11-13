import React from 'react';
import PageShell from '../components/PageShell';

const ImpressumPage: React.FC = () => {
  return (
    <PageShell title="Impressum">
      <div className="max-w-4xl mx-auto">
         <h1 className="text-4xl md:text-6xl font-black font-heading uppercase tracking-tighter text-center">Impressum</h1>
        <div className="mt-12 prose prose-lg max-w-none text-brand-muted prose-headings:text-brand-anthracite prose-headings:font-heading prose-strong:text-brand-anthracite">
            <h2>A+ URBAN DESIGN</h2>
            <p>
            Cüneyit Akcakoca<br />
            Talstrasse 41<br />
            70188 Stuttgart
            </p>

            <h2>Kontakt</h2>
            <p>
            Telefon: +49-(0)155 600 909 66<br />
            E-Mail: post@aplusurbandesign.com
            </p>

            <h2>Umsatzsteuer-ID</h2>
            <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
            <strong>DE243482047</strong>
            </p>

            <h2>Verantwortlich für den Inhalt</h2>
            <p>
            Inhaltlich verantwortlich: Cüneyit Akcakoca
            </p>

            <h2>Rechtliche Hinweise</h2>
            <p>
            Die Inhalte dieser Seiten sollen nur als Information dienen; sie sind unverbindlich und können von der tatsächlichen Ausführung abweichen.
            Der Inhalt dieser Seiten ist geschützt und darf nicht von Dritten ohne schriftliche Erlaubnis verwendet werden.
            </p>
        </div>
      </div>
    </PageShell>
  );
};

export default ImpressumPage;