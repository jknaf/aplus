import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLang, useT, type Lang } from '../i18n';
import PageShell from '../components/PageShell';

const PROJECT_TYPES = ['Skatepark', 'Pumptrack', 'Möblierung', 'Katalog', 'Beratung', 'Sonstiges'] as const;
type ProjectType = typeof PROJECT_TYPES[number];

const SUBJECT_BY_TYPE: Record<Lang, Record<ProjectType, string>> = {
    de: {
        Skatepark: 'Projektanfrage Skate-Anlage',
        Pumptrack: 'Projektanfrage Pumptrack',
        Möblierung: 'Projektanfrage Möblierung',
        Katalog: 'Katalog-Anforderung',
        Beratung: 'Beratungsanfrage',
        Sonstiges: 'Projektanfrage',
    },
    en: {
        Skatepark: 'Project enquiry: skatepark',
        Pumptrack: 'Project enquiry: pump track',
        Möblierung: 'Project enquiry: street furniture',
        Katalog: 'Catalogue request',
        Beratung: 'Request for advice',
        Sonstiges: 'Project enquiry',
    },
    fr: {
        Skatepark: 'Demande de projet : skatepark',
        Pumptrack: 'Demande de projet : pumptrack',
        Möblierung: 'Demande de projet : mobilier urbain',
        Katalog: 'Demande de catalogue',
        Beratung: 'Demande de conseil',
        Sonstiges: 'Demande de projet',
    },
};

const PROJECT_BODY: Record<Lang, string> = {
    de: `Guten Tag,
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
Vielen Dank.`,
    en: `Hello,
I would like to discuss a project with you.
Project / request:
[please describe briefly]
Location (town, postcode):
Approximate area / scope:
Budget range:
Desired timeframe:
Contact for a call back:
Name / organisation:
Phone:
Email:
Thank you.`,
    fr: `Bonjour,
Je souhaite discuter d'un projet avec vous.
Projet / demande :
[à décrire brièvement]
Lieu (ville, code postal) :
Surface / ampleur approximative :
Budget :
Échéance souhaitée :
Contact pour un rappel :
Nom / organisation :
Téléphone :
E-mail :
Merci.`,
};

const CATALOG_BODY: Record<Lang, string> = {
    de: `Guten Tag,
ich würde gerne Ihren Produktkatalog erhalten.
Besonders interessiert mich (z. B. Skate-Anlagen, Pumptracks, Möblierung):
[bitte ergänzen]
Versand an:
Name / Institution:
Adresse:
Telefon:
E-Mail:
Vielen Dank.`,
    en: `Hello,
I would like to receive your product catalogue.
I am particularly interested in (e.g. skateparks, pump tracks, street furniture):
[please add]
Send to:
Name / organisation:
Address:
Phone:
Email:
Thank you.`,
    fr: `Bonjour,
Je souhaiterais recevoir votre catalogue de produits.
Je m'intéresse en particulier à (par ex. skateparks, pumptracks, mobilier urbain) :
[à compléter]
Envoi à :
Nom / organisation :
Adresse :
Téléphone :
E-mail :
Merci.`,
};

