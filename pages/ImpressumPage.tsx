import React, { useEffect } from 'react';
import PageShell from '../components/PageShell';
import { useLang, useT } from '../i18n';

const label = 'text-xs font-semibold uppercase tracking-[0.18em] text-[#4E6F33]';
const card = 'rounded-[20px] border border-brand-dark/10 bg-[#FAF9F6] p-8 md:p-11';
const h2 = 'mb-7 border-b border-brand-dark/15 pb-4 text-2xl font-bold font-heading uppercase tracking-wider text-brand-dark';
const link = 'text-[#4E6F33] underline underline-offset-4 hover:text-brand-dark';

const REGELN: [string, string, string][] = [
  ["Architektengesetz Baden-Württemberg (ArchG BW)", "Architektengesetz Baden-Württemberg (ArchG BW), the Baden-Württemberg Architects Act", "Architektengesetz Baden-Württemberg (ArchG BW), loi du Bade-Wurtemberg sur les architectes"],
  ["Berufsordnung der Architektenkammer Baden-Württemberg", "Berufsordnung der Architektenkammer Baden-Württemberg, the professional code of the Chamber of Architects", "Berufsordnung der Architektenkammer Baden-Württemberg, code professionnel de l'Ordre des architectes"],
  ["Honorarordnung für Architekten und Ingenieure (HOAI)", "Honorarordnung für Architekten und Ingenieure (HOAI), the fee structure for architects and engineers", "Honorarordnung für Architekten und Ingenieure (HOAI), barème d'honoraires des architectes et ingénieurs"],
];

