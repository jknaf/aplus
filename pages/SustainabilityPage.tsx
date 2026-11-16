import React, { useEffect } from 'react';
import PageShell from '../components/PageShell';
import Plankopf from '../components/Plankopf';
import Bild from '../components/Bild';
import { Link, useT } from '../i18n';

// Umweltaussagen nur konkret und prüfbar (UWG seit 27.09.2026): "Nachhaltigkeit" ist hier Thema,
// nie Produkteigenschaft. Keine CO2-Zahlen ohne EPD. Jede Tatsache steht einmal, in der Tabelle.

const CARD = 'bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]';
const LABEL = 'font-mono text-xs uppercase tracking-widest text-[#4F6E34] mb-4';

type T = ReturnType<typeof useT>;

const Foto: React.FC<{ src: string; alt: string; art: string; zusatz: string }> = ({ src, alt, art, zusatz }) => (
    <figure className="m-0">
        <img src={src} alt={alt} loading="lazy" className="w-full h-72 md:h-[360px] object-cover rounded-xl" />
        <figcaption className="mt-3 text-[15px]"><strong className="text-brand-dark">{art}</strong> <span className="text-brand-dark/75">· {zusatz}</span></figcaption>
    </figure>
);

const zeilen = (t: T): [string, string, React.ReactNode][] => [
    [t('Untergrund', 'Base', 'Support'),
     t('Bestehende Asphalt- oder Betonfläche mit Übergangsblechen, neue Fundamentplatte oder verdichtetes Schotterbett', 'Existing asphalt or concrete surface with transition plates, a new foundation slab or a compacted gravel bed', "Surface existante en asphalte ou en béton avec plaques de transition, nouvelle dalle de fondation ou lit de gravier compacté"),
     t('Aushub, Unterbau und Betonkörper über die ganze Anlage', 'Excavation, sub-base and concrete body across the whole park', "Terrassement, couche de fondation et corps en béton sur l'ensemble du parc")],
    [t('Neu befestigte Fläche', 'Newly paved area', 'Surface nouvellement revêtue'),
     t('Keine, wenn eine befestigte Fläche schon da ist', 'None, if a paved surface already exists', "Aucune, si une surface revêtue existe déjà"),
     t('Die gesamte Grundfläche der Anlage', 'The entire footprint of the park', "Toute l'emprise du parc")],
    [t('Bauzeit vor Ort', 'Time on site', 'Durée du chantier'),
     t('Wenige Tage, kaum wetterabhängig', 'A few days, hardly affected by weather', 'Quelques jours, peu dépendant de la météo'),
     t('Mehrere Wochen, abhängig von Wetter und Aushärtung', 'Several weeks, depending on weather and curing', 'Plusieurs semaines, selon la météo et le durcissement')],
    [t('Qualitätskontrolle', 'Quality control', 'Contrôle qualité'),
     t('Im Werk, in Stahlschalung, TÜV-überwacht (DIN EN 14974)', 'At the factory, in steel formwork, monitored by TÜV (EN 14974)', "En usine, dans des coffrages en acier, sous surveillance TÜV (EN 14974)"),
     t('Auf der Baustelle, abhängig von Team und Witterung', 'On site, depending on the crew and the weather', 'Sur le chantier, selon l’équipe et la météo')],
    [t('Haltbarkeit', 'Durability', 'Durabilité'),
     t('Erste Elemente seit über 25 Jahren in Betrieb, ohne Sanierung; Kantenprofile eingegossen', 'First elements in use for more than 25 years without refurbishment; edge profiles cast in', "Premiers éléments en service depuis plus de 25 ans sans rénovation ; profilés d'arête scellés"),
     t('Lang, wenn gut ausgeführt; Schäden werden vor Ort saniert', 'Long, if well built; damage is repaired on site', "Longue si l'exécution est bonne ; les dégâts sont réparés sur place")],
    [t('Später umbauen', 'Changing it later', 'Modifier plus tard'),
     t('Module umstellen, ergänzen oder einzeln tauschen', 'Rearrange, add or replace individual modules', 'Réagencer, compléter ou remplacer les modules un par un'),
     t('Nur durch Abbruch und Neubau des betroffenen Teils', 'Only by demolishing and rebuilding the affected part', 'Uniquement en démolissant et reconstruisant la partie concernée')],
    [t('Standortwechsel', 'Moving the park', 'Changement de site'),
     t('Möglich, mit Kran oder Stapler', 'Possible, with a crane or forklift', 'Possible, à la grue ou au chariot élévateur'),
     t('Nicht möglich', 'Not possible', 'Impossible')],
    [t('Am Ende der Nutzung', 'End of use', "Fin d'utilisation"),
     t('Elemente werden an anderer Stelle weiter genutzt; sonst Beton und Stahl getrennt als Recycling-Baustoff aufbereitet', 'Elements are reused elsewhere; otherwise concrete and steel are separated and processed as recycled building material', "Les éléments sont réutilisés ailleurs ; sinon, béton et acier sont séparés et recyclés comme matériaux de construction"),
     t('Abbruch; der Betonbruch wird meist als Recyclingmaterial aufbereitet', 'Demolition; the broken concrete is usually processed as recycled material', 'Démolition ; les gravats de béton sont généralement recyclés')],
    [t('Freie Form', 'Free form', 'Forme libre'),
     t('Aus einem Baukasten geprüfter Module, fast beliebig kombinierbar', 'From a kit of tested modules that can be combined almost freely', 'À partir d’un ensemble de modules testés, combinables presque à volonté'),
     <><strong className="text-brand-dark">{t('Vorteil Ortbeton:', 'Advantage of in-situ concrete:', 'Avantage du béton coulé en place :')}</strong> {t('jede Form möglich, fugenlose Übergänge', 'any shape possible, seamless transitions', 'toutes les formes possibles, transitions sans joint')}</>],
    [t('Kosten', 'Cost', 'Coûts'),
     t('Planbar je Modul; keine Erdarbeiten auf Bestandsflächen', 'Predictable per module; no earthworks on existing surfaces', 'Prévisibles par module ; pas de terrassement sur les surfaces existantes'),
     t('Hängen stark von Gelände und Form ab; bei großen, einfachen Flächen oft günstig', 'Depend heavily on the site and the shape; often economical for large, simple areas', 'Dépendent fortement du terrain et de la forme ; souvent avantageux pour de grandes surfaces simples')],
];

