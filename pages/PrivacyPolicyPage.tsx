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
            <h1 className="text-5xl md:text-7xl font-black font-heading text-white uppercase tracking-tighter leading-none">
                Daten<span className="text-outline-orange">schutz.</span>
            </h1>
         </div>

        <div className="mt-16 text-brand-muted space-y-12 text-left leading-relaxed">
            
            <div>
                <h2 className="text-2xl font-bold font-heading text-white uppercase tracking-wider border-b border-white/10 pb-4 mb-6">Einleitung</h2>
                <p className="text-lg">
                Nachfolgend informieren wir, A+ Urban Design als verantwortliche Stelle, Sie darüber, welche personenbezogenen Daten bei der Nutzung unseres Internetauftritts zu welchen Zwecken verarbeitet werden. Die Basis für diese Datenschutzerklärung bilden die europäische Datenschutz Grundverordnung (DSGVO), das Bundesdatenschutzgesetz (BDSG neu) und das Telemediengesetz (TMG) der Bundesrepublik Deutschland.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-bold font-heading text-white uppercase tracking-wider border-b border-white/10 pb-4 mb-6">Verantwortlicher</h2>
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
                <h2 className="text-2xl font-bold font-heading text-white uppercase tracking-wider border-b border-white/10 pb-4 mb-6">Hosting & Serverlogs</h2>
                <p className="text-lg">
                Unser Hoster erhebt in sogenannten Logfiles Daten, die Ihr Browser übermittelt (IP-Adresse, Datum, Uhrzeit, abgerufene Datei). Diese Speicherung dient lediglich der Sicherheit und Fehlerbehebung (Art. 6 Abs. 1 lit. f DSGVO). Die Daten werden nach 7 Tagen gelöscht.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-bold font-heading text-white uppercase tracking-wider border-b border-white/10 pb-4 mb-6">Kontaktformular & Katalog</h2>
                <p className="text-lg mb-4">
                Wenn Sie uns per Kontaktformular oder E-Mail Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
                <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                    <p className="font-bold text-white mb-2 uppercase text-sm tracking-wider">Verarbeitung durch n8n</p>
                    <p className="text-sm">
                    Zur technischen Abwicklung der Katalogversendung und Kontaktanfragen nutzen wir den Automatisierungsdienst <strong>n8n.cloud</strong> (n8n GmbH). Die von Ihnen eingegebenen Daten (E-Mail-Adresse) werden an Server von n8n übermittelt, um den automatisierten E-Mail-Versand auszulösen. Dies erfolgt auf Grundlage unseres berechtigten Interesses an einer effizienten Kundenkommunikation (Art. 6 Abs. 1 lit. f DSGVO) sowie zur Erfüllung vorvertraglicher Maßnahmen.
                    </p>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-bold font-heading text-white uppercase tracking-wider border-b border-white/10 pb-4 mb-6">Lokale Schriftarten</h2>
                <p className="text-lg">
                Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten lokale Systemschriften oder lokal eingebundene Schriften. Beim Aufruf der Seite baut Ihr Browser <strong>keine</strong> Verbindung zu Servern von Google auf. Es findet keine Übertragung Ihrer IP-Adresse an Google Font-Server statt.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-bold font-heading text-white uppercase tracking-wider border-b border-white/10 pb-4 mb-6">Cookies</h2>
                <p className="text-lg">
                Auf Grundlage unserer berechtigten Interessen verwenden wir auf unserer Website Cookies. Sie können unsere Website auch ohne Cookies nutzen, indem Sie die Verwendung von Cookies in Ihrem Browser deaktivieren oder im Cookie-Banner ablehnen. Technisch notwendige Cookies sind für den Betrieb der Seite erforderlich.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-bold font-heading text-white uppercase tracking-wider border-b border-white/10 pb-4 mb-6">Ihre Rechte</h2>
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