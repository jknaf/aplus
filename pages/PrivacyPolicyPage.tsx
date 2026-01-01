import React from 'react';
import PageShell from '../components/PageShell';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <PageShell title="Datenschutzerklärung">
       <div className="max-w-4xl mx-auto">
         <h1 className="text-4xl md:text-6xl font-black font-heading uppercase tracking-tighter text-center">Datenschutzerklärung</h1>
        <div className="mt-16 text-brand-muted space-y-8 text-left leading-relaxed">
            
            <div>
                <h2 className="text-2xl font-bold font-heading text-brand-heading border-b border-white/10 pb-2 mb-4">Einleitung</h2>
                <p>
                Nachfolgend informieren wir, A+ Urban Design als verantwortliche Stelle, Sie darüber, welche personenbezogenen Daten bei der Nutzung unseres Internetauftritts zu welchen Zwecken verarbeitet werden. Die Basis für diese Datenschutzerklärung bilden die europäische Datenschutz Grundverordnung (DSGVO), das Bundesdatenschutzgesetz (BDSG neu) und das Telemediengesetz (TMG) der Bundesrepublik Deutschland.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-bold font-heading text-brand-heading border-b border-white/10 pb-2 mb-4">Name und Anschrift des Verantwortlichen</h2>
                <p>
                A+ Urban Design<br />
                Talstrasse 41<br />
                70188 Stuttgart<br />
                Deutschland<br />
                Inhaber: Cüneyit Akcakoca<br />
                Tel.: +49 (0) 155 600 909 66<br />
                E-Mail: post@aplusurbandesign.com
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-bold font-heading text-brand-heading border-b border-white/10 pb-2 mb-4">Hosting & Serverlogs</h2>
                <p>
                Unser Hoster erhebt in sogenannten Logfiles Daten, die Ihr Browser übermittelt (IP-Adresse, Datum, Uhrzeit, abgerufene Datei). Diese Speicherung dient lediglich der Sicherheit und Fehlerbehebung (Art. 6 Abs. 1 lit. f DSGVO). Die Daten werden nach 7 Tagen gelöscht.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-bold font-heading text-brand-heading border-b border-white/10 pb-2 mb-4">Kontaktformular & Kataloganforderung</h2>
                <p>
                Wenn Sie uns per Kontaktformular oder E-Mail Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
                </p>
                <p className="mt-2 font-bold text-white">Verarbeitung durch n8n (Automatisierung)</p>
                <p>
                Zur technischen Abwicklung der Katalogversendung und Kontaktanfragen nutzen wir den Automatisierungsdienst <strong>n8n.cloud</strong> (n8n GmbH). Die von Ihnen eingegebenen Daten (E-Mail-Adresse) werden an Server von n8n übermittelt, um den automatisierten E-Mail-Versand auszulösen. Dies erfolgt auf Grundlage unseres berechtigten Interesses an einer effizienten Kundenkommunikation (Art. 6 Abs. 1 lit. f DSGVO) sowie zur Erfüllung vorvertraglicher Maßnahmen (Zusendung des angeforderten Angebots/Katalogs) gemäß Art. 6 Abs. 1 lit. b DSGVO. Wir haben mit dem Anbieter einen Vertrag zur Auftragsverarbeitung (AVV) geschlossen.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-bold font-heading text-brand-heading border-b border-white/10 pb-2 mb-4">Lokale Schriftarten (Google Fonts Alternative)</h2>
                <p>
                Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten lokale Systemschriften oder lokal eingebundene Schriften. Beim Aufruf der Seite baut Ihr Browser <strong>keine</strong> Verbindung zu Servern von Google auf. Es findet keine Übertragung Ihrer IP-Adresse an Google Font-Server statt.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-bold font-heading text-brand-heading border-b border-white/10 pb-2 mb-4">Cookies</h2>
                <p>
                Auf Grundlage unserer berechtigten Interessen verwenden wir auf unserer Website Cookies. Sie können unsere Website auch ohne Cookies nutzen, indem Sie die Verwendung von Cookies in Ihrem Browser deaktivieren oder im Cookie-Banner ablehnen. Technisch notwendige Cookies sind für den Betrieb der Seite erforderlich.
                </p>
            </div>

            <div>
                <h2 className="text-2xl font-bold font-heading text-brand-heading border-b border-white/10 pb-2 mb-4">Ihre Rechte</h2>
                <p>
                Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.
                </p>
            </div>
        </div>
      </div>
    </PageShell>
  );
};

export default PrivacyPolicyPage;