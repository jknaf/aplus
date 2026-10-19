import React from 'react';
import { useT } from '../i18n';

// Gemeinsame Bausteine der Produktseiten im Stil von „Über uns“.

const TUEV_LINK = 'https://www.tuvsud.com/de-de/dienstleistungen/produktpruefung-und-produktzertifizierung/zertifikatsdatenbank/?q=Z1A+056616+0012+Rev.+00';

export type Kennzahl = { wert: string; label: string };

// Header: Foto mit Ken-Burns-Effekt, Schilder, Titel, darunter vier Werte aus den technischen Daten.
export const ProduktHero: React.FC<{ bild: React.ReactNode; schilder: React.ReactNode; titel: React.ReactNode; kennzahlen: Kennzahl[] }> = ({ bild, schilder, titel, kennzahlen }) => (
    <div className="relative w-full min-h-[620px] -mt-16 mb-28 flex flex-col justify-end overflow-hidden bg-brand-dark">
        {bild}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/65 to-brand-dark/15"></div>
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-10">
            <div className="flex flex-wrap items-center gap-3 mb-6 animate-fade-in-up">{schilder}</div>
            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold font-heading uppercase tracking-normal [word-spacing:0.12em] text-white leading-none mb-12 animate-fade-in-up [animation-delay:100ms]">
                {titel}
            </h1>
            <div className="flex flex-wrap border-t border-white/25">
                {kennzahlen.map(k => (
                    <div key={k.label} className="flex-1 basis-[45%] md:basis-0 pt-6 pr-6">
                        <div className="font-heading font-extrabold text-2xl md:text-3xl leading-tight text-white">{k.wert}</div>
                        <div className="mt-2 font-mono text-xs uppercase tracking-widest text-white/75">{k.label}</div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

export const SCHILD = 'px-3 py-1 border border-[#B9D39A]/60 text-[#B9D39A] text-xs font-bold uppercase tracking-[0.2em] rounded-md';
export const SCHILD_ICON = 'flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider border border-white/35 px-3 py-1 rounded-md';

// Eine Zeile im Datenblatt. Mit href (Zertifikat) über die ganze Breite, mit GS-Zeichen und Link zu TÜV SÜD.
export const TechSpecCard: React.FC<{ title: string; value: string; icon?: string; href?: string; linkLabel?: string }> = ({ title, value, href, linkLabel }) => {
    const t = useT();
    if (href) {
        return (
            <div className="md:col-span-2 flex flex-wrap items-center gap-6 py-5 border-b border-brand-dark/10">
                <img src="/images/details/tuev-gs.png" alt={t("GS-Zeichen von TÜV SÜD", "GS mark from TÜV SÜD", "Marque GS du TÜV SÜD")} width="317" height="320" loading="lazy" className="h-20 w-auto" />
                <div className="flex-1 min-w-[200px]">
                    <dt className="font-mono text-xs uppercase tracking-widest text-brand-dark/60">{title}</dt>
                    <dd className="mt-1 font-heading font-extrabold text-xl">{value}</dd>
                </div>
                <a href={href} target="_blank" rel="noopener noreferrer"
                    aria-label={`${title}: ${value}, ${t('Zertifikat in der TÜV-SÜD-Datenbank ansehen', 'View the certificate in the TÜV SÜD database', 'Voir le certificat dans la base de données du TÜV SÜD')}`}
                    className="inline-flex items-center gap-1 min-h-11 text-[#4F6E34] hover:text-brand-dark font-mono text-xs uppercase tracking-wider">
                    {linkLabel ?? t('Zertifikat ansehen', 'View certificate', 'Voir le certificat')}
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
            </div>
        );
    }
    return (
        <div className="flex justify-between gap-4 py-4 border-b border-brand-dark/10">
            <dt className="font-mono text-xs uppercase tracking-widest text-brand-dark/60 pt-0.5">{title}</dt>
            <dd className="font-semibold text-right">{value}</dd>
        </div>
    );
};

export const DATENBLATT = 'grid grid-cols-1 md:grid-cols-2 md:gap-x-14 border-t-2 border-brand-dark';

// GS-Zeichen mit Text, wie die Kachel „Geprüfte Sicherheit“ auf der Startseite.
export const GsSiegel: React.FC<{ children: React.ReactNode; linkLabel: string }> = ({ children, linkLabel }) => {
    const t = useT();
    return (
        <div className="bg-white rounded-xl p-5 flex items-center gap-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <img src="/images/details/tuev-gs.png" alt={t("GS-Zeichen von TÜV SÜD", "GS mark from TÜV SÜD", "Marque GS du TÜV SÜD")} width="317" height="320" loading="lazy" className="h-24 w-auto shrink-0" />
            <div className="border-l-[1.5px] border-brand-dark pl-5 flex flex-col gap-2">
                <span className="font-mono text-[11px] tracking-[0.14em]">EN 14974</span>
                <p className="font-heading font-extrabold uppercase text-xl leading-tight [word-spacing:0.12em]">{children}</p>
                <a href={TUEV_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 min-h-11 text-[#4F6E34] hover:text-brand-dark font-mono text-xs uppercase tracking-wider">
                    {linkLabel} <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
            </div>
        </div>
    );
};
