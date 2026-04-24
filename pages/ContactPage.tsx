import React from 'react';
import { useSearchParams } from 'react-router-dom';
import PageShell from '../components/PageShell';

const PROJECT_TYPES = ['Skatepark', 'Pumptrack', 'Möblierung', 'Katalog', 'Beratung', 'Sonstiges'] as const;
type ProjectType = typeof PROJECT_TYPES[number];

const SUBJECT_BY_TYPE: Record<ProjectType, string> = {
    Skatepark: 'Projektanfrage Skate-Anlage',
    Pumptrack: 'Projektanfrage Pumptrack',
    Möblierung: 'Projektanfrage Möblierung',
    Katalog: 'Katalog-Anforderung',
    Beratung: 'Beratungsanfrage',
    Sonstiges: 'Projektanfrage',
};

const PROJECT_BODY = `Guten Tag,

ich möchte mit Ihnen ein Projekt besprechen.

Projekt / Anliegen:
[bitte kurz beschreiben]

Standort (Ort, PLZ):
Ungefähre Fläche / Umfang:
Budgetrahmen:
Gewünschter Zeithorizont:

Kontakt für Rückruf:
Name / Institution:
Telefon:
E-Mail:

Vielen Dank.`;

const CATALOG_BODY = `Guten Tag,

ich würde gerne Ihren Produktkatalog erhalten.

Interessiert mich besonders (z. B. Skate-Anlagen, Pumptrack, Möblierung):
[bitte ergänzen]

Versand an:
Name / Institution:
Adresse:
Telefon:
E-Mail:

Vielen Dank.`;

const buildMailto = (projectType: ProjectType): string => {
    const to = 'post@aplusurbandesign.com';
    const subject = SUBJECT_BY_TYPE[projectType];
    const body = projectType === 'Katalog' ? CATALOG_BODY : PROJECT_BODY;
    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const ContactPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const projectType: ProjectType = (() => {
        const p = searchParams.get('projectType');
        return p && (PROJECT_TYPES as readonly string[]).includes(p) ? (p as ProjectType) : 'Skatepark';
    })();

    const mailtoHref = buildMailto(projectType);

    return (
        <PageShell title="Kontakt & Anfrage" description="Projekt anfragen: Beratung, Planung und Umsetzung von Beton-Skateparks, Pumptracks und urbanen Anlagen. Jetzt Angebot anfordern.">
            <div className="relative w-full min-h-[80vh] flex flex-col justify-center">

                <div className="text-center mb-16 animate-fade-in-up">
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-heading uppercase tracking-tighter text-brand-dark leading-[0.85]">
                        Gemeinsam<br/><span className="text-brand-orange">Planen.</span>
                    </h1>
                    <p className="mt-8 text-xl text-brand-muted max-w-2xl mx-auto font-light">
                        Bereit für das nächste Projekt? Erzählen Sie uns von Ihrer Vision. <br/>
                        Wir liefern die passende Beton-Lösung.
                    </p>
                </div>

                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-24">

                    <div className="lg:col-span-5 order-2 lg:order-1 animate-fade-in-up [animation-delay:200ms]">
                        <div className="bg-white border border-brand-dark/10 p-8 md:p-12 h-full flex flex-col justify-between relative overflow-hidden group rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                             <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-orange/10 rounded-full blur-[80px] pointer-events-none"></div>

                            <div>
                                <h3 className="text-2xl font-bold text-brand-dark mb-8 border-b border-brand-dark/10 pb-4">Planungsbüro</h3>
                                <div className="space-y-8 font-light text-brand-muted">
                                    <div className="flex items-start gap-4">
                                        <span className="material-symbols-outlined text-brand-orange mt-1">location_on</span>
                                        <div>
                                            <p className="font-bold text-brand-dark">A+ Urban Design</p>
                                            <p>Dipl.-Ing. Cüneyit Akcakoca</p>
                                            <p className="text-sm">Freier Architekt</p>
                                            <p className="mt-2">Talstrasse 41</p>
                                            <p>70188 Stuttgart</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 group/link">
                                        <span className="material-symbols-outlined text-brand-orange group-hover/link:scale-110 transition-transform">call</span>
                                        <a href="tel:+4915560090966" className="hover:text-brand-dark transition-colors">+49 155 600 909 66</a>
                                    </div>
                                    <div className="flex items-center gap-4 group/link">
                                        <span className="material-symbols-outlined text-brand-orange group-hover/link:scale-110 transition-transform">mail</span>
                                        <a href="mailto:post@aplusurbandesign.com" className="hover:text-brand-dark transition-colors">post@aplusurbandesign.com</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 order-1 lg:order-2 animate-fade-in-up [animation-delay:400ms]">
                        <div className="bg-white p-8 md:p-12 border border-brand-dark/10 rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.06)] h-full flex flex-col justify-center">
                            <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md self-start">
                                Anfrage per E-Mail
                            </span>

                            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-brand-dark uppercase tracking-tight mb-6">
                                Ein Klick — und los geht&rsquo;s.
                            </h2>

                            <p className="text-brand-muted leading-relaxed mb-8">
                                Ihr E-Mail-Programm öffnet sich mit einer vorbereiteten Nachricht. Beschreiben Sie kurz Ihr Projekt und was Sie brauchen — wir melden uns innerhalb von 48 Stunden.
                            </p>

                            <a
                                href={mailtoHref}
                                className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-12 py-4 bg-brand-orange hover:bg-brand-dark text-white font-extrabold uppercase tracking-widest text-sm rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_20px_-10px_rgba(107,143,74,0.4)] group self-start"
                            >
                                Anfrage per E-Mail senden
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </a>

                            <p className="mt-6 text-xs text-brand-muted">
                                Funktioniert nicht? Schreiben Sie uns direkt an{' '}
                                <a href="mailto:post@aplusurbandesign.com" className="underline hover:text-brand-orange">post@aplusurbandesign.com</a>{' '}
                                oder rufen Sie an unter{' '}
                                <a href="tel:+4915560090966" className="underline hover:text-brand-orange">+49 155 600 909 66</a>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </PageShell>
    );
};

export default ContactPage;
