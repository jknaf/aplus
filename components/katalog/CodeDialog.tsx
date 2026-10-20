import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useT } from '../../i18n';

// Code-Eingabe für Preise (Katalog) und Konfigurator; „Code anfordern“ öffnet eine fertige Mail an A+
const CodeDialog: React.FC<{ offen: boolean; onClose: () => void; freischalten: (c: string) => Promise<string | null>; titel: string; text: string; anfrage: string }> = ({ offen, onClose, freischalten, titel, text, anfrage }) => {
  const t = useT();
  const [code, setCode] = useState('');
  const [fehler, setFehler] = useState<string | null>(null);
  const [laeuft, setLaeuft] = useState(false);
  if (!offen) return null;
  const senden = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setLaeuft(true); setFehler(null);
    const f = await freischalten(code);
    setLaeuft(false);
    if (f) setFehler(f); else { setCode(''); onClose(); }
  };
  return createPortal(
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-brand-dark/50 backdrop-blur-sm" onClick={onClose}>
      <form onSubmit={senden} onClick={(e) => e.stopPropagation()} className="w-full max-w-md bg-brand-bg rounded-2xl border border-brand-dark/10 shadow-2xl p-8">
        <span className="material-symbols-outlined text-brand-orange text-4xl mb-4">lock_open</span>
        <h2 className="text-2xl font-extrabold font-heading text-brand-dark uppercase tracking-tight mb-2">{titel}</h2>
        <p className="text-brand-muted text-sm mb-6">{text}</p>
        <label className="block font-mono text-xs uppercase tracking-widest text-brand-muted mb-2" htmlFor="freischalt-code">Code</label>
        <input
          id="freischalt-code" value={code} onChange={(e) => setCode(e.target.value)} autoFocus autoComplete="off"
          className="w-full px-4 py-3 rounded-lg border border-brand-dark/15 bg-white font-mono tracking-widest uppercase focus:outline-none focus:border-brand-orange"
        />
        {fehler && <p className="mt-3 text-sm text-red-700" role="alert">{fehler}</p>}
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button type="submit" disabled={!code.trim() || laeuft} className="px-6 py-3 rounded-lg bg-brand-orange text-white font-bold uppercase tracking-wider text-sm disabled:opacity-50 hover:bg-brand-dark transition-colors">
            {laeuft ? t('Prüfe …', 'Checking …', 'Vérification …') : t('Freischalten', 'Unlock', 'Débloquer')}
          </button>
          <a href={anfrage} className="text-sm text-brand-orange underline underline-offset-4">{t('Code anfordern', 'Request a code', 'Demander un code')}</a>
          <button type="button" onClick={onClose} className="ml-auto text-sm text-brand-muted hover:text-brand-dark">{t('Abbrechen', 'Cancel', 'Annuler')}</button>
        </div>
      </form>
    </div>,
    document.body,
  );
};

export default CodeDialog;

// Texte und Mail zum Freischalten des Planers, je nach Sprache
export const useKonfiguratorCode = () => {
  const t = useT();
  return {
    titel: t('Konfigurator freischalten', 'Unlock the planner', 'Débloquer le configurateur'),
    text: t(
      'Vorlagen, Bauplan und Stückliste sehen Sie ohne Code. Zum Planen, also Elemente hinzufügen, verschieben, löschen und als PDF speichern, brauchen Sie Ihren persönlichen Code. Er schaltet den Konfigurator in diesem Browser für 2 Tage frei. Sie haben noch keinen? Wir senden ihn Ihnen gern zu.',
      'You can see templates, the site plan and the parts list without a code. To plan, that is to add, move and delete elements and save as a PDF, you need your personal code. It unlocks the planner in this browser for 2 days. Don\'t have one yet? We are happy to send you one.',
      'Les modèles, le plan et la liste des pièces sont visibles sans code. Pour planifier, c\'est-à-dire ajouter, déplacer et supprimer des éléments et enregistrer en PDF, vous avez besoin de votre code personnel. Il débloque le configurateur dans ce navigateur pendant 2 jours. Vous n\'en avez pas encore ? Nous vous en envoyons volontiers un.',
    ),
    anfrage:
      'mailto:post@aplusurbandesign.com?subject=' +
      encodeURIComponent(t('Code für den Skatepark-Konfigurator', 'Code for the skatepark planner', 'Code pour le configurateur de skatepark')) +
      '&body=' +
      encodeURIComponent(
        t(
          'Guten Tag,\n\nbitte senden Sie mir den Code zur Freischaltung des Skatepark-Konfigurators.\n\nName:\nFirma / Kommune:\nTelefon:\n',
          'Hello,\n\nPlease send me the code to unlock the Skatepark Planner.\n\nName:\nCompany / municipality:\nPhone:\n',
          "Bonjour,\n\nmerci de m'envoyer le code de déblocage du configurateur de skatepark.\n\nNom :\nEntreprise / commune :\nTéléphone :\n",
        ),
      ),
  };
};
