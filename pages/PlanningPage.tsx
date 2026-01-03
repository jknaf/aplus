import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import BrochureRequestForm from '../components/BrochureRequestForm';

// --- ANIMATED BLUEPRINT COMPONENT ---
// Simulates a technical scanner verifying the quality of the plan
const BlueprintVisualizer: React.FC = () => {
    return (
        <div className="relative w-full aspect-[16/9] bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/20 shadow-2xl group">
            
            {/* Base Image (Technical Drawing) */}
            <div className="absolute inset-0">
                <img 
                    src="https://www.aplusurbandesign.com/.cm4all/mediadb/PLANUNG/1-Skate-Anlage-Planung_A%2B-756x430.jpg" 
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
    <div className="relative pl-12 border-l border-white/10 pb-12 last:pb-0 group">
        <div className="absolute left-[-20px] top-0 w-10 h-10 bg-brand-surface border border-white/20 rounded-full flex items-center justify-center font-black text-brand-orange group-hover:border-brand-orange group-hover:scale-110 transition-all duration-300 z-10">
            {number}
        </div>
        <h3 className="text-2xl font-black font-heading text-white uppercase tracking-tight mb-2 group-hover:text-brand-orange transition-colors">
            {title}
        </h3>
        <p className="text-gray-400 leading-relaxed max-w-md">
            {desc}
        </p>
    </div>
);

const PlanningPage: React.FC = () => {
  useEffect(() => {
    document.title = "Individuelle Planung & Architektur | A+ Urban Design";
  }, []);

  return (
    <PageShell title="Planung & Beratung inklusive">
        
        {/* 1. HERO SECTION */}
        <div className="relative w-full h-[80vh] -mt-16 mb-24 overflow-hidden z-10 rounded-b-2xl border-b border-white/10">
            <div className="absolute inset-0">
                 <img 
                    src="https://www.aplusurbandesign.com/.cm4all/mediadb/PLANUNG/2-Skateanlage-Planung_A%2B-756x430.jpg" 
                    alt="3D Skatepark Planung A+ Urban Design" 
                    className="w-full h-full object-cover animate-[kenburns-1_20s_infinite_alternate]"
                 />
                 <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
                 <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#020202] to-transparent"></div>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-12 z-20">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-6">
                         <span className="px-4 py-1.5 border border-green-500/50 text-green-400 bg-green-900/20 text-xs font-bold uppercase tracking-[0.2em] backdrop-blur-md rounded-full flex items-center gap-2">
                            <span className="material-symbols-outlined text-sm">check_circle</span>
                            Im Produktpreis enthalten
                         </span>
                    </div>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-heading uppercase tracking-tighter text-white leading-[0.85] mb-6 drop-shadow-2xl">
                        Planung<br/>
                        <span className="text-transparent text-outline-bold">Inklusive.</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl border-l-4 border-brand-orange pl-6 leading-relaxed">
                        Sie kaufen kein Produkt von der Stange. Sie erhalten eine individuelle Architektenleistung, maßgeschneidert auf Ihren Standort und Ihre Bedürfnisse.
                    </p>
                </div>
            </div>
        </div>

        {/* 2. THE ARCHITECT ADVANTAGE */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 relative z-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                
                {/* Left: Text */}
                <div className="space-y-8">
                    <h2 className="text-4xl md:text-5xl font-black font-heading text-white uppercase tracking-tighter leading-none">
                        Vom Architekten <span className="text-brand-orange">gedacht.</span><br/>
                        Nicht vom Verkäufer.
                    </h2>
                    <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
                        <p>
                            Bei A+ Urban Design ist die Planung kein externer Posten, sondern der Kern unserer Arbeit. Gründer <strong className="text-white">Dipl.-Ing. Cüneyit Akcakoca</strong> ist freier Architekt. Das bedeutet für Sie:
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-brand-orange mt-1">architecture</span>
                                <div>
                                    <strong className="text-white block uppercase text-sm tracking-wide mb-1">Fachkompetenz</strong>
                                    Wir verstehen Stadtplanung, Sichtachsen und Lärmschutz.
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-brand-orange mt-1">design_services</span>
                                <div>
                                    <strong className="text-white block uppercase text-sm tracking-wide mb-1">Individuelle Anpassung</strong>
                                    Kein "Copy & Paste". Jedes Modul wird so platziert, dass der Flow stimmt.
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <span className="material-symbols-outlined text-brand-orange mt-1">verified</span>
                                <div>
                                    <strong className="text-white block uppercase text-sm tracking-wide mb-1">Sicherheit</strong>
                                    Normgerechte Planung nach DIN EN 14974 ist bei uns Standard.
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right: The Blueprint Visualizer */}
                <div className="relative">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-orange/20 blur-[60px] rounded-full"></div>
                    <BlueprintVisualizer />
                    <div className="mt-4 flex justify-between items-center text-xs font-mono text-gray-500 uppercase tracking-widest px-2">
                        <span>Fig 01. Technische Zeichnung</span>
                        <span>Status: Approved</span>
                    </div>
                </div>

            </div>
        </div>

        {/* 3. PROCESS STEPS */}
        <div className="bg-white/5 border-y border-white/10 py-24 mb-32 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">
                        Workflow
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black font-heading text-white uppercase tracking-tighter">
                        Der Weg zum <span className="text-transparent text-outline-bold">Park.</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                    <ProcessStep 
                        number="01"
                        title="Analyse & Skizze"
                        desc="Wir prüfen Ihren Standort (digital oder vor Ort) und erstellen erste Layout-Ideen basierend auf Budget und Zielgruppe."
                    />
                    <ProcessStep 
                        number="02"
                        title="3D Visualisierung"
                        desc="Sie erhalten fotorealistische 3D-Renderings, um Politik und Jugendliche gleichermaßen zu überzeugen."
                    />
                    <ProcessStep 
                        number="03"
                        title="Ausführung"
                        desc="Nach Freigabe erstellen wir die exakten Werkpläne. Die Module werden im Werk gefertigt und just-in-time geliefert."
                    />
                </div>
            </div>
        </div>

        {/* 4. CTA */}
        <div className="max-w-4xl mx-auto px-4 text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-black font-heading text-white uppercase mb-8">
                Starten wir die Planung?
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
                Lassen Sie uns über Ihre Fläche sprechen. Die Erstberatung und Kostenschätzung ist für Kommunen und Vereine unverbindlich.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/kontakt" className="px-8 py-4 bg-brand-orange text-black font-black uppercase tracking-widest rounded hover:bg-white transition-colors shadow-lg hover:shadow-brand-orange/50">
                    Projekt anfragen
                </Link>
                <a href="tel:+4915560090966" className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest rounded hover:bg-white/10 transition-colors">
                    Direkt anrufen
                </a>
            </div>
        </div>

        <BrochureRequestForm context="productpage" />

    </PageShell>
  );
};

export default PlanningPage;