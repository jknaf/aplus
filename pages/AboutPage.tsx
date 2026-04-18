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
    <PageShell title="Über A+ Urban Design — Skatepark-Hersteller seit 1998" description="Skatepark-Hersteller mit über 25 Jahren Erfahrung: TÜV-zertifizierte Beton-Skateparks und urbane Anlagen. Ihr Ansprechpartner: Dipl.-Ing. Cüneyit Akcakoca, Stuttgart.">
      
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
             <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-20"></div>
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
            <p className="text-xl md:text-2xl text-white/95 font-light max-w-2xl mx-auto animate-fade-in-up [animation-delay:400ms]">
                Skatepark-Hersteller und Planungsbüro aus Stuttgart — wir verwandeln graue Flächen in lebendige Begegnungsorte.
                {/* Roland §2.1: 30-Jahre-Jubiläums-Claim noch klären */}
                <span className="text-white font-bold"> Präzise. Modular. Vandalismussicher. Für die Ewigkeit.</span>
            </p>
        </div>
      </div>

      {/* 2. STATS GRID */}
      <div className="container mx-auto px-4 mb-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-8">
              <StatCounter end={432} suffix="+" label="Realisierte Anlagen" />
              <StatCounter end={30} label="Jahre Erfahrung" />
              <StatCounter end={100} suffix="%" label="Made in Europe" />
              <StatCounter end={45} label="Betonklasse C35/45" />
          </div>
          {/* Legende zu den realisierten Anlagen (Stand Ende 2024) */}
          <div className="max-w-4xl mx-auto text-center">
              <p className="text-xs font-mono uppercase tracking-widest text-brand-muted mb-4">Verteilung der 432 realisierten Anlagen (Stand Ende 2024)</p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                  <div className="bg-brand-surface/40 border border-brand-dark/5 rounded-lg p-3">
                      <div className="font-mono text-brand-orange text-lg font-bold">~348</div>
                      <div className="text-xs text-brand-muted">Skate-Anlagen <span className="block text-[10px] opacity-70">(312 ohne Nachbestellungen)</span></div>
                  </div>
                  <div className="bg-brand-surface/40 border border-brand-dark/5 rounded-lg p-3">
                      <div className="font-mono text-brand-orange text-lg font-bold">~45</div>
                      <div className="text-xs text-brand-muted">Umkleidekabinen</div>
                  </div>
                  <div className="bg-brand-surface/40 border border-brand-dark/5 rounded-lg p-3">
                      <div className="font-mono text-brand-orange text-lg font-bold">~23</div>
                      <div className="text-xs text-brand-muted">Grillstellen</div>
                  </div>
                  <div className="bg-brand-surface/40 border border-brand-dark/5 rounded-lg p-3">
                      <div className="font-mono text-brand-orange text-lg font-bold">~15</div>
                      <div className="text-xs text-brand-muted">Hockey-Felder</div>
                  </div>
                  <div className="bg-brand-surface/40 border border-brand-dark/5 rounded-lg p-3">
                      <div className="font-mono text-brand-orange text-lg font-bold">1</div>
                      <div className="text-xs text-brand-muted">Pump-Track</div>
                  </div>
              </div>
          </div>
      </div>

      {/* 3. THE MISSION (Split Layout) */}
      <div className="container mx-auto px-4 mb-32">
          <div className="flex flex-col lg:flex-row gap-16 items-center mb-16">
              <div className="lg:w-1/2">
                  <div className="relative rounded-xl overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                      <img src="/images/montage/transport-01.jpg" alt="Logistik und Montage" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"/>
                      <div className="absolute bottom-4 right-4 bg-black/80 px-2 py-1 text-[10px] font-mono text-brand-orange">FIG 01. TRANSPORT</div>
                  </div>
              </div>
              <div className="lg:w-1/2">
                   <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/10 backdrop-blur-sm rounded-md">Vision</span>
                  <h2 className="text-5xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter mb-8 leading-none">
                      Unsere <span className="text-brand-orange">Philosophie.</span>
                  </h2>
                  <div className="space-y-6">
                      <p className="text-lg text-brand-muted leading-relaxed border-l-2 border-brand-orange pl-6">
                          Nachhaltig, langlebig, wartungsarm, witterungsbeständig, wiederverwendbar, recycelbar und vandalismussicher. Modulare Elemente mit unendlich vielen Kombinationsmöglichkeiten, leichtes Versetzen und Umbauen bestehender Anlagen.
                      </p>
                      <p className="text-lg text-brand-muted leading-relaxed">
                          Wir fertigen im Werk unter kontrollierten Bedingungen und montieren vor Ort in Rekordzeit. Unsere TÜV-zertifizierten Module sind recycelbar, vandalismussicher und können umgebaut, erweitert, versetzt oder wiederverwendet werden.
                      </p>
                      <div className="grid grid-cols-2 gap-4 mt-8">
                          <div className="bg-brand-surface/60 p-6 rounded-lg border border-brand-dark/5 shadow-sm">
                              <span className="material-symbols-outlined text-brand-orange mb-2 text-3xl">eco</span>
                              <h4 className="font-bold text-brand-dark uppercase text-sm mb-1">Nachhaltig</h4>
                              <p className="text-xs text-brand-muted">Beton & Stahl weitgehend recycelbar</p>
                          </div>
                          <div className="bg-brand-surface/60 p-6 rounded-lg border border-brand-dark/5 shadow-sm">
                              <span className="material-symbols-outlined text-brand-orange mb-2 text-3xl">engineering</span>
                              <h4 className="font-bold text-brand-dark uppercase text-sm mb-1">Präzise</h4>
                              <p className="text-xs text-brand-muted">Millimetergenaue Werksfertigung</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          {/* MONTAGE PROZESS — alle 4 Bilder */}
          <div className="mb-8">
              <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">Montage-Prozess</span>
              <h3 className="text-3xl md:text-4xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter mb-4">
                  Vom LKW zum fertigen <span className="text-brand-orange">Park.</span>
              </h3>
              <p className="text-brand-muted max-w-2xl mb-8">
                  Die Montage unserer Skate-Elemente erfolgt direkt auf einer betonierten oder asphaltierten Rollfläche mit Übergangsblechen — oder auf einer Fundamentplatte zum Anbetonieren. Wir stellen eine Montage- und Wartungsanleitung zur Verfügung.
              </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                  <img src="/images/montage/transport-01.jpg" alt="Abladen der Skate-Elemente" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <span className="text-brand-orange font-mono text-xs">01</span>
                      <span className="text-white text-sm font-bold ml-2">Transport</span>
                  </div>
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                  <img src="/images/montage/abladen-02.jpg" alt="Bewegen der Skate-Module" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <span className="text-brand-orange font-mono text-xs">02</span>
                      <span className="text-white text-sm font-bold ml-2">Abladen</span>
                  </div>
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                  <img src="/images/montage/anbetonieren-03.jpg" alt="Montage zum Anbetonieren" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <span className="text-brand-orange font-mono text-xs">03</span>
                      <span className="text-white text-sm font-bold ml-2">Positionieren</span>
                  </div>
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                  <img src="/images/montage/aufbau-04.jpg" alt="Montage der Skate-Pipe mit Autokran" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <span className="text-brand-orange font-mono text-xs">04</span>
                      <span className="text-white text-sm font-bold ml-2">Aufbau</span>
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
              
              {/* Roland §2.6: Ob der 4-Schritt-Prozess für alle Produkte gilt oder nur Skate noch klären */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <PrincipleCard
                      number="01"
                      title="Planung"
                      desc="Individuelle 3D-Planung, bauliche Anpassung und Absteckung — inkl. ansatzfreiem Fundamentschutz und Abtrag Bewehrung (nur für Skate-Anlagen). Wir integrieren die Anlagen nahtlos in Ihre Umgebung."
                  />
                  <PrincipleCard
                      number="02"
                      title="Fertigung"
                      desc="C35/45 Stahlbeton aus kontrollierter Werksumgebung. Hohe Qualitätskontrolle bei Betonstärken, Bewehrung und Fugen — wetterunabhängig. TÜV-Überprüfung der Fertigungsstätte (nur für Skate-Elemente)."
                  />
                  <PrincipleCard
                      number="03"
                      title="Transport"
                      desc="Module mit Gabelstapler oder Autokran abladen. Hohlkörperbauweise reduziert das Gewicht für einfache Logistik. Transport-Absicherung (nur für Skate-Anlagen)."
                  />
                  <PrincipleCard
                      number="04"
                      title="Montage"
                      desc="Aufstellen in wenigen Tagen. Keine Bodenbefestigung für Skate-Elemente erforderlich. TÜV-zertifiziert für Skate-Elemente. Recycelbar und versetzbar."
                  />
              </div>
          </div>
      </div>

      {/* 5. TEAM / LEADERSHIP */}
      <div className="container mx-auto px-4 mb-32">
           <div className="max-w-4xl mx-auto bg-white backdrop-blur-md border border-brand-dark/10 p-8 md:p-12 relative group overflow-hidden rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-brand-orange/20 transition-colors duration-500"></div>
                
                <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                    <div className="text-center md:text-left">
                        <div className="inline-block px-3 py-1 bg-brand-surface text-xs font-mono text-brand-dark mb-6 rounded uppercase tracking-widest">Ihr Ansprechpartner</div>
                        <h3 className="text-4xl font-extrabold font-heading text-brand-dark uppercase mb-2 tracking-tight">Dipl.-Ing. Cüneyit Akcakoca</h3>
                        <p className="text-brand-orange font-bold mb-6 text-lg">Architekt · A+ Urban Design</p>
                        <p className="text-brand-muted leading-relaxed text-lg max-w-lg">
                            "Architektur endet nicht an der Gebäudekante. Der Raum dazwischen – dort, wo das Leben stattfindet – verdient dieselbe Qualität und Aufmerksamkeit."
                        </p>
                         <div className="mt-8 flex justify-center md:justify-start gap-4">
                             <a href="mailto:post@aplusurbandesign.com" className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-surface/60 hover:bg-brand-orange hover:text-white transition-all text-brand-muted"><span className="material-symbols-outlined">mail</span></a>
                             <a href="https://www.linkedin.com/in/cüneyit-akcakoca-6577673/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn-Profil" className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-surface/60 hover:bg-[#0077b5] hover:text-white transition-all text-brand-muted">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                </svg>
                             </a>
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