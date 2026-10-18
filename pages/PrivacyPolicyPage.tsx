import React, { useEffect } from 'react';
import PageShell from '../components/PageShell';

const link = 'text-[#4E6F33] underline underline-offset-4 hover:text-brand-dark';

const Abschnitt: React.FC<{ id: string; nr: string; titel: string; children: React.ReactNode }> = ({ id, nr, titel, children }) => (
  <article id={id} className="scroll-mt-28">
    <div className="font-heading text-sm font-extrabold tracking-widest text-[#4E6F33]">{nr}</div>
    <h2 className="mb-[18px] mt-1.5 border-b border-brand-dark/15 pb-4 text-2xl font-bold font-heading uppercase tracking-wider text-brand-dark">
      {titel}
    </h2>
    {children}
  </article>
);

const INHALT: [string, string][] = [
  ['einleitung', 'Einleitung'],
  ['verantwortlicher', 'Verantwortlicher'],
  ['hosting', 'Hosting (Vercel)'],
  ['email', 'Kontaktaufnahme per E-Mail'],
  ['konfigurator', 'Skatepark-Konfigurator'],
  ['schriften', 'Schriftarten'],
  ['cookies', 'Cookies'],
  ['rechte', 'Ihre Rechte'],
];

const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageShell title="Datenschutzerklärung" fullWidth>
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6 md:pt-40 lg:px-8 text-[17px] leading-[1.7] text-[#3A433D]">
        <header className="mb-14">
          <span className="inline-block rounded-md border border-[#4E6F33]/35 bg-brand-orange/10 px-3.5 py-1 font-mono text-xs uppercase tracking-[0.16em] text-[#4E6F33]">
            Rechtliches
          </span>
          <h1 className="mt-7 text-[clamp(3rem,9vw,8rem)] font-extrabold font-heading uppercase leading-[0.92] tracking-[-0.045em] text-brand-dark">
            Daten<span className="text-brand-orange">schutz</span>
          </h1>
          <p className="mt-7 max-w-[620px] text-xl text-[#5A615C]">
            Welche Daten beim Besuch dieser Website anfallen, wozu wir sie brauchen und wie lange sie bleiben.
          </p>
        </header>

        <div className="flex flex-wrap items-start gap-x-[72px] gap-y-12">
          <nav aria-label="Inhalt" className="min-w-[240px] basis-[280px]">
            <div className="px-3.5 pb-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#4E6F33]">Inhalt</div>
            {INHALT.map(([id, name], i) => (
              <a
                key={id}
                href={`#${id}`}
                className="flex items-baseline gap-3.5 rounded-[10px] px-3.5 py-2.5 text-[15px] leading-snug text-[#3A433D] transition-colors hover:bg-brand-surface hover:text-brand-dark"
              >
                <span className="font-heading text-[13px] font-extrabold text-[#4E6F33]">{String(i + 1).padStart(2, '0')}</span>
                {name}
              </a>
            ))}
          </nav>

          <div className="flex min-w-0 basis-[520px] grow flex-col gap-14">
            <Abschnitt id="einleitung" nr="01" titel="Einleitung">
              <p>
                Nachfolgend informieren wir, A+ Urban Design als verantwortliche Stelle, Sie darüber, welche personenbezogenen Daten bei der Nutzung unseres Internetauftritts zu welchen Zwecken verarbeitet werden. Die Basis für diese Datenschutzerklärung bilden die europäische Datenschutz Grundverordnung (DSGVO), das Bundesdatenschutzgesetz (BDSG neu) und das Telemediengesetz (TMG) der Bundesrepublik Deutschland.
              </p>
            </Abschnitt>

            <Abschnitt id="verantwortlicher" nr="02" titel="Verantwortlicher">
              <p className="rounded-[14px] border border-brand-dark/10 bg-[#FAF9F6] px-[26px] py-[22px] text-brand-dark">
                A+ Urban Design<br />
                Talstrasse 41<br />
                70188 Stuttgart<br />
                Deutschland<br />
                Inhaber: Dipl.-Ing. Cüneyit Akcakoca, Freier Architekt<br />
                Tel.: +49 (0) 155 600 909 66<br />
                E-Mail: <a href="mailto:post@aplusurbandesign.com" className={link}>post@aplusurbandesign.com</a>
              </p>
            </Abschnitt>

            <Abschnitt id="hosting" nr="03" titel="Hosting (Vercel)">
              <p>
                Diese Website wird gehostet bei <strong className="text-brand-dark">Vercel Inc.</strong> (440 N Barranca Ave #4133, Covina, CA 91723, USA). Vercel betreibt Edge-Server in der Europäischen Union (Frankfurt am Main). Beim Aufruf der Website werden technische Daten (IP-Adresse, Datum, Uhrzeit, Browser-Typ, abgerufene Datei, Referrer) in Server-Logfiles erfasst. Diese Verarbeitung dient der Sicherheit, Stabilität und Fehlerbehebung des Webdienstes auf Grundlage unseres berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO). Die Logdaten werden nach 30 Tagen automatisch gelöscht.
              </p>
              <p className="mt-4">
                Da Vercel ein US-Unternehmen ist, kann es zu einer Übermittlung von Daten in die USA kommen. Vercel ist nach dem <strong className="text-brand-dark">EU-US Data Privacy Framework</strong> zertifiziert. Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung gemäß Art. 28 DSGVO. Weitere Informationen: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className={link}>vercel.com/legal/privacy-policy</a>
              </p>
            </Abschnitt>

            <Abschnitt id="email" nr="04" titel="Kontaktaufnahme per E-Mail">
              <p>
                Die Kontaktaufnahme auf dieser Website erfolgt über <strong className="text-brand-dark">mailto-Links</strong>. Ein Klick auf einen Anfrage-Button öffnet das auf Ihrem Gerät eingerichtete E-Mail-Programm mit einer vorbereiteten Nachricht an <strong className="text-brand-dark">post@aplusurbandesign.com</strong>. Es wird kein Formular ausgefüllt, keine Daten an diese Website übermittelt und kein Dienstleister zwischengeschaltet. Ihre Daten gelangen ausschließlich über Ihren eigenen E-Mail-Anbieter an uns.
              </p>
              <p className="mt-4">
                Die von Ihnen in der E-Mail übermittelten Daten (Name, E-Mail-Adresse, Telefonnummer, Projektbeschreibung) verarbeiten wir zur Bearbeitung Ihrer Anfrage und für eventuelle Anschlussfragen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an effizienter Kommunikation). Diese Daten werden nicht ohne Ihre Einwilligung an Dritte weitergegeben.
              </p>
            </Abschnitt>

            <Abschnitt id="konfigurator" nr="05" titel="Skatepark-Konfigurator">
              <p>
                Ihren im Konfigurator geplanten Park speichern wir nur in Ihrem eigenen Browser (Local Storage), damit er beim Wechsel zum Katalog erhalten bleibt. Diese Daten verlassen Ihr Gerät nicht, solange Sie keine Anfrage senden oder den Teilen-Link weitergeben. Sie können sie jederzeit über die Browser-Einstellungen löschen.
              </p>
              <p className="mt-4">
                Wenn Sie über den Konfigurator ein Angebot anfragen, öffnet sich Ihr E-Mail-Programm mit einer vorbereiteten Nachricht (Link zu Ihrem Park und Stückliste). Die Website selbst übermittelt dabei keine Daten; die Nachricht erreicht uns erst, wenn Sie sie über Ihren eigenen E-Mail-Anbieter absenden.
              </p>
            </Abschnitt>

            <Abschnitt id="schriften" nr="06" titel="Schriftarten">
              <p>
                Die Schriften <strong className="text-brand-dark">Inter</strong> und <strong className="text-brand-dark">Plus Jakarta Sans</strong> sowie die Icon-Schrift Material Symbols liefern wir von unserem eigenen Server aus. Beim Aufruf der Website wird dafür keine Verbindung zu den Servern von Schriftarten-Diensten aufgebaut, und es werden keine Daten an Dritte übermittelt.
              </p>
            </Abschnitt>

            <Abschnitt id="cookies" nr="07" titel="Cookies">
              <p>
                Diese Website verwendet ausschließlich technisch notwendige Cookies, die für den Betrieb der Seite erforderlich sind. Es werden keine Tracking-, Analyse- oder Marketing-Cookies eingesetzt. Sie können die Cookie-Einstellungen jederzeit über den entsprechenden Button im Footer ändern.
              </p>
              <div className="mt-[22px] rounded-[14px] border border-brand-dark/10 bg-brand-surface px-[26px] py-[22px]">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4E6F33]">Verwendete Cookies</div>
                <p className="mt-2.5 text-[15px] leading-relaxed">
                  <strong className="text-brand-dark">aplus-cookie-consent</strong> (technisch notwendig): Speichert Ihre Cookie-Einstellung. Speicherdauer: 12 Monate. Lokal im Browser (kein Drittanbieter).
                </p>
              </div>
            </Abschnitt>

            <Abschnitt id="rechte" nr="08" titel="Ihre Rechte">
              <p>
                Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.
              </p>
            </Abschnitt>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default PrivacyPolicyPage;