const buildMailto = (lang: Lang, projectType: ProjectType): string => {
    const to = 'post@aplusurbandesign.com';
    const subject = SUBJECT_BY_TYPE[lang][projectType];
    const body = projectType === 'Katalog' ? CATALOG_BODY[lang] : PROJECT_BODY[lang];
    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

const ContactPage: React.FC = () => {
    const t = useT();
    const lang = useLang();
    const [searchParams] = useSearchParams();
    const projectType: ProjectType = (() => {
        const p = searchParams.get('projectType');
        return p && (PROJECT_TYPES as readonly string[]).includes(p) ? (p as ProjectType) : 'Skatepark';
    })();

    const mailtoHref = buildMailto(lang, projectType);

    return (
        <PageShell title={t("Kontakt & Anfrage", "Contact & Enquiries", "Contact et demandes")} description={t("Projekt anfragen: Beratung, Planung und Umsetzung von Beton-Skateparks, Pumptracks und urbanen Anlagen. Jetzt Angebot anfordern.", "Enquire about a project: advice, design and delivery of concrete skateparks, pump tracks and urban facilities. Request a quote now.", "Demander un projet : conseil, conception et réalisation de skateparks en béton, de pumptracks et d'équipements urbains. Demandez votre offre dès maintenant.")}>
            <div className="relative w-full min-h-[80vh] flex flex-col justify-center">

                <div className="text-center mb-16 animate-fade-in-up">
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-heading uppercase tracking-tighter text-brand-dark leading-[0.85]">
                        {t(<>Gemeinsam<br/><span className="text-brand-orange">planen</span></>, <>Plan it<br/><span className="text-brand-orange">together</span></>, <>Concevons<br/><span className="text-brand-orange">ensemble</span></>)}
                    </h1>
                    <p className="mt-8 text-xl text-brand-muted max-w-2xl mx-auto font-light">
                        {t("Sie planen eine Anlage? Beschreiben Sie uns kurz Fläche und Vorhaben.", "Planning a facility? Briefly describe the site and your plans.", "Vous prévoyez une installation ? Décrivez-nous brièvement le terrain et votre projet.")} <br/>
                        {t("Wir machen Ihnen einen Vorschlag.", "We will make you a proposal.", "Nous vous ferons une proposition.")}
                    </p>
                </div>

                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mb-24">

                    <div className="lg:col-span-5 order-2 lg:order-1 animate-fade-in-up [animation-delay:200ms]">
                        <div className="bg-white border border-brand-dark/10 p-8 md:p-12 h-full flex flex-col justify-between relative overflow-hidden group rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                             <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-brand-orange/10 rounded-full blur-[80px] pointer-events-none"></div>

                            <div>
                                <h3 className="text-2xl font-bold text-brand-dark mb-8 border-b border-brand-dark/10 pb-4">{t("Planungsbüro", "Design office", "Bureau d'études")}</h3>
                                <div className="space-y-8 font-light text-brand-muted">
                                    <div className="flex items-start gap-4">
                                        <span className="material-symbols-outlined text-brand-orange mt-1">location_on</span>
                                        <div>
                                            <p className="font-bold text-brand-dark">A+ Urban Design</p>
                                            <p>Dipl.-Ing. Cüneyit Akcakoca</p>
                                            <p className="text-sm">{t("Freier Architekt", "Independent architect", "Architecte indépendant")}</p>
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
                                {t("Anfrage per E-Mail", "Enquiry by email", "Demande par e-mail")}
                            </span>

                            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-brand-dark uppercase tracking-tight mb-6">
                                {t("Ein Klick und los geht&rsquo;s", "One click and you&rsquo;re off", "Un clic et c&rsquo;est parti")}
                            </h2>

                            <p className="text-brand-muted leading-relaxed mb-8">
                                {t("Ihr E-Mail-Programm öffnet sich mit einer vorbereiteten Nachricht. Beschreiben Sie kurz Ihr Projekt und was Sie brauchen. Wir melden uns innerhalb von 48 Stunden.", "Your email program opens with a prepared message. Briefly describe your project and what you need. We will get back to you within 48 hours.", "Votre messagerie s'ouvre avec un message prérempli. Décrivez brièvement votre projet et vos besoins. Nous vous répondons sous 48 heures.")}
                            </p>

                            <a
                                href={mailtoHref}
                                className="inline-flex items-center justify-center gap-2 w-full md:w-auto px-12 py-4 bg-brand-orange hover:bg-brand-dark text-white font-extrabold uppercase tracking-widest text-sm rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_20px_-10px_rgba(107,143,74,0.4)] group self-start"
                            >
                                {t("Anfrage per E-Mail senden", "Send your enquiry by email", "Envoyer la demande par e-mail")}
                                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </a>

                            <p className="mt-6 text-xs text-brand-muted">
                                {t("Funktioniert nicht? Schreiben Sie uns direkt an", "Not working? Write to us directly at", "Ça ne fonctionne pas ? Écrivez-nous directement à")}{' '}
                                <a href="mailto:post@aplusurbandesign.com" className="underline hover:text-brand-orange">post@aplusurbandesign.com</a>{' '}
                                {t("oder rufen Sie an unter", "or call us on", "ou appelez-nous au")}{' '}
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
