import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import BrochureRequestForm from '../components/BrochureRequestForm';
import PageShell from '../components/PageShell'; // Import PageShell for SEO logic

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

// --- FAQ Section (SEO POWERHOUSE) ---
const FAQSection: React.FC = () => {
    // SEO STRATEGY: Answer specific questions users type into Google.
    // Keywords: Beton Pumptrack, BMX Anlage, Skatepark Kosten, Lärmschutz, Baugenehmigung.
    const faqs = [
        {
            q: "Was kostet ein Beton-Skatepark oder Pumptrack?",
            a: "Die Kosten hängen stark von der Fläche und den gewählten Modulen ab. Da wir fundamentfrei bauen, entfallen teure Erdarbeiten und Bodenplatten, was unsere Systeme oft 30-40% günstiger macht als Ortbeton-Anlagen. Für eine genaue Kostenschätzung bieten wir eine kostenlose Erstberatung an."
        },
        {
            q: "Sind die Anlagen auch für BMX und Scooter geeignet?",
            a: "Absolut. Unsere Betonoberflächen sind extrem widerstandsfähig und halten den hohen Punktbelastungen von BMX-Pegs und Scooter-Decks problemlos stand. Im Gegensatz zu Holzrampen splittert unser Beton nicht und bietet perfekten Grip für alle Rollsportarten."
        },
        {
            q: "Warum Beton statt Asphalt für einen Pumptrack?",
            a: "Asphalt wird im Sommer weich und verformt sich unter Belastung. Beton bleibt formstabil, ist nahezu wartungsfrei und bietet ein deutlich schnelleres Fahrgefühl ('Flow'). Zudem lassen sich mit unseren Betonmodulen Radien formen, die mit Asphaltfertigern technisch unmöglich sind."
        },
        {
            q: "Wie steht es um Lärmschutz und Baugenehmigung?",
            a: "Beton ist ein massiver Schallschlucker. Unsere Elemente minimieren den Dröhn-Effekt, den man von Hohlkörper-Rampen kennt. Wir unterstützen Sie zudem im Genehmigungsverfahren mit Schallgutachten-Vorlagen und statischen Berechnungen nach DIN EN 14974."
        },
        {
            q: "Können wir klein anfangen und die Anlage später erweitern?",
            a: "Ja, das ist der Kern unseres 'A+ Modulsystems'. Viele Kommunen starten mit einem 'Starter-Kit' (z.B. Quarter, Bank, Rail) und erweitern den Skatepark über Jahre hinweg. Da keine Fundamente gegossen werden müssen, bleibt die Fläche flexibel."
        }
    ];

    // Structured Data for Google (FAQPage)
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
        // REMOVED SOLID BG COLOR
        <section className="py-24 border-t border-white/5 relative overflow-hidden bg-transparent">
             {/* SEO Schema Injection */}
             <script type="application/ld+json">
                {JSON.stringify(faqSchema)}
            </script>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                 <AnimatedSection className="mb-16 text-center">
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">
                        Wissen & Technik
                    </span>
                    <h2 className="text-4xl md:text-7xl font-black font-heading text-white uppercase tracking-tighter leading-[0.9]">
                        Häufige <span className="text-outline-orange">Fragen.</span>
                    </h2>
                    <p className="text-brand-muted mt-6 max-w-2xl mx-auto">
                        Alles über Planung, Kosten und Bau von Skateparks, Pumptracks und BMX-Anlagen.
                    </p>
                </AnimatedSection>

                <div className="max-w-4xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <details key={index} className="group bg-[#121212]/80 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden transition-all duration-300 open:border-brand-orange/50 open:bg-[#1a1a1a]/90">
                            <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-white/5 transition-colors">
                                <span className="font-bold text-base md:text-xl text-white group-hover:text-brand-orange transition-colors pr-8">
                                    {faq.q}
                                </span>
                                <span className="material-symbols-outlined text-gray-500 transition-transform duration-300 group-open:rotate-180 group-open:text-brand-orange">
                                    expand_more
                                </span>
                            </summary>
                            <div className="px-6 pb-6 pt-0 text-gray-400 leading-relaxed border-t border-white/5 mt-2 animate-fade-in-up text-sm md:text-base">
                                {faq.a}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
};


// --- Scrollytelling Product Component (REDESIGNED: HUD STYLE) ---
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
            {
                rootMargin: "-40% 0px -40% 0px", 
                threshold: 0
            }
        );

        itemRefs.current.forEach((el) => { if (el) observer.observe(el); });
        return () => { itemRefs.current.forEach((el) => { if (el) observer.unobserve(el); }); };
    }, []);

    return (
        // REMOVED SOLID BG COLOR
        <section id="produkte" className="relative z-10 py-24 border-y border-white/5 bg-transparent">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                
                <AnimatedSection className="mb-24 text-center">
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">
                        Unser Portfolio
                    </span>
                    <h2 className="text-4xl md:text-7xl font-black font-heading text-white uppercase tracking-tighter leading-[0.9]">
                        Technische<br/>
                        <span className="text-outline-orange">Perfektion.</span>
                    </h2>
                </AnimatedSection>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                    
                    {/* LEFT COLUMN: Sticky HUD Image Viewport */}
                    <div className="hidden lg:block lg:w-1/2 sticky top-32">
                        <div className="relative aspect-square w-full rounded-lg overflow-hidden border border-white/10 bg-[#121212]/50 backdrop-blur-md group">
                            
                            {/* Technical HUD Overlay */}
                            <div className="absolute inset-0 z-20 pointer-events-none p-6 flex flex-col justify-between">
                                {/* Top Bar */}
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-2">
                                        <div className="w-2 h-2 bg-brand-orange animate-pulse"></div>
                                        <span className="text-[10px] font-mono text-brand-orange tracking-widest">LIVE BILD</span>
                                    </div>
                                    <div className="text-[10px] font-mono text-gray-500 tracking-widest">
                                        KAMERA-0{PRODUCTS.findIndex(p => p.id === activeId) + 1}
                                    </div>
                                </div>
                                
                                {/* Crosshairs */}
                                <div className="absolute top-1/2 left-1/2 w-12 h-12 border border-white/20 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50"></div>
                                <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white -translate-x-1/2 -translate-y-1/2 rounded-full"></div>

                                {/* Bottom Bar */}
                                <div className="flex justify-between items-end">
                                    <div className="text-[10px] font-mono text-gray-500">
                                        ISO 800<br/>F/2.8
                                    </div>
                                    <div className="border border-white/20 px-2 py-1 bg-black/50 backdrop-blur-md rounded-sm">
                                        <span className="text-xs font-bold text-white uppercase tracking-wider">
                                            {PRODUCTS.find(p => p.id === activeId)?.tuvCertified ? 'TÜV GEPRÜFT' : 'A+ STANDARD'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Images */}
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
                                    {/* Scanline Effect */}
                                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20"></div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Decorative HUD Lines outside */}
                        <div className="absolute -bottom-4 -right-4 w-16 h-16 border-b-2 border-r-2 border-brand-orange opacity-50"></div>
                    </div>

                    {/* RIGHT COLUMN: Interactive Timeline */}
                    <div className="lg:w-1/2 relative">
                        {/* Vertical Timeline Line */}
                        <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block"></div>

                        <div className="flex flex-col gap-2 pb-[30vh]">
                            {PRODUCTS.map((product, index) => {
                                const isActive = activeId === product.id;
                                return (
                                    <div 
                                        key={product.id}
                                        data-id={product.id}
                                        ref={(el) => (itemRefs.current[index] = el)}
                                        className={`group relative pl-0 md:pl-12 transition-all duration-500 ${isActive ? 'py-8' : 'py-6 opacity-40 hover:opacity-70'}`}
                                    >
                                        {/* Timeline Dot */}
                                        <div className={`absolute left-[14px] top-1/2 -translate-y-1/2 w-[11px] h-[11px] rounded-full border-2 transition-all duration-500 hidden md:block z-10 ${isActive ? 'bg-brand-orange border-brand-orange shadow-[0_0_15px_rgba(249,115,22,0.6)] scale-125' : 'bg-[#080808] border-white/30'}`}></div>

                                        {/* Card Container */}
                                        <div className={`
                                            relative rounded-xl border transition-all duration-500 overflow-hidden backdrop-blur-sm
                                            ${isActive 
                                                ? 'bg-[#121212]/80 border-brand-orange/50 shadow-2xl scale-100' 
                                                : 'bg-transparent border-white/5 scale-[0.98]'
                                            }
                                        `}>
                                            {/* Mobile Image (Accordion) */}
                                            <div className="lg:hidden h-48 relative overflow-hidden border-b border-white/10">
                                                <img src={product.imageUrl} alt="" className="w-full h-full object-cover opacity-60" loading="lazy" />
                                                <div className="absolute inset-0 bg-black/40"></div>
                                            </div>

                                            <Link to={product.path} className="block p-6 md:p-8">
                                                <div className="flex justify-between items-start mb-4">
                                                    <span className={`font-mono text-xs tracking-widest uppercase mb-1 block transition-colors ${isActive ? 'text-brand-orange' : 'text-gray-500'}`}>
                                                        Modul 0{index + 1}
                                                    </span>
                                                    {isActive && (
                                                        <span className="material-symbols-outlined text-brand-orange animate-pulse">
                                                            arrow_outward
                                                        </span>
                                                    )}
                                                </div>

                                                <h3 className={`text-3xl md:text-4xl font-black font-heading uppercase tracking-tight mb-4 transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`}>
                                                    {product.title}
                                                </h3>

                                                {/* Expanded Details */}
                                                <div className={`grid transition-all duration-500 ease-in-out ${isActive ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0 mt-0'}`}>
                                                    <div className="overflow-hidden">
                                                        <p className="text-gray-400 leading-relaxed mb-6 border-l-2 border-white/10 pl-4">
                                                            {product.usp}
                                                        </p>
                                                        
                                                        {/* Mini Specs Grid */}
                                                        <div className="grid grid-cols-2 gap-4 mb-6">
                                                            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                                                <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Material</div>
                                                                <div className="text-sm font-bold text-white">C35/45 Beton</div>
                                                            </div>
                                                            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                                                                <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Garantie</div>
                                                                <div className="text-sm font-bold text-white">5 Jahre</div>
                                                            </div>
                                                        </div>

                                                        <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-white hover:text-brand-orange transition-colors group/link">
                                                            Technische Daten <span className="material-symbols-outlined text-sm ml-1 group-hover/link:translate-x-1 transition-transform">chevron_right</span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                            
                                            {/* Active Glow Effect */}
                                            {isActive && (
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                                            )}
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

// --- Scrollytelling Feature Components ---

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
            {
                rootMargin: "-40% 0px -40% 0px",
                threshold: 0
            }
        );

        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, []);

    const containerClass = isActive 
        ? "border-brand-orange bg-[#1a1a1a]/80 shadow-[0_0_30px_-5px_rgba(249,115,22,0.15)] scale-100 opacity-100 backdrop-blur-sm" 
        : "border-white/5 bg-transparent opacity-30 scale-95";
    
    // FIX: Using the prop to generate animation classes properly
    const animationClass = {
        'float': 'animate-float',
        'glow-pulse': 'animate-glow-pulse',
        'spin-slow': 'animate-spin-slow',
        'stamp': 'animate-stamp'
    }[animationType];
    
    return (
        <div 
            ref={ref}
            className={`transition-all duration-700 ease-out p-8 md:p-10 rounded-2xl border mb-24 last:mb-0 relative overflow-hidden group ${containerClass}`}
        >
            {/* Background noise for texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05]"></div>

            <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
                <div className={`p-4 rounded-xl bg-black/50 border border-white/10 transition-all duration-500 ${isActive ? `text-brand-orange border-brand-orange/30 ${animationClass}` : 'text-gray-600'}`}>
                    <span className="material-symbols-outlined text-4xl">{icon}</span>
                </div>
                <div>
                    <h3 className={`text-2xl font-black font-heading uppercase mb-3 transition-colors ${isActive ? 'text-white' : 'text-gray-500'}`}>
                        {title}
                    </h3>
                    <p className="text-base text-gray-400 leading-relaxed">
                        {desc}
                    </p>
                </div>
            </div>
        </div>
    );
};


// --- Hero Component ---
const HERO_ITEMS = [
  { type: 'video', src: 'https://videos.pexels.com/video-files/5464945/5464945-hd_1920_1080_25fps.mp4' },
  { type: 'image', src: 'https://images.pexels.com/photos/1769553/pexels-photo-1769553.jpeg?auto=compress&cs=tinysrgb&w=1600' },
  { type: 'image', src: 'https://images.pexels.com/photos/3315961/pexels-photo-3315961.jpeg?auto=compress&cs=tinysrgb&w=1600' }
];

const Hero: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const nextVideoRef = useRef<HTMLVideoElement>(null);

    // PERFORMANCE FIX: Preload next image to avoid blink
    useEffect(() => {
        const nextItem = HERO_ITEMS[(activeIndex + 1) % HERO_ITEMS.length];
        if (nextItem.type === 'image') {
            const img = new Image();
            img.src = nextItem.src;
        }
    }, [activeIndex]);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isAnimating) triggerTransition((activeIndex + 1) % HERO_ITEMS.length);
        }, 8000); 
        return () => clearInterval(interval);
    }, [activeIndex, isAnimating]);

    const triggerTransition = (targetIndex: number) => {
        if (isAnimating || targetIndex === activeIndex) return;
        setNextIndex(targetIndex);
        setIsAnimating(true);
        if (HERO_ITEMS[targetIndex].type === 'video' && nextVideoRef.current) nextVideoRef.current.play().catch(() => {});
        setTimeout(() => {
            setActiveIndex(targetIndex);
            setIsAnimating(false);
        }, 1400); 
    };

    const renderMedia = (item: typeof HERO_ITEMS[0], ref: React.RefObject<HTMLVideoElement>) => {
        if (item.type === 'video') {
            // OPTIMIZATION: Added poster image to prevent black screen on load
            // Added preload="auto" and playsInline for better mobile support
            return (
                <video 
                    ref={ref} 
                    src={item.src} 
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                    preload="auto"
                    poster="https://images.pexels.com/photos/1769553/pexels-photo-1769553.jpeg?auto=compress&cs=tinysrgb&w=800"
                    className="w-full h-full object-cover" 
                />
            );
        }
        return <img src={item.src} alt="" className="w-full h-full object-cover" loading="eager" />;
    };

    return (
        // REMOVED BG-BLACK to ensure transparency
        <div className="relative h-[85vh] md:h-[90vh] w-full overflow-hidden bg-transparent">
            <div className="absolute inset-0 z-0">{renderMedia(HERO_ITEMS[activeIndex], videoRef)}<div className="absolute inset-0 bg-black/40"></div></div>
            {isAnimating && (
                <div className="absolute inset-0 z-10 animate-[slideUpReveal_1.4s_cubic-bezier(0.83,0,0.17,1)_forwards]">
                    <div className="w-full h-full relative">{renderMedia(HERO_ITEMS[nextIndex], nextVideoRef)}<div className="absolute inset-0 bg-black/40"></div></div>
                </div>
            )}
            <div className="absolute inset-0 z-20 container mx-auto px-4 pb-24 md:pb-32 pt-32 flex flex-col justify-end pointer-events-none">
                 <div className="max-w-7xl">
                    <div key={activeIndex} className={isAnimating ? 'opacity-0 translate-y-[-20px] blur-sm transition-all duration-500' : 'opacity-100 transition-all duration-500'}>
                        {/* TYPOGRAPHY FIX: 
                            1. Removed mix-blend-overlay on "Architektur" to ensure visibility against dark video.
                            2. Changed leading to `leading-none` to prevent overlap.
                            3. Used `text-[clamp]` for fluid typography that prevents breaks on small screens.
                        */}
                        <h1 className="flex flex-col font-black font-heading uppercase tracking-tighter leading-none md:leading-[0.85]">
                            <span className="text-[clamp(2.5rem,10vw,9rem)] text-white opacity-90 animate-fade-in-up">Architektur</span>
                            <span className="text-[clamp(2.5rem,10vw,9rem)] text-outline-bold animate-fade-in-up [animation-delay:100ms]">für</span>
                            <span className="text-[clamp(2.5rem,10vw,9rem)] text-brand-orange animate-fade-in-up [animation-delay:200ms]">Freiräume</span>
                        </h1>
                        <p className="mt-6 md:mt-8 text-lg md:text-2xl text-gray-300 max-w-xl md:max-w-2xl font-light border-l-4 border-brand-orange pl-4 md:pl-6 animate-fade-in-up [animation-delay:300ms]">
                            Wir planen und bauen die Plätze der Zukunft. <span className="text-white font-bold">Robust. Modular. Kompromisslos.</span>
                        </p>
                    </div>
                 </div>
            </div>
            <style>{`@keyframes slideUpReveal { 0% { transform: translateY(100%); } 100% { transform: translateY(0); } }`}</style>
        </div>
    );
};

const InfiniteMarquee: React.FC = () => {
    const items = ["SKATEPARKS", "PUMPTRACKS", "URBAN DESIGN", "BETONFERTIGTEILE", "FUNDAMENTFREI", "MODULAR"];
    return (
        <div className="relative overflow-hidden bg-brand-orange py-3 md:py-4 rotate-1 scale-105 border-y-4 border-black z-20">
            <div className="flex animate-marquee whitespace-nowrap">
                {[...items, ...items, ...items].map((item, index) => (
                    <span key={index} className="mx-4 md:mx-8 text-2xl md:text-4xl font-black font-heading text-black uppercase tracking-tighter">
                        {item} <span className="text-white ml-4 md:ml-8">•</span>
                    </span>
                ))}
            </div>
        </div>
    );
};

const HomePage: React.FC = () => {
  // Use PageShell to inject metadata instead of raw markup
  return (
    <PageShell 
        title="Beton-Skateparks, Pumptracks & Skate-Anlagen"
        description="A+ Urban Design plant und baut TÜV-zertifizierte Skateparks, Pumptracks und Hockey-Banden aus Beton. Modular, fundamentfrei und langlebig."
    >
      <Hero />
      <InfiniteMarquee />
      <ProductScrollytelling />

      <section id="philosophie" className="relative py-24 lg:py-48">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                    <div className="lg:w-5/12">
                        <div className="lg:sticky lg:top-32 h-fit">
                             <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">
                                Unsere DNA
                             </span>
                             <h2 className="text-4xl md:text-7xl font-black font-heading text-white leading-[0.9] mb-8 uppercase tracking-tighter">
                                Gebaut<br/>für die<br/><span className="text-outline-orange">Ewigkeit.</span>
                             </h2>
                             <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-8">
                                 Wir schaffen urbane Landschaften aus Beton und Stahl, die jeder Belastung standhalten.
                             </p>
                             <Link to="/ueber-uns" className="inline-flex items-center gap-2 text-white font-bold border-b-2 border-brand-orange pb-1 hover:text-brand-orange transition-colors uppercase tracking-wider group">
                                 Mehr über unsere Philosophie <span className="text-xl group-hover:translate-x-1 transition-transform">&rarr;</span>
                             </Link>
                        </div>
                    </div>
                    <div className="lg:w-7/12 pt-12 lg:pt-0">
                        <div className="flex flex-col">
                            <ScrollyFeature icon="layers" animationType="float" title="Fundamentfrei" desc="Kein Betonieren vor Ort nötig. Unser modulares System erlaubt die Aufstellung auf einem einfachen Schotterbett." />
                            <ScrollyFeature icon="shield" animationType="glow-pulse" title="Unzerstörbar" desc="Massiver C35/45 Hochleistungsbeton. Feuerfest, schnittfest und resistent gegen rohe Gewalt." />
                            <ScrollyFeature icon="verified" animationType="stamp" title="TÜV Zertifiziert" desc="Sicherheit ohne Kompromisse. Alle unsere Anlagen sind nach DIN EN 14974 zertifiziert." />
                            <ScrollyFeature icon="recycling" animationType="spin-slow" title="100% Recycelbar" desc="Nachhaltigkeit zu Ende gedacht. Unsere Module können vollständig recycelt oder wiederaufgebaut werden." />
                        </div>
                    </div>
                </div>
            </div>
        </section>

      <BrochureRequestForm context="homepage" />
      
      <FAQSection />
      
      {/* REDESIGNED CONTACT AREA */}
      <section id="contact-area" className="py-24 md:py-32 relative overflow-hidden border-t border-white/10">
          {/* Ambient Background */}
          <div className="absolute inset-0 bg-brand-orange/5"></div>
          <div className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[100vw] h-[100vw] bg-brand-orange/10 blur-[120px] rounded-full pointer-events-none"></div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <AnimatedSection>
              {/* Technical Badge */}
              <div className="inline-flex items-center gap-3 py-1 px-4 border border-brand-orange/30 bg-brand-orange/10 rounded-full mb-12 backdrop-blur-md">
                 <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
                 <span className="text-brand-orange font-mono text-xs uppercase tracking-widest">
                    Ready for Takeoff
                 </span>
              </div>
              
              {/* Massive Typography */}
              <h2 className="text-6xl md:text-[10rem] font-black font-heading uppercase tracking-tighter mb-12 leading-[0.85]">
                Start<br/>
                <span className="text-transparent" style={{ WebkitTextStroke: '1px #fff' }}>Klar?</span>
              </h2>
              
              <p className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto mb-16 font-light">
                  Lassen Sie uns gemeinsam etwas Großartiges schaffen. <br/>
                  <span className="text-white font-bold">Von der ersten Skizze bis zur Eröffnung.</span>
              </p>
              
              {/* Massive Button */}
              <Link 
                to="/kontakt" 
                className="inline-flex items-center gap-4 bg-white text-black font-black uppercase tracking-widest text-base md:text-lg py-5 px-10 md:py-6 md:px-12 rounded hover:bg-brand-orange hover:text-white transition-all duration-300 transform hover:-translate-y-2 shadow-[0_20px_50px_-10px_rgba(255,255,255,0.2)] hover:shadow-[0_20px_50px_-10px_rgba(249,115,22,0.4)] group"
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