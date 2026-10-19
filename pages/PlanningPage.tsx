import React from 'react';
import { Link, useT } from '../i18n';
import PageShell from '../components/PageShell';
import BrochureRequestForm from '../components/BrochureRequestForm';
import { useKonfiguratorCode } from '../components/katalog/CodeDialog';
import Bild from '../components/Bild';
import Plankopf from '../components/Plankopf';

const LABEL = 'font-mono text-xs uppercase tracking-widest text-[#4F6E34] mb-4';
const CARD = 'bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]';
const BTN = 'inline-flex items-center justify-center gap-2 min-h-12 px-7 rounded-md font-heading font-bold text-sm uppercase tracking-widest transition-colors';

// Scan-Linie über der technischen Zeichnung, Marker pulsieren
const BlueprintVisualizer: React.FC = () => {
  const t = useT();
    return (
        <div className="relative w-full aspect-[16/9] bg-[#1F2622] rounded-xl overflow-hidden border border-white/10">
            <img
                src="/images/planung/skate-anlage-planung-01.jpg"
                alt={t("Technische Zeichnung Skatepark", "Technical drawing of a skatepark", "Plan technique d'un skatepark")}
                className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-35"
            />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            <div className="absolute top-0 bottom-0 w-[2px] bg-[#8DB562] shadow-[0_0_20px_rgba(141,181,98,0.9)] pointer-events-none planung-scan"></div>

            <div className="absolute top-1/4 left-[22%] planung-puls">
                <div className="w-3 h-3 bg-[#8DB562] rounded-full"></div>
                <div className="absolute top-0 left-[18px] bg-black/80 px-2 py-1 border border-[#8DB562]/60 rounded font-mono text-[11px] text-[#B9D39A] whitespace-nowrap">
                    {t("DIN EN 14974", "EN 14974", "EN 14974")}
                </div>
            </div>
            <div className="absolute bottom-1/3 right-[38%] planung-puls planung-puls-spaet">
                <div className="w-3 h-3 bg-[#8DB562] rounded-full"></div>
                <div className="absolute top-0 left-[18px] bg-black/80 px-2 py-1 border border-[#8DB562]/60 rounded font-mono text-[11px] text-[#B9D39A] whitespace-nowrap">
                    RADIUS CHECK
                </div>
            </div>
        </div>
    );
};

// Animationen der Seite: Scan, Marker, Überblendung der Planer-Bilder
const ANIMATION = `
@keyframes planung-scan { 0% { left: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { left: 100%; opacity: 0; } }
@keyframes planung-puls { 0%, 100% { opacity: 1; } 50% { opacity: .35; } }
@keyframes planung-wechsel { 0% { opacity: 1; } 28% { opacity: 1; } 33.3% { opacity: 0; } 95% { opacity: 0; } 100% { opacity: 1; } }
.planung-scan { animation: planung-scan 4s ease-in-out infinite; }
.planung-puls { animation: planung-puls 3s infinite; }
.planung-puls-spaet { animation-delay: 1s; }
.planung-wechsel { opacity: 0; animation: planung-wechsel 12s infinite; }
.planung-wechsel:nth-child(2) { animation-delay: 4s; }
.planung-wechsel:nth-child(3) { animation-delay: 8s; }
@media (prefers-reduced-motion: reduce) {
  .planung-scan, .planung-puls, .planung-wechsel { animation: none; }
  .planung-wechsel:first-child { opacity: 1; }
}
`;

const Schritt: React.FC<{ nr: string; titel: string; text: string; dunkel?: boolean }> = ({ nr, titel, text, dunkel }) => (
    <div className="flex-1 pt-7 pr-8">
        <div className={`w-3.5 h-3.5 rounded-full -mt-[37px] mb-5 ${dunkel ? 'bg-brand-dark' : 'bg-brand-orange'}`}></div>
        <div className="font-heading font-extrabold text-5xl leading-none text-brand-orange/40">{nr}</div>
        <h3 className="mt-4 mb-2.5 font-heading font-extrabold uppercase text-xl text-brand-dark">{titel}</h3>
        <p className="leading-relaxed text-brand-dark/75">{text}</p>
    </div>
);

const Vorteil: React.FC<{ titel: string; text: string }> = ({ titel, text }) => (
    <div>
        <h3 className="font-heading font-extrabold uppercase text-[15px] text-[#B9D39A] mb-2">{titel}</h3>
        <p className="text-[15px] leading-relaxed text-white/85">{text}</p>
    </div>
);

