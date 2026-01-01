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

// --- Scrollytelling Components ---

const ScrollyFeature: React.FC<{
    icon: string;
    title: string;
    desc: string;
    index: number;
    animationType: 'float' | 'glow-pulse' | 'spin-slow' | 'stamp';
}> = ({ icon, title, desc, index, animationType }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    // Activate when element is roughly in the center of the viewport
                    if (entry.isIntersecting) {
                        setIsActive(true);
                    } else {
                        setIsActive(false);
                    }
                });
            },
            {
                rootMargin: "-40% 0px -40% 0px", // Trigger when element is in the middle 20% of screen
                threshold: 0
            }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    // Dynamic classes based on active state
    const containerClass = isActive 
        ? "border-brand-orange bg-brand-surface/80 shadow-[0_0_30px_-5px_rgba(249,115,22,0.3)] scale-105" 
        : "border-white/5 bg-brand-surface/30 opacity-50 scale-100";
    
    const iconColorClass = isActive ? "text-brand-orange" : "text-gray-600";
    const titleColorClass = isActive ? "text-white" : "text-gray-500";
    
    // Animation classes for the icon when active
    const getAnimationClass = () => {
        if (!isActive) return "";
        switch (animationType) {
            case 'float': return "animate-float";
            case 'glow-pulse': return "animate-glow-pulse";
            case 'spin-slow': return "animate-spin-slow";
            case 'stamp': return "animate-stamp";
            default: return "";
        }
    };

    return (
        <div 
            ref={ref}
            className={`transition-all duration-700 ease-out p-8 md:p-12 rounded-3xl border backdrop-blur-sm mb-24 last:mb-0 ${containerClass}`}
        >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
                {/* Icon Container */}
                <div className={`relative flex-shrink-0 w-24 h-24 rounded-2xl border border-white/10 flex items-center justify-center bg-black/50 transition-colors duration-500 ${isActive ? 'border-brand-orange/50' : ''}`}>
                    {/* Glowing background blob behind icon - only for active */}
                    <div className={`absolute inset-0 bg-brand-orange/10 blur-xl rounded-full transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`}></div>
                    
                    <span className={`material-symbols-outlined text-5xl relative z-10 transition-colors duration-500 ${iconColorClass} ${getAnimationClass()}`}>
                        {icon}
                    </span>
                </div>

                {/* Text Content */}
                <div>
                    <h3 className={`text-3xl md:text-4xl font-black font-heading uppercase mb-3 transition-colors duration-500 ${titleColorClass}`}>
                        {title}
                    </h3>
                    <p className="text-lg text-gray-400 leading-relaxed max-w-lg">
                        {desc}
                    </p>
                </div>
            </div>
            
            {/* Tech Decoration Lines */}
            <div className={`mt-8 h-px w-full bg-gradient-to-r from-transparent via-brand-orange/50 to-transparent transition-transform duration-700 origin-left ${isActive ? 'scale-x-100' : 'scale-x-0'}`}></div>
        </div>
    );
};


