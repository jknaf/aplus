import React, { useEffect } from 'react';
import PageShell from '../components/PageShell';

const label = 'text-xs font-semibold uppercase tracking-[0.18em] text-[#4E6F33]';
const card = 'rounded-[20px] border border-brand-dark/10 bg-[#FAF9F6] p-8 md:p-11';
const h2 = 'mb-7 border-b border-brand-dark/15 pb-4 text-2xl font-bold font-heading uppercase tracking-wider text-brand-dark';
const link = 'text-[#4E6F33] underline underline-offset-4 hover:text-brand-dark';

const REGELN = [
  'Architektengesetz Baden-Württemberg (ArchG BW)',
  'Berufsordnung der Architektenkammer Baden-Württemberg',
  'Honorarordnung für Architekten und Ingenieure (HOAI)',
];

const ImpressumPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageShell title="Impressum" fullWidth>
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6 md:pt-40 lg:px-8 text-[17px] leading-relaxed text-[#3A433D]">
        <header className="mb-14">
          <span className="inline-block rounded-md border border-[#4E6F33]/35 bg-brand-orange/10 px-3.5 py-1 font-mono text-xs uppercase tracking-[0.16em] text-[#4E6F33]">
            Rechtliches
          </span>
          <h1 className="mt-7 text-[clamp(3.25rem,10vw,8.5rem)] font-extrabold font-heading uppercase leading-[0.92] tracking-[-0.045em] text-brand-dark">
            Impres<span className="text-brand-orange">sum</span>
          </h1>
          <p className="mt-7 max-w-xl text-xl text-[#5A615C]">Anbieter dieser Website und zuständige Stellen.</p>
        </header>

        <div className="flex flex-wrap gap-6">
          <section className="basis-[520px] grow rounded-[20px] bg-brand-dark p-8 text-brand-bg md:p-11">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A9C78A]">Anbieter</div>
            <h2 className="mt-4 text-3xl font-extrabold font-heading uppercase leading-tight tracking-tight">A+ Urban Design</h2>
            <p className="mt-6 text-[19px] leading-[1.7]">
              Dipl.-Ing. Cüneyit Akcakoca<br />
              Freier Architekt<br />
              Talstrasse 41<br />
              70188 Stuttgart
            </p>
          </section>

          <section className={`basis-[360px] grow ${card}`}>
            <div className={label}>Kontakt</div>
            <p className="mt-5 text-[19px] leading-[1.9]">
              <span className="block text-sm leading-snug text-[#5A615C]">Telefon</span>
              <a href="tel:+491556009099" className="font-heading font-bold text-brand-dark">+49-(0)155 600 909 66</a>
              <span className="mt-3 block text-sm leading-snug text-[#5A615C]">E-Mail</span>
              <a href="mailto:post@aplusurbandesign.com" className="break-all font-heading font-bold text-brand-dark underline decoration-brand-orange underline-offset-4">
                post@aplusurbandesign.com
              </a>
            </p>
          </section>

          <section className={`basis-[360px] grow ${card}`}>
            <div className={label}>Umsatzsteuer-ID</div>
            <p className="mt-4 text-[15px] leading-relaxed text-[#5A615C]">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz
            </p>
            <div className="mt-4 text-3xl font-extrabold font-heading tracking-wide text-brand-dark">DE243482047</div>
          </section>

          <section className={`basis-[520px] grow ${card}`}>
            <div className={label}>Verantwortlich für den Inhalt</div>
            <p className="mt-4 text-[15px] leading-relaxed text-[#5A615C]">Verantwortlich im Sinne des § 18 Abs. 2 MStV</p>
            <p className="mt-3.5 text-[19px] leading-[1.7] text-brand-dark">
              Dipl.-Ing. Cüneyit Akcakoca<br />
              Talstrasse 41<br />
              70188 Stuttgart
            </p>
          </section>
        </div>

        <section className="mt-[72px]">
          <h2 className={h2}>Berufsrechtliche Angaben</h2>
          <div className="flex flex-wrap gap-x-16 gap-y-10">
            <div className="basis-[420px] grow">
              <p><strong className="text-brand-dark">Berufsbezeichnung:</strong> Freier Architekt</p>
              <p className="mt-1.5"><strong className="text-brand-dark">Verliehen durch:</strong> Bundesrepublik Deutschland</p>
              <p className="mt-7">
                <strong className="text-brand-dark">Zuständige Architektenkammer:</strong><br />
                Architektenkammer Baden-Württemberg<br />
                Danneckerstraße 54<br />
                70182 Stuttgart<br />
                <a href="https://www.akbw.de" target="_blank" rel="noopener noreferrer" className={link}>www.akbw.de</a>
              </p>
            </div>
            <div className="basis-[420px] grow">
              <strong className="text-brand-dark">Berufsrechtliche Regelungen:</strong>
              <ol className="mt-4 flex flex-col gap-2.5">
                {REGELN.map((r, i) => (
                  <li key={r} className="flex items-baseline gap-4 rounded-xl bg-brand-surface px-[18px] py-3.5">
                    <span className="font-heading font-extrabold text-[#4E6F33]">{String(i + 1).padStart(2, '0')}</span>
                    {r}
                  </li>
                ))}
              </ol>
              <p className="mt-4">
                Einsehbar unter: <a href="https://www.akbw.de" target="_blank" rel="noopener noreferrer" className={link}>www.akbw.de</a>
              </p>
            </div>
          </div>
        </section>

        <div className="mt-[72px] flex flex-wrap gap-x-16 gap-y-12">
          <section className="basis-[420px] grow">
            <h2 className={h2}>EU-Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:<br />
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className={`${link} break-all font-semibold`}>
                https://ec.europa.eu/consumers/odr/
              </a>.<br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </section>
          <section className="basis-[420px] grow">
            <h2 className={h2}>Rechtliche Hinweise</h2>
            <p>
              Die Inhalte dieser Seiten sollen nur als Information dienen; sie sind unverbindlich und können von der tatsächlichen Ausführung abweichen.
              Der Inhalt dieser Seiten ist geschützt und darf nicht von Dritten ohne schriftliche Erlaubnis verwendet werden.
            </p>
          </section>
        </div>
      </div>
    </PageShell>
  );
};

export default ImpressumPage;
