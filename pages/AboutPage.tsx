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
        <div ref={ref} className="text-center p-8 border border-white/5 bg-white/5 backdrop-blur-sm group hover:border-brand-orange/30 transition-colors duration-500 rounded-lg">
            <div className="text-5xl md:text-6xl font-black font-heading text-white mb-2 group-hover:text-brand-orange transition-colors duration-300">
                {count}{suffix}
            </div>
            <div className="text-xs font-mono uppercase tracking-widest text-gray-500">{label}</div>
        </div>
    );
};

// --- Redesigned "Das Prinzip" Card ---
const PrincipleCard: React.FC<{ number: string; title: string; desc: string }> = ({ number, title, desc }) => (
    <div className="relative p-8 md:p-12 border border-white/10 bg-black/40 backdrop-blur-md group hover:border-brand-orange/50 transition-all duration-500 overflow-hidden rounded-xl">
        {/* Large Background Number */}
        <div className="absolute -top-6 -right-6 text-[10rem] font-black font-heading text-white/5 group-hover:text-brand-orange/10 transition-colors duration-500 select-none leading-none z-0">
            {number}
        </div>
        
        <div className="relative z-10">
            <div className="w-12 h-1 bg-brand-orange mb-6 group-hover:w-24 transition-all duration-500"></div>
            <h3 className="text-3xl font-black font-heading text-white uppercase tracking-tighter mb-4">{title}</h3>
            <p className="text-lg text-gray-400 leading-relaxed max-w-sm">
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
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2000&auto=format&fit=crop" 
                alt="Architecture Texture" 
                className="w-full h-full object-cover grayscale opacity-40 scale-105 animate-[kenburns-1_30s_infinite_alternate]"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl">
            <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-8 uppercase tracking-widest bg-brand-orange/10 backdrop-blur-sm rounded-md animate-fade-in-up">
                SEIT 2005 • STUTTGART
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-heading uppercase tracking-tighter text-white leading-[0.85] mb-8 animate-fade-in-up [animation-delay:200ms]">
                Beton<br/>
                <span className="text-outline-bold">in</span>
                <span className="text-brand-orange">Bestform</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto animate-fade-in-up [animation-delay:400ms]">
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
                  <div className="relative rounded-xl overflow-hidden border border-white/10 group">
                      <img src="https://images.unsplash.com/photo-1564619730592-30113c042398?q=80&w=1200&auto=format&fit=crop" alt="Construction Site" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"/>
                      <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
                  </div>
              </div>
              <div className="lg:w-1/2">
                   <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/10 backdrop-blur-sm rounded-md">
                        Vision
                   </span>
                  <h2 className="text-5xl font-black font-heading text-white uppercase tracking-tighter mb-8 leading-none">
                      Unsere <span className="text-outline-orange">Philosophie.</span>
                  </h2>
                  <div className="space-y-8">
                      <p className="text-lg text-gray-400 leading-relaxed border-l-2 border-brand-orange pl-6">
                          Öffentliche Räume sind die Wohnzimmer unserer Städte. Sie müssen einladend sein, aber auch den härtesten Bedingungen standhalten.
                      </p>
                      <p className="text-lg text-gray-400 leading-relaxed">
                          Wir haben uns vom klassischen Tiefbau verabschiedet. Unsere Antwort auf teure Baustellen und lange Sperrzeiten ist <strong>Modularität</strong>. Wir fertigen im Werk unter perfekten Bedingungen und montieren vor Ort in Rekordzeit.
                      </p>
                      <div className="grid grid-cols-2 gap-4 mt-8">
                          <div className="bg-white/5 p-6 rounded-lg border border-white/5 backdrop-blur-sm">
                              <span className="material-symbols-outlined text-brand-orange mb-2 text-3xl">eco</span>
                              <h4 className="font-bold text-white uppercase text-sm mb-1">Nachhaltig</h4>
                              <p className="text-xs text-gray-500">Recycelbar & Langlebig</p>
                          </div>
                          <div className="bg-white/5 p-6 rounded-lg border border-white/5 backdrop-blur-sm">
                              <span className="material-symbols-outlined text-brand-orange mb-2 text-3xl">engineering</span>
                              <h4 className="font-bold text-white uppercase text-sm mb-1">Präzise</h4>
                              <p className="text-xs text-gray-500">Millimetergenaue Fertigung</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* 4. DAS PRINZIP (Redesigned - Transparent Background) */}
      <div className="border-y border-white/10 py-32 mb-32 relative overflow-hidden bg-white/5 backdrop-blur-sm">
          <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-20">
                  <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/10 backdrop-blur-sm rounded-md">
                        Der A+ Standard
                  </span>
                  <h2 className="text-6xl md:text-8xl font-black font-heading text-white uppercase tracking-tighter leading-none">
                      Das <span className="text-outline-orange">Prinzip.</span>
                  </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <PrincipleCard 
                      number="01" 
                      title="Planung" 
                      desc="Wir denken in 3D. Von der ersten Skizze bis zum BIM-Modell integrieren wir unsere Anlagen nahtlos in Ihre Umgebung." 
                  />
                  <PrincipleCard 
                      number="02" 
                      title="Fertigung" 
                      desc="Keine Kompromisse. In unserer kontrollierten Werksumgebung entsteht Hochleistungsbeton, der Wind, Wetter und Wheels trotzt." 
                  />
                  <PrincipleCard 
                      number="03" 
                      title="Montage" 
                      desc="Plug & Play für Beton. Unsere Teams installieren komplette Parks oft in wenigen Tagen. Ohne schweres Erdbaugerät, ohne Lärm." 
                  />
              </div>
          </div>
      </div>

      {/* 5. TEAM / LEADERSHIP */}
      <div className="container mx-auto px-4 mb-32">
           <div className="max-w-4xl mx-auto bg-black/40 backdrop-blur-md border border-white/10 p-8 md:p-12 relative group overflow-hidden rounded-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-brand-orange/20 transition-colors duration-500"></div>
                
                <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                    <div className="w-40 h-40 md:w-56 md:h-56 flex-shrink-0 bg-white/5 border border-white/20 rounded-full overflow-hidden relative shadow-2xl">
                         <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" alt="Cüneyit Akcakoca" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"/>
                    </div>
                    <div className="text-center md:text-left">
                        <div className="inline-block px-3 py-1 bg-white/10 text-xs font-mono text-white mb-6 rounded uppercase tracking-widest">Gründer & Architekt</div>
                        <h3 className="text-4xl font-black font-heading text-white uppercase mb-2 tracking-tight">Dipl.-Ing. Cüneyit Akcakoca</h3>
                        <p className="text-brand-orange font-bold mb-6 text-lg">Freier Architekt</p>
                        <p className="text-gray-400 leading-relaxed text-lg max-w-lg">
                            "Architektur endet nicht an der Gebäudekante. Der Raum dazwischen – dort, wo das Leben stattfindet – verdient dieselbe Qualität und Aufmerksamkeit."
                        </p>
                         <div className="mt-8 flex justify-center md:justify-start gap-4">
                             <a href="mailto:post@aplusurbandesign.com" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-brand-orange hover:text-white transition-all text-gray-400"><span className="material-symbols-outlined">mail</span></a>
                             <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#0077b5] hover:text-white transition-all text-gray-400"><span className="material-symbols-outlined">work</span></a>
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