// --- Updated Hero Component (Clean Slide Transition) ---
const HERO_ITEMS = [
  {
    type: 'video',
    src: 'https://videos.pexels.com/video-files/5464945/5464945-hd_1920_1080_25fps.mp4',
    // Poster removed as requested
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

const Hero: React.FC = () => {
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

    // Handle Video Autoplay
    useEffect(() => {
        // We need to handle video play for both active and next if they are videos
        const activeItem = HERO_ITEMS[activeIndex];
        if (activeItem.type === 'video' && videoRef.current) {
             videoRef.current.play().catch(() => {});
        }
    }, [activeIndex]);

    const triggerTransition = (targetIndex: number) => {
        if (isAnimating || targetIndex === activeIndex) return;
        setNextIndex(targetIndex);
        setIsAnimating(true);
        
        setTimeout(() => {
            setActiveIndex(targetIndex);
            setIsAnimating(false);
        }, 1200); // Matches animation duration
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!heroRef.current) return;
        const { width, height } = heroRef.current.getBoundingClientRect();
        const x = (e.clientX / width) * 2 - 1;
        const y = (e.clientY / height) * 2 - 1;
        setMousePos({ x, y });
    };

    const renderMedia = (item: typeof HERO_ITEMS[0], isBackground: boolean = false) => {
        if (item.type === 'video') {
            return (
                <video 
                    ref={isBackground ? undefined : videoRef}
                    src={item.src}
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    className="w-full h-full object-cover"
                />
            );
        }
        return (
            <img 
                src={item.src}
                alt=""
                className={`w-full h-full object-cover ${!isBackground ? 'animate-kenburns-1' : ''}`}
            />
        );
    };

    return (
        <div 
            ref={heroRef}
            className="relative h-[90vh] w-full overflow-hidden bg-black"
            onMouseMove={handleMouseMove}
        >
            {/* Current Item (Background) */}
            <div 
                className="absolute inset-0 w-full h-full"
                style={{ 
                    transform: `scale(1.05) translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`,
                    transition: 'transform 0.2s ease-out'
                }}
            >
                {renderMedia(HERO_ITEMS[activeIndex])}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Next Item (Slide Up Overlay) */}
            {isAnimating && (
                <div 
                    className="absolute inset-0 z-10 w-full h-full overflow-hidden"
                    style={{
                        animation: 'slideUpReveal 1.2s cubic-bezier(0.77, 0, 0.175, 1) forwards'
                    }}
                >
                     {/* 
                       Inner container to counteract the slide movement if we wanted a "reveal" 
                       effect (parallax), but here we want a solid block moving up, 
                       so we just render the image normally inside the moving container.
                     */}
                    <div className="w-full h-full relative">
                         {renderMedia(HERO_ITEMS[nextIndex], true)}
                         <div className="absolute inset-0 bg-black/40"></div>
                    </div>
                </div>
            )}

            {/* Content Layer */}
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
            
            {/* Grain Overlay */}
            <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.07] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

            <style>{`
                @keyframes slideUpReveal {
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
      <Hero />

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

        {/* --- Scrollytelling Philosophy Section --- */}
        <section className="relative py-24 lg:py-48 overflow-visible">
            {/* Ambient Background Glow for this section */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-orange/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                    
                    {/* Left Column - Sticky Content (The Narrative Anchor) */}
                    <div className="lg:w-5/12">
                        <div className="lg:sticky lg:top-32 h-fit">
                             <span className="text-brand-orange font-bold tracking-widest uppercase text-sm mb-4 block animate-fade-in-up">Unsere DNA</span>
                             <h2 className="text-6xl md:text-8xl font-black font-heading text-white leading-[0.85] mb-8 animate-fade-in-up [animation-delay:100ms] uppercase">
                                Built<br/>
                                to<br/>
                                <span className="text-outline-orange">Last.</span>
                             </h2>
                             <p className="text-xl text-gray-400 leading-relaxed mb-8 animate-fade-in-up [animation-delay:200ms]">
                                 Wir schaffen urbane Landschaften aus Beton und Stahl, die jeder Belastung standhalten. Scrollen Sie, um zu sehen, was uns anders macht.
                             </p>
                             <Link to="/ueber-uns" className="inline-flex items-center gap-2 text-white font-bold border-b-2 border-brand-orange pb-1 hover:text-brand-orange transition-colors uppercase tracking-wider animate-fade-in-up [animation-delay:300ms]">
                                 Mehr über unsere Philosophie <span className="text-xl">&rarr;</span>
                             </Link>
                        </div>
                    </div>
                    
                    {/* Right Column - Scrolling Features with Animated Icons */}
                    <div className="lg:w-7/12 pt-12 lg:pt-0">
                        <div className="flex flex-col">
                            {/* Feature 1: Layers (Fundamentfrei) */}
                            <ScrollyFeature 
                                index={0}
                                icon="layers" 
                                animationType="float"
                                title="Fundamentfrei"
                                desc="Kein Betonieren vor Ort nötig. Unser modulares System erlaubt die Aufstellung auf einem einfachen Schotterbett. Das spart Zeit, Geld und reduziert CO2-Emissionen massiv."
                            />
                            
                            {/* Feature 2: Shield (Unzerstörbar) */}
                            <ScrollyFeature 
                                index={1}
                                icon="shield"
                                animationType="glow-pulse"
                                title="Unzerstörbar"
                                desc="Massiver C35/45 Hochleistungsbeton. Feuerfest, schnittfest und resistent gegen rohe Gewalt. Gebaut für den harten urbanen Einsatz, wo Vandalismus leider oft zum Alltag gehört."
                            />

                            {/* Feature 3: Verified (TÜV) */}
                            <ScrollyFeature 
                                index={2}
                                icon="verified"
                                animationType="stamp"
                                title="TÜV Zertifiziert"
                                desc="Sicherheit ohne Kompromisse. Alle unsere Anlagen sind nach DIN EN 14974 zertifiziert und entsprechen höchsten Standards. Haftungsrisiken für Kommunen werden so minimiert."
                            />

                            {/* Feature 4: Recycling (Recyclable) */}
                            <ScrollyFeature 
                                index={3}
                                icon="recycling"
                                animationType="spin-slow"
                                title="100% Recycelbar"
                                desc="Nachhaltigkeit zu Ende gedacht. Unsere Module können am Ende ihrer Lebensdauer vollständig recycelt oder – noch besser – an einem neuen Ort wiederaufgebaut werden."
                            />
                        </div>
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