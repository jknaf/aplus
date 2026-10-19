import React, { useEffect } from 'react';
import PageShell from '../components/PageShell';
import { useLang, useT } from '../i18n';
import Plankopf from '../components/Plankopf';

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

const INHALT: [string, [string, string, string]][] = [
  ["einleitung", ["Einleitung", "Introduction", "Introduction"]],
  ["verantwortlicher", ["Verantwortlicher", "Controller", "Responsable du traitement"]],
  ["hosting", ["Hosting (Vercel)", "Hosting (Vercel)", "Hébergement (Vercel)"]],
  ["email", ["Kontaktaufnahme per E-Mail", "Contact by email", "Contact par e-mail"]],
  ["konfigurator", ["Skatepark-Konfigurator", "Skatepark planner", "Configurateur de skatepark"]],
  ["schriften", ["Schriftarten", "Fonts", "Polices de caractères"]],
  ["analyse", ["Webanalyse und Werbung (Google)", "Web analytics and advertising (Google)", "Analyse d'audience et publicité (Google)"]],
  ["cookies", ["Cookies", "Cookies", "Cookies"]],
  ["rechte", ["Ihre Rechte", "Your rights", "Vos droits"]],
];

const PrivacyPolicyPage: React.FC = () => {
  const t = useT();
  const lang = useLang();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageShell title={t("Datenschutzerklärung", "Privacy Policy", "Politique de confidentialité")} fullWidth>
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6 md:pt-40 lg:px-8 text-[17px] leading-[1.7] text-[#3A433D]">
        <header className="mb-14">
          <Plankopf label={t("Rechtliches", "Legal", "Informations légales")} as="h1" klein>
            {t(<>Daten<span className="text-brand-orange">schutz</span></>, <>Privacy <span className="text-brand-orange">policy</span></>, <>Protection<br/> des <span className="text-brand-orange">données</span></>)}
          </Plankopf>
          <p className="mt-7 max-w-[620px] text-xl text-[#5A615C]">
            {t("Welche Daten beim Besuch dieser Website anfallen, wozu wir sie brauchen und wie lange sie bleiben.", "Which data arise when you visit this website, what we need them for and how long they are kept.", "Quelles données sont collectées lors de la visite de ce site, pourquoi nous en avons besoin et combien de temps elles sont conservées.")}
          </p>
          {lang !== 'de' && (
            <p className="mt-4 max-w-[620px] text-sm text-[#5A615C]">{t("", "This page is a translation for convenience. The German version is the legally binding one.", "Cette page est une traduction fournie à titre indicatif. Seule la version allemande fait foi.")}</p>
          )}
        </header>

        <div className="flex flex-wrap items-start gap-x-[72px] gap-y-12">
          <nav aria-label={t("Inhalt", "Contents", "Sommaire")} className="min-w-[240px] basis-[280px]">
            <div className="px-3.5 pb-2.5 text-xs font-semibold uppercase tracking-[0.18em] text-[#4E6F33]">{t("Inhalt", "Contents", "Sommaire")}</div>
            {INHALT.map(([id, name], i) => (
              <a
                key={id}
                href={`#${id}`}
                className="flex items-baseline gap-3.5 rounded-[10px] px-3.5 py-2.5 text-[15px] leading-snug text-[#3A433D] transition-colors hover:bg-brand-surface hover:text-brand-dark"
              >
                <span className="font-heading text-[13px] font-extrabold text-[#4E6F33]">{String(i + 1).padStart(2, '0')}</span>
                {t(...name)}
              </a>
            ))}
          </nav>

          <div className="flex min-w-0 basis-[520px] grow flex-col gap-14">
            <Abschnitt id="einleitung" nr="01" titel={t("Einleitung", "Introduction", "Introduction")}>
              <p>
                {t("Nachfolgend informieren wir, A+ Urban Design als verantwortliche Stelle, Sie darüber, welche personenbezogenen Daten bei der Nutzung unseres Internetauftritts zu welchen Zwecken verarbeitet werden. Die Basis für diese Datenschutzerklärung bilden die europäische Datenschutz Grundverordnung (DSGVO), das Bundesdatenschutzgesetz (BDSG neu) und das Telemediengesetz (TMG) der Bundesrepublik Deutschland.", "Below, we, A+ Urban Design as the controller, inform you which personal data are processed, and for which purposes, when you use our website. This privacy policy is based on the European General Data Protection Regulation (GDPR), the German Federal Data Protection Act (BDSG, as amended) and the German Telemedia Act (TMG).", "Ci-après, nous, A+ Urban Design, en tant que responsable du traitement, vous informons des données personnelles traitées lors de l'utilisation de notre site internet et des finalités de ce traitement. La présente politique de confidentialité repose sur le règlement général européen sur la protection des données (RGPD), la loi fédérale allemande sur la protection des données (BDSG, nouvelle version) et la loi allemande sur les télémédias (TMG).")}
              </p>
            </Abschnitt>

            <Abschnitt id="verantwortlicher" nr="02" titel={t("Verantwortlicher", "Controller", "Responsable du traitement")}>
              <p className="rounded-[14px] border border-brand-dark/10 bg-[#FAF9F6] px-[26px] py-[22px] text-brand-dark">
                A+ Urban Design<br />
                Talstrasse 41<br />
                70188 Stuttgart<br />
                {t("Deutschland", "Germany", "Allemagne")}<br />
                {t("Inhaber: Dipl.-Ing. Cüneyit Akcakoca, Freier Architekt", "Owner: Dipl.-Ing. Cüneyit Akcakoca, Freier Architekt (independent architect)", "Propriétaire : Dipl.-Ing. Cüneyit Akcakoca, Freier Architekt (architecte indépendant)")}<br />
                {t("Tel.: +49 (0) 155 600 909 66", "Phone: +49 (0) 155 600 909 66", "Tél. : +49 (0) 155 600 909 66")}<br />
                {t("E-Mail:", "Email:", "E-mail :")} <a href="mailto:post@aplusurbandesign.com" className={link}>post@aplusurbandesign.com</a>
              </p>
            </Abschnitt>

            <Abschnitt id="hosting" nr="03" titel={t("Hosting (Vercel)", "Hosting (Vercel)", "Hébergement (Vercel)")}>
              <p>
                {t(<>Diese Website wird gehostet bei <strong className="text-brand-dark">Vercel Inc.</strong> (440 N Barranca Ave #4133, Covina, CA 91723, USA). Vercel betreibt Edge-Server in der Europäischen Union (Frankfurt am Main). Beim Aufruf der Website werden technische Daten (IP-Adresse, Datum, Uhrzeit, Browser-Typ, abgerufene Datei, Referrer) in Server-Logfiles erfasst. Diese Verarbeitung dient der Sicherheit, Stabilität und Fehlerbehebung des Webdienstes auf Grundlage unseres berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO). Die Logdaten werden nach 30 Tagen automatisch gelöscht.</>, <>This website is hosted by <strong className="text-brand-dark">Vercel Inc.</strong> (440 N Barranca Ave #4133, Covina, CA 91723, USA). Vercel operates edge servers in the European Union (Frankfurt am Main). When the website is accessed, technical data (IP address, date, time, browser type, requested file, referrer) are recorded in server log files. This processing serves the security, stability and troubleshooting of the web service on the basis of our legitimate interest (Art. 6(1)(f) GDPR). The log data are deleted automatically after 30 days.</>, <>Ce site est hébergé par <strong className="text-brand-dark">Vercel Inc.</strong> (440 N Barranca Ave #4133, Covina, CA 91723, États-Unis). Vercel exploite des serveurs de périphérie dans l'Union européenne (Francfort-sur-le-Main). Lors de la consultation du site, des données techniques (adresse IP, date, heure, type de navigateur, fichier demandé, référent) sont enregistrées dans des fichiers journaux du serveur. Ce traitement sert à la sécurité, à la stabilité et au dépannage du service web, sur la base de notre intérêt légitime (art. 6, par. 1, point f du RGPD). Les données de journal sont supprimées automatiquement après 30 jours.</>)}
              </p>
              <p className="mt-4">
                {t(<>Da Vercel ein US-Unternehmen ist, kann es zu einer Übermittlung von Daten in die USA kommen. Vercel ist nach dem <strong className="text-brand-dark">EU-US Data Privacy Framework</strong> zertifiziert. Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung gemäß Art. 28 DSGVO. Weitere Informationen:</>, <>As Vercel is a US company, data may be transferred to the USA. Vercel is certified under the <strong className="text-brand-dark">EU-US Data Privacy Framework</strong>. A data processing agreement under Art. 28 GDPR is in place with Vercel. Further information:</>, <>Vercel étant une entreprise américaine, des données peuvent être transférées vers les États-Unis. Vercel est certifiée au titre du <strong className="text-brand-dark">EU-US Data Privacy Framework</strong>. Un contrat de sous-traitance conforme à l'art. 28 du RGPD a été conclu avec Vercel. Pour plus d'informations :</>)} <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className={link}>vercel.com/legal/privacy-policy</a>
              </p>
            </Abschnitt>

            <Abschnitt id="email" nr="04" titel={t("Kontaktaufnahme per E-Mail", "Contact by email", "Contact par e-mail")}>
              <p>
                {t(<>Die Kontaktaufnahme auf dieser Website erfolgt über <strong className="text-brand-dark">mailto-Links</strong>. Ein Klick auf einen Anfrage-Button öffnet das auf Ihrem Gerät eingerichtete E-Mail-Programm mit einer vorbereiteten Nachricht an <strong className="text-brand-dark">post@aplusurbandesign.com</strong>. Es wird kein Formular ausgefüllt, keine Daten an diese Website übermittelt und kein Dienstleister zwischengeschaltet. Ihre Daten gelangen ausschließlich über Ihren eigenen E-Mail-Anbieter an uns.</>, <>Contact on this website is made via <strong className="text-brand-dark">mailto links</strong>. Clicking an enquiry button opens the email program set up on your device with a prepared message to <strong className="text-brand-dark">post@aplusurbandesign.com</strong>. No form is filled in, no data is sent to this website and no service provider is interposed. Your data reach us only through your own email provider.</>, <>La prise de contact sur ce site se fait par des <strong className="text-brand-dark">liens mailto</strong>. Un clic sur un bouton de demande ouvre la messagerie configurée sur votre appareil avec un message prérempli adressé à <strong className="text-brand-dark">post@aplusurbandesign.com</strong>. Aucun formulaire n'est rempli, aucune donnée n'est transmise à ce site et aucun prestataire n'est interposé. Vos données ne nous parviennent que par l'intermédiaire de votre propre fournisseur de messagerie.</>)}
              </p>
              <p className="mt-4">
                {t("Die von Ihnen in der E-Mail übermittelten Daten (Name, E-Mail-Adresse, Telefonnummer, Projektbeschreibung) verarbeiten wir zur Bearbeitung Ihrer Anfrage und für eventuelle Anschlussfragen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an effizienter Kommunikation). Diese Daten werden nicht ohne Ihre Einwilligung an Dritte weitergegeben.", "We process the data you send in the email (name, email address, phone number, project description) to handle your enquiry and for any follow-up questions. The legal basis is Art. 6(1)(b) GDPR (pre-contractual measures) or Art. 6(1)(f) GDPR (legitimate interest in efficient communication). These data are not passed to third parties without your consent.", "Nous traitons les données que vous nous transmettez par e-mail (nom, adresse e-mail, numéro de téléphone, description du projet) pour traiter votre demande et répondre à d'éventuelles questions complémentaires. La base juridique est l'art. 6, par. 1, point b du RGPD (mesures précontractuelles) ou l'art. 6, par. 1, point f du RGPD (intérêt légitime à une communication efficace). Ces données ne sont pas transmises à des tiers sans votre consentement.")}
              </p>
            </Abschnitt>

            <Abschnitt id="konfigurator" nr="05" titel={t("Skatepark-Konfigurator", "Skatepark planner", "Configurateur de skatepark")}>
              <p>
                {t("Ihren im Konfigurator geplanten Park speichern wir nur in Ihrem eigenen Browser (Local Storage), damit er beim Wechsel zum Katalog erhalten bleibt. Diese Daten verlassen Ihr Gerät nicht, solange Sie keine Anfrage senden oder den Teilen-Link weitergeben. Sie können sie jederzeit über die Browser-Einstellungen löschen.", "We store the park you plan in the planner only in your own browser (local storage), so that it is kept when you switch to the catalogue. These data do not leave your device unless you send an enquiry or pass on the share link. You can delete them at any time via your browser settings.", "Nous enregistrons le skatepark que vous planifiez dans le configurateur uniquement dans votre propre navigateur (stockage local), afin qu'il soit conservé lorsque vous passez au catalogue. Ces données ne quittent pas votre appareil, tant que vous n'envoyez pas de demande ni ne partagez le lien de partage. Vous pouvez les supprimer à tout moment dans les paramètres de votre navigateur.")}
              </p>
              <p className="mt-4">
                {t("Wenn Sie über den Konfigurator ein Angebot anfragen, öffnet sich Ihr E-Mail-Programm mit einer vorbereiteten Nachricht (Link zu Ihrem Park und Stückliste). Die Website selbst übermittelt dabei keine Daten; die Nachricht erreicht uns erst, wenn Sie sie über Ihren eigenen E-Mail-Anbieter absenden.", "If you request a quote via the planner, your email program opens with a prepared message (link to your park and parts list). The website itself transmits no data in doing so; the message only reaches us when you send it via your own email provider.", "Si vous demandez une offre via le configurateur, votre messagerie s'ouvre avec un message prérempli (lien vers votre skatepark et liste des pièces). Le site lui-même ne transmet alors aucune donnée ; le message ne nous parvient que lorsque vous l'envoyez via votre propre fournisseur de messagerie.")}
              </p>
            </Abschnitt>

            <Abschnitt id="schriften" nr="06" titel={t("Schriftarten", "Fonts", "Polices de caractères")}>
              <p>
                {t(<>Die Schriften <strong className="text-brand-dark">Inter</strong> und <strong className="text-brand-dark">Plus Jakarta Sans</strong> sowie die Icon-Schrift Material Symbols liefern wir von unserem eigenen Server aus. Beim Aufruf der Website wird dafür keine Verbindung zu den Servern von Schriftarten-Diensten aufgebaut, und es werden keine Daten an Dritte übermittelt.</>, <>The fonts <strong className="text-brand-dark">Inter</strong> and <strong className="text-brand-dark">Plus Jakarta Sans</strong> and the icon font Material Symbols are served from our own server. When the website is accessed, no connection is made to the servers of font services, and no data are passed to third parties.</>, <>Les polices <strong className="text-brand-dark">Inter</strong> et <strong className="text-brand-dark">Plus Jakarta Sans</strong>, ainsi que la police d'icônes Material Symbols, sont servies depuis notre propre serveur. Lors de la consultation du site, aucune connexion n'est établie avec les serveurs de services de polices et aucune donnée n'est transmise à des tiers.</>)}
              </p>
            </Abschnitt>

            <Abschnitt id="analyse" nr="07" titel={t("Webanalyse und Werbung (Google)", "Web analytics and advertising (Google)", "Analyse d'audience et publicité (Google)")}>
              <p>
                {t(<>Mit Ihrer Einwilligung verwenden wir <strong className="text-brand-dark">Google Analytics 4</strong> und werten unsere Anzeigen-Kampagnen in <strong className="text-brand-dark">Google Ads</strong> aus. Anbieter ist Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Google kann Daten an Google LLC in den USA übermitteln; Google LLC ist nach dem EU-US Data Privacy Framework zertifiziert, und mit Google besteht ein Vertrag zur Auftragsverarbeitung.</>, <>With your consent we use <strong className="text-brand-dark">Google Analytics 4</strong> and evaluate our advertising campaigns in <strong className="text-brand-dark">Google Ads</strong>. The provider is Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland. Google may transfer data to Google LLC in the USA; Google LLC is certified under the EU-US Data Privacy Framework, and a data processing agreement is in place with Google.</>, <>Avec votre consentement, nous utilisons <strong className="text-brand-dark">Google Analytics 4</strong> et analysons nos campagnes publicitaires dans <strong className="text-brand-dark">Google Ads</strong>. Le prestataire est Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irlande. Google peut transférer des données à Google LLC aux États-Unis ; Google LLC est certifiée selon le EU-US Data Privacy Framework, et un contrat de sous-traitance a été conclu avec Google.</>)}
              </p>
              <p className="mt-4">
                {t("Wir wollen wissen, wie viele Personen die Website besuchen, woher sie kommen, welche Seiten sie nutzen und ob aus einer Anzeige eine Anfrage wird. Dazu erfassen wir Seitenaufrufe, Verweildauer, die Herkunft des Besuchs (etwa Suchmaschine oder Anzeige), Gerät und Browser, den ungefähren Standort sowie Ereignisse wie die Freischaltung von Preisen, den Start des Konfigurators oder einen Klick auf „Anfrage senden“. Google Analytics 4 speichert keine vollständigen IP-Adressen. Google setzt dafür Cookies, etwa _ga, _ga_* und _gcl_au. Wir sehen nur zusammengefasste Auswertungen, keine einzelnen Personen. Die Analysedaten löschen wir nach spätestens 14 Monaten.", "We want to know how many people visit the website, where they come from, which pages they use and whether an ad leads to an enquiry. For this we record page views, time on site, the source of the visit (for example a search engine or an ad), device and browser, the approximate location, and events such as unlocking prices, starting the planner or clicking “Send enquiry”. Google Analytics 4 does not store full IP addresses. Google sets cookies for this, such as _ga, _ga_* and _gcl_au. We see only aggregated reports, not individual people. We delete the analytics data after 14 months at the latest.", "Nous voulons savoir combien de personnes visitent le site, d'où elles viennent, quelles pages elles consultent et si une annonce débouche sur une demande. Nous enregistrons pour cela les pages vues, la durée de visite, l'origine de la visite (par exemple un moteur de recherche ou une annonce), l'appareil et le navigateur, la localisation approximative ainsi que des événements tels que le déblocage des prix, le lancement du configurateur ou un clic sur « Envoyer la demande ». Google Analytics 4 n'enregistre pas d'adresses IP complètes. Google dépose pour cela des cookies, par exemple _ga, _ga_* et _gcl_au. Nous ne voyons que des rapports agrégés, pas de personnes individuelles. Nous supprimons les données d'analyse au plus tard après 14 mois.")}
              </p>
              <p className="mt-4">
                {t("Rechtsgrundlage ist Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Ohne Ihre Einwilligung werden Google Analytics und die Messung für Google Ads nicht geladen. Sie können die Einwilligung jederzeit mit Wirkung für die Zukunft über den Cookie-Button im Footer widerrufen. Weitere Informationen: policies.google.com/privacy.", "The legal basis is your consent under Art. 6(1)(a) GDPR and Section 25(1) TDDDG. Without your consent, Google Analytics and the measurement for Google Ads are not loaded. You can withdraw your consent at any time with effect for the future using the cookie button in the footer. More information: policies.google.com/privacy.", "La base juridique est votre consentement au titre de l'art. 6, par. 1, point a) du RGPD et du § 25, al. 1 de la loi allemande TDDDG. Sans votre consentement, Google Analytics et la mesure pour Google Ads ne sont pas chargés. Vous pouvez retirer votre consentement à tout moment, avec effet pour l'avenir, via le bouton des cookies en bas de page. Plus d'informations : policies.google.com/privacy.")}
              </p>
            </Abschnitt>

            <Abschnitt id="cookies" nr="08" titel={t("Cookies", "Cookies", "Cookies")}>
              <p>
                {t("Diese Website verwendet ausschließlich technisch notwendige Cookies, die für den Betrieb der Seite erforderlich sind. Analyse- und Marketing-Cookies (Google Analytics, Google Ads) setzen wir nur nach Ihrer Einwilligung ein, siehe Abschnitt 07. Sie können die Cookie-Einstellungen jederzeit über den entsprechenden Button im Footer ändern.", "This website uses only technically necessary cookies required to operate the site. Analytics and marketing cookies (Google Analytics, Google Ads) are used only with your consent, see section 07. You can change your cookie settings at any time using the button in the footer.", "Ce site utilise exclusivement des cookies techniquement nécessaires au fonctionnement du site. Les cookies d'analyse et de marketing (Google Analytics, Google Ads) ne sont utilisés qu'avec votre consentement, voir la section 07. Vous pouvez modifier vos paramètres de cookies à tout moment via le bouton en bas de page.")}
              </p>
              <div className="mt-[22px] rounded-[14px] border border-brand-dark/10 bg-brand-surface px-[26px] py-[22px]">
                <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[#4E6F33]">{t("Verwendete Cookies", "Cookies used", "Cookies utilisés")}</div>
                <p className="mt-2.5 text-[15px] leading-relaxed">
                  {t(<><strong className="text-brand-dark">aplus-cookie-consent</strong> (technisch notwendig): Speichert Ihre Cookie-Einstellung. Speicherdauer: 12 Monate. Lokal im Browser (kein Drittanbieter).</>, <><strong className="text-brand-dark">aplus-cookie-consent</strong> (technically necessary): stores your cookie setting. Storage period: 12 months. Local in the browser (no third party).</>, <><strong className="text-brand-dark">aplus-cookie-consent</strong> (techniquement nécessaire) : enregistre votre paramètre de cookies. Durée de conservation : 12 mois. En local dans le navigateur (aucun tiers).</>)}
                </p>
              </div>
            </Abschnitt>

            <Abschnitt id="rechte" nr="09" titel={t("Ihre Rechte", "Your rights", "Vos droits")}>
              <p>
                {t("Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.", "You have the right at any time to free information about your stored personal data, their origin and recipients and the purpose of the data processing, as well as a right to rectification, blocking or erasure of these data. For this and for further questions about personal data, you can contact us at any time at the address given in the legal notice.", "Vous avez à tout moment le droit d'obtenir gratuitement des informations sur vos données personnelles enregistrées, leur origine, leurs destinataires et la finalité du traitement, ainsi que le droit à la rectification, au verrouillage ou à l'effacement de ces données. Pour cela comme pour toute autre question sur les données personnelles, vous pouvez à tout moment nous contacter à l'adresse indiquée dans les mentions légales.")}
              </p>
            </Abschnitt>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default PrivacyPolicyPage;