const ImpressumPage: React.FC = () => {
  const t = useT();
  const lang = useLang();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageShell title={t("Impressum", "Legal Notice", "Mentions légales")} fullWidth>
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6 md:pt-40 lg:px-8 text-[17px] leading-relaxed text-[#3A433D]">
        <header className="mb-14">
          <span className="inline-block rounded-md border border-[#4E6F33]/35 bg-brand-orange/10 px-3.5 py-1 font-mono text-xs uppercase tracking-[0.16em] text-[#4E6F33]">
            {t("Rechtliches", "Legal", "Informations légales")}
          </span>
          <h1 className="mt-7 text-[clamp(3.25rem,10vw,8.5rem)] font-extrabold font-heading uppercase leading-[0.92] tracking-[-0.045em] text-brand-dark">
            {t(<>Impres<span className="text-brand-orange">sum</span></>, <>Legal <span className="text-brand-orange">notice</span></>, <>Mentions <span className="text-brand-orange">légales</span></>)}
          </h1>
          <p className="mt-7 max-w-xl text-xl text-[#5A615C]">{t("Anbieter dieser Website und zuständige Stellen.", "Provider of this website and responsible bodies.", "Éditeur de ce site et organismes compétents.")}</p>
          {lang !== 'de' && (
            <p className="mt-4 max-w-[620px] text-sm text-[#5A615C]">{t("", "This page is a translation for convenience. The German version is the legally binding one.", "Cette page est une traduction fournie à titre indicatif. Seule la version allemande fait foi.")}</p>
          )}
        </header>

        <div className="flex flex-wrap gap-6">
          <section className="basis-[520px] grow rounded-[20px] bg-brand-dark p-8 text-brand-bg md:p-11">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A9C78A]">{t("Anbieter", "Provider", "Éditeur")}</div>
            <h2 className="mt-4 text-3xl font-extrabold font-heading uppercase leading-tight tracking-tight">A+ Urban Design</h2>
            <p className="mt-6 text-[19px] leading-[1.7]">
              Dipl.-Ing. Cüneyit Akcakoca<br />
              {t("Freier Architekt", "Freier Architekt (independent architect)", "Freier Architekt (architecte indépendant)")}<br />
              Talstrasse 41<br />
              70188 Stuttgart
            </p>
          </section>

          <section className={`basis-[360px] grow ${card}`}>
            <div className={label}>{t("Kontakt", "Contact", "Contact")}</div>
            <p className="mt-5 text-[19px] leading-[1.9]">
              <span className="block text-sm leading-snug text-[#5A615C]">{t("Telefon", "Phone", "Téléphone")}</span>
              <a href="tel:+491556009099" className="font-heading font-bold text-brand-dark">+49-(0)155 600 909 66</a>
              <span className="mt-3 block text-sm leading-snug text-[#5A615C]">{t("E-Mail", "Email", "E-mail")}</span>
              <a href="mailto:post@aplusurbandesign.com" className="break-all font-heading font-bold text-brand-dark underline decoration-brand-orange underline-offset-4">
                post@aplusurbandesign.com
              </a>
            </p>
          </section>

          <section className={`basis-[360px] grow ${card}`}>
            <div className={label}>{t("Umsatzsteuer-ID", "VAT ID", "N° de TVA")}</div>
            <p className="mt-4 text-[15px] leading-relaxed text-[#5A615C]">
              {t("Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz", "VAT identification number pursuant to Section 27a of the German VAT Act (Umsatzsteuergesetz)", "Numéro d'identification TVA conformément au § 27 a de la loi allemande sur la taxe sur le chiffre d'affaires (Umsatzsteuergesetz)")}
            </p>
            <div className="mt-4 text-3xl font-extrabold font-heading tracking-wide text-brand-dark">DE243482047</div>
          </section>

          <section className={`basis-[520px] grow ${card}`}>
            <div className={label}>{t("Verantwortlich für den Inhalt", "Responsible for the content", "Responsable du contenu")}</div>
            <p className="mt-4 text-[15px] leading-relaxed text-[#5A615C]">{t("Verantwortlich im Sinne des § 18 Abs. 2 MStV", "Responsible pursuant to Section 18(2) of the German Interstate Media Treaty (MStV)", "Responsable au sens du § 18, al. 2 du traité interétatique allemand sur les médias (MStV)")}</p>
            <p className="mt-3.5 text-[19px] leading-[1.7] text-brand-dark">
              Dipl.-Ing. Cüneyit Akcakoca<br />
              Talstrasse 41<br />
              70188 Stuttgart
            </p>
          </section>
        </div>

        <section className="mt-[72px]">
          <h2 className={h2}>{t("Berufsrechtliche Angaben", "Professional regulation details", "Informations relatives à la réglementation professionnelle")}</h2>
          <div className="flex flex-wrap gap-x-16 gap-y-10">
            <div className="basis-[420px] grow">
              <p><strong className="text-brand-dark">{t("Berufsbezeichnung:", "Professional title:", "Titre professionnel :")}</strong> {t("Freier Architekt", "Freier Architekt (independent architect)", "Freier Architekt (architecte indépendant)")}</p>
              <p className="mt-1.5"><strong className="text-brand-dark">{t("Verliehen durch:", "Awarded in:", "Décerné par :")}</strong> {t("Bundesrepublik Deutschland", "Federal Republic of Germany", "République fédérale d'Allemagne")}</p>
              <p className="mt-7">
                <strong className="text-brand-dark">{t("Zuständige Architektenkammer:", "Responsible chamber of architects:", "Ordre des architectes compétent :")}</strong><br />
                {t("Architektenkammer Baden-Württemberg", "Architektenkammer Baden-Württemberg (Chamber of Architects of Baden-Württemberg)", "Architektenkammer Baden-Württemberg (Ordre des architectes du Bade-Wurtemberg)")}<br />
                Danneckerstraße 54<br />
                70182 Stuttgart<br />
                <a href="https://www.akbw.de" target="_blank" rel="noopener noreferrer" className={link}>www.akbw.de</a>
              </p>
            </div>
            <div className="basis-[420px] grow">
              <strong className="text-brand-dark">{t("Berufsrechtliche Regelungen:", "Professional regulations:", "Réglementation professionnelle :")}</strong>
              <ol className="mt-4 flex flex-col gap-2.5">
                {REGELN.map((r, i) => (
                  <li key={r[0]} className="flex items-baseline gap-4 rounded-xl bg-brand-surface px-[18px] py-3.5">
                    <span className="font-heading font-extrabold text-[#4E6F33]">{String(i + 1).padStart(2, '0')}</span>
                    {t(...r)}
                  </li>
                ))}
              </ol>
              <p className="mt-4">
                {t("Einsehbar unter:", "Available at:", "Consultable sur :")} <a href="https://www.akbw.de" target="_blank" rel="noopener noreferrer" className={link}>www.akbw.de</a>
              </p>
            </div>
          </div>
        </section>

        <div className="mt-[72px] flex flex-wrap gap-x-16 gap-y-12">
          <section className="basis-[420px] grow">
            <h2 className={h2}>{t("EU-Streitschlichtung", "EU Dispute Resolution", "Règlement des litiges de l'UE")}</h2>
            <p>
              {t("Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:", "The European Commission provides a platform for online dispute resolution (ODR):", "La Commission européenne met à disposition une plateforme de règlement en ligne des litiges (RLL) :")}<br />
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className={`${link} break-all font-semibold`}>
                https://ec.europa.eu/consumers/odr/
              </a>.<br />
              {t("Unsere E-Mail-Adresse finden Sie oben im Impressum.", "You will find our email address above in this legal notice.", "Vous trouverez notre adresse e-mail plus haut dans ces mentions légales.")}
            </p>
          </section>
          <section className="basis-[420px] grow">
            <h2 className={h2}>{t("Rechtliche Hinweise", "Legal Information", "Informations juridiques")}</h2>
            <p>
              {t("Die Inhalte dieser Seiten sollen nur als Information dienen; sie sind unverbindlich und können von der tatsächlichen Ausführung abweichen. Der Inhalt dieser Seiten ist geschützt und darf nicht von Dritten ohne schriftliche Erlaubnis verwendet werden.", "The content of these pages is for information only; it is non-binding and may differ from the actual execution. The content of these pages is protected and may not be used by third parties without written permission.", "Le contenu de ces pages est fourni à titre d'information ; il est sans engagement et peut différer de la réalisation effective. Le contenu de ces pages est protégé et ne peut pas être utilisé par des tiers sans autorisation écrite.")}
            </p>
          </section>
        </div>
      </div>
    </PageShell>
  );
};

export default ImpressumPage;
