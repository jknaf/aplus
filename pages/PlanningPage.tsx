import React from 'react';
import { Link, useT } from '../i18n';
import PageShell from '../components/PageShell';
import BrochureRequestForm from '../components/BrochureRequestForm';
import { useKonfiguratorCode } from '../components/katalog/CodeDialog';
import Bild from '../components/Bild';

// --- ANIMATED BLUEPRINT COMPONENT ---
// Simulates a technical scanner verifying the quality of the plan
const BlueprintVisualizer: React.FC = () => {
  const t = useT();
    return (
        <div className="relative w-full aspect-[16/9] bg-brand-surface rounded-xl overflow-hidden border border-brand-dark/10 shadow-2xl group">
            
            {/* Base Image (Technical Drawing) */}
            <div className="absolute inset-0">
                <img 
                    src="/images/planung/skate-anlage-planung-01.jpg" 
                    alt={t("Technische Zeichnung Skatepark", "Technical drawing of a skatepark", "Plan technique d'un skatepark")}
                    className="w-full h-full object-cover filter grayscale contrast-125 opacity-30"
                />
                {/* Blueprint Overlay Effect (Blue Tint) */}
                <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </div>

            {/* Scanning Bar Animation */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute top-0 bottom-0 w-[2px] bg-brand-orange/80 shadow-[0_0_20px_rgba(249,115,22,0.8)] animate-[scan_4s_ease-in-out_infinite]"></div>
            </div>

            {/* Hotspots / Annotations */}
            <div className="absolute top-1/4 left-1/4 z-20 animate-[pulse-fast_3s_infinite]">
                <div className="w-3 h-3 bg-brand-orange rounded-full"></div>
                <div className="absolute top-0 left-4 bg-black/80 px-2 py-1 border border-brand-orange/50 rounded text-[10px] font-mono text-brand-orange whitespace-nowrap">
                    {t("DIN EN 14974", "EN 14974", "EN 14974")}
                </div>
            </div>
            
            <div className="absolute bottom-1/3 right-1/3 z-20 animate-[pulse-fast_3s_infinite_1s]">
                <div className="w-3 h-3 bg-brand-orange rounded-full"></div>
                <div className="absolute top-0 left-4 bg-black/80 px-2 py-1 border border-brand-orange/50 rounded text-[10px] font-mono text-brand-orange whitespace-nowrap">
                    RADIUS CHECK
                </div>
            </div>

            <style>{`
                @keyframes scan {
                    0% { left: 0%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { left: 100%; opacity: 0; }
                }
            `}</style>
        </div>
    );
};

const ProcessStep: React.FC<{ number: string; title: string; desc: string }> = ({ number, title, desc }) => (
    <div className="relative pl-12 border-l border-brand-dark/10 pb-12 last:pb-0 group">
        <div className="absolute left-[-20px] top-0 w-10 h-10 bg-brand-surface border border-brand-dark/10 rounded-full flex items-center justify-center font-extrabold text-brand-orange group-hover:border-brand-orange group-hover:scale-110 transition-all duration-300 z-10">
            {number}
        </div>
        <h3 className="text-2xl font-extrabold font-heading text-brand-dark uppercase tracking-tight mb-2 group-hover:text-brand-orange transition-colors">
            {title}
        </h3>
        <p className="text-brand-muted leading-relaxed max-w-md">
            {desc}
        </p>
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
        
        {/* 1. HERO SECTION */}
        <div className="relative w-full h-[80vh] -mt-16 mb-24 overflow-hidden z-10 rounded-b-2xl border-b border-brand-dark/10">
            <div className="absolute inset-0">
                 <Bild hoch 
                    src="/images/planung/skateanlage-planung-02.jpg" 
                    alt={t("3D-Planung eines Skateparks", "3D design of a skatepark", "Conception 3D d'un skatepark")} 
                    className="w-full h-full object-cover animate-[kenburns-1_20s_infinite_alternate]"
                 />
                 <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent"></div>
                 <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-brand-dark/80 to-transparent"></div>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-12 z-20">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-6">
                         <span className="px-4 py-1.5 border border-green-500/50 text-green-400 bg-green-900/20 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md rounded-full flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                            {t("Im Produktpreis enthalten", "Included in the product price", "Comprise dans le prix du produit")}
                         </span>
                    </div>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-heading uppercase tracking-tighter text-white leading-[0.85] mb-6 drop-shadow-2xl">
                        {t(<>Skatepark<br/>
                        <span className="text-brand-orange">Planung</span></>, <>Skatepark<br/> <span className="text-brand-orange">design</span></>, <>Conception de<br/> <span className="text-brand-orange">skatepark</span></>)}
                    </h1>
                    <p className="text-xl text-white/90 max-w-2xl border-l-4 border-brand-orange pl-6 leading-relaxed">
                        {t("Sie möchten einen Skatepark planen? Wir planen Skate-Anlagen, Bowls und Pumptracks individuell für Ihre Fläche. Sie bekommen keinen Standardpark, sondern einen Entwurf vom Architekten, zugeschnitten auf Ihren Standort.", "Want to plan a skatepark? We design skateparks, bowls and pump tracks individually for your site. You do not get an off-the-shelf park but a design by an architect, tailored to your location.", "Vous souhaitez concevoir un skatepark ? Nous concevons des skateparks, des bowls et des pumptracks sur mesure pour votre terrain. Vous ne recevez pas un parc standard, mais un projet d'architecte, adapté à votre site.")}
                    </p>
                </div>
            </div>
        </div>

        {/* 2. THE ARCHITECT ADVANTAGE */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 relative z-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                
                {/* Left: Text */}
                <div className="space-y-8">
                    <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                        {t(<>Vom Architekten <span className="text-brand-orange">gedacht</span><br/>
                        Nicht vom Verkäufer</>, <>Designed by an <span className="text-brand-orange">architect</span><br/> Not by a salesperson</>, <>Pensé par un <span className="text-brand-orange">architecte</span><br/> Pas par un vendeur</>)}
                    </h2>
                    <div className="space-y-6 text-lg text-brand-muted leading-relaxed">
                        <p>
                            {t(<>Bei A+ Urban Design ist die Planung kein externer Posten, sondern der Kern unserer Arbeit. Ihr Ansprechpartner <strong className="text-brand-dark">Dipl.-Ing. Cüneyit Akcakoca</strong> ist Architekt bei A+ Urban Design. <strong className="text-brand-dark">Er hat die Produkte entwickelt und entwirft auch die Anlagen.</strong> Das bedeutet für Sie:</>, <>At A+ Urban Design, design is not an add-on but the core of our work. Your contact <strong className="text-brand-dark">Dipl.-Ing. Cüneyit Akcakoca</strong> is an architect at A+ Urban Design. <strong className="text-brand-dark">He developed the products and designs the parks himself.</strong> For you, that means:</>, <>Chez A+ Urban Design, la conception n'est pas un poste externe, mais le cœur de notre travail. Votre interlocuteur, <strong className="text-brand-dark">Dipl.-Ing. Cüneyit Akcakoca</strong>, est architecte chez A+ Urban Design. <strong className="text-brand-dark">Il a développé les produits et conçoit lui-même les installations.</strong> Pour vous, cela signifie :</>)}
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-brand-orange mt-1">architecture</span>
                                <div>
                                    <strong className="text-brand-dark block uppercase text-sm tracking-wide mb-1">{t("25+ Jahre Erfahrung", "25+ years of experience", "Plus de 25 ans d'expérience")}</strong>
                                    {t("Wir planen Skateanlagen und entwickeln Skateelemente seit über 25 Jahren. Draufsicht, 3D-Rendering und Kostenübersicht sind inklusive.", "We have been designing skateparks and developing skate elements for more than 25 years. Plan view, 3D rendering and cost overview are included.", "Nous concevons des skateparks et développons des éléments de skate depuis plus de 25 ans. Plan de masse, rendu 3D et aperçu des coûts sont compris.")}
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-brand-orange mt-1">compare</span>
                                <div>
                                    <strong className="text-brand-dark block uppercase text-sm tracking-wide mb-1">{t("Modulbau statt Ortbeton", "Modular construction instead of in-situ concrete", "Construction modulaire plutôt que béton coulé en place")}</strong>
                                    {t("Wandstärke, Bewehrung und Fugen lassen sich besser kontrollieren. Die Teile kommen fertig auf die Baustelle.", "Wall thickness, reinforcement and joints are easier to control. The parts arrive on site ready to install.", "L'épaisseur des parois, les armatures et les joints se contrôlent mieux. Les éléments arrivent prêts à poser sur le chantier.")}
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-brand-orange mt-1">verified</span>
                                <div>
                                    <strong className="text-brand-dark block uppercase text-sm tracking-wide mb-1">{t("DIN-EN-14974-konform", "Compliant with EN 14974", "Conforme à la norme EN 14974")}</strong>
                                    {t("Wir planen nach DIN EN 14974. Alle Skate-Elemente sind danach geprüft, TÜV-zertifiziert und tragen das GS-Zeichen.", "We design to EN 14974. All skate elements are tested to it, TÜV-certified and carry the GS mark.", "Nous concevons selon la norme EN 14974. Tous les éléments de skate sont testés selon cette norme, certifiés TÜV et portent la marque GS.")}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right: The Blueprint Visualizer */}
                <div className="relative">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-orange/20 blur-[60px] rounded-full"></div>
                    <BlueprintVisualizer />
                    <div className="mt-4 flex justify-between items-center text-xs font-mono text-brand-muted uppercase tracking-widest px-2">
                        <span>{t("Abb. 1: Technische Zeichnung", "Fig. 1: Technical drawing", "Fig. 1 : plan technique")}</span>
                        <span>{t("Status: Freigegeben", "Status: Approved", "Statut : validé")}</span>
                    </div>
                </div>

            </div>
        </div>

        {/* 3. PLANUNGSBEISPIELE: alle 4 Zeichnungen */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 relative z-20">
            <div className="mb-12">
                <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">{t("Planungsbeispiele", "Design examples", "Exemples de conception")}</span>
                <h2 className="text-4xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter">
                    {t(<>So planen wir <span className="text-brand-orange">Ihren Skatepark</span></>, <>How we design <span className="text-brand-orange">your skatepark</span></>, <>Comment nous concevons <span className="text-brand-orange">votre skatepark</span></>)}
                </h2>
                <p className="text-lg text-brand-muted mt-4 max-w-3xl">
                    {t("Sie nennen uns die verfügbare Fläche und das Budget. Wir erstellen einen individuellen Entwurf mit Draufsicht, 3D-Zeichnung und Kostenübersicht. Bei besonderen Wünschen senden Sie uns einfach eine Skizze als Vorlage.", "You tell us the available area and the budget. We prepare an individual design with plan view, 3D drawing and cost overview. If you have special wishes, simply send us a sketch as a starting point.", "Vous nous indiquez la surface disponible et le budget. Nous établissons un projet personnalisé avec plan de masse, dessin 3D et aperçu des coûts. Si vous avez des souhaits particuliers, envoyez-nous simplement une esquisse comme base.")}
                </p>
            </div>

            {/* Roland: Bildunterschriften + Entwurf/Umsetzung-Paarung pro Bild noch klären, Dateinamen unterscheiden das nicht */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-xl overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                    <img src="/images/planung/skate-anlage-planung-01.jpg" alt={t("Skatepark-Planung, Beispiel 1", "Skatepark design, example 1", "Conception de skatepark, exemple 1")} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">{t("Abb. 1: Lageplan einer Skateanlage", "Fig. 1: Site plan of a skatepark", "Fig. 1 : plan de situation d'un skatepark")}</div>
                </div>
                <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-xl overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                    <Bild sizes="(min-width: 1024px) 60vw, 100vw" src="/images/planung/skateanlage-planung-02.jpg" alt={t("Skatepark-Planung, Beispiel 2", "Skatepark design, example 2", "Conception de skatepark, exemple 2")} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">{t("Abb. 2: 3D-Ansicht derselben Planung", "Fig. 2: 3D view of the same design", "Fig. 2 : vue 3D du même projet")}</div>
                </div>
                <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-xl overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                    <img src="/images/planung/skate-park-planen-03.jpg" alt={t("Skate-Anlage in Denkmalschutzgebiet", "Skatepark in a heritage-protected area", "Skatepark dans une zone de protection du patrimoine")} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-xl overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                    <img src="/images/planung/skateanlage-planen-04.jpg" alt={t("Realisierte Skate-Anlage", "Completed skatepark", "Skatepark réalisé")} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
            </div>

            <div className="bg-brand-surface/60 border border-brand-orange/20 rounded-xl p-6 text-sm text-brand-muted">
                {t("Auf bestehenden Flächen werden die Module mit Übergangsblechen aufgestellt, die einen stolperfreien Übergang zum Boden schaffen. Bei neuen Flächen können Module ohne Übergangsbleche verwendet und anbetoniert werden.", "On existing surfaces, the modules are set up with transition plates that create a trip-free transition to the ground. On new surfaces, modules without transition plates can be used, with the new surface concreted up to them.", "Sur les surfaces existantes, les modules sont posés avec des plaques de transition qui assurent un raccord au sol sans risque de trébucher. Sur les surfaces neuves, on peut utiliser des modules sans plaques de transition et les sceller au béton.")}
            </div>
        </div>

        {/* 4. PROCESS STEPS */}
        <div className="bg-brand-surface border-y border-brand-dark/10 py-24 mb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">{t("Ablauf", "Process", "Déroulement")}</span>
                    <h2 className="text-4xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter">
                        {t(<>Der Weg zum <span className="text-brand-orange">Skatepark</span> in drei Schritten</>, <>The route to your <span className="text-brand-orange">skatepark</span> in three steps</>, <>Votre <span className="text-brand-orange">skatepark</span> en trois étapes</>)}
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                    <ProcessStep number={t("01", "01", "01")} title={t("Analyse & Skizze", "Analysis & sketch", "Analyse et esquisse")} desc={t("Wir prüfen Ihren Standort (digital oder vor Ort) und entwickeln erste Entwürfe passend zu Budget und Zielgruppe. Gern auf Basis Ihres Entwurfs aus dem Skatepark-Planer.", "We review your site (digitally or on site) and develop first designs to suit your budget and target group. We are happy to work from a design you have made in the Skatepark Planner.", "Nous examinons votre site (à distance ou sur place) et développons de premières esquisses adaptées à votre budget et à votre public. Volontiers à partir de votre projet réalisé avec le configurateur de skatepark.")} />
                    {/* Roland §4.5: Wortlaut für 3D-Phase präzisieren (Skizze + 3D + Geländer) noch klären */}
                    <ProcessStep number="02" title={t("3D-Visualisierung", "3D visualisation", "Visualisation 3D")} desc={t("Sie erhalten eine Draufsicht und 3D-Zeichnung der vorgeschlagenen Anlage sowie ein Angebot mit den Kosten der eingeplanten Elemente.", "You receive a plan view and 3D drawing of the proposed park, plus a quote with the costs of the elements included.", "Vous recevez un plan de masse et un dessin 3D de l'installation proposée, ainsi qu'une offre indiquant le coût des éléments prévus.")} />
                    <ProcessStep number="03" title={t("Ausführung", "Execution", "Réalisation")} desc={t("Nach Freigabe erstellen wir die exakten Werkpläne. Die Module werden im Werk gefertigt und zum vereinbarten Termin geliefert. Den Liefertermin teilen wir Ihnen rechtzeitig mit.", "Once you approve, we draw up the exact production plans. The modules are made at the factory and delivered on the agreed date. We tell you the delivery date in good time.", "Après validation, nous établissons les plans d'exécution précis. Les modules sont fabriqués en usine et livrés à la date convenue. Nous vous communiquons la date de livraison suffisamment tôt.")} />
                </div>
            </div>
        </div>

        {/* 5. BAU & UMSETZUNG: Inhalte aus skateanlage-bauen */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 relative z-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

                {/* Left: Text */}
                <div>
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">{t("Bau und Umsetzung", "Construction and delivery", "Construction et réalisation")}</span>
                    <h2 className="text-4xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none mb-4">
                        {t(<>Schneller gebaut <span className="text-brand-orange">als Ortbeton</span></>, <>Built faster <span className="text-brand-orange">than in-situ concrete</span></>, <>Construit plus vite <span className="text-brand-orange">que le béton coulé en place</span></>)}
                    </h2>
                    <p className="text-sm font-mono text-brand-muted uppercase tracking-widest mb-8">{t("Mit regelmäßiger TÜV-Überprüfung der Fertigungsstätte", "With regular TÜV inspection of the production site", "Avec contrôle régulier du site de fabrication par le TÜV")}</p>
                    <div className="space-y-6 text-lg text-brand-muted leading-relaxed">
                        <p>
                            {t(<>Der Bau eines Skateparks mit modularen Beton-Fertigteilen geht <strong className="text-brand-dark">schneller, ist einfacher und weniger wetterabhängig</strong> als Ortbeton. Unsere TÜV-zertifizierten Module werden im Werk unter kontrollierten Bedingungen produziert, in gleichbleibender Qualität, unabhängig vom Wetter.</>, <>Building a skatepark from modular precast concrete units is <strong className="text-brand-dark">faster, simpler and less dependent on the weather</strong> than in-situ concrete. Our TÜV-certified modules are produced at the factory under controlled conditions, at consistent quality, whatever the weather.</>, <>La construction d'un skatepark en éléments préfabriqués modulaires en béton est <strong className="text-brand-dark">plus rapide, plus simple et moins dépendante de la météo</strong> que le béton coulé en place. Nos modules certifiés TÜV sont produits en usine dans des conditions contrôlées, avec une qualité constante, quel que soit le temps.</>)}
                        </p>
                        <p>
                            {t(<>Für die Aufstellung wird lediglich ein <strong className="text-brand-dark">fester Unterbau</strong> benötigt. Die Elemente stehen auf vorhandenen Beton- oder Asphaltflächen, auf Fundamentplatten oder auf einem Schotterbett.</>, <>All that is needed for installation is a <strong className="text-brand-dark">solid base</strong>. The elements stand on existing concrete or asphalt surfaces, on foundation slabs or on a gravel bed.</>, <>La pose ne nécessite qu'une <strong className="text-brand-dark">sous-couche stable</strong>. Les éléments reposent sur des surfaces existantes en béton ou en asphalte, sur des dalles de fondation ou sur un lit de gravier.</>)}
                        </p>
                        <p>
                            {/* Roland §4.10: "Verfügungssystem" vs. "Verfugungssystem" oder "Montagesystem" noch klären */}
                            {t(<>Unser eigens entwickeltes <strong className="text-brand-dark">Verfugungssystem</strong> ist UV- und witterungsbeständig, dauerhaft elastisch, schleifbar und befahrbar. Damit lassen sich auch große Anlagen fugenlos verbinden.</>, <>Our own <strong className="text-brand-dark">jointing system</strong> is UV- and weather-resistant, permanently elastic, sandable and rideable. It lets even large parks be joined seamlessly.</>, <>Notre <strong className="text-brand-dark">système de jointoiement</strong>, développé en interne, résiste aux UV et aux intempéries, reste élastique durablement, est ponçable et roulable. Il permet de relier sans joint apparent même de grandes installations.</>)}
                        </p>
                    </div>
                </div>

                {/* Right: Aufbau-Varianten Cards */}
                <div className="space-y-4">
                    <div className="bg-white border border-brand-dark/10 rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:border-brand-orange/40 transition-colors">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-brand-orange">layers</span>
                            </div>
                            <div>
                                <h3 className="font-bold font-heading text-brand-dark uppercase mb-2">{t("Variante 1: Befestigte Fläche", "Option 1: Paved surface", "Variante 1 : surface revêtue")}</h3>
                                <p className="text-sm text-brand-muted leading-relaxed">
                                    {t("Die Module stehen auf einer bestehenden, befestigten Fläche aus Beton oder Asphalt. Wir montieren sie und markieren die Strecke. Der Belag bleibt unbeschädigt.", "The modules stand on an existing paved surface of concrete or asphalt. We install them and mark out the route. The surface stays undamaged.", "Les modules reposent sur une surface revêtue existante en béton ou en asphalte. Nous les montons et marquons le tracé. Le revêtement reste intact.")}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-brand-dark/10 rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:border-brand-orange/40 transition-colors">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-brand-orange">foundation</span>
                            </div>
                            <div>
                                {/* Roland §4.13: präziser Wortlaut 'sehr liegende Fundamentplatte / einrahmendes Fugensystem' noch klären */}
                                <h3 className="font-bold font-heading text-brand-dark uppercase mb-2">{t("Variante 2: Neue Fundamentplatte", "Option 2: New foundation slab", "Variante 2 : nouvelle dalle de fondation")}</h3>
                                <p className="text-sm text-brand-muted leading-relaxed">
                                    {t("Auf einer gesondert hergestellten Strecke werden die Elemente zuerst auf Fundamentplatten aufgestellt und anschließend anbetoniert oder anasphaltiert.", "On a separately prepared route, the elements are first set on foundation slabs and then concreted or asphalted up to their edges.", "Sur un tracé réalisé séparément, les éléments sont d'abord posés sur des dalles de fondation, puis raccordés en béton ou en asphalte.")}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-brand-dark/10 rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:border-brand-orange/40 transition-colors">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-brand-orange">tune</span>
                            </div>
                            <div>
                                <h3 className="font-bold font-heading text-brand-dark uppercase mb-2">{t("Variante 3: Schotterbett", "Option 3: Gravel bed", "Variante 3 : lit de gravier")}</h3>
                                <p className="text-sm text-brand-muted leading-relaxed">
                                    {t("Startrampen und Pipes stehen auf einem verdichteten Schotterbett neben der Fahrfläche. Unter den Arretierungsfüßen liegen Gehwegplatten. Genauso werden Grillplätze und Umkleidekabinen aufgestellt. So lässt sich die Anlage jederzeit wieder abbauen.", "Launch ramps and pipes stand on a compacted gravel bed beside the riding surface. Paving slabs lie under the locking feet. Barbecue areas and changing cubicles are installed the same way. This means the park can be dismantled again at any time.", "Les lanceurs et les pipes reposent sur un lit de gravier compacté à côté de la surface de roulement. Des dalles de trottoir sont placées sous les pieds verrouillables. Les aires de barbecue et les cabines de change se posent de la même façon. L'installation peut ainsi être démontée à tout moment.")}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-brand-dark/10 rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:border-brand-orange/40 transition-colors">
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 bg-brand-orange/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-brand-orange">landscape</span>
                            </div>
                            <div>
                                <h3 className="font-bold font-heading text-brand-dark uppercase mb-2">{t("Variante 4: Erdeinbau & Anböschung", "Option 4: Built into the ground & banking", "Variante 4 : intégration au terrain et talutage")}</h3>
                                <p className="text-sm text-brand-muted leading-relaxed">
                                    {t("Skate-Elemente lassen sich in das Gelände einbauen und anböschen. In Friedrichsdorf wurden Teile der Anlage angeböscht, in Altdorf wurde der Serpent eingebaut und begrünt.", "Skate elements can be built into the terrain and banked up with soil. In Friedrichsdorf, parts of the park were banked up; in Altdorf, the serpent run was built in and planted.", "Les éléments de skate peuvent être intégrés au terrain et talutés. À Friedrichsdorf, une partie de l'installation a été talutée ; à Altdorf, le Serpent a été enterré et végétalisé.")}
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="text-xs text-brand-muted italic pt-3 border-t border-brand-dark/5">
                        {t("Skateelemente lassen sich anböschen, also seitlich mit Erde anschütten. So fügen sie sich besser in die Umgebung ein, und zusätzliche Geländer entfallen. Angeböschte Elemente erhalten an der Rückseite einen Ringanker aus Beton, den der Auftraggeber vor Ort herstellt.", "Skate elements can be banked up, meaning earth is heaped against their sides. They then blend into their surroundings better, and extra railings are not needed. Banked-up elements get a concrete ring beam at the back, which the client builds on site.", "Les éléments de skate peuvent être talutés, c'est-à-dire remblayés latéralement avec de la terre. Ils s'intègrent ainsi mieux à l'environnement et les garde-corps supplémentaires deviennent inutiles. Les éléments talutés reçoivent à l'arrière un chaînage en béton, réalisé sur place par le maître d'ouvrage.")}
                    </p>
                </div>
            </div>
        </div>

        {/* 5b. SELBST ENTWERFEN: Skatepark-Planer (Konfigurator) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 relative z-20">
            <div className="grid lg:grid-cols-2 gap-10 items-center bg-brand-dark rounded-2xl p-8 md:p-12 text-white">
                <div>
                    <span className="inline-block py-1 px-3 border border-brand-orange/50 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest rounded-md">{t("Selbst entwerfen", "Design it yourself", "Concevoir soi-même")}</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold font-heading uppercase tracking-tighter leading-none mb-6">
                        {t(<>Der <span className="text-brand-orange">Skatepark-Planer</span></>, <>The <span className="text-brand-orange">Skatepark Planner</span></>, <>Le <span className="text-brand-orange">configurateur de skatepark</span></>)}
                    </h2>
                    <p className="text-lg text-white/80 leading-relaxed mb-4">
                        {t("Stellen Sie Ihren Park im Browser aus unseren Elementen zusammen, in 3D und als Draufsicht. Der Planer zeigt Maße und Stückliste. Ihren Entwurf senden Sie uns, und wir arbeiten ihn zur fertigen Planung aus.", "Put your park together in the browser from our elements, in 3D and in plan view. The planner shows dimensions and a parts list. You send us your design, and we develop it into the finished plan.", "Composez votre skatepark dans le navigateur à partir de nos éléments, en 3D et en plan de masse. Le planificateur affiche les dimensions et la liste des pièces. Vous nous envoyez votre projet, et nous le transformons en plan définitif.")}
                    </p>
                    <p className="text-sm text-white/60 leading-relaxed">
                        {t("Vorlagen ansehen geht ohne Code. Zum Bearbeiten brauchen Sie Ihren persönlichen Code, den wir Ihnen gern zusenden.", "You can view templates without a code. To edit, you need your personal code, which we are happy to send you.", "Consulter les modèles ne nécessite pas de code. Pour modifier, il vous faut votre code personnel, que nous vous envoyons volontiers.")}
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <Link to="/konfigurator" className="inline-flex justify-center items-center gap-2 bg-brand-orange text-white font-extrabold uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-white hover:text-brand-dark transition-colors">
                        <span className="material-symbols-outlined">view_in_ar</span> {t("Planer öffnen", "Open the planner", "Ouvrir le configurateur")}
                    </Link>
                    <a href={konfigCode.anfrage} className="inline-flex justify-center items-center gap-2 border border-white/30 text-white font-extrabold uppercase tracking-widest py-4 px-8 rounded-lg hover:border-brand-orange hover:text-brand-orange transition-colors">
                        {t("Code anfragen", "Request a code", "Demander un code")}
                    </a>
                </div>
            </div>
        </div>

        {/* 6. CTA */}
        <div className="max-w-4xl mx-auto px-4 text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-brand-dark uppercase mb-8">
                {t("Starten wir die Planung?", "Shall we start designing?", "On commence la conception ?")}
            </h2>
            <p className="text-xl text-brand-muted mb-12 max-w-2xl mx-auto">
                {t("Lassen Sie uns über Ihre Fläche sprechen. Erstberatung und Kostenschätzung sind für Sie unverbindlich.", "Let's talk about your site. The initial consultation and cost estimate are non-binding.", "Parlons de votre terrain. La première consultation et l'estimation des coûts sont sans engagement.")}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
                <Link to="/kontakt?projectType=Beratung" className="px-8 py-4 bg-brand-orange text-white font-extrabold uppercase tracking-widest rounded hover:bg-brand-dark transition-colors shadow-lg hover:shadow-brand-orange/50">
                    {t("Projekt anfragen", "Enquire about your project", "Parlez-nous de votre projet")}
                </Link>
            </div>
        </div>

        <BrochureRequestForm context="productpage" />

    </PageShell>
  );
};

export default PlanningPage;