const Variante: React.FC<{ nr: string; titel: string; text: string }> = ({ nr, titel, text }) => (
    <div className={`${CARD} p-8`}>
        <div className="font-heading font-extrabold text-5xl leading-none text-brand-orange/35">{nr}</div>
        <h3 className="mt-4 mb-2.5 font-heading font-extrabold uppercase text-lg leading-tight text-brand-dark">{titel}</h3>
        <p className="text-[15px] leading-relaxed text-brand-dark/75">{text}</p>
    </div>
);

const Foto: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className = '' }) => (
    <div className={`relative rounded-xl overflow-hidden ${className}`}>
        <img src={src} alt={alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
    </div>
);

const PlanningPage: React.FC = () => {
  const t = useT();
  const konfigCode = useKonfiguratorCode();
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": t("Ist die Planung im Produktpreis enthalten?", "Is the design included in the product price?", "La conception est-elle comprise dans le prix du produit ?"),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t("Ja. Die individuelle Planung mit Draufsicht, 3D-Zeichnung und Kostenübersicht ist im Produktpreis enthalten. Zusätzliche Architektenkosten entstehen nicht.", "Yes. The individual design with plan view, 3D drawing and cost overview is included in the product price. There are no additional architect's fees.", "Oui. La conception personnalisée, avec plan de masse, dessin 3D et aperçu des coûts, est comprise dans le prix du produit. Il n'y a pas de frais d'architecte supplémentaires.")
        }
      },
      {
        "@type": "Question",
        "name": t("Wie läuft die Planung eines Skateparks ab?", "How does the design of a skatepark work?", "Comment se déroule la conception d'un skatepark ?"),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t("In drei Schritten: 1. Analyse von Standort und Budget, 2. 3D-Visualisierung mit Draufsicht und Kostenübersicht, 3. Werkplanung und Fertigung der Module im Werk.", "In three steps: 1. Analysis of the site and budget, 2. 3D visualisation with plan view and cost overview, 3. Detailed design and manufacture of the modules at the factory.", "En trois étapes : 1. analyse du site et du budget, 2. visualisation 3D avec plan de masse et aperçu des coûts, 3. plans d'exécution et fabrication des modules en usine.")
        }
      },
      {
        "@type": "Question",
        "name": t("Sind die Skateelemente TÜV-zertifiziert?", "Are the skate elements TÜV-certified?", "Les éléments de skate sont-ils certifiés TÜV ?"),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t("Ja. Alle Elemente sind nach DIN EN 14974 TÜV-zertifiziert und tragen das GS-Zeichen (Geprüfte Sicherheit).", "Yes. All elements are TÜV-certified to EN 14974 and carry the GS mark (“Geprüfte Sicherheit”, tested safety).", "Oui. Tous les éléments sont certifiés TÜV selon la norme EN 14974 et portent la marque GS (« Geprüfte Sicherheit », sécurité contrôlée).")
        }
      },
      {
        "@type": "Question",
        "name": t("Welche Aufbauvarianten gibt es?", "What installation options are there?", "Quelles sont les variantes de montage ?"),
        "acceptedAnswer": {
          "@type": "Answer",
          "text": t("Drei Varianten: auf einer bestehenden befestigten Fläche mit Übergangsblechen, auf einer neuen Fundamentplatte zum Anbetonieren oder auf verdichtetem Schotterbett mit Arretierungsfüßen. Zusätzlich lassen sich die Elemente in das Gelände einbauen und anböschen.", "Three options: on an existing paved surface with transition plates, on a new foundation slab to be cast in, or on a compacted gravel bed with locking feet. The elements can also be built into the terrain and banked up with soil.", "Trois variantes : sur une surface revêtue existante avec des plaques de transition, sur une nouvelle dalle de fondation à sceller au béton, ou sur un lit de gravier compacté avec des pieds verrouillables. Les éléments peuvent en outre être intégrés au terrain et talutés.")
        }
      },
    ]
  };

  return (
    <PageShell title={t("Skatepark planen lassen: Planung und Beratung inklusive", "Have Your Skatepark Designed: Design and Advice Included", "Faire concevoir votre skatepark : conception et conseil inclus")} description={t("Skatepark planen und bauen lassen: Individuelle Planung für Beton-Skateparks, Pumptracks und urbane Anlagen, vom Entwurf über die normgerechte Ausarbeitung bis zum schlüsselfertigen Aufbau.", "Have your skatepark designed and built: individual design for concrete skateparks, pump tracks and urban facilities, from the first sketch through detailed engineering to the relevant standard to turnkey installation.", "Faire concevoir et construire votre skatepark : conception personnalisée de skateparks en béton, de pumptracks et d'équipements urbains, de l'esquisse à la réalisation clé en main, en passant par l'étude technique conforme à la norme.")} schema={faqSchema}>
        <style>{ANIMATION}</style>

        {/* 1. HERO */}
        <div className="relative w-full min-h-[620px] -mt-16 mb-28 flex flex-col justify-end overflow-hidden bg-brand-dark">
            <img
                src="/images/planung/skatepark-luftbild-05.jpg"
                alt={t("Luftaufnahme einer Skateanlage aus Betonmodulen", "Aerial view of a skatepark made of concrete modules", "Vue aérienne d'un skatepark en modules de béton")}
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-brand-dark/20"></div>
            <div className="relative z-10 container mx-auto px-4 pt-32 pb-16">
                <div className={`${LABEL} !text-[#B9D39A] flex items-center gap-2.5 !mb-5`}>
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    {t("Im Produktpreis enthalten", "Included in the product price", "Comprise dans le prix du produit")}
                </div>
                <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-heading uppercase tracking-normal [word-spacing:0.12em] text-white leading-none mb-7">
                    {t(<>Skatepark<br/>
                    <span className="text-[#8DB562]">Planung</span></>, <>Skatepark<br/> <span className="text-[#8DB562]">design</span></>, <>Conception de<br/> <span className="text-[#8DB562]">skatepark</span></>)}
                </h1>
                <p className="text-xl text-white/90 max-w-2xl leading-relaxed mb-10">
                    {t("Sie möchten einen Skatepark planen? Wir planen Skate-Anlagen, Bowls und Pumptracks individuell für Ihre Fläche. Sie bekommen keinen Standardpark, sondern einen Entwurf vom Architekten, zugeschnitten auf Ihren Standort.", "Want to plan a skatepark? We design skateparks, bowls and pump tracks individually for your site. You do not get an off-the-shelf park but a design by an architect, tailored to your location.", "Vous souhaitez concevoir un skatepark ? Nous concevons des skateparks, des bowls et des pumptracks sur mesure pour votre terrain. Vous ne recevez pas un parc standard, mais un projet d'architecte, adapté à votre site.")}
                </p>
                <div className="flex flex-wrap gap-3">
                    <Link to="/kontakt?projectType=Beratung" className={`${BTN} bg-brand-orange text-white hover:bg-white hover:text-brand-dark`}>
                        {t("Projekt anfragen", "Enquire about your project", "Parlez-nous de votre projet")}
                    </Link>
                    <Link to="/konfigurator" className={`${BTN} border-2 border-white/70 text-white hover:bg-white hover:text-brand-dark`}>
                        <span className="material-symbols-outlined text-lg">view_in_ar</span> {t("Planer öffnen", "Open the planner", "Ouvrir le configurateur")}
                    </Link>
                </div>
            </div>
        </div>

        {/* 2. ABLAUF als Zeitstrahl */}
        <div className="container mx-auto px-4 mb-28">
            <Plankopf label={t("Ablauf", "Process", "Déroulement")} klein className="mb-14">
                {t(<>Der Weg zum <span className="text-brand-orange">Skatepark</span> in drei Schritten</>, <>The route to your <span className="text-brand-orange">skatepark</span> in three steps</>, <>Votre <span className="text-brand-orange">skatepark</span> en trois étapes</>)}
            </Plankopf>
            <div className="flex flex-wrap border-t-2 border-brand-dark [&>div]:basis-full md:[&>div]:basis-0">
                <Schritt nr="01" titel={t("Analyse & Skizze", "Analysis & sketch", "Analyse et esquisse")} text={t("Wir prüfen Ihren Standort (digital oder vor Ort) und entwickeln erste Entwürfe passend zu Budget und Zielgruppe. Gern auf Basis Ihres Entwurfs aus dem Skatepark-Planer.", "We review your site (digitally or on site) and develop first designs to suit your budget and target group. We are happy to work from a design you have made in the Skatepark Planner.", "Nous examinons votre site (à distance ou sur place) et développons de premières esquisses adaptées à votre budget et à votre public. Volontiers à partir de votre projet réalisé avec le configurateur de skatepark.")} />
                {/* Roland §4.5: Wortlaut für 3D-Phase präzisieren (Skizze + 3D + Geländer) noch klären */}
                <Schritt nr="02" titel={t("3D-Visualisierung", "3D visualisation", "Visualisation 3D")} text={t("Sie erhalten eine Draufsicht und 3D-Zeichnung der vorgeschlagenen Anlage sowie ein Angebot mit den Kosten der eingeplanten Elemente.", "You receive a plan view and 3D drawing of the proposed park, plus a quote with the costs of the elements included.", "Vous recevez un plan de masse et un dessin 3D de l'installation proposée, ainsi qu'une offre indiquant le coût des éléments prévus.")} />
                <Schritt nr="03" dunkel titel={t("Ausführung", "Execution", "Réalisation")} text={t("Nach Freigabe erstellen wir die exakten Werkpläne. Die Module werden im Werk gefertigt und zum vereinbarten Termin geliefert. Den Liefertermin teilen wir Ihnen rechtzeitig mit.", "Once you approve, we draw up the exact production plans. The modules are made at the factory and delivered on the agreed date. We tell you the delivery date in good time.", "Après validation, nous établissons les plans d'exécution précis. Les modules sont fabriqués en usine et livrés à la date convenue. Nous vous communiquons la date de livraison suffisamment tôt.")} />
            </div>
        </div>

        {/* 3. PLANUNGSBEISPIELE */}
        <div className="container mx-auto px-4 mb-28">
            <div className="flex flex-col lg:flex-row lg:items-end gap-6 lg:gap-14 mb-10">
                <div className="lg:w-1/2">
                    <Plankopf label={t("Planungsbeispiele", "Design examples", "Exemples de conception")} klein>
                        {t(<>So planen wir <span className="text-brand-orange">Ihren Skatepark</span></>, <>How we design <span className="text-brand-orange">your skatepark</span></>, <>Comment nous concevons <span className="text-brand-orange">votre skatepark</span></>)}
                    </Plankopf>
                </div>
                <p className="lg:w-1/2 text-lg leading-relaxed text-brand-dark/75">
                    {t("Sie nennen uns die verfügbare Fläche und das Budget. Wir erstellen einen individuellen Entwurf mit Draufsicht, 3D-Zeichnung und Kostenübersicht. Bei besonderen Wünschen senden Sie uns einfach eine Skizze als Vorlage.", "You tell us the available area and the budget. We prepare an individual design with plan view, 3D drawing and cost overview. If you have special wishes, simply send us a sketch as a starting point.", "Vous nous indiquez la surface disponible et le budget. Nous établissons un projet personnalisé avec plan de masse, dessin 3D et aperçu des coûts. Si vous avez des souhaits particuliers, envoyez-nous simplement une esquisse comme base.")}
                </p>
            </div>

            {/* Roland: Bildunterschriften + Entwurf/Umsetzung-Paarung pro Bild noch klären, Dateinamen unterscheiden das nicht */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <figure className={CARD}>
                    <img src="/images/planung/skate-anlage-planung-01.jpg" alt={t("Skatepark-Planung, Beispiel 1", "Skatepark design, example 1", "Conception de skatepark, exemple 1")} loading="lazy" className="w-full h-64 md:h-[340px] object-cover" />
                    <figcaption className="px-5 py-3.5 font-mono text-xs uppercase tracking-widest text-brand-dark/75">{t("Abb. 1: Lageplan einer Skateanlage", "Fig. 1: Site plan of a skatepark", "Fig. 1 : plan de situation d'un skatepark")}</figcaption>
                </figure>
                <figure className={CARD}>
                    <Bild sizes="(min-width: 768px) 50vw, 100vw" src="/images/planung/skateanlage-planung-02.jpg" alt={t("Skatepark-Planung, Beispiel 2", "Skatepark design, example 2", "Conception de skatepark, exemple 2")} loading="lazy" className="w-full h-64 md:h-[340px] object-cover" />
                    <figcaption className="px-5 py-3.5 font-mono text-xs uppercase tracking-widest text-brand-dark/75">{t("Abb. 2: 3D-Ansicht derselben Planung", "Fig. 2: 3D view of the same design", "Fig. 2 : vue 3D du même projet")}</figcaption>
                </figure>
            </div>

            <p className="mt-6 max-w-4xl text-[15px] leading-relaxed text-brand-dark/75">
                {t("Auf bestehenden Flächen werden die Module mit Übergangsblechen aufgestellt, die einen stolperfreien Übergang zum Boden schaffen. Bei neuen Flächen können Module ohne Übergangsbleche verwendet und anbetoniert werden.", "On existing surfaces, the modules are set up with transition plates that create a trip-free transition to the ground. On new surfaces, modules without transition plates can be used, with the new surface concreted up to them.", "Sur les surfaces existantes, les modules sont posés avec des plaques de transition qui assurent un raccord au sol sans risque de trébucher. Sur les surfaces neuves, on peut utiliser des modules sans plaques de transition et les sceller au béton.")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                <Foto className="h-72" src="/images/planung/skatepark-luftbild-07.jpg" alt={t("Luftaufnahme: Skatepark, Pumptrack und Spielfläche", "Aerial view: skatepark, pump track and play area", "Vue aérienne : skatepark, pumptrack et aire de jeux")} />
                <Foto className="h-72" src="/images/planung/skatepark-elemente-02.jpg" alt={t("Skate-Elemente aus Beton", "Concrete skate elements", "Éléments de skate en béton")} />
                <Foto className="h-72" src="/images/planung/skatepark-bowl-03.jpg" alt={t("Bowl aus Betonmodulen", "Bowl made of concrete modules", "Bowl en modules de béton")} />
            </div>
        </div>

        {/* 4. VOM ARCHITEKTEN: Text und Zeichnung nebeneinander, Vorteile darunter */}
        <div className="container mx-auto px-4 mb-28">
            <div className="flex flex-wrap bg-brand-dark text-white rounded-2xl overflow-hidden">
                <div className="basis-full lg:basis-1/2 p-8 md:p-14 lg:pb-10">
                    <Plankopf klein dunkel className="mb-6">
                        {t(<>Vom Architekten <span className="text-[#8DB562]">gedacht</span><br/>
                        Nicht vom Verkäufer</>, <>Designed by an <span className="text-[#8DB562]">architect</span><br/> Not by a salesperson</>, <>Pensé par un <span className="text-[#8DB562]">architecte</span><br/> Pas par un vendeur</>)}
                    </Plankopf>
                    <p className="text-lg leading-relaxed text-white/90">
                        {t(<>Bei A+ Urban Design ist die Planung kein externer Posten, sondern der Kern unserer Arbeit. Ihr Ansprechpartner <strong className="text-white">Dipl.-Ing. Cüneyit Akcakoca</strong> ist Architekt bei A+ Urban Design.</>, <>At A+ Urban Design, design is not an add-on but the core of our work. Your contact <strong className="text-white">Dipl.-Ing. Cüneyit Akcakoca</strong> is an architect at A+ Urban Design.</>, <>Chez A+ Urban Design, la conception n'est pas un poste externe, mais le cœur de notre travail. Votre interlocuteur, <strong className="text-white">Dipl.-Ing. Cüneyit Akcakoca</strong>, est architecte chez A+ Urban Design.</>)}
                    </p>
                </div>
                <div className="basis-full lg:basis-1/2 px-8 md:px-14 lg:pl-0 lg:pt-14 flex flex-col justify-center">
                    <BlueprintVisualizer />
                    <div className="mt-3.5 flex flex-wrap justify-between gap-3 font-mono text-[11px] uppercase tracking-widest text-white/70">
                        <span>{t("Abb. 1: Technische Zeichnung", "Fig. 1: Technical drawing", "Fig. 1 : plan technique")}</span>
                        <span>{t("Status: Freigegeben", "Status: Approved", "Statut : validé")}</span>
                    </div>
                </div>
                <div className="basis-full mx-8 md:mx-14 mt-10 pt-10 pb-12 border-t border-white/20 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <Vorteil titel={t("25+ Jahre Erfahrung", "25+ years of experience", "Plus de 25 ans d'expérience")} text={t("Wir planen Skateanlagen und entwickeln Skateelemente seit über 25 Jahren. Draufsicht, 3D-Rendering und Kostenübersicht sind inklusive.", "We have been designing skateparks and developing skate elements for more than 25 years. Plan view, 3D rendering and cost overview are included.", "Nous concevons des skateparks et développons des éléments de skate depuis plus de 25 ans. Plan de masse, rendu 3D et aperçu des coûts sont compris.")} />
                    <Vorteil titel={t("Modulbau statt Ortbeton", "Modular construction instead of in-situ concrete", "Construction modulaire plutôt que béton coulé en place")} text={t("Wandstärke, Bewehrung und Fugen lassen sich besser kontrollieren. Die Teile kommen fertig auf die Baustelle.", "Wall thickness, reinforcement and joints are easier to control. The parts arrive on site ready to install.", "L'épaisseur des parois, les armatures et les joints se contrôlent mieux. Les éléments arrivent prêts à poser sur le chantier.")} />
                    <Vorteil titel={t("DIN-EN-14974-konform", "Compliant with EN 14974", "Conforme à la norme EN 14974")} text={t("Wir planen nach DIN EN 14974. Alle Skate-Elemente sind danach geprüft, TÜV-zertifiziert und tragen das GS-Zeichen.", "We design to EN 14974. All skate elements are tested to it, TÜV-certified and carry the GS mark.", "Nous concevons selon la norme EN 14974. Tous les éléments de skate sont testés selon cette norme, certifiés TÜV et portent la marque GS.")} />
                </div>
            </div>
        </div>

        {/* 5. BAU & UMSETZUNG */}
        <div className="container mx-auto px-4 mb-28">
            <div className="flex flex-col lg:flex-row gap-14">
                <div className="lg:w-1/2">
                    <Plankopf label={t("Bau und Umsetzung", "Construction and delivery", "Construction et réalisation")} klein className="mb-4">
                        {t(<>Schneller gebaut <span className="text-brand-orange">als Ortbeton</span></>, <>Built faster <span className="text-brand-orange">than in-situ concrete</span></>, <>Construit plus vite <span className="text-brand-orange">que le béton coulé en place</span></>)}
                    </Plankopf>
                    <p className="font-mono text-xs uppercase tracking-widest text-brand-dark/75 mb-8">{t("Mit regelmäßiger TÜV-Überprüfung der Fertigungsstätte", "With regular TÜV inspection of the production site", "Avec contrôle régulier du site de fabrication par le TÜV")}</p>
                    <div className="space-y-5">
                        <p className="text-xl font-heading font-semibold leading-snug">
                            {t(<>Der Bau eines Skateparks mit modularen Beton-Fertigteilen geht <strong className="text-brand-dark">schneller, ist einfacher und weniger wetterabhängig</strong> als Ortbeton. Unsere TÜV-zertifizierten Module werden im Werk unter kontrollierten Bedingungen produziert, in gleichbleibender Qualität, unabhängig vom Wetter.</>, <>Building a skatepark from modular precast concrete units is <strong className="text-brand-dark">faster, simpler and less dependent on the weather</strong> than in-situ concrete. Our TÜV-certified modules are produced at the factory under controlled conditions, at consistent quality, whatever the weather.</>, <>La construction d'un skatepark en éléments préfabriqués modulaires en béton est <strong className="text-brand-dark">plus rapide, plus simple et moins dépendante de la météo</strong> que le béton coulé en place. Nos modules certifiés TÜV sont produits en usine dans des conditions contrôlées, avec une qualité constante, quel que soit le temps.</>)}
                        </p>
                        <p className="text-lg text-brand-dark/75 leading-relaxed">
                            {t(<>Für die Aufstellung wird lediglich ein <strong className="text-brand-dark">fester Unterbau</strong> benötigt. Die Elemente stehen auf vorhandenen Beton- oder Asphaltflächen, auf Fundamentplatten oder auf einem Schotterbett.</>, <>All that is needed for installation is a <strong className="text-brand-dark">solid base</strong>. The elements stand on existing concrete or asphalt surfaces, on foundation slabs or on a gravel bed.</>, <>La pose ne nécessite qu'une <strong className="text-brand-dark">sous-couche stable</strong>. Les éléments reposent sur des surfaces existantes en béton ou en asphalte, sur des dalles de fondation ou sur un lit de gravier.</>)}
                        </p>
                        <p className="text-lg text-brand-dark/75 leading-relaxed">
                            {/* Roland §4.10: "Verfügungssystem" vs. "Verfugungssystem" oder "Montagesystem" noch klären */}
                            {t(<>Unser eigens entwickeltes <strong className="text-brand-dark">Verfugungssystem</strong> ist UV- und witterungsbeständig, dauerhaft elastisch, schleifbar und befahrbar. Damit lassen sich auch große Anlagen fugenlos verbinden.</>, <>Our own <strong className="text-brand-dark">jointing system</strong> is UV- and weather-resistant, permanently elastic, sandable and rideable. It lets even large parks be joined seamlessly.</>, <>Notre <strong className="text-brand-dark">système de jointoiement</strong>, développé en interne, résiste aux UV et aux intempéries, reste élastique durablement, est ponçable et roulable. Il permet de relier sans joint apparent même de grandes installations.</>)}
                        </p>
                    </div>
                </div>
                <div className="lg:w-1/2 flex flex-col gap-4">
                    <Foto className="flex-1 min-h-[240px]" src="/images/montage/abladen-02.jpg" alt={t("Abladen der Skate-Elemente", "Unloading the skate elements", "Déchargement des éléments de skate")} />
                    <Foto className="flex-1 min-h-[240px]" src="/images/planung/skatepark-baustelle-04.jpg" alt={t("Bowl-Module werden auf der Baustelle anbetoniert", "Bowl modules being concreted in on site", "Modules de bowl scellés au béton sur le chantier")} />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
                <Variante nr="1" titel={t("Variante 1: Befestigte Fläche", "Option 1: Paved surface", "Variante 1 : surface revêtue")} text={t("Die Module stehen auf einer bestehenden, befestigten Fläche aus Beton oder Asphalt. Wir montieren sie und markieren die Strecke. Der Belag bleibt unbeschädigt.", "The modules stand on an existing paved surface of concrete or asphalt. We install them and mark out the route. The surface stays undamaged.", "Les modules reposent sur une surface revêtue existante en béton ou en asphalte. Nous les montons et marquons le tracé. Le revêtement reste intact.")} />
                {/* Roland §4.13: präziser Wortlaut 'sehr liegende Fundamentplatte / einrahmendes Fugensystem' noch klären */}
                <Variante nr="2" titel={t("Variante 2: Neue Fundamentplatte", "Option 2: New foundation slab", "Variante 2 : nouvelle dalle de fondation")} text={t("Auf einer gesondert hergestellten Strecke werden die Elemente zuerst auf Fundamentplatten aufgestellt und anschließend anbetoniert oder anasphaltiert.", "On a separately prepared route, the elements are first set on foundation slabs and then concreted or asphalted up to their edges.", "Sur un tracé réalisé séparément, les éléments sont d'abord posés sur des dalles de fondation, puis raccordés en béton ou en asphalte.")} />
                <Variante nr="3" titel={t("Variante 3: Schotterbett", "Option 3: Gravel bed", "Variante 3 : lit de gravier")} text={t("Startrampen und Pipes stehen auf einem verdichteten Schotterbett neben der Fahrfläche. Unter den Arretierungsfüßen liegen Gehwegplatten. Genauso werden Grillplätze und Umkleidekabinen aufgestellt. So lässt sich die Anlage jederzeit wieder abbauen.", "Launch ramps and pipes stand on a compacted gravel bed beside the riding surface. Paving slabs lie under the locking feet. Barbecue areas and changing cubicles are installed the same way. This means the park can be dismantled again at any time.", "Les lanceurs et les pipes reposent sur un lit de gravier compacté à côté de la surface de roulement. Des dalles de trottoir sont placées sous les pieds verrouillables. Les aires de barbecue et les cabines de change se posent de la même façon. L'installation peut ainsi être démontée à tout moment.")} />
                <Variante nr="4" titel={t("Variante 4: Erdeinbau & Anböschung", "Option 4: Built into the ground & banking", "Variante 4 : intégration au terrain et talutage")} text={t("Skate-Elemente lassen sich in das Gelände einbauen und anböschen. In Friedrichsdorf wurden Teile der Anlage angeböscht, in Altdorf wurde der Serpent eingebaut und begrünt.", "Skate elements can be built into the terrain and banked up with soil. In Friedrichsdorf, parts of the park were banked up; in Altdorf, the serpent run was built in and planted.", "Les éléments de skate peuvent être intégrés au terrain et talutés. À Friedrichsdorf, une partie de l'installation a été talutée ; à Altdorf, le Serpent a été enterré et végétalisé.")} />
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-5">
                <div className="md:w-2/3 bg-brand-surface rounded-lg p-7 md:px-8 text-[15px] leading-relaxed text-brand-dark">
                    {t("Skateelemente lassen sich anböschen, also seitlich mit Erde anschütten. So fügen sie sich besser in die Umgebung ein, und zusätzliche Geländer entfallen. Angeböschte Elemente erhalten an der Rückseite einen Ringanker aus Beton, den der Auftraggeber vor Ort herstellt.", "Skate elements can be banked up, meaning earth is heaped against their sides. They then blend into their surroundings better, and extra railings are not needed. Banked-up elements get a concrete ring beam at the back, which the client builds on site.", "Les éléments de skate peuvent être talutés, c'est-à-dire remblayés latéralement avec de la terre. Ils s'intègrent ainsi mieux à l'environnement et les garde-corps supplémentaires deviennent inutiles. Les éléments talutés reçoivent à l'arrière un chaînage en béton, réalisé sur place par le maître d'ouvrage.")}
                </div>
                <Foto className="md:w-1/3 min-h-[180px]" src="/images/planung/skatepark-bowl-01.jpg" alt={t("Bowl und Skate-Elemente auf einer neuen Fläche", "Bowl and skate elements on a new surface", "Bowl et éléments de skate sur une surface neuve")} />
            </div>
        </div>

        {/* 6. SELBST ENTWERFEN: Skatepark-Planer, drei Ansichten im Wechsel */}
        <div className="container mx-auto px-4 mb-28">
            <div className={`${CARD} !rounded-2xl flex flex-col lg:flex-row`}>
                <div className="relative lg:w-1/2 min-h-[300px] md:min-h-[400px] bg-[#C1C9B6]">
                    <img className="planung-wechsel absolute inset-0 w-full h-full object-cover" src="/images/planung/planer-3d-ueberblick.jpg" alt={t("Skatepark-Planer: 3D-Ansicht eines geplanten Parks", "Skatepark Planner: 3D view of a planned park", "Configurateur de skatepark : vue 3D d'un parc conçu")} loading="lazy" />
                    <img className="planung-wechsel absolute inset-0 w-full h-full object-cover" src="/images/planung/planer-draufsicht.jpg" alt={t("Skatepark-Planer: Draufsicht derselben Planung", "Skatepark Planner: plan view of the same design", "Configurateur de skatepark : plan de masse du même projet")} loading="lazy" />
                    <img className="planung-wechsel absolute inset-0 w-full h-full object-cover" src="/images/planung/planer-3d-nah.jpg" alt={t("Skatepark-Planer: 3D-Nahansicht der Elemente", "Skatepark Planner: close-up 3D view of the elements", "Configurateur de skatepark : vue 3D rapprochée des éléments")} loading="lazy" />
                </div>
                <div className="lg:w-1/2 p-8 md:p-14">
                    <Plankopf label={t("Selbst entwerfen", "Design it yourself", "Concevoir soi-même")} klein className="mb-6">
                        {t(<>Der <span className="text-brand-orange">Skatepark-Planer</span></>, <>The <span className="text-brand-orange">Skatepark Planner</span></>, <>Le <span className="text-brand-orange">configurateur de skatepark</span></>)}
                    </Plankopf>
                    <p className="text-lg text-brand-dark/75 leading-relaxed mb-4">
                        {t("Stellen Sie Ihren Park im Browser aus unseren Elementen zusammen, in 3D und als Draufsicht. Der Planer zeigt Maße und Stückliste. Ihren Entwurf senden Sie uns, und wir arbeiten ihn zur fertigen Planung aus.", "Put your park together in the browser from our elements, in 3D and in plan view. The planner shows dimensions and a parts list. You send us your design, and we develop it into the finished plan.", "Composez votre skatepark dans le navigateur à partir de nos éléments, en 3D et en plan de masse. Le planificateur affiche les dimensions et la liste des pièces. Vous nous envoyez votre projet, et nous le transformons en plan définitif.")}
                    </p>
                    <p className="text-[15px] text-brand-dark/75 leading-relaxed mb-8">
                        {t("Vorlagen ansehen geht ohne Code. Zum Bearbeiten brauchen Sie Ihren persönlichen Code, den wir Ihnen gern zusenden.", "You can view templates without a code. To edit, you need your personal code, which we are happy to send you.", "Consulter les modèles ne nécessite pas de code. Pour modifier, il vous faut votre code personnel, que nous vous envoyons volontiers.")}
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Link to="/konfigurator" className={`${BTN} bg-brand-orange text-white hover:bg-brand-dark`}>
                            <span className="material-symbols-outlined text-lg">view_in_ar</span> {t("Planer öffnen", "Open the planner", "Ouvrir le configurateur")}
                        </Link>
                        <a href={konfigCode.anfrage} className={`${BTN} border-2 border-brand-dark text-brand-dark hover:bg-brand-dark hover:text-white`}>
                            {t("Code anfragen", "Request a code", "Demander un code")}
                        </a>
                    </div>
                </div>
            </div>
        </div>

        {/* 7. CTA */}
        <div className="container mx-auto px-4 mb-28">
            <div className="bg-brand-dark text-white rounded-2xl p-8 md:p-14">
                <Plankopf klein dunkel className="mb-5">
                    {t("Starten wir die Planung?", "Shall we start designing?", "On commence la conception ?")}
                </Plankopf>
                <p className="text-lg leading-relaxed text-white/90 max-w-2xl mb-8">
                    {t("Lassen Sie uns über Ihre Fläche sprechen. Erstberatung und Kostenschätzung sind für Sie unverbindlich.", "Let's talk about your site. The initial consultation and cost estimate are non-binding.", "Parlons de votre terrain. La première consultation et l'estimation des coûts sont sans engagement.")}
                </p>
                <Link to="/kontakt?projectType=Beratung" className={`${BTN} bg-brand-orange text-white hover:bg-white hover:text-brand-dark`}>
                    {t("Projekt anfragen", "Enquire about your project", "Parlez-nous de votre projet")}
                </Link>
            </div>
        </div>

        <BrochureRequestForm context="productpage" />

    </PageShell>
  );
};

export default PlanningPage;
