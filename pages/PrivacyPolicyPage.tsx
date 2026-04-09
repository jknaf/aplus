import React, { useEffect } from 'react';
import PageShell from '../components/PageShell';

const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageShell title="Datenschutzerklärung">
       <div className="max-w-4xl mx-auto py-12">
        <div className="text-center mb-24">
            <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">
                Rechtliches
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                Daten<span className="text-brand-orange">schutz.</span>
            </h1>
         </div>

        <div className="mt-16 text-brand-muted space-y-12 text-left leading-relaxed">
            
            <div>
                <h2 className="text-2xl font-bold font-heading text-brand-dark uppercase tracking-wider border-b border-brand-dark/10 pb-4 mb-6">Einleitung</h2>
                <p className="text-lg">
                Nachfolgend informieren wir, A+ Urban Design als verantwortliche Stelle, Sie darüber, welche personenbezogenen Daten bei der Nutzung unseres Internetauftritts zu welchen Zwecken verarbeitet werden. Die Basis für diese Datenschutzerklärung bilden die europäische Datenschutz Grundverordnung (DSGVO), das Bundesdatenschutzgesetz (BDSG neu) und das Telemediengesetz (TMG) der Bundesrepublik Deutschland.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-bold font-heading text-brand-dark uppercase tracking-wider border-b border-brand-dark/10 pb-4 mb-6">Verantwortlicher</h2>
                <p className="text-lg">
                A+ Urban Design<br />
                Talstrasse 41<br />
                70188 Stuttgart<br />
                Deutschland<br />
                Inhaber: Dipl.-Ing. Cüneyit Akcakoca, Freier Architekt<br />
                Tel.: +49 (0) 155 600 909 66<br />
                E-Mail: post@aplusurbandesign.com
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-bold font-heading text-brand-dark uppercase tracking-wider border-b border-brand-dark/10 pb-4 mb-6">Hosting (Vercel)</h2>
                <p className="text-lg">
                Diese Website wird gehostet bei <strong>Vercel Inc.</strong> (440 N Barranca Ave #4133, Covina, CA 91723, USA). Vercel betreibt Edge-Server in der Europäischen Union (Frankfurt am Main). Beim Aufruf der Website werden technische Daten (IP-Adresse, Datum, Uhrzeit, Browser-Typ, abgerufene Datei, Referrer) in Server-Logfiles erfasst. Diese Verarbeitung dient der Sicherheit, Stabilität und Fehlerbehebung des Webdienstes auf Grundlage unseres berechtigten Interesses (Art. 6 Abs. 1 lit. f DSGVO). Die Logdaten werden nach 30 Tagen automatisch gelöscht.
                </p>
                <p className="text-lg mt-4">
                Da Vercel ein US-Unternehmen ist, kann es zu einer Übermittlung von Daten in die USA kommen. Vercel ist nach dem <strong>EU-US Data Privacy Framework</strong> zertifiziert. Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung gemäß Art. 28 DSGVO. Weitere Informationen: <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">vercel.com/legal/privacy-policy</a>
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-bold font-heading text-brand-dark uppercase tracking-wider border-b border-brand-dark/10 pb-4 mb-6">Kontaktformular & Katalog</h2>
                <p className="text-lg mb-4">
                Wenn Sie uns über das Kontaktformular oder die Katalog-Anforderung Daten übermitteln (Name, E-Mail-Adresse, Telefonnummer, Nachricht), werden diese zur Bearbeitung Ihrer Anfrage und für eventuelle Anschlussfragen gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an effizienter Kommunikation). Diese Daten werden nicht ohne Ihre Einwilligung an Dritte weitergegeben.
                </p>
                <div className="bg-brand-surface/60 p-6 rounded-lg border border-brand-dark/10">
                    <p className="font-bold text-brand-dark mb-2 uppercase text-sm tracking-wider">E-Mail-Versand über Resend</p>
                    <p className="text-sm">
                    Für den technischen Versand von E-Mails (Bestätigungen und Benachrichtigungen) nutzen wir den Dienstleister <strong>Resend, Inc.</strong> (2261 Market Street #5039, San Francisco, CA 94114, USA). Die Verarbeitung erfolgt auf Resend-Servern in der EU-Region (Irland). Mit Resend besteht ein Auftragsverarbeitungsvertrag gemäß Art. 28 DSGVO. Da Resend ein US-Unternehmen ist, kann es zu einer Datenübermittlung in die USA kommen. Die Übermittlung erfolgt auf Grundlage von Standardvertragsklauseln. Weitere Informationen: <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">resend.com/legal/privacy-policy</a>
                    </p>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold font-heading text-brand-dark uppercase tracking-wider border-b border-brand-dark/10 pb-4 mb-6">Schriftarten (Bunny Fonts)</h2>
                <p className="text-lg">
                Zur einheitlichen Darstellung von Schriftarten verwendet diese Website <strong>Bunny Fonts</strong>, einen DSGVO-konformen Schriftarten-Dienst der BunnyWay d.o.o. (Cesta komandanta Staneta 4A, 4000 Kranj, Slowenien). Bunny Fonts werden über EU-Server ausgeliefert, es findet kein IP-Logging statt und es werden keine Cookies gesetzt. Eine Übertragung Ihrer IP-Adresse an Google-Server findet <strong>nicht</strong> statt. Weitere Informationen: <a href="https://bunny.net/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-orange hover:underline">bunny.net/privacy</a>
                </p>
                <p className="text-lg mt-4">
                Icon-Schriften (Material Symbols) werden direkt von unserem eigenen Server ausgeliefert.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-bold font-heading text-brand-dark uppercase tracking-wider border-b border-brand-dark/10 pb-4 mb-6">Cookies</h2>
                <p className="text-lg mb-4">
                Diese Website verwendet ausschließlich technisch notwendige Cookies, die für den Betrieb der Seite erforderlich sind. Es werden keine Tracking-, Analyse- oder Marketing-Cookies eingesetzt. Sie können die Cookie-Einstellungen jederzeit über den entsprechenden Button im Footer ändern.
                </p>
                <div className="bg-brand-surface/60 p-6 rounded-lg border border-brand-dark/10">
                    <p className="font-bold text-brand-dark mb-2 uppercase text-sm tracking-wider">Verwendete Cookies</p>
                    <ul className="text-sm space-y-2">
                        <li><strong>aplus-cookie-consent</strong> (technisch notwendig) — Speichert Ihre Cookie-Einstellung. Speicherdauer: 12 Monate. Lokal im Browser (kein Drittanbieter).</li>
                    </ul>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold font-heading text-brand-dark uppercase tracking-wider border-b border-brand-dark/10 pb-4 mb-6">Ihre Rechte</h2>
                <p className="text-lg">
                Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.
                </p>
            </div>
        </div>
      </div>
    </PageShell>
  );
};

export default PrivacyPolicyPage;