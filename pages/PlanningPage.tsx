import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import BrochureRequestForm from '../components/BrochureRequestForm';

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
          "text": "Ja. Die individuelle Planung mit Draufsicht, 3D-Zeichnung und Kostenübersicht ist im Produktpreis enthalten — keine zusätzlichen Architektenkosten."
        }
      },
      {
        "@type": "Question",
        "name": "Wie läuft die Planung eines Skateparks ab?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In drei Schritten: 1. Analyse Ihres Standorts und Budget, 2. 3D-Visualisierung mit Draufsicht und Kostenübersicht, 3. Werkplanung und Fertigung der Module im Werk."
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
          "text": "Drei Varianten: Aufstellung auf bestehender befestigter Fläche mit Übergangsblechen, auf neuer Fundamentplatte zum Anbetonieren, oder auf verdichtetem Schotterbett mit Arretierungsfüßen."
        }
      },
      {
        "@type": "Question",
        "name": "Können DWG-Dateien bereitgestellt werden?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja. Für Projekte ab 100.000 EUR brutto stellen wir DWG-Dateien für Planer und Architekten zur Verfügung. Systemschnitte für im Erdreich eingelassene Elemente sind Standard."
        }
      }
    ]
  };

  return (
    <PageShell title="Skatepark planen lassen — Planung & Beratung inklusive" description="Skatepark planen und bauen lassen: Individuelle Planung für Beton-Skateparks, Pumptracks und urbane Anlagen — von der Entwurfsidee über TÜV-konforme Ausarbeitung bis zur schlüsselfertigen Realisierung." schema={faqSchema}>
        
        {/* 1. HERO SECTION */}
        <div className="relative w-full h-[80vh] -mt-16 mb-24 overflow-hidden z-10 rounded-b-2xl border-b border-brand-dark/10">
            <div className="absolute inset-0">
                 <img 
                    src="/images/planung/skateanlage-planung-02.jpg" 
                    alt="3D Skatepark Planung A+ Urban Design" 
                    className="w-full h-full object-cover animate-[kenburns-1_20s_infinite_alternate]"
                 />
                 <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
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
                        Planung<br/>
                        <span className="text-brand-orange">Inklusive.</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl border-l-4 border-brand-orange pl-6 leading-relaxed">
                        Sie möchten einen Skatepark planen und bauen lassen? Bei uns kaufen Sie kein Produkt von der Stange. Sie erhalten eine individuelle Architektenleistung, maßgeschneidert auf Ihren Standort und Ihre Bedürfnisse.
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
                            Bei A+ Urban Design ist die Planung kein externer Posten, sondern der Kern unserer Arbeit. Gründer <strong className="text-brand-dark">Dipl.-Ing. Cüneyit Akcakoca</strong> ist freier Architekt. Das bedeutet für Sie:
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-brand-orange mt-1">architecture</span>
                                <div>
                                    <strong className="text-brand-dark block uppercase text-sm tracking-wide mb-1">25+ Jahre Erfahrung</strong>
                                    Wir planen Skateanlagen und entwickeln Skateelemente seit über 25 Jahren. Draufsicht, 3D-Rendering und Kostenübersicht inklusive.
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-brand-orange mt-1">compare</span>
                                <div>
                                    <strong className="text-brand-dark block uppercase text-sm tracking-wide mb-1">Modulbau statt Ortbeton</strong>
                                    Bessere Qualitätskontrolle (Betonstärken, Bewehrung, Fugen), schnellere Ausführung, nahezu wetterunabhängig — und meistens günstiger.
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-brand-orange mt-1">verified</span>
                                <div>
                                    <strong className="text-brand-dark block uppercase text-sm tracking-wide mb-1">DIN EN 14974 konform</strong>
                                    Normgerechte Planung ist Standard. Für Projekte ab 100.000 EUR stellen wir DWG-Dateien zur Verfügung.
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
                        <span>Fig 01. Technische Zeichnung</span>
                        <span>Status: Approved</span>
                    </div>
                </div>

            </div>
        </div>

        {/* 3. PLANUNGSBEISPIELE — alle 4 Zeichnungen */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 relative z-20">
            <div className="mb-12">
                <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">Planungsbeispiele</span>
                <h2 className="text-4xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter">
                    So planen <span className="text-brand-orange">wir.</span>
                </h2>
                <p className="text-lg text-brand-muted mt-4 max-w-3xl">
                    Sie nennen uns die verfügbare Fläche und das Budget — wir erstellen einen individuellen Entwurf mit Draufsicht, 3D-Zeichnung und Kostenübersicht. Bei besonderen Wünschen senden Sie uns einfach eine Skizze als Vorlage.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-xl overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                    <img src="/images/planung/skate-anlage-planung-01.jpg" alt="Skatepark Planung Draufsicht" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">DRAUFSICHT — SKATE-ANLAGE</div>
                </div>
                <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-xl overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                    <img src="/images/planung/skateanlage-planung-02.jpg" alt="Skatepark Planung anbetoniert" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">PLANUNG — ANBETONIERTE MODULE</div>
                </div>
                <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-xl overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                    <img src="/images/planung/skate-park-planen-03.jpg" alt="Skate-Anlage in Denkmalschutzgebiet" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-xl overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                    <img src="/images/planung/skateanlage-planen-04.jpg" alt="Realisierte Skate-Anlage" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
            </div>

            <div className="bg-brand-surface/60 border border-brand-orange/20 rounded-xl p-6 text-sm text-brand-muted">
                <strong className="text-brand-dark">Hinweis für Planer und Architekten:</strong> Für die im Erdreich eingelassenen Skate-Elemente stellen wir einen Systemschnitt zur Verfügung. Bei größeren Skateanlagen ab 100.000 EUR brutto können wir DWG-Dateien bereitstellen. Für bestehende Flächen werden Module mit Übergangsblechen aufgestellt — bei neuen Flächen können Module ohne Übergangsbleche zum Anbetonieren verwendet werden.
            </div>
        </div>

        {/* 4. PROCESS STEPS */}
        <div className="bg-brand-surface border-y border-brand-dark/10 py-24 mb-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">Workflow</span>
                    <h2 className="text-4xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter">
                        Der Weg zum <span className="text-brand-orange">Park.</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                    <ProcessStep number="01" title="Analyse & Skizze" desc="Wir prüfen Ihren Standort (digital oder vor Ort) und erstellen erste Layout-Ideen basierend auf Budget und Zielgruppe." />
                    <ProcessStep number="02" title="3D Visualisierung" desc="Sie erhalten eine Draufsicht und 3D-Zeichnung der vorgeschlagenen Anlage sowie ein Angebot mit den Kosten der eingeplanten Elemente." />
                    <ProcessStep number="03" title="Ausführung" desc="Nach Freigabe erstellen wir die exakten Werkpläne. Die Module werden im Werk gefertigt und just-in-time geliefert." />
                </div>
            </div>
        </div>

        {/* 5. BAU & UMSETZUNG — Inhalte aus skateanlage-bauen */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 relative z-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">

                {/* Left: Text */}
                <div>
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">Bau & Umsetzung</span>
                    <h2 className="text-4xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none mb-8">
                        Schneller. Einfacher. <span className="text-brand-orange">Witterungs-unabhängig.</span>
                    </h2>
                    <div className="space-y-6 text-lg text-brand-muted leading-relaxed">
                        <p>
                            Der Bau eines Skateparks mit modularen Beton-Fertigteilen ist <strong className="text-brand-dark">schneller, einfacher und witterungsunabhängiger</strong> als eine vor Ort gegossene Ortbeton-Konstruktion. Unsere TÜV-zertifizierten Module werden im Werk unter kontrollierten Bedingungen produziert — mit konstanter Qualität und ohne Wetterrisiko.
                        </p>
                        <p>
                            Für die Aufstellung wird lediglich ein <strong className="text-brand-dark">fester Unterbau</strong> benötigt. Die Elemente lassen sich auf bestehende betonierte oder asphaltierte Flächen montieren — wahlweise mit Übergangsblechen oder auf Fundamentplatten zum Anbetonieren.
                        </p>
                        <p>
                            Unser eigens entwickeltes <strong className="text-brand-dark">Verfugungssystem</strong> ist UV- und witterungsbeständig, dauerhaft elastisch und gleichzeitig schleifbar und befahrbar. Damit lassen sich auch große Parcours nahtlos verbinden.
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
                                <h3 className="font-bold font-heading text-brand-dark uppercase mb-2">Variante 1 — Bestandsfläche</h3>
                                <p className="text-sm text-brand-muted leading-relaxed">
                                    Aufstellung auf einer bestehenden, befestigten Fläche (Beton oder Asphalt). Die Module werden mit Übergangsblechen verbunden — schnellster Aufbau ohne Erdarbeiten.
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
                                <h3 className="font-bold font-heading text-brand-dark uppercase mb-2">Variante 2 — Neue Fundamentplatte</h3>
                                <p className="text-sm text-brand-muted leading-relaxed">
                                    Bei Neuanlagen wird eine Fundamentplatte gegossen. Die Module werden direkt auf die Platte aufgestellt und anbetoniert — fugenloser Übergang zum Untergrund.
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
                                <h3 className="font-bold font-heading text-brand-dark uppercase mb-2">Variante 3 — Schotterbett</h3>
                                <p className="text-sm text-brand-muted leading-relaxed">
                                    Elemente ab 35 cm Höhe haben Arretierungsfüße zur Höheneinstellung. Damit ist eine Aufstellung auf verdichtetem Schotterbett ohne Mörtelbett möglich.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* 6. CTA */}
        <div className="max-w-4xl mx-auto px-4 text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-extrabold font-heading text-brand-dark uppercase mb-8">
                Starten wir die Planung?
            </h2>
            <p className="text-xl text-brand-muted mb-12 max-w-2xl mx-auto">
                Lassen Sie uns über Ihre Fläche sprechen. Die Erstberatung und Kostenschätzung ist für Kommunen und Vereine unverbindlich.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/kontakt" className="px-8 py-4 bg-brand-orange text-white font-extrabold uppercase tracking-widest rounded hover:bg-brand-dark transition-colors shadow-lg hover:shadow-brand-orange/50">
                    Projekt anfragen
                </Link>
                <a href="tel:+4915560090966" className="px-8 py-4 border border-brand-dark/20 text-brand-dark font-bold uppercase tracking-widest rounded hover:bg-brand-surface transition-colors">
                    Direkt anrufen
                </a>
            </div>
        </div>

        <BrochureRequestForm context="productpage" />

    </PageShell>
  );
};

export default PlanningPage;