const SustainabilityPage: React.FC = () => {
    const t = useT();
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const faq: [string, string][] = [
        [t('Und auf der grünen Wiese?', 'And on a greenfield site?', 'Et sur un terrain vierge ?'),
         t('Dort braucht auch der Modulbau eine befestigte Rollfläche. Der Unterschied liegt dann vor allem bei Umbau und Rückbau. Einzelne Pipes kommen mit einem verdichteten Schotterbett aus.',
           'There, modular construction also needs a paved riding surface. The difference then lies mainly in alteration and removal. Individual pipes only need a compacted gravel bed.',
           "Là, la construction modulaire a aussi besoin d'une surface de roulement revêtue. La différence porte alors surtout sur la transformation et le démontage. Une mini-rampe isolée se contente d'un lit de gravier compacté.")],
        [t('Lassen sich anbetonierte Elemente auch versetzen?', 'Can elements that were concreted in also be moved?', 'Les éléments scellés au béton peuvent-ils aussi être déplacés ?'),
         t('Ja, der Abbau ist aber aufwendiger als bei Elementen, die nur auf der Fläche stehen. Wer einen späteren Umzug plant, wählt besser die Montage mit Übergangsblechen.',
           'Yes, but removal takes more work than for elements that simply stand on the surface. If you expect to move the park later, choose installation with transition plates.',
           "Oui, mais le démontage demande plus de travail que pour des éléments simplement posés. Si un déménagement est prévu, mieux vaut choisir le montage avec plaques de transition.")],
    ];

    const schema = {
        '@context': 'https://schema.org',
        '@graph': [
            { '@type': 'FAQPage', mainEntity: faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
            { '@type': 'BreadcrumbList', itemListElement: [
                { '@type': 'ListItem', position: 1, name: t('Über uns', 'About us', 'À propos'), item: 'https://www.aplusurbandesign.com/ueber-uns' },
                { '@type': 'ListItem', position: 2, name: t('Nachhaltigkeit', 'Sustainability', 'Durabilité') },
            ] },
        ],
    };

    const fall = (titel: string, text: string) => (
        <div key={titel} className="bg-brand-dark text-white rounded-xl p-8">
            <h3 className="font-heading font-extrabold uppercase text-lg mb-3">{titel}</h3>
            <p className="text-base leading-relaxed text-white/85">{text}</p>
        </div>
    );

    return (
        <PageShell
            title={t('Skatepark aus Fertigteilen oder Ortbeton? Vergleich', 'Precast or In-Situ Concrete Skatepark? A Comparison', 'Skatepark préfabriqué ou coulé en place ? Comparatif')}
            description={t('Modulare Skate-Elemente oder Ortbeton: Fundament, Versiegelung, Umbau und Rückbau im sachlichen Vergleich. Mit Antworten für Kommunen und Planer.',
                'Modular skate elements or in-situ concrete: foundations, sealed surfaces, alteration and removal compared. With answers for municipalities and planners.',
                "Éléments de skate modulaires ou béton coulé en place : fondations, imperméabilisation, transformation et démontage comparés. Avec des réponses pour les collectivités et les planificateurs.")}
            schema={schema}
            ogImage="/images/ueber-uns/anlage-luftbild-01.jpg"
        >
            {/* HERO */}
            <div className="relative w-full min-h-[560px] -mt-16 mb-28 flex flex-col justify-end overflow-hidden bg-brand-dark">
                <Bild hoch src="/images/ueber-uns/anlage-luftbild-01.jpg"
                    alt={t('Luftbild einer Skateanlage aus modularen Betonelementen auf einer Asphaltfläche', 'Aerial view of a skatepark made of modular concrete elements on an asphalt surface', "Vue aérienne d'un skatepark en éléments modulaires en béton sur une surface en asphalte")}
                    className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/20"></div>
                <div className="relative z-10 container mx-auto px-4 pt-32 pb-14">
                    <nav aria-label={t('Brotkrumen', 'Breadcrumb', "Fil d'Ariane")} className="font-mono text-xs uppercase tracking-widest text-white/85 mb-6">
                        <Link to="/ueber-uns" className="hover:text-white underline-offset-4 hover:underline">{t('Über uns', 'About us', 'À propos')}</Link> / {t('Nachhaltigkeit', 'Sustainability', 'Durabilité')}
                    </nav>
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold font-heading uppercase [word-spacing:0.12em] text-white leading-none mb-6">
                        {t(<>Fertigteil oder Ortbeton<br /><span className="text-[#A9C98A]">im Vergleich</span></>,
                           <>Precast or in-situ<br /><span className="text-[#A9C98A]">compared</span></>,
                           <>Préfabriqué ou coulé en place<br /><span className="text-[#A9C98A]">comparés</span></>)}
                    </h1>
                    <p className="text-xl leading-relaxed text-white/90 max-w-2xl mb-10">
                        {t('Ein Skatepark steht oft 25 Jahre und länger. In dieser Zeit ändert sich vieles: der Bebauungsplan, der Bedarf, die Fahrer. Hier zeigen wir, was die Bauweise mit Fertigteilen über diese Zeit für Fläche, Material und Haushalt bedeutet. Und wo Ortbeton im Vorteil ist.',
                           'A skatepark often stays in place for 25 years or more. Much changes over that time: the land-use plan, demand, the riders. Here we show what building with precast elements means over that time for the site, the material and the budget. And where in-situ concrete has the edge.',
                           "Un skatepark reste souvent en place 25 ans ou plus. Pendant ce temps, beaucoup de choses changent : le plan d'urbanisme, les besoins, les riders. Nous montrons ici ce que la construction en éléments préfabriqués signifie sur cette durée pour le site, les matériaux et le budget. Et où le béton coulé en place a l'avantage.")}
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <a href="#vergleich" className="inline-flex items-center min-h-[52px] px-8 rounded-lg bg-brand-orange hover:bg-white hover:text-brand-dark text-white font-extrabold uppercase tracking-wider text-sm transition-colors">{t('Zum Vergleich', 'See the comparison', 'Voir le comparatif')}</a>
                        <Link to="/kontakt?projectType=Skatepark" className="inline-flex items-center min-h-[52px] px-8 rounded-lg border-2 border-white text-white hover:bg-white hover:text-brand-dark font-extrabold uppercase tracking-wider text-sm transition-colors">{t('Beratung anfragen', 'Request advice', 'Demander conseil')}</Link>
                    </div>
                </div>
            </div>

            {/* 01 BILDER: zeigen, die Tabelle erklärt */}
            <div className="container mx-auto px-4 mb-28">
                <Plankopf label={t('Baustelle und Rückbau', 'Construction and removal', 'Chantier et démontage')} rechts="01" className="mb-12">
                    {t(<>Am Anfang und <span className="text-brand-orange">am Ende</span></>, <>At the start and <span className="text-brand-orange">at the end</span></>, <>Au début et <span className="text-brand-orange">à la fin</span></>)}
                </Plankopf>
                <div className={LABEL}>{t('Bau', 'Construction', 'Construction')}</div>
                <div className="grid md:grid-cols-2 gap-5 mb-12">
                    <Foto src="/images/nachhaltigkeit/ortbeton-baustelle-ki.jpg" art={t('Ortbeton', 'In-situ concrete', 'Béton coulé en place')} zusatz={t('Illustration (KI)', 'Illustration (AI)', 'Illustration (IA)')}
                        alt={t('Baustelle einer Skateanlage aus Ortbeton mit Aushub, Bewehrung, Schalung und Betonpumpe', 'Construction site of an in-situ concrete skatepark with excavation, reinforcement, formwork and a concrete pump', "Chantier d'un skatepark coulé en place avec terrassement, armatures, coffrages et pompe à béton")} />
                    <Foto src="/images/montage/aufbau-04.jpg" art={t('A+ Fertigteile', 'A+ precast elements', 'Éléments préfabriqués A+')} zusatz={t('Aufbau einer Pipe', 'Installing a pipe', "Montage d'une mini-rampe")}
                        alt={t('Aufbau einer Halfpipe aus Betonelementen auf einer Asphaltfläche', 'Installing a half-pipe made of concrete elements on an asphalt surface', "Montage d'un half-pipe en éléments de béton sur une surface en asphalte")} />
                </div>
                <div className={LABEL}>{t('Rückbau', 'Removal', 'Démontage')}</div>
                <div className="grid md:grid-cols-2 gap-5">
                    <Foto src="/images/nachhaltigkeit/ortbeton-abbruch-ki.jpg" art={t('Ortbeton', 'In-situ concrete', 'Béton coulé en place')} zusatz={t('Illustration (KI)', 'Illustration (AI)', 'Illustration (IA)')}
                        alt={t('Bagger mit Hydraulikhammer bricht einen Skate-Bowl aus Ortbeton ab', 'Excavator with a hydraulic breaker demolishing an in-situ concrete skate bowl', "Pelleteuse avec brise-roche hydraulique démolissant un bowl en béton coulé en place")} />
                    <Foto src="/images/montage/abladen-02.jpg" art={t('A+ Fertigteile', 'A+ precast elements', 'Éléments préfabriqués A+')} zusatz={t('Element wird abgehoben', 'Element being lifted', "Élément soulevé")}
                        alt={t('Gabelstapler hebt ein Betonelement an', 'Forklift lifting a concrete element', 'Chariot élévateur soulevant un élément en béton')} />
                </div>
            </div>

            {/* 02 TABELLE: einzige Stelle mit den Fakten */}
            <div id="vergleich" className="container mx-auto px-4 mb-28 scroll-mt-24">
                <Plankopf label={t('Vergleich der Bauweisen', 'Construction methods compared', 'Modes de construction comparés')} rechts="02" className="mb-12"
                    text={t('Beide Bauweisen haben ihre Stärken. Welche zu Ihrer Fläche passt, hängt vor allem davon ab, wie lange die Fläche so bleiben soll.',
                        'Both methods have their strengths. Which one suits your site depends mainly on how long the site is meant to stay as it is.',
                        "Les deux modes de construction ont leurs atouts. Le bon choix dépend surtout de la durée pendant laquelle le site doit rester tel quel.")}>
                    {t(<>Modul und Ortbeton <span className="text-brand-orange">Punkt für Punkt</span></>, <>Modular and in-situ <span className="text-brand-orange">point by point</span></>, <>Modulaire et coulé en place <span className="text-brand-orange">point par point</span></>)}
                </Plankopf>
                <div className={`${CARD} overflow-x-auto`}>
                    <table className="w-full min-w-[760px] border-collapse text-base">
                        <caption className="sr-only">{t('Vergleich modulare Betonfertigteile und Ortbeton für Skateanlagen', 'Comparison of modular precast concrete and in-situ concrete for skateparks', 'Comparaison entre éléments préfabriqués modulaires et béton coulé en place pour skateparks')}</caption>
                        <thead>
                            <tr className="bg-brand-dark text-white text-left">
                                <th scope="col" className="px-6 py-4 w-[22%] font-mono text-xs uppercase tracking-widest font-medium">{t('Kriterium', 'Criterion', 'Critère')}</th>
                                <th scope="col" className="px-6 py-4 w-[39%] bg-[#4F6E34] font-heading font-extrabold uppercase text-[15px]">{t('A+ Fertigteile', 'A+ precast elements', 'Éléments préfabriqués A+')}</th>
                                <th scope="col" className="px-6 py-4 w-[39%] font-heading font-extrabold uppercase text-[15px]">{t('Ortbeton', 'In-situ concrete', 'Béton coulé en place')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {zeilen(t).map(([k, a, o], i) => (
                                <tr key={k} className={`border-b border-brand-surface last:border-0 ${i % 2 ? 'bg-[#FAF9F6]' : ''}`}>
                                    <th scope="row" className="px-6 py-4 text-left font-semibold text-brand-dark align-top">{k}</th>
                                    <td className="px-6 py-4 text-brand-dark/85 align-top">{a}</td>
                                    <td className="px-6 py-4 text-brand-dark/85 align-top">{o}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <p className="mt-4 text-sm text-brand-dark/75">{t('Vergleich der Bauweisen im Allgemeinen. Was für Ihre Fläche gilt, klären wir in der Planung.', 'A general comparison of the two methods. What applies to your site is clarified during design.', "Comparaison générale des deux modes de construction. Ce qui s'applique à votre site est précisé lors de la conception.")}</p>
            </div>

            {/* 03 FÄLLE: Anwendung, keine Wiederholung der Tabelle */}
            <div className="container mx-auto px-4 mb-28">
                <Plankopf label={t('Typische Fälle', 'Typical cases', 'Cas typiques')} rechts="03" className="mb-12">
                    {t(<>Wann sich <span className="text-brand-orange">Modulbau lohnt</span></>, <>When modular <span className="text-brand-orange">pays off</span></>, <>Quand le modulaire <span className="text-brand-orange">s'impose</span></>)}
                </Plankopf>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {fall(t('Fläche mit offener Zukunft', 'A site with an open future', 'Un site à l’avenir ouvert'), t('Ein Parkplatz, Schulhof oder Baufeld wird für einige Jahre genutzt, bis dort etwas anderes entsteht.', 'A car park, schoolyard or building plot is used for a few years until something else is built there.', "Un parking, une cour d'école ou un terrain à bâtir est utilisé quelques années avant d'accueillir autre chose."))}
                    {fall(t('Ausbau in Stufen', 'Building in stages', 'Extension par étapes'), t('Die Gemeinde startet mit wenigen Elementen und ergänzt, wenn neue Mittel da sind.', 'The municipality starts with a few elements and adds more when new funds are available.', 'La commune commence avec quelques éléments et complète quand de nouveaux crédits sont disponibles.'))}
                    {fall(t('Alter Bolzplatz', 'Old ball court', 'Ancien terrain de foot'), t('Eine Asphaltfläche, die kaum noch jemand nutzt, wird zum Skatepark.', 'An asphalt area that hardly anyone uses any more becomes a skatepark.', "Une surface en asphalte que presque personne n'utilise plus devient un skatepark."))}
                    {fall(t('Sommer am Strand', 'Summer on the beach', "L'été à la plage"), t('Eine Pipe steht für die Saison an der Promenade und geht im Herbst ins Lager.', 'A pipe stands on the promenade for the season and goes into storage in autumn.', "Une mini-rampe reste sur la promenade pendant la saison et rejoint l'entrepôt à l'automne."))}
                </div>
            </div>

            {/* OFFEN GESAGT */}
            <div className="container mx-auto px-4 mb-28">
                <div className="flex flex-wrap bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                    <div className="basis-full lg:basis-3/5 p-8 md:p-12">
                        <div className={LABEL}>{t('Offen gesagt', 'To be clear', 'Pour être clair')}</div>
                        <h2 className="font-heading font-extrabold uppercase text-3xl md:text-4xl leading-tight text-brand-dark mb-5">{t('Beton bleibt Beton', 'Concrete is still concrete', 'Le béton reste du béton')}</h2>
                        <p className="text-lg leading-relaxed text-brand-dark/80 mb-4">{t('Zement verursacht bei der Herstellung CO₂, auch für unsere Elemente. Daran ändert die Bauweise nichts. Was sie ändert: wie oft gebaut, abgerissen und neu gebaut werden muss.', 'Making cement emits CO₂, for our elements too. The construction method does not change that. What it changes is how often something has to be built, demolished and built again.', "La fabrication du ciment émet du CO₂, y compris pour nos éléments. Le mode de construction n'y change rien. Ce qu'il change, c'est la fréquence à laquelle il faut construire, démolir et reconstruire.")}</p>
                        <p className="text-lg leading-relaxed text-brand-dark/80">{t('Eine Ökobilanz (EPD) für unsere Elemente liegt noch nicht vor. Deshalb nennen wir keine CO₂-Werte und tragen kein Umweltsiegel.', 'There is no life-cycle assessment (EPD) for our elements yet. That is why we do not state CO₂ figures or carry an environmental label.', "Il n'existe pas encore d'analyse de cycle de vie (EPD) pour nos éléments. C'est pourquoi nous n'indiquons pas de valeurs de CO₂ et n'affichons pas de label environnemental.")}</p>
                    </div>
                    <div className="basis-full lg:basis-2/5 p-8 md:p-10 bg-brand-surface flex flex-col justify-center gap-4">
                        <img src="/images/skate-elemente/skate-module-beton-04.jpg" alt={t('Fertige Skate-Module aus Beton im Lager', 'Finished concrete skate modules in storage', 'Modules de skate en béton finis, en stock')} loading="lazy" className="w-full h-56 object-cover rounded-lg" />
                        <p className="text-[15px] leading-relaxed text-brand-dark/85">{t('Module im Lager: Was eine Anlage verlässt, wird in der nächsten wieder eingesetzt.', 'Modules in storage: what leaves one park is used again in the next.', "Modules en stock : ce qui quitte un parc est réutilisé dans le suivant.")}</p>
                    </div>
                </div>
            </div>

            {/* 04 FAQ: nur Fragen, die oben nicht beantwortet sind */}
            <div className="container mx-auto px-4 mb-28">
                <Plankopf label={t('Häufige Fragen', 'Frequently asked questions', 'Questions fréquentes')} rechts="04" klein className="mb-10">
                    {t(<>Noch <span className="text-brand-orange">offen?</span></>, <>Still <span className="text-brand-orange">unsure?</span></>, <>Encore des <span className="text-brand-orange">questions ?</span></>)}
                </Plankopf>
                <div className="flex flex-col gap-3 max-w-4xl">
                    {faq.map(([q, a], i) => (
                        <details key={q} open={i === 0} className="group bg-white rounded-xl px-7 py-5">
                            <summary className="list-none [&::-webkit-details-marker]:hidden cursor-pointer min-h-[44px] flex items-center justify-between gap-4 font-heading font-extrabold text-lg text-brand-dark">
                                {q}
                                <span className="material-symbols-outlined text-brand-dark/60 transition-transform group-open:rotate-180" aria-hidden="true">expand_more</span>
                            </summary>
                            <p className="mt-3 leading-relaxed text-brand-dark/80">{a}</p>
                        </details>
                    ))}
                </div>
            </div>

            {/* CTA + WEITERLESEN */}
            <div className="container mx-auto px-4 mb-28">
                <div className="flex flex-wrap gap-10 bg-brand-dark text-white rounded-2xl p-8 md:p-12">
                    <div className="flex-[1_1_420px]">
                        <h2 className="font-heading font-extrabold uppercase text-3xl md:text-4xl leading-tight mb-4">{t(<>Ihre Fläche, <span className="text-[#A9C98A]">unsere Planung</span></>, <>Your site, <span className="text-[#A9C98A]">our design</span></>, <>Votre site, <span className="text-[#A9C98A]">notre conception</span></>)}</h2>
                        <p className="text-lg leading-relaxed text-white/85 mb-6">{t('Schicken Sie uns Lageplan oder Foto. Wir sagen Ihnen, welche Aufbauvariante passt.', 'Send us a site plan or a photo. We will tell you which installation option fits.', "Envoyez-nous un plan de situation ou une photo. Nous vous dirons quelle variante de montage convient.")}</p>
                        <Link to="/kontakt?projectType=Skatepark" className="inline-flex items-center gap-2 min-h-[52px] px-8 rounded-lg bg-brand-orange hover:bg-white hover:text-brand-dark text-white font-extrabold uppercase tracking-wider text-sm transition-colors">
                            {t('Projekt anfragen', 'Enquire about a project', 'Demander un projet')}
                            <span className="material-symbols-outlined text-lg" aria-hidden="true">arrow_forward</span>
                        </Link>
                    </div>
                    <nav aria-label={t('Weiterlesen', 'Read more', 'Pour aller plus loin')} className="flex-[1_1_300px] flex flex-col">
                        <div className="font-mono text-xs uppercase tracking-widest text-white/75 mb-3">{t('Weiterlesen', 'Read more', 'Pour aller plus loin')}</div>
                        {([
                            ['/produkte/skate-anlagen', t('Skate-Anlagen aus Fertigteilen', 'Precast skateparks', 'Skateparks préfabriqués')],
                            ['/planung', t('Aufbauvarianten und Planung', 'Installation options and design', 'Variantes de montage et conception')],
                            ['/produkte/skate-pipes-beton', t('Skate-Pipes auf Schotterbett', 'Skate pipes on a gravel bed', 'Mini-rampes sur lit de gravier')],
                            ['/konfigurator', t('Skatepark im Planer entwerfen', 'Design a skatepark in the planner', 'Concevoir un skatepark dans le configurateur')],
                            ['/ueber-uns', t('Über A+ Urban Design', 'About A+ Urban Design', "À propos d'A+ Urban Design")],
                        ] as const).map(([href, label]) => (
                            <Link key={href} to={href} className="min-h-[44px] flex items-center border-b border-white/20 last:border-0 font-semibold text-white hover:text-[#A9C98A] transition-colors">{label}</Link>
                        ))}
                    </nav>
                </div>
            </div>
        </PageShell>
    );
};

export default SustainabilityPage;
