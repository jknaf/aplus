import React, { useEffect, useRef, useState } from 'react';
import PageShell from '../components/PageShell';
import BrochureRequestForm from '../components/BrochureRequestForm';

// --- Animated Counter Component ---
const StatCounter: React.FC<{ end: number; suffix?: string; label: string }> = ({ end, suffix = '', label }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    let start = 0;
                    const duration = 2000;
                    const increment = end / (duration / 16);
                    
                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= end) {
                            setCount(end);
                            clearInterval(timer);
                        } else {
                            setCount(Math.floor(start));
                        }
                    }, 16);
                    observer.unobserve(entries[0].target);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [end]);

    return (
        <div ref={ref} className="text-center p-8 border border-brand-dark/5 bg-brand-surface/60 group hover:border-brand-orange/30 transition-colors duration-500 rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <div className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark mb-2 group-hover:text-brand-orange transition-colors duration-300">
                {count}{suffix}
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-brand-muted">{label}</div>
        </div>
    );
};

// --- Redesigned "Das Prinzip" Card ---
const PrincipleCard: React.FC<{ number: string; title: string; desc: string }> = ({ number, title, desc }) => (
    <div className="relative p-8 md:p-12 border border-brand-dark/10 bg-brand-surface/60 group hover:border-brand-orange/50 transition-all duration-500 overflow-hidden rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        {/* Large Background Number */}
        <div className="absolute -top-6 -right-6 text-[10rem] font-extrabold font-heading text-brand-dark/5 group-hover:text-brand-orange/10 transition-colors duration-500 select-none leading-none z-0">
            {number}
        </div>

        <div className="relative z-10">
            <div className="w-12 h-1 bg-brand-orange mb-6 group-hover:w-24 transition-all duration-500"></div>
            <h3 className="text-3xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter mb-4">{title}</h3>
            <p className="text-lg text-brand-muted leading-relaxed max-w-sm">
                {desc}
            </p>
        </div>
    </div>
);

const AboutPage: React.FC = () => {
  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);

  return (
    <PageShell title="Über A+ Urban Design">
      
      {/* 1. CINEMATIC HERO - UNIFIED STYLE */}
      <div className="relative w-full h-[80vh] -mt-16 mb-32 flex items-center justify-center overflow-hidden">
        {/* Background Texture/Image */}
        <div className="absolute inset-0 z-0">
             <img 
                src="/images/planung/skateanlage-planung-02.jpg" 
                alt="Architecture Planning" 
                className="w-full h-full object-cover grayscale opacity-40 scale-105 animate-[kenburns-1_30s_infinite_alternate]"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent"></div>
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl">
            <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-8 uppercase tracking-widest bg-brand-orange/10 backdrop-blur-sm rounded-md animate-fade-in-up">
                SEIT 2005 • STUTTGART
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-heading uppercase tracking-tighter text-white leading-[0.85] mb-8 animate-fade-in-up [animation-delay:200ms]">
                Beton<br/>
                <span className="text-brand-orange">in</span>
                <span className="text-brand-orange">Bestform</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto animate-fade-in-up [animation-delay:400ms]">
                Wir verwandeln graue Flächen in lebendige Begegnungsorte. 
                <span className="text-white font-bold"> Präzise. Modular. Für die Ewigkeit.</span>
            </p>
        </div>
      </div>

      {/* 2. STATS GRID */}
      <div className="container mx-auto px-4 mb-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <StatCounter end={250} suffix="+" label="Realisierte Projekte" />
              <StatCounter end={15} label="Jahre Erfahrung" />
              <StatCounter end={100} suffix="%" label="Made in Germany" />
              <StatCounter end={45} label="Betonklasse C35/45" />
          </div>
      </div>

      {/* 3. THE MISSION (Split Layout) */}
      <div className="container mx-auto px-4 mb-32">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
              <div className="lg:w-1/2">
                  <div className="relative rounded-xl overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                      {/* REAL MONTAGE IMAGE instead of generic stock */}
                      <img src="/images/montage/transport-01.jpg" alt="Logistik und Montage" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"/>
                      <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
                      <div className="absolute bottom-4 right-4 bg-black/80 px-2 py-1 text-[10px] font-mono text-brand-orange">FIG 01. FUNDAMENTFREIE MONTAGE</div>
                  </div>
              </div>
              <div className="lg:w-1/2">
                   <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/10 backdrop-blur-sm rounded-md">
                        Vision
                   </span>
                  <h2 className="text-5xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter mb-8 leading-none">
                      Unsere <span className="text-brand-orange">Philosophie.</span>
                  </h2>
                  <div className="space-y-8">
                      <p className="text-lg text-brand-muted leading-relaxed border-l-2 border-brand-orange pl-6">
                          Öffentliche Räume sind die Wohnzimmer unserer Städte. Sie müssen einladend sein, aber auch den härtesten Bedingungen standhalten.
                      </p>
                      <p className="text-lg text-brand-muted leading-relaxed">
                          Wir haben uns vom klassischen Tiefbau verabschiedet. Unsere Antwort auf teure Baustellen und lange Sperrzeiten ist <strong>Modularität</strong>. Wir fertigen im Werk unter perfekten Bedingungen und montieren vor Ort in Rekordzeit.
                      </p>
                      <div className="grid grid-cols-2 gap-4 mt-8">
                          <div className="bg-brand-surface/60 p-6 rounded-lg border border-brand-dark/5 shadow-sm">
                              <span className="material-symbols-outlined text-brand-orange mb-2 text-3xl">eco</span>
                              <h4 className="font-bold text-brand-dark uppercase text-sm mb-1">Nachhaltig</h4>
                              <p className="text-xs text-brand-muted">Recycelbar & Langlebig</p>
                          </div>
                          <div className="bg-brand-surface/60 p-6 rounded-lg border border-brand-dark/5 shadow-sm">
                              <span className="material-symbols-outlined text-brand-orange mb-2 text-3xl">engineering</span>
                              <h4 className="font-bold text-brand-dark uppercase text-sm mb-1">Präzise</h4>
                              <p className="text-xs text-brand-muted">Millimetergenaue Fertigung</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* 4. DAS PRINZIP (Redesigned - Transparent Background) */}
      <div className="border-y border-brand-dark/10 py-32 mb-32 relative overflow-hidden bg-brand-surface/60">
          <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-20">
                  <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/10 backdrop-blur-sm rounded-md">
                        Der A+ Standard
                  </span>
                  <h2 className="text-6xl md:text-8xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                      Das <span className="text-brand-orange">Prinzip.</span>
                  </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <PrincipleCard
                      number="01"
                      title="Planung"
                      desc="Individuelle 3D-Planung mit Draufsicht und Kostenübersicht. Wir integrieren unsere Anlagen nahtlos in Ihre Umgebung."
                  />
                  <PrincipleCard
                      number="02"
                      title="Fertigung"
                      desc="C35/45 Hochleistungsbeton aus kontrollierter Werksumgebung. Bessere Qualität als Ortbeton, wetterunabhängig."
                  />
                  <PrincipleCard
                      number="03"
                      title="Transport"
                      desc="Module mit Gabelstapler oder Autokran abladen. Hohlkörperbauweise reduziert das Gewicht für einfache Logistik."
                  />
                  <PrincipleCard
                      number="04"
                      title="Montage"
                      desc="Aufstellen auf verdichtetes Schotterbett — kein Tiefbau. Komplette Parks in wenigen Tagen. TÜV-zertifiziert, recycelbar, versetzbar."
                  />
              </div>
          </div>
      </div>

      {/* 5. TEAM / LEADERSHIP */}
      <div className="container mx-auto px-4 mb-32">
           <div className="max-w-4xl mx-auto bg-white backdrop-blur-md border border-brand-dark/10 p-8 md:p-12 relative group overflow-hidden rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-brand-orange/20 transition-colors duration-500"></div>
                
                <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                    <div className="w-40 h-40 md:w-56 md:h-56 flex-shrink-0 bg-brand-surface/60 border border-brand-dark/10 rounded-full overflow-hidden relative shadow-2xl">
                         <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" alt="Cüneyit Akcakoca" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"/>
                    </div>
                    <div className="text-center md:text-left">
                        <div className="inline-block px-3 py-1 bg-brand-surface text-xs font-mono text-brand-dark mb-6 rounded uppercase tracking-widest">Gründer & Architekt</div>
                        <h3 className="text-4xl font-extrabold font-heading text-brand-dark uppercase mb-2 tracking-tight">Dipl.-Ing. Cüneyit Akcakoca</h3>
                        <p className="text-brand-orange font-bold mb-6 text-lg">Freier Architekt</p>
                        <p className="text-brand-muted leading-relaxed text-lg max-w-lg">
                            "Architektur endet nicht an der Gebäudekante. Der Raum dazwischen – dort, wo das Leben stattfindet – verdient dieselbe Qualität und Aufmerksamkeit."
                        </p>
                         <div className="mt-8 flex justify-center md:justify-start gap-4">
                             <a href="mailto:post@aplusurbandesign.com" className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-surface/60 hover:bg-brand-orange hover:text-white transition-all text-brand-muted"><span className="material-symbols-outlined">mail</span></a>
                             <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-surface/60 hover:bg-[#0077b5] hover:text-white transition-all text-brand-muted"><span className="material-symbols-outlined">work</span></a>
                         </div>
                    </div>
                </div>
           </div>
      </div>

      <BrochureRequestForm context="homepage" />

    </PageShell>
  );
};

export default AboutPage;