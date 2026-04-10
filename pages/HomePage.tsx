import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import BrochureRequestForm from '../components/BrochureRequestForm';
import PageShell from '../components/PageShell';

// --- Animated Section Utility ---
const AnimatedSection: React.FC<{children: React.ReactNode, className?: string}> = ({ children, className }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-fade-in-up');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, []);

    return <div ref={ref} className={`animated-section ${className}`}>{children}</div>;
};

// --- FAQ Section ---
const FAQSection: React.FC = () => {
    const faqs = [
        {
            q: "Was kostet ein Beton-Skatepark oder Pumptrack?",
            a: "Die Kosten für einen Skatepark hängen von Größe, Elementauswahl und Untergrund ab. Modulare Betonfertigteile sind in vielen Projekten kostengünstiger als Ortbeton-Lösungen, weil teure Erdarbeiten, Bodenplatten und aufwendige Vorbereitungen weitgehend entfallen. Kommunen und Gemeinden können über die Sportstättenförderung Fördermittel beantragen. Wir bieten eine unverbindliche Erstberatung mit projektbezogener Kostenschätzung an."
        },
        {
            q: "Skatepark, Skateanlage oder Skaterpark — was ist der Unterschied?",
            a: "Die korrekte Bezeichnung ist Skatepark oder Skateanlage — umgangssprachlich wird oft auch Skaterpark, Skaterbahn oder Skaterplatz gesagt. Gemeint ist dasselbe: eine speziell gestaltete Fläche mit Obstacles wie Ramps, Bowls, Rails und Halfpipes für Skateboard, BMX, Scooter und Inline-Skates. Wir als Skatepark-Hersteller bauen diese Anlagen aus modularen Betonfertigteilen."
        },
        {
            q: "Sind die Anlagen auch für BMX und Scooter geeignet?",
            a: "Ja. Unsere Betonoberflächen sind robust und halten den Punktbelastungen von BMX-Pegs und Scooter-Decks dauerhaft stand. Der massive Beton bietet zuverlässigen Grip für alle Rollsportarten – Skateboard, BMX, Scooter oder Inline-Skates. Ob Skatepark, BMX-Park oder Pumptrack: Alle Anlagen sind multisportfähig ausgelegt."
        },
        {
            q: "Warum Beton statt Holz oder Asphalt?",
            a: "Beton ist formstabil, wartungsfrei und vandalismussicher — selbst bei extremen Temperaturen. Unsere Skaterampen und Pumptrack-Elemente aus Hochleistungsbeton C35/45 überdauern Holz und Asphalt um Jahrzehnte. Das modulare System ermöglicht zudem maximale Flexibilität: Elemente können umgestellt, entfernt oder ergänzt werden, ohne Fundamente aufzubrechen."
        },
        {
            q: "Gibt es Fördermittel für Skateparks und Pumptracks?",
            a: "Ja. Kommunen und Gemeinden können Fördermittel über die Sportstättenförderung von Bund und Ländern beantragen. Auch Programme für urbane Freiräume und Bewegungsförderung kommen infrage. Wir unterstützen bei der Ausschreibung und liefern alle technischen Unterlagen, die für den Förderantrag benötigt werden — von der DIN-EN-14974-Zertifizierung bis zur statischen Berechnung."
        },
        {
            q: "Wie steht es um Lärmschutz und Baugenehmigung?",
            a: "Massive Betonelemente reduzieren Geräuschemissionen erheblich gegenüber leichteren Hohlkörper-Konstruktionen. Erfahrungswerte aus realisierten Projekten zeigen deutliche Pegelreduktionen, was Baugenehmigungen vereinfachen kann. Wir unterstützen im Genehmigungsverfahren mit statischen Berechnungen nach den einschlägigen Normen."
        },
        {
            q: "Können wir klein anfangen und die Anlage später erweitern?",
            a: "Ja, das ist der Kern unseres A+ Modulsystems. Viele Kommunen starten mit einem Starter-Kit — zum Beispiel Quarter, Bank und Rail — und erweitern den Skatepark über Jahre hinweg. Ob Skateanlage, Pumptrack oder BMX-Park: Da keine Fundamente gegossen werden müssen, bleibt die Fläche jederzeit flexibel und erweiterbar. Elemente können auch umgestellt oder an einen neuen Standort versetzt werden."
        },
        {
            q: "Wie läuft die Planung und der Bau eines Skateparks ab?",
            a: "Der Prozess beginnt mit einer Bedarfsanalyse vor Ort. Als Skatepark-Hersteller übernehmen wir die komplette Architektenleistung: vom Entwurf über die 3D-Planung und TÜV-konforme Ausarbeitung bis zur schlüsselfertigen Montage. Die fundamentfreien Betonfertigteile werden per LKW angeliefert und mit einem Kran aufgestellt — eine typische Skateanlage steht innerhalb weniger Tage."
        }
    ];

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(item => ({
            "@type": "Question",
            "name": item.q,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
            }
        }))
    };

    return (
        <section className="py-24 relative overflow-hidden bg-brand-surface/30">
             <script type="application/ld+json">
                {JSON.stringify(faqSchema)}
            </script>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                 <AnimatedSection className="mb-16 text-center">
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">
                        Wissen & Technik
                    </span>
                    <h2 className="text-4xl md:text-7xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-[0.9]">
                        Häufige <span className="text-brand-orange">Fragen.</span>
                    </h2>
                    <p className="text-brand-muted mt-6 max-w-2xl mx-auto">
                        Alles über Planung, Kosten, Fördermittel und Bau von Skateparks, Pumptracks und BMX-Anlagen — von Ihrem Skatepark-Hersteller.
                    </p>
                </AnimatedSection>
                <div className="max-w-4xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <details key={index} className="group bg-white rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.05)] border border-brand-dark/5 overflow-hidden transition-all duration-300 open:border-brand-orange/40 open:shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
                            <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-brand-surface/50 transition-colors">
                                <span className="font-bold text-base md:text-xl text-brand-dark group-hover:text-brand-orange transition-colors pr-8">
                                    {faq.q}
                                </span>
                                <span className="material-symbols-outlined text-brand-muted transition-transform duration-300 group-open:rotate-180 group-open:text-brand-orange">
                                    expand_more
                                </span>
                            </summary>
                            <div className="px-6 pb-6 pt-0 text-brand-muted leading-relaxed border-t border-brand-dark/5 mt-2 animate-fade-in-up text-sm md:text-base">
                                {faq.a}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Scrollytelling Product Component ---
const ProductScrollytelling: React.FC = () => {
    const [activeId, setActiveId] = useState<string>(PRODUCTS[0].id);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('data-id');
                        if (id) setActiveId(id);
                    }
                });
            },
            { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
        );
        itemRefs.current.forEach((el) => { if (el) observer.observe(el); });
        return () => { itemRefs.current.forEach((el) => { if (el) observer.unobserve(el); }); };
    }, []);

    return (
        <section id="produkte" className="relative z-10 py-24 border-y border-brand-dark/5 bg-transparent">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="mb-24 text-center">
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">
                        Unser Portfolio
                    </span>
                    <h2 className="text-4xl md:text-7xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-[0.9]">
                        Technische<br/>
                        <span className="text-brand-orange">Perfektion.</span>
                    </h2>
                </AnimatedSection>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                    {/* Sticky HUD */}
                    <div className="hidden lg:block lg:w-1/2 sticky top-32">
                        <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-brand-dark/10 bg-brand-surface/50 shadow-[0_8px_30px_rgba(0,0,0,0.1)] group">
                            <div className="absolute inset-0 z-20 pointer-events-none p-6 flex flex-col justify-end">
                                <div className="flex justify-end">
                                    <div className="border border-white/20 px-2 py-1 bg-brand-dark/60 backdrop-blur-md rounded-sm">
                                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                                            TÜV ZERTIFIZIERT
                                        </span>
                                    </div>
                                </div>
                            </div>
                            {PRODUCTS.map((product) => (
                                <div 
                                    key={product.id}
                                    className={`absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${activeId === product.id ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
                                >
                                    <img 
                                        src={product.imageUrl} 
                                        alt={product.altText} 
                                        width="800"
                                        height="800"
                                        loading="lazy"
                                        className="w-full h-full object-cover filter brightness-75 contrast-110"
                                    />
                                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
                                </div>
                            ))}
                        </div>
                        <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-brand-orange opacity-50"></div>
                    </div>

                    {/* Timeline */}
                    <div className="lg:w-1/2 relative">
                        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-brand-dark/10 to-transparent hidden md:block"></div>
                        <div className="flex flex-col gap-2 pb-[30vh]">
                            {PRODUCTS.map((product, index) => {
                                const isActive = activeId === product.id;
                                return (
                                    <div 
                                        key={product.id}
                                        data-id={product.id}
                                        ref={(el) => { itemRefs.current[index] = el; }}
                                        className={`group relative pl-0 md:pl-12 transition-all duration-500 ${isActive ? 'py-8' : 'py-6 opacity-40 hover:opacity-70'}`}
                                    >
                                        <div className={`absolute left-[14px] top-1/2 -translate-y-1/2 w-[11px] h-[11px] rounded-full border-2 transition-all duration-500 hidden md:block z-10 ${isActive ? 'bg-brand-orange border-brand-orange shadow-[0_0_15px_rgba(107,143,74,0.4)] scale-125' : 'bg-brand-bg border-brand-dark/20'}`}></div>
                                        <div className={`relative rounded-2xl border transition-all duration-500 overflow-hidden ${isActive ? 'bg-white border-brand-orange/40 shadow-[0_8px_30px_rgba(0,0,0,0.08)] scale-100' : 'bg-white/40 border-brand-dark/5 scale-[0.98]'}`}>
                                            <div className="lg:hidden h-48 relative overflow-hidden border-b border-brand-dark/10">
                                                <img 
                                                    src={product.imageUrl}
                                                    alt={product.title}
                                                    className="w-full h-full object-cover opacity-60" 
                                                    loading="lazy"
                                                    srcSet={`${product.imageUrl}?auto=compress&cs=tinysrgb&w=400 400w, ${product.imageUrl}?auto=compress&cs=tinysrgb&w=800 800w`}
                                                    sizes="(max-width: 600px) 100vw, 800px" 
                                                />
                                                <div className="absolute inset-0 bg-black/40"></div>
                                            </div>
                                            <Link to={product.path} className="block p-6 md:p-8">
                                                <div className="flex justify-between items-start mb-4">
                                                    <span className={`font-mono text-xs tracking-widest uppercase mb-1 block transition-colors ${isActive ? 'text-brand-orange' : 'text-brand-muted'}`}>
                                                        Modul 0{index + 1}
                                                    </span>
                                                    {isActive && <span className="material-symbols-outlined text-brand-orange animate-pulse">arrow_outward</span>}
                                                </div>
                                                <h3 className={`text-3xl md:text-4xl font-extrabold font-heading uppercase tracking-tight mb-4 transition-colors ${isActive ? 'text-brand-dark' : 'text-brand-muted'}`}>
                                                    {product.title}
                                                </h3>
                                                <div className={`grid transition-all duration-500 ease-in-out ${isActive ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                                                    <div className="overflow-hidden">
                                                        <p className="text-brand-muted leading-relaxed mb-6 border-l-2 border-brand-dark/10 pl-4">{product.usp}</p>
                                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                                            <div className="bg-brand-surface/40 p-3 rounded-xl border border-brand-dark/5 shadow-sm">
                                                                <div className="text-[10px] text-brand-muted uppercase tracking-wider mb-1">Material</div>
                                                                <div className="text-sm font-bold text-brand-dark">C35/45 Beton</div>
                                                            </div>
                                                            <div className="bg-brand-surface/40 p-3 rounded-xl border border-brand-dark/5 shadow-sm">
                                                                <div className="text-[10px] text-brand-muted uppercase tracking-wider mb-1">Bauweise</div>
                                                                <div className="text-sm font-bold text-brand-dark">Stahlbeton bewehrt</div>
                                                            </div>
                                                        </div>
                                                        <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-brand-dark hover:text-brand-orange transition-colors group/link">
                                                            Technische Daten <span className="material-symbols-outlined text-sm ml-1 group-hover/link:translate-x-1 transition-transform">chevron_right</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                            {isActive && <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/5 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// --- ScrollyFeature Component ---
const ScrollyFeature: React.FC<{
    icon: string;
    title: string;
    desc: string;
    animationType: 'float' | 'glow-pulse' | 'spin-slow' | 'stamp';
}> = ({ icon, title, desc, animationType }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsActive(entry.isIntersecting);
                });
            },
            { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, []);

    const containerClass = isActive
        ? "border-brand-orange/40 bg-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] scale-100 opacity-100"
        : "border-brand-dark/5 bg-white/40 opacity-30 scale-95";
    
    const animationClass = {
        'float': 'animate-float',
        'glow-pulse': 'animate-glow-pulse',
        'spin-slow': 'animate-spin-slow',
        'stamp': 'animate-stamp'
    }[animationType];
    
    return (
        <div ref={ref} className={`transition-all duration-700 ease-out p-8 md:p-10 rounded-2xl border mb-24 last:mb-0 relative overflow-hidden group ${containerClass}`}>
            <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-[0.05]"></div>
            <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                <div className={`p-4 rounded-xl bg-brand-surface/60 border transition-all duration-500 shadow-sm ${isActive ? `text-brand-orange border-brand-orange/30 shadow-[0_4px_12px_rgba(107,143,74,0.15)] ${animationClass}` : 'text-brand-muted border-brand-dark/5'}`}>
                    <span className="material-symbols-outlined text-4xl">{icon}</span>
                </div>
                <div>
                    <h3 className={`text-2xl font-extrabold font-heading uppercase mb-3 transition-colors ${isActive ? 'text-brand-dark' : 'text-brand-muted'}`}>
                        {title}
                    </h3>
                    <p className="text-base text-brand-muted leading-relaxed">{desc}</p>
                </div>
            </div>
        </div>
    );
};

// --- HYBRID HERO COMPONENT (Mobile Optimized + Video) ---
// Strategy: 
// 1. Show Image IMMEDIATELY (LCP < 0.5s)
// 2. Wait 2.5 seconds (Allow Mobile UI to settle)
// 3. Inject Video (Cool factor returns without blocking initial scroll)
// Hero-Karussell: Wechselt automatisch zwischen Bildern (5s) und Videos (10s)
type Slide =
  | { type: 'image'; src: string; alt: string; duration: number }
  | { type: 'video'; src: string; poster: string; duration: number };

// Videos starten bei Sekunde 15 (um Logos/Intro zu überspringen) und spielen 10 Sek
const VIDEO_START_TIME = 15;

const SLIDES: Slide[] = [
  { type: 'image', src: '/images/homepage/hero-banner.jpg', alt: 'A+ Urban Design Skatepark', duration: 5000 },
  { type: 'video', src: '/videos/skateparks/contest-skateboard.mp4', poster: '/videos/skateparks/poster-contest-skateboard.jpg', duration: 10000 },
  { type: 'image', src: '/images/homepage/hero-anlage-01.jpg', alt: 'Beton-Skatepark — Totalaufnahme', duration: 5000 },
  { type: 'video', src: '/videos/skateparks/contest-bmx.mp4', poster: '/videos/skateparks/poster-contest-bmx.jpg', duration: 10000 },
  { type: 'image', src: '/images/homepage/hero-anlage-02.jpg', alt: 'Skatepark-Anlage komplett', duration: 5000 },
];

const Hero: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

    useEffect(() => {
        const current = SLIDES[currentIndex];
        let cleanupListener: (() => void) | undefined;

        // Bei Videos: bei Sekunde 15 starten und abspielen
        if (current.type === 'video') {
            const video = videoRefs.current[currentIndex];
            if (video) {
                const seekAndPlay = () => {
                    video.currentTime = VIDEO_START_TIME;
                    video.play().catch(() => {}); // Safari/autoplay-Schutz abfangen
                };

                if (video.readyState >= 1) {
                    // Desktop: Metadaten bereits geladen (preload hat gewirkt)
                    seekAndPlay();
                } else {
                    // Mobile: Metadaten noch nicht da — auf Load warten
                    video.addEventListener('loadedmetadata', seekAndPlay, { once: true });
                    video.load();
                    cleanupListener = () => video.removeEventListener('loadedmetadata', seekAndPlay);
                }
            }
        }

        // Nach Ablauf der Dauer zum nächsten Slide wechseln
        const timer = setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
        }, current.duration);

        return () => {
            clearTimeout(timer);
            cleanupListener?.();
        };
    }, [currentIndex]);

    return (
        <div className="relative h-[85svh] md:h-[90vh] w-full overflow-hidden bg-black">

            {/* LAYER 1: KARUSSELL — alle Slides mit Crossfade */}
            <div className="absolute inset-0 z-0">
                {SLIDES.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
                            index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        {slide.type === 'image' ? (
                            <img
                                src={slide.src}
                                alt={slide.alt}
                                className="w-full h-full object-cover"
                                loading={index === 0 ? 'eager' : 'lazy'}
                                decoding={index === 0 ? 'sync' : 'async'}
                                fetchPriority={index === 0 ? 'high' : 'auto'}
                            />
                        ) : (
                            <video
                                ref={(el) => { videoRefs.current[index] = el; }}
                                className="w-full h-full object-cover"
                                src={slide.src}
                                poster={slide.poster}
                                muted
                                playsInline
                                preload="auto"
                                onLoadedMetadata={(e) => { e.currentTarget.currentTime = VIDEO_START_TIME; }}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* LAYER 3: DARKNESS OVERLAY */}
            <div className="absolute inset-0 z-20 bg-black/40"></div>

            {/* LAYER 4: CONTENT */}
            <div className="absolute inset-0 z-30 container mx-auto px-4 pb-24 md:pb-32 pt-32 flex flex-col justify-center pointer-events-none">
                 <div className="max-w-7xl">
                    <div className="animate-fade-in-up">
                        <h1 className="flex flex-col font-extrabold font-heading uppercase tracking-tighter leading-[1.2] md:leading-[1.1]">
                            <span className="text-[clamp(2rem,6vw,6rem)] text-white opacity-90">Architektur</span>
                            <span className="text-[clamp(2rem,6vw,6rem)] text-white/60">für</span>
                            <span className="text-[clamp(2rem,6vw,6rem)] text-brand-orange">Freiräume</span>
                        </h1>
                        <p className="mt-6 md:mt-8 text-lg md:text-2xl text-white/80 max-w-xl md:max-w-2xl font-light border-l-4 border-brand-orange pl-4 md:pl-6 animate-fade-in-up [animation-delay:300ms]">
                            Skatepark-Hersteller aus Stuttgart. Skateparks, Pumptracks und urbane Anlagen aus Beton. <span className="text-white font-bold">Robust. Modular. Kompromisslos.</span>
                        </p>
                    </div>
                 </div>
            </div>
        </div>
    );
};


const HomePage: React.FC = () => {
  return (
    <PageShell 
        title="Skatepark-Hersteller | Beton-Skateparks & Pumptracks"
        description="A+ Urban Design — Ihr Skatepark-Hersteller aus Stuttgart. Wir planen und bauen TÜV-zertifizierte Skateparks, Pumptracks und Hockey-Banden aus Beton. Modular, fundamentfrei, seit 1999."
        fullWidth={true}
    >
      <Hero />
      <ProductScrollytelling />

      <section id="philosophie" className="relative py-24 lg:py-48 bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                    <div className="lg:w-5/12">
                        <div className="lg:sticky lg:top-32 h-fit">
                             <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">
                                Unsere DNA
                             </span>
                             <h2 className="text-4xl md:text-7xl font-extrabold font-heading text-brand-dark leading-[0.9] mb-8 uppercase tracking-tighter">
                                Gebaut<br/>für die<br/><span className="text-brand-orange">Ewigkeit.</span>
                             </h2>
                             <p className="text-lg md:text-xl text-brand-muted leading-relaxed mb-8">
                                 Wir schaffen urbane Landschaften aus Beton und Stahl, die jeder Belastung standhalten.
                             </p>
                             <Link to="/ueber-uns" className="inline-flex items-center gap-2 text-brand-dark font-bold border-b-2 border-brand-orange pb-1 hover:text-brand-orange transition-colors uppercase tracking-wider group">
                                 Mehr über unsere Philosophie <span className="text-xl group-hover:translate-x-1 transition-transform">&rarr;</span>
                             </Link>
                        </div>
                    </div>
                    <div className="lg:w-7/12 pt-12 lg:pt-0">
                        <div className="flex flex-col">
                            <ScrollyFeature icon="layers" animationType="float" title="Fundamentfrei" desc="Kein Betonieren vor Ort nötig. Unser modulares System erlaubt die Aufstellung auf einem einfachen Schotterbett." />
                            <ScrollyFeature icon="shield" animationType="glow-pulse" title="Vandalismussicher" desc="Massiver C35/45 Stahlbeton. Schnittfest, schwer entflammbar und extrem widerstandsfähig." />
                            <ScrollyFeature icon="verified" animationType="stamp" title="TÜV Zertifiziert" desc="Hohe Sicherheitsstandards. Unsere Skate- und BMX-Anlagen sind nach DIN EN 14974 geprüft." />
                            <ScrollyFeature icon="recycling" animationType="spin-slow" title="Wiederverwendbar" desc="Beton- und Stahlbestandteile sind weitestgehend recycelbar. Unsere Module können demontiert, versetzt oder wiederaufgebaut werden." />
                        </div>
                    </div>
                </div>
            </div>
        </section>

      <BrochureRequestForm context="homepage" />
      
      <FAQSection />
      
      <section id="contact-area" className="py-24 md:py-32 relative overflow-hidden border-t border-brand-dark/10">
          <div className="absolute inset-0 bg-brand-surface/50"></div>
          <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[100vw] h-[100vw] bg-brand-orange/5 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <AnimatedSection>
              <div className="inline-flex items-center gap-3 py-1 px-4 border border-brand-orange/30 bg-brand-orange/10 rounded-full mb-12 backdrop-blur-md">
                 <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
                 <span className="text-brand-orange font-mono text-xs uppercase tracking-widest">
                    Ready for Takeoff
                 </span>
              </div>
              <h2 className="text-6xl md:text-[10rem] font-extrabold font-heading uppercase tracking-tighter mb-12 leading-[0.85] text-brand-dark">
                Start<br/>
                <span className="text-brand-orange">Klar?</span>
              </h2>
              <p className="text-lg md:text-2xl text-brand-muted max-w-2xl mx-auto mb-16 font-light">
                  Lassen Sie uns gemeinsam etwas Großartiges schaffen. <br/>
                  <span className="text-brand-dark font-bold">Von der ersten Skizze bis zur Eröffnung.</span>
              </p>
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-4 bg-brand-orange text-white font-extrabold uppercase tracking-widest text-base md:text-lg py-5 px-10 md:py-6 md:px-12 rounded-2xl hover:bg-brand-dark hover:text-white transition-all duration-300 transform hover:-translate-y-2 shadow-[0_8px_30px_rgba(107,143,74,0.3)] hover:shadow-[0_12px_40px_rgba(44,53,48,0.25)] group"
              >
                Projekt starten <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform text-2xl">arrow_forward</span>
              </Link>
            </AnimatedSection>
          </div>
        </section>
    </PageShell>
  );
};

export default HomePage;