import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import BrochureRequestForm from '../components/BrochureRequestForm';
import { KONFIGURATOR_ANFRAGE } from '../components/katalog/CodeDialog';

// --- ANIMATED BLUEPRINT COMPONENT ---
// Simulates a technical scanner verifying the quality of the plan
const BlueprintVisualizer: React.FC = () => {
    return (
        <div className="relative w-full aspect-[16/9] bg-brand-surface rounded-xl overflow-hidden border border-brand-dark/10 shadow-2xl group">
            
            {/* Base Image (Technical Drawing) */}
            <div className="absolute inset-0">
                <img 
                    src="/images/planung/skate-anlage-planung-01.jpg" 
                    alt="Technische Zeichnung Skatepark"
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
                    DIN EN 14974
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
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Ist die Planung im Produktpreis enthalten?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja. Die individuelle Planung mit Draufsicht, 3D-Zeichnung und Kostenübersicht ist im Produktpreis enthalten. Zusätzliche Architektenkosten entstehen nicht."
        }
      },
      {
        "@type": "Question",
        "name": "Wie läuft die Planung eines Skateparks ab?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In drei Schritten: 1. Analyse von Standort und Budget, 2. 3D-Visualisierung mit Draufsicht und Kostenübersicht, 3. Werkplanung und Fertigung der Module im Werk."
        }
      },
      {
        "@type": "Question",
        "name": "Sind die Skateelemente TÜV-zertifiziert?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja. Alle Elemente sind nach DIN EN 14974 TÜV-zertifiziert und tragen das GS-Zeichen (Geprüfte Sicherheit)."
        }
      },
      {
        "@type": "Question",
        "name": "Welche Aufbauvarianten gibt es?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Drei Varianten: auf einer bestehenden befestigten Fläche mit Übergangsblechen, auf einer neuen Fundamentplatte zum Anbetonieren oder auf verdichtetem Schotterbett mit Arretierungsfüßen. Zusätzlich lassen sich die Elemente in das Gelände einbauen und anböschen."
        }
      },
    ]
  };

  return (
    <PageShell title="Skatepark planen lassen: Planung und Beratung inklusive" description="Skatepark planen und bauen lassen: Individuelle Planung für Beton-Skateparks, Pumptracks und urbane Anlagen, vom Entwurf über die normgerechte Ausarbeitung bis zum schlüsselfertigen Aufbau." schema={faqSchema}>
        
        {/* 1. HERO SECTION */}
        <div className="relative w-full h-[80vh] -mt-16 mb-24 overflow-hidden z-10 rounded-b-2xl border-b border-brand-dark/10">
            <div className="absolute inset-0">
                 <img 
                    src="/images/planung/skateanlage-planung-02.jpg" 
                    alt="3D-Planung eines Skateparks" 
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
                            Im Produktpreis enthalten
                         </span>
                    </div>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-heading uppercase tracking-tighter text-white leading-[0.85] mb-6 drop-shadow-2xl">
                        Skatepark<br/>
                        <span className="text-brand-orange">Planung</span>
                    </h1>
                    <p className="text-xl text-white/90 max-w-2xl border-l-4 border-brand-orange pl-6 leading-relaxed">
                        Sie möchten einen Skatepark planen? Wir planen Skate-Anlagen, Bowls und Pumptracks individuell für Ihre Fläche. Sie bekommen keinen Standardpark, sondern einen Entwurf vom Architekten, zugeschnitten auf Ihren Standort.
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
                        Vom Architekten <span className="text-brand-orange">gedacht.</span><br/>
                        Nicht vom Verkäufer.
                    </h2>
                    <div className="space-y-6 text-lg text-brand-muted leading-relaxed">
                        <p>
                            Bei A+ Urban Design ist die Planung kein externer Posten, sondern der Kern unserer Arbeit. Ihr Ansprechpartner <strong className="text-brand-dark">Dipl.-Ing. Cüneyit Akcakoca</strong> ist Architekt bei A+ Urban Design. <strong className="text-brand-dark">Er hat die Produkte entwickelt und entwirft auch die Anlagen.</strong> Das bedeutet für Sie:
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-brand-orange mt-1">architecture</span>
                                <div>
                                    <strong className="text-brand-dark block uppercase text-sm tracking-wide mb-1">25+ Jahre Erfahrung</strong>
                                    Wir planen Skateanlagen und entwickeln Skateelemente seit über 25 Jahren. Draufsicht, 3D-Rendering und Kostenübersicht sind inklusive.
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-brand-orange mt-1">compare</span>
                                <div>
                                    <strong className="text-brand-dark block uppercase text-sm tracking-wide mb-1">Modulbau statt Ortbeton</strong>
                                    Wandstärke, Bewehrung und Fugen lassen sich besser kontrollieren. Die Teile kommen fertig auf die Baustelle.
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-brand-orange mt-1">verified</span>
                                <div>
                                    <strong className="text-brand-dark block uppercase text-sm tracking-wide mb-1">DIN-EN-14974-konform</strong>
                                    Wir planen nach DIN EN 14974. Alle Skate-Elemente sind danach geprüft, TÜV-zertifiziert und tragen das GS-Zeichen.
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
                        <span>Abb. 1: Technische Zeichnung</span>
                        <span>Status: Freigegeben</span>
                    </div>
                </div>

            </div>
        </div>

        {/* 3. PLANUNGSBEISPIELE: alle 4 Zeichnungen */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 relative z-20">
            <div className="mb-12">
                <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">Planungsbeispiele</span>
                <h2 className="text-4xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter">
                    So planen wir <span className="text-brand-orange">Ihren Skatepark.</span>
                </h2>
                <p className="text-lg text-brand-muted mt-4 max-w-3xl">
                    Sie nennen uns die verfügbare Fläche und das Budget. Wir erstellen einen individuellen Entwurf mit Draufsicht, 3D-Zeichnung und Kostenübersicht. Bei besonderen Wünschen senden Sie uns einfach eine Skizze als Vorlage.
                </p>
            </div>

            {/* Roland: Bildunterschriften + Entwurf/Umsetzung-Paarung pro Bild noch klären, Dateinamen unterscheiden das nicht */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-xl overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                    <img src="/images/planung/skate-anlage-planung-01.jpg" alt="Skatepark-Planung, Beispiel 1" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">Abb. 1: Lageplan einer Skateanlage</div>
                </div>
                <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-xl overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                    <img src="/images/planung/skateanlage-planung-02.jpg" alt="Skatepark-Planung, Beispiel 2" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">Abb. 2: 3D-Ansicht derselben Planung</div>
                </div>
                <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-xl overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                    <img src="/images/planung/skate-park-planen-03.jpg" alt="Skate-Anlage in Denkmalschutzgebiet" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-xl overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                    <img src="/images/planung/skateanlage-planen-04.jpg" alt="Realisierte Skate-Anlage" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
            </div>

            <div className="bg-brand-surface/60 border border-brand-orange/20 rounded-xl p-6 text-sm text-brand-muted">
                Auf bestehenden Flächen werden die Module mit Übergangsblechen aufgestellt, die einen stolperfreien Übergang zum Boden schaffen. Bei neuen Flächen können Module ohne Übergangsbleche verwendet und anbetoniert werden.
            </div>
        </div>

        {/* 4. PROCESS STEPS */}
        <div className="bg-brand-surface border-y border-brand-dark/10 py-24 mb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">Ablauf</span>
                    <h2 className="text-4xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter">
                        Der Weg zum <span className="text-brand-orange">Skatepark</span> in drei Schritten.
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                    <ProcessStep number="01" title="Analyse & Skizze" desc="Wir prüfen Ihren Standort (digital oder vor Ort) und entwickeln erste Entwürfe passend zu Budget und Zielgruppe. Gern auf Basis Ihres Entwurfs aus dem Skatepark-Planer." />
                    {/* Roland §4.5: Wortlaut für 3D-Phase präzisieren (Skizze + 3D + Geländer) noch klären */}
                    <ProcessStep number="02" title="3D-Visualisierung" desc="Sie erhalten eine Draufsicht und 3D-Zeichnung der vorgeschlagenen Anlage sowie ein Angebot mit den Kosten der eingeplanten Elemente." />
                    <ProcessStep number="03" title="Ausführung" desc="Nach Freigabe erstellen wir die exakten Werkpläne. Die Module werden im Werk gefertigt und zum vereinbarten Termin geliefert. Den Liefertermin teilen wir Ihnen rechtzeitig mit." />
                </div>
            </div>
        </div>

        {/* 5. BAU & UMSETZUNG: Inhalte aus skateanlage-bauen */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 relative z-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

                {/* Left: Text */}
                <div>
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">Bau und Umsetzung</span>
                    <h2 className="text-4xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none mb-4">
                        Schneller gebaut <span className="text-brand-orange">als Ortbeton.</span>
                    </h2>
                    <p className="text-sm font-mono text-brand-muted uppercase tracking-widest mb-8">Mit regelmäßiger TÜV-Überprüfung der Fertigungsstätte</p>
                    <div className="space-y-6 text-lg text-brand-muted leading-relaxed">
                        <p>
                            Der Bau eines Skateparks mit modularen Beton-Fertigteilen geht <strong className="text-brand-dark">schneller, ist einfacher und weniger wetterabhängig</strong> als Ortbeton. Unsere TÜV-zertifizierten Module werden im Werk unter kontrollierten Bedingungen produziert, in gleichbleibender Qualität, unabhängig vom Wetter.
                        </p>
                        <p>
                            Für die Aufstellung wird lediglich ein <strong className="text-brand-dark">fester Unterbau</strong> benötigt. Die Elemente stehen auf vorhandenen Beton- oder Asphaltflächen, auf Fundamentplatten oder auf einem Schotterbett.
                        </p>
                        <p>
                            {/* Roland §4.10: "Verfügungssystem" vs. "Verfugungssystem" oder "Montagesystem" noch klären */}
                            Unser eigens entwickeltes <strong className="text-brand-dark">Verfugungssystem</strong> ist UV- und witterungsbeständig, dauerhaft elastisch, schleifbar und befahrbar. Damit lassen sich auch große Anlagen fugenlos verbinden.
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
                                <h3 className="font-bold font-heading text-brand-dark uppercase mb-2">Variante 1: Befestigte Fläche</h3>
                                <p className="text-sm text-brand-muted leading-relaxed">
                                    Die Module stehen auf einer bestehenden, befestigten Fläche aus Beton oder Asphalt. Wir montieren sie und markieren die Strecke. Der Belag bleibt unbeschädigt.
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
                                <h3 className="font-bold font-heading text-brand-dark uppercase mb-2">Variante 2: Neue Fundamentplatte</h3>
                                <p className="text-sm text-brand-muted leading-relaxed">
                                    Auf einer gesondert hergestellten Strecke werden die Elemente zuerst auf Fundamentplatten aufgestellt und anschließend anbetoniert oder anasphaltiert.
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
                                <h3 className="font-bold font-heading text-brand-dark uppercase mb-2">Variante 3: Schotterbett</h3>
                                <p className="text-sm text-brand-muted leading-relaxed">
                                    Startrampen und Pipes stehen auf einem verdichteten Schotterbett neben der Fahrfläche. Unter den Arretierungsfüßen liegen Gehwegplatten. Genauso werden Grillplätze und Umkleidekabinen aufgestellt. So lässt sich die Anlage jederzeit wieder abbauen.
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
                                <h3 className="font-bold font-heading text-brand-dark uppercase mb-2">Variante 4: Erdeinbau & Anböschung</h3>
                                <p className="text-sm text-brand-muted leading-relaxed">
                                    Skate-Elemente lassen sich in das Gelände einbauen und anböschen. In Friedrichsdorf wurden Teile der Anlage angeböscht, in Altdorf wurde der Serpent eingebaut und begrünt.
                                </p>
                            </div>
                        </div>
                    </div>

                    <p className="text-xs text-brand-muted italic pt-3 border-t border-brand-dark/5">
                        Skateelemente lassen sich anböschen, also seitlich mit Erde anschütten. So fügen sie sich besser in die Umgebung ein, und zusätzliche Geländer entfallen. Angeböschte Elemente erhalten an der Rückseite einen Ringanker aus Beton, den der Auftraggeber vor Ort herstellt.
                    </p>
                </div>
            </div>
        </div>

        {/* 5b. SELBST ENTWERFEN: Skatepark-Planer (Konfigurator) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 relative z-20">
            <div className="grid lg:grid-cols-2 gap-10 items-center bg-brand-dark rounded-2xl p-8 md:p-12 text-white">
                <div>
                    <span className="inline-block py-1 px-3 border border-brand-orange/50 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest rounded-md">Selbst entwerfen</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold font-heading uppercase tracking-tighter leading-none mb-6">
                        Der <span className="text-brand-orange">Skatepark-Planer.</span>
                    </h2>
                    <p className="text-lg text-white/80 leading-relaxed mb-4">
                        Stellen Sie Ihren Park im Browser aus unseren Elementen zusammen, in 3D und als Draufsicht. Der Planer zeigt Maße und Stückliste. Ihren Entwurf senden Sie uns, und wir arbeiten ihn zur fertigen Planung aus.
                    </p>
                    <p className="text-sm text-white/60 leading-relaxed">
                        Vorlagen ansehen geht ohne Code. Zum Bearbeiten brauchen Sie Ihren persönlichen Code, den wir Ihnen gern zusenden.
                    </p>
                </div>
                <div className="flex flex-col gap-4">
                    <Link to="/konfigurator" className="inline-flex justify-center items-center gap-2 bg-brand-orange text-white font-extrabold uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-white hover:text-brand-dark transition-colors">
                        <span className="material-symbols-outlined">view_in_ar</span> Planer öffnen
                    </Link>
                    <a href={KONFIGURATOR_ANFRAGE} className="inline-flex justify-center items-center gap-2 border border-white/30 text-white font-extrabold uppercase tracking-widest py-4 px-8 rounded-lg hover:border-brand-orange hover:text-brand-orange transition-colors">
                        Code anfragen
                    </a>
                </div>
            </div>
        </div>

        {/* 6. CTA */}
        <div className="max-w-4xl mx-auto px-4 text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-brand-dark uppercase mb-8">
                Starten wir die Planung?
            </h2>
            <p className="text-xl text-brand-muted mb-12 max-w-2xl mx-auto">
                Lassen Sie uns über Ihre Fläche sprechen. Erstberatung und Kostenschätzung sind für Sie unverbindlich.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
                <Link to="/kontakt?projectType=Beratung" className="px-8 py-4 bg-brand-orange text-white font-extrabold uppercase tracking-widest rounded hover:bg-brand-dark transition-colors shadow-lg hover:shadow-brand-orange/50">
                    Projekt anfragen
                </Link>
            </div>
        </div>

        <BrochureRequestForm context="productpage" />

    </PageShell>
  );
};

export default PlanningPage;
