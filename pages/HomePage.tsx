import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import BrochureRequestForm from '../components/BrochureRequestForm';

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
            {
                threshold: 0.1,
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return <div ref={ref} className={`animated-section ${className}`}>{children}</div>;
};

// --- Scrollytelling Section Component ---
const TECH_FEATURES = [
    {
        id: 'material',
        title: "High Performance Concrete",
        subtitle: "C35/45 XF4",
        desc: "Unser Beton ist kein Standard. Er ist eine Wissenschaft. Porenarm, frosttausalzbeständig und extrem verdichtet. Er absorbiert Vibrationen und bietet gleichzeitig die Härte, die für Jahrzehnte überdauert.",
        img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1600&auto=format&fit=crop" // Abstract concrete texture
    },
    {
        id: 'surface',
        title: "The Perfect Grip",
        subtitle: "Hand-Finished",
        desc: "Nicht zu glatt, nicht zu rau. Unsere Oberflächen werden maschinell geglättet und handveredelt. Das Ergebnis: Ein Fahrgefühl wie auf Samt, aber mit genug Grip für aggressive Manöver. Rutschfest nach R11.",
        img: "https://images.unsplash.com/photo-1565259164223-10d659e93b33?q=80&w=1600&auto=format&fit=crop" // Smooth skate surface detail
    },
    {
        id: 'precision',
        title: "Modular Precision",
        subtitle: "Zero Tolerance",
        desc: "Schluss mit stolpernden Kanten. Unsere patentierte Fugen-Technologie sorgt für übergangslose Verbindungen zwischen den Modulen. Schnell montiert, jederzeit erweiterbar und präzise wie ein Uhrwerk.",
        img: "https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=1600&auto=format&fit=crop" // Architectural detail / joint
    },
    {
        id: 'impact',
        title: "Impact Ready",
        subtitle: "Reinforced Steel",
        desc: "Unter der Haut liegt ein Skelett aus Bewehrungsstahl. Entwickelt, um massiven Belastungen standzuhalten – sei es durch BMX-Pegs, Skateboards oder Witterungsextreme.",
        img: "https://images.unsplash.com/photo-1535968168968-3e2840c83a79?q=80&w=1600&auto=format&fit=crop" // Construction/Steel vibe
    }
];

const ScrollyTellingSection: React.FC = () => {
    const [activeFeature, setActiveFeature] = useState(0);
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = Number(entry.target.getAttribute('data-index'));
                        setActiveFeature(index);
                    }
                });
            },
            {
                rootMargin: '-50% 0px -50% 0px', // Trigger when element is in the middle of viewport
                threshold: 0
            }
        );

        stepRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section className="relative text-white">
            <div className="flex flex-col lg:flex-row">
                {/* Sticky Visual Column */}
                <div className="lg:w-1/2 h-[50vh] lg:h-screen sticky top-0 z-0 overflow-hidden">
                    {TECH_FEATURES.map((feature, index) => (
                        <div 
                            key={feature.id}
                            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                                activeFeature === index ? 'opacity-100' : 'opacity-0'
                            }`}
                        >
                             <div className="absolute inset-0 bg-black/40 z-10"></div>
                             <img 
                                src={feature.img} 
                                alt={feature.title} 
                                className="w-full h-full object-cover scale-105"
                             />
                             <div className="absolute bottom-8 left-8 z-20">
                                 <span className="text-brand-orange text-xs font-bold tracking-widest uppercase mb-2 block">
                                     0{index + 1} / 0{TECH_FEATURES.length}
                                 </span>
                                 <h3 className="text-4xl lg:text-5xl font-black font-heading uppercase text-white tracking-tighter">
                                     {feature.title}
                                 </h3>
                             </div>
                        </div>
                    ))}
                    {/* Progress Bar for Mobile */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/10 lg:hidden z-30">
                         <div 
                            className="h-full bg-brand-orange transition-all duration-300"
                            style={{ width: `${((activeFeature + 1) / TECH_FEATURES.length) * 100}%` }}
                         ></div>
                    </div>
                </div>

                {/* Scrollable Text Column - Light Glass */}
                <div className="lg:w-1/2 relative z-10 bg-white/5 lg:bg-transparent backdrop-blur-xl -mt-[10vh] lg:mt-0 rounded-t-3xl lg:rounded-none">
                    {TECH_FEATURES.map((feature, index) => (
                        <div 
                            key={feature.id}
                            ref={(el) => { stepRefs.current[index] = el; }}
                            data-index={index}
                            className="min-h-[80vh] lg:min-h-screen flex items-center justify-center p-8 lg:p-24 border-l border-white/10"
                        >
                            <div className={`transition-all duration-700 transform ${activeFeature === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-30 blur-sm'}`}>
                                <span className="text-8xl font-black text-white/5 absolute -top-12 -left-4 font-heading select-none">
                                    0{index + 1}
                                </span>
                                <h4 className="text-brand-orange font-bold uppercase tracking-widest mb-4 relative z-10">
                                    {feature.subtitle}
                                </h4>
                                <h2 className="text-4xl md:text-5xl font-bold font-heading mb-8 relative z-10">
                                    {feature.title}
                                </h2>
                                <p className="text-xl text-gray-400 leading-relaxed relative z-10 border-l-2 border-brand-orange pl-6">
                                    {feature.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- Spotlight Effect Component ---
const SpotlightCard: React.FC<{
  title: string;
  desc: string;
  icon: string;
  className?: string;
}> = ({ title, desc, icon, className }) => {
    return (
        // Lighter Glass Effect for better background visibility
        <div className={`relative h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden group/spotlight ${className}`}>
            {/* Spotlight Gradient */}
            <div 
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover/spotlight:opacity-100 transition duration-300"
                style={{
                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(249, 115, 22, 0.15), transparent 40%)`,
                }}
            />
             <div 
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover/spotlight:opacity-100 transition duration-300"
                style={{
                    background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(249, 115, 22, 0.4), transparent 40%)`,
                     maskImage: 'linear-gradient(black, black), content-box',
                     maskComposite: 'exclude',
                     WebkitMaskComposite: 'xor',
                     padding: '1px'
                }}
            >
                <div className="w-full h-full bg-brand-orange/50"></div>
            </div>

            <div className="relative h-full p-8 flex flex-col z-10">
                <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-6 group-hover/spotlight:bg-brand-orange/20 transition-colors duration-300">
                     <span className="material-symbols-outlined text-3xl text-brand-orange">{icon}</span>
                </div>
                <h4 className="text-xl font-bold font-heading text-white mb-3 group-hover/spotlight:text-brand-orange transition-colors duration-300">{title}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
            </div>
        </div>
    );
};

const SpotlightGrid: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const divRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!divRef.current) return;

        for (const child of divRef.current.children) {
            const childElement = child as HTMLElement;
            const rect = childElement.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            childElement.style.setProperty('--mouse-x', `${x}px`);
            childElement.style.setProperty('--mouse-y', `${y}px`);
        }
    };

    return (
        <div 
            ref={divRef} 
            onMouseMove={handleMouseMove} 
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
        >
            {children}
        </div>
    );
};

// --- Shutter Hero Component (Mixed Media) ---
const HERO_ITEMS = [
  {
    type: 'video',
    src: 'https://videos.pexels.com/video-files/5464945/5464945-hd_1920_1080_25fps.mp4',
    poster: 'https://images.pexels.com/videos/5464945/free-video-5464945.jpg?auto=compress&cs=tinysrgb&dpr=1&w=1200'
  },
  {
    type: 'image',
    src: 'https://images.pexels.com/photos/1769553/pexels-photo-1769553.jpeg?auto=compress&cs=tinysrgb&w=1600'
  },
  {
    type: 'image',
    src: 'https://images.pexels.com/photos/3315961/pexels-photo-3315961.jpeg?auto=compress&cs=tinysrgb&w=1600'
  }
];

const ShutterHero: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [nextIndex, setNextIndex] = useState(1);
    const [isAnimating, setIsAnimating] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const heroRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isAnimating) {
                triggerTransition((activeIndex + 1) % HERO_ITEMS.length);
            }
        }, 8000); 

        return () => clearInterval(interval);
    }, [activeIndex, isAnimating]);

    useEffect(() => {
        if(videoRef.current && HERO_ITEMS[activeIndex].type === 'video') {
            videoRef.current.load();
            videoRef.current.play().catch(e => console.log("Auto-play prevented:", e));
        }
    }, [activeIndex]);

    const triggerTransition = (targetIndex: number) => {
        if (isAnimating || targetIndex === activeIndex) return;
        setNextIndex(targetIndex);
        setIsAnimating(true);
        
        setTimeout(() => {
            setActiveIndex(targetIndex);
            setIsAnimating(false);
        }, 1500); 
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!heroRef.current) return;
        const { width, height } = heroRef.current.getBoundingClientRect();
        const x = (e.clientX / width) * 2 - 1;
        const y = (e.clientY / height) * 2 - 1;
        setMousePos({ x, y });
    };

    const activeItem = HERO_ITEMS[activeIndex];
    const nextItem = HERO_ITEMS[nextIndex];

    const getPoster = (item: typeof HERO_ITEMS[0]) => item.type === 'video' ? item.poster! : item.src;

    return (
        <div 
            ref={heroRef}
            className="relative h-[90vh] w-full overflow-hidden group"
            onMouseMove={handleMouseMove}
        >
            <div 
                className="absolute inset-0 w-full h-full transition-transform duration-200 ease-out"
                style={{ 
                    transform: `scale(1.05) translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)` 
                }}
            >
                {activeItem.type === 'video' ? (
                    <video 
                        ref={videoRef}
                        key={`bg-media-${activeIndex}`}
                        src={activeItem.src}
                        poster={activeItem.poster}
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                        preload="auto"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <img 
                        key={`bg-media-${activeIndex}`}
                        src={activeItem.src}
                        alt=""
                        className={`w-full h-full object-cover ${activeIndex % 2 === 0 ? 'animate-kenburns-1' : 'animate-kenburns-2'}`}
                    />
                )}
                <div className="absolute inset-0 bg-black/50"></div>
            </div>

            {isAnimating && (
                <div className="absolute inset-0 z-10 flex w-full h-full pointer-events-none">
                    {[0, 1, 2, 3, 4].map((i) => (
                        <div 
                            key={i} 
                            className="relative h-full w-[20%] overflow-hidden"
                        >
                            <div 
                                className={`absolute inset-0 w-full h-full bg-[#050505] transition-transform duration-700 ease-[cubic-bezier(0.87,0,0.13,1)]`}
                                style={{
                                    transform: `translateY(${i % 2 === 0 ? '100%' : '-100%'})`,
                                    animation: `shutterSlide 0.8s cubic-bezier(0.87, 0, 0.13, 1) forwards`,
                                    animationDelay: `${i * 100}ms`
                                }}
                            >
                                <img 
                                    src={getPoster(nextItem)}
                                    alt=""
                                    className="absolute top-0 h-full w-[500vw] max-w-none object-cover"
                                    style={{ left: `-${i * 100}%` }}
                                />
                                <div className="absolute inset-0 bg-black/50"></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="absolute inset-0 z-20 container mx-auto px-4 sm:px-6 lg:px-8 pb-32 pt-32 flex flex-col justify-end pointer-events-none">
                 <div className="max-w-7xl">
                    <div key={activeIndex} className="overflow-hidden">
                        <h1 className="flex flex-col font-black font-heading uppercase tracking-tighter leading-[0.85]">
                            <span className="block animate-[fade-in-up_0.8s_ease-out_forwards] text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white mix-blend-overlay opacity-90">Architektur</span>
                            <span className="block animate-[fade-in-up_0.8s_ease-out_0.1s_forwards] translate-y-full text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-outline-bold">für</span>
                            <span className="block animate-[fade-in-up_0.8s_ease-out_0.2s_forwards] translate-y-full text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-brand-orange">Freiräume</span>
                        </h1>
                    </div>
                    <div className="overflow-hidden mt-8">
                        <p className="animate-[fade-in-up_0.8s_ease-out_0.4s_forwards] translate-y-full text-xl md:text-2xl text-gray-300 max-w-2xl font-light border-l-4 border-brand-orange pl-6 pointer-events-auto">
                            Wir planen und bauen die Plätze der Zukunft. <br/>
                            <span className="text-white font-bold">Robust. Modular. Kompromisslos.</span>
                        </p>
                    </div>
                 </div>
            </div>
            
            <div className="absolute inset-0 z-10 pointer-events-none opacity-[0.07] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            <style>{`
                @keyframes shutterSlide {
                    0% { transform: translateY(100%); }
                    100% { transform: translateY(0); }
                }
            `}</style>
        </div>
    );
};


const InfiniteMarquee: React.FC = () => {
    const items = ["SKATEPARKS", "PUMPTRACKS", "URBAN DESIGN", "BETONFERTIGTEILE", "FUNDAMENTFREI", "MODULAR", "SKATEPARKS", "PUMPTRACKS", "URBAN DESIGN", "BETONFERTIGTEILE"];
    return (
        <div className="relative overflow-hidden bg-brand-orange py-4 rotate-1 scale-105 border-y-4 border-black z-20">
            <div className="flex animate-marquee whitespace-nowrap">
                {items.map((item, index) => (
                    <span key={index} className="mx-8 text-4xl font-black font-heading text-black uppercase tracking-tighter">
                        {item} <span className="text-white ml-8">•</span>
                    </span>
                ))}
                 {items.map((item, index) => (
                    <span key={`dup-${index}`} className="mx-8 text-4xl font-black font-heading text-black uppercase tracking-tighter">
                        {item} <span className="text-white ml-8">•</span>
                    </span>
                ))}
            </div>
        </div>
    );
};


const HomePage: React.FC = () => {
  return (
    <>
      <ShutterHero />

      <InfiniteMarquee />
      
      {/* Products Bento Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <AnimatedSection>
            <div className="mb-16">
              <span className="text-brand-orange font-bold tracking-widest uppercase text-sm">Unsere Highlights</span>
              <h2 className="text-5xl md:text-7xl font-black font-heading text-white mt-2">PRODUKT<span className="text-outline">WELTEN</span></h2>
            </div>
        </AnimatedSection>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px]">
            {/* 1. Skate Anlagen - Featured Big */}
            <AnimatedSection className="md:col-span-2 md:row-span-2 h-full">
                 <Link to={PRODUCTS[0].path} className="group relative block w-full h-full rounded-2xl overflow-hidden border border-white/10 hover:border-brand-orange/50 transition-colors duration-500">
                     {/* LIGHTER GLASS EFFECT - bg-white/5 */}
                     <div className="absolute inset-0 bg-white/5 backdrop-blur-md group-hover:bg-white/10 transition-colors duration-500"></div>
                     <img src={PRODUCTS[0].imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                     {/* REDUCED GRADIENT OPACITY to see background */}
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70"></div>
                     <div className="absolute bottom-0 left-0 p-8 md:p-12">
                         <span className="inline-block px-3 py-1 mb-4 text-xs font-bold text-black bg-brand-orange rounded-full uppercase tracking-wider">Flagship</span>
                         <h3 className="text-4xl md:text-6xl font-black font-heading text-white uppercase leading-none mb-2">{PRODUCTS[0].title}</h3>
                         <p className="text-gray-400 max-w-md hidden md:block">Das Original. Modular, TÜV-zertifiziert und gebaut für die Ewigkeit.</p>
                     </div>
                 </Link>
            </AnimatedSection>

            {/* 2. Pumptrack - Tall */}
            <AnimatedSection className="md:col-span-1 md:row-span-2 h-full">
                <Link to={PRODUCTS[1].path} className="group relative block w-full h-full rounded-2xl overflow-hidden border border-white/10 hover:border-brand-orange/50 transition-colors duration-500">
                     <div className="absolute inset-0 bg-white/5 backdrop-blur-md"></div>
                     <img src={PRODUCTS[1].imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70"></div>
                     <div className="absolute bottom-0 left-0 p-8">
                         <h3 className="text-3xl font-black font-heading text-white uppercase leading-none mb-2 break-words">Pump<br/>track</h3>
                         <span className="text-brand-orange font-bold text-sm tracking-widest group-hover:underline">JETZT ENTDECKEN &rarr;</span>
                     </div>
                </Link>
            </AnimatedSection>

            {/* 3. BMX - Standard */}
            <AnimatedSection className="md:col-span-1 md:row-span-1 h-full">
                <Link to={PRODUCTS[2].path} className="group relative block w-full h-full rounded-2xl overflow-hidden border border-white/10 hover:border-brand-orange/50 transition-colors duration-500">
                     <div className="absolute inset-0 bg-white/5 backdrop-blur-md"></div>
                     <img src={PRODUCTS[2].imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                     <div className="absolute inset-0 bg-black/30 hover:bg-black/10 transition-colors"></div>
                     <div className="absolute bottom-6 left-6">
                         <h3 className="text-2xl font-bold font-heading text-white uppercase">BMX & Dirt</h3>
                     </div>
                </Link>
            </AnimatedSection>

            {/* 4. Hockey - Wide */}
            <AnimatedSection className="md:col-span-2 md:row-span-1 h-full">
                 <Link to={PRODUCTS[3].path} className="group relative block w-full h-full rounded-2xl overflow-hidden border border-white/10 hover:border-brand-orange/50 transition-colors duration-500">
                     <div className="absolute inset-0 bg-white/5 backdrop-blur-md"></div>
                     <img src={PRODUCTS[3].imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
                     <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent"></div>
                     <div className="absolute bottom-6 left-8">
                         <h3 className="text-3xl font-bold font-heading text-white uppercase">Hockey Arenas</h3>
                         <p className="text-gray-400 text-sm mt-1">Fundamentfrei & Ganzjährig</p>
                     </div>
                </Link>
            </AnimatedSection>
            
            {/* 5, 6, 7 Remaining - Standard */}
            {PRODUCTS.slice(4, 7).map((product) => (
                <AnimatedSection key={product.id} className="h-full">
                     <Link to={product.path} className="group relative block w-full h-full rounded-2xl overflow-hidden border border-white/10 hover:border-brand-orange/50 transition-colors duration-500 flex flex-col justify-end">
                         <div className="absolute inset-0 bg-white/5 backdrop-blur-md"></div>
                         <img src={product.imageUrl} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                         <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80"></div>
                         <div className="relative p-6 z-10">
                             <h3 className="text-xl font-bold font-heading text-white uppercase">{product.title}</h3>
                         </div>
                    </Link>
                </AnimatedSection>
            ))}
        </div>
      </div>
      
      {/* Engineering / Scrollytelling Section */}
      <div className="relative z-20">
           <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-16">
               <span className="text-brand-orange font-bold tracking-widest uppercase text-sm">Technology</span>
               <h2 className="text-5xl md:text-7xl font-black font-heading text-white mt-2">ENGINEERING <span className="text-outline">THE FLOW</span></h2>
           </div>
           <ScrollyTellingSection />
      </div>

        {/* Updated Philosophy / Features Section (Spotlight & Sticky) - Transparent background */}
        <section className="relative py-32 overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    
                    {/* Left Column - Sticky Content */}
                    <div className="lg:sticky lg:top-32 h-fit">
                         <span className="text-brand-orange font-bold tracking-widest uppercase text-sm mb-4 block animate-fade-in-up">Unsere DNA</span>
                         <h2 className="text-6xl md:text-8xl font-black font-heading text-white leading-[0.85] mb-8 animate-fade-in-up [animation-delay:100ms] uppercase">
                            Built<br/>
                            to<br/>
                            <span className="text-outline-orange">Last.</span>
                         </h2>
                         <p className="text-xl text-gray-400 leading-relaxed mb-8 max-w-lg animate-fade-in-up [animation-delay:200ms]">
                             Wir schaffen urbane Landschaften aus Beton und Stahl, die jeder Belastung standhalten. Vandalismusresistent, wartungsfrei und bereit für die nächste Generation.
                         </p>
                         <Link to="/ueber-uns" className="inline-flex items-center gap-2 text-white font-bold border-b-2 border-brand-orange pb-1 hover:text-brand-orange transition-colors uppercase tracking-wider animate-fade-in-up [animation-delay:300ms]">
                             Mehr über unsere Philosophie <span className="text-xl">&rarr;</span>
                         </Link>
                    </div>
                    
                    {/* Right Column - Spotlight Grid */}
                    <div className="animate-fade-in-up [animation-delay:400ms]">
                        <SpotlightGrid>
                            {[
                                { icon: "foundation", title: "Fundamentfrei", desc: "Kein Betonieren vor Ort nötig. Unser modulares System erlaubt die Aufstellung auf einem einfachen Schotterbett. Spart Zeit, Geld und CO2." },
                                { icon: "shield", title: "Unzerstörbar", desc: "Massiver C35/45 Hochleistungsbeton. Feuerfest, schnittfest und resistent gegen rohe Gewalt. Gebaut für den harten urbanen Einsatz." },
                                { icon: "verified_user", title: "TÜV Zertifiziert", desc: "Sicherheit ohne Kompromisse. Alle unsere Anlagen sind nach DIN EN 14974 zertifiziert und entsprechen höchsten Standards." },
                                { icon: "recycling", title: "100% Recycelbar", desc: "Nachhaltigkeit zu Ende gedacht. Unsere Module können am Ende ihrer Lebensdauer vollständig recycelt oder an einem neuen Ort wiederaufgebaut werden." }
                            ].map((item, idx) => (
                                <SpotlightCard 
                                    key={idx}
                                    icon={item.icon}
                                    title={item.title}
                                    desc={item.desc}
                                />
                            ))}
                        </SpotlightGrid>
                    </div>
                </div>
            </div>
        </section>

      <BrochureRequestForm context="homepage" />
      
      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
           <div className="absolute inset-0 bg-brand-orange/10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <AnimatedSection>
              <h2 className="text-6xl md:text-8xl font-black font-heading text-white uppercase tracking-tighter mb-8">
                Ready to <span className="text-brand-orange">Roll?</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
                  Lassen Sie uns gemeinsam etwas Großartiges schaffen. Von der ersten Skizze bis zur Eröffnung.
              </p>
              <Link to="/kontakt" className="inline-block bg-brand-orange text-black font-black uppercase text-xl py-5 px-12 rounded-none hover:bg-white hover:text-brand-orange transition-all duration-300 transform hover:-translate-y-2 shadow-[0_10px_40px_-10px_rgba(249,115,22,0.5)]">
                Projekt starten
              </Link>
            </AnimatedSection>
          </div>
        </section>
    </>
  );
};

export default HomePage;