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

// --- Scrollytelling Product Component ---
const ProductScrollytelling: React.FC = () => {
    const [activeId, setActiveId] = useState<string>(PRODUCTS[0].id);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // Observer for right-side items to update the sticky left side
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
                rootMargin: "-45% 0px -45% 0px", // Trigger when item is exactly in the middle 10% of viewport
                threshold: 0
            }
        );

        itemRefs.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => {
            itemRefs.current.forEach((el) => {
                if (el) observer.unobserve(el);
            });
        };
    }, []);

    return (
        <section className="relative z-10 py-12 lg:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                 {/* Section Header */}
                <AnimatedSection className="mb-16 lg:mb-32">
                    <span className="text-brand-orange font-bold tracking-widest uppercase text-sm flex items-center gap-2">
                        <span className="w-8 h-px bg-brand-orange"></span>
                        Portfolio
                    </span>
                    <h2 className="text-5xl md:text-8xl font-black font-heading text-white mt-4 uppercase leading-[0.85]">
                        Produkt<br/><span className="text-outline-bold">Index</span>
                    </h2>
                </AnimatedSection>

                <div className="flex flex-col lg:flex-row gap-8 lg:gap-24">
                    
                    {/* LEFT COLUMN: Sticky Image (Desktop Only) */}
                    <div className="hidden lg:block lg:w-1/2 relative">
                        <div className="sticky top-24 h-[600px] w-full rounded-sm overflow-hidden border border-white/10 bg-brand-surface shadow-2xl">
                             {/* Texture Overlay */}
                            <div className="absolute inset-0 z-20 pointer-events-none opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                            
                            {PRODUCTS.map((product) => (
                                <div 
                                    key={product.id}
                                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${activeId === product.id ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                                >
                                    <img 
                                        src={product.imageUrl} 
                                        alt={product.altText} 
                                        className={`w-full h-full object-cover transition-transform duration-[5s] ease-out ${activeId === product.id ? 'scale-100' : 'scale-110'}`}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
                                    
                                     {/* Floating Label inside Image */}
                                    <div className="absolute bottom-10 left-10 z-30">
                                         <span className="text-brand-orange font-mono text-xl mb-2 block">
                                            {/* Find index and format with leading zero */}
                                            {(() => {
                                                const idx = PRODUCTS.findIndex(p => p.id === product.id);
                                                return (idx + 1).toString().padStart(2, '0');
                                            })()}
                                         </span>
                                         <h3 className="text-4xl font-black font-heading text-white uppercase leading-none mb-4">{product.title}</h3>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-orange text-black text-xs font-bold uppercase tracking-widest">
                                            {product.tuvCertified ? 'DIN EN 14974 ZERTIFIZIERT' : 'A+ QUALITY'}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Scrolling List */}
                    <div className="lg:w-1/2">
                        <div className="flex flex-col pb-[30vh]"> {/* Padding bottom to allow last item to scroll to center */}
                            {PRODUCTS.map((product, index) => (
                                <div 
                                    key={product.id}
                                    data-id={product.id}
                                    ref={(el) => (itemRefs.current[index] = el)}
                                    className={`group min-h-[50vh] flex flex-col justify-center py-12 border-b border-white/5 transition-opacity duration-500 ${activeId === product.id ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}
                                >
                                    {/* Mobile Image (Accordion style) */}
                                    <div className="lg:hidden mb-6 aspect-video w-full rounded-sm overflow-hidden relative border border-white/10">
                                         <img src={product.imageUrl} alt="" className="w-full h-full object-cover" />
                                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                    </div>

                                    <Link to={product.path} className="block group-hover:translate-x-4 transition-transform duration-500">
                                        <div className="flex items-baseline gap-4 mb-2">
                                            <span className="text-brand-orange font-mono text-sm">{(index + 1).toString().padStart(2, '0')}</span>
                                            <h3 className={`text-4xl sm:text-5xl font-black font-heading uppercase tracking-tighter leading-[0.9] text-white`}>
                                                {product.title}
                                            </h3>
                                        </div>
                                        
                                        {/* USP Display */}
                                        <p className={`text-lg md:text-xl font-medium mt-4 max-w-md ${activeId === product.id ? 'text-white' : 'text-gray-500'}`}>
                                            {product.usp}
                                        </p>

                                        <div className="mt-6 flex items-center gap-2 text-brand-orange text-sm font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                            Details ansehen <span className="material-symbols-outlined text-base">arrow_forward</span>
                                        </div>
                                    </Link>
                                </div>
                            ))}
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


// --- Updated Hero Component (Seamless Slide & Sync) ---
const HERO_ITEMS = [
  {
    type: 'video',
    src: 'https://videos.pexels.com/video-files/5464945/5464945-hd_1920_1080_25fps.mp4',
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
    const nextVideoRef = useRef<HTMLVideoElement>(null);

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
        const activeItem = HERO_ITEMS[activeIndex];
        if (activeItem.type === 'video' && videoRef.current) {
             videoRef.current.play().catch(() => {});
        }
    }, [activeIndex]);

    const triggerTransition = (targetIndex: number) => {
        if (isAnimating || targetIndex === activeIndex) return;
        setNextIndex(targetIndex);
        setIsAnimating(true);
        
        // Start next video if needed
        if (HERO_ITEMS[targetIndex].type === 'video' && nextVideoRef.current) {
            nextVideoRef.current.play().catch(() => {});
        }
        
        // Wait for CSS animation to finish (1.4s) + buffer before state swap
        setTimeout(() => {
            setActiveIndex(targetIndex);
            setIsAnimating(false);
        }, 1400); 
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!heroRef.current) return;
        const { width, height } = heroRef.current.getBoundingClientRect();
        // Dampen the movement for a premium feel
        const x = (e.clientX / width) * 2 - 1;
        const y = (e.clientY / height) * 2 - 1;
        setMousePos({ x, y });
    };

    // Shared style for both layers to prevent jumps
    const commonMediaStyle = {
        transform: `scale(1.05) translate(${mousePos.x * -10}px, ${mousePos.y * -10}px)`,
        transition: 'transform 0.1s ease-out', // Only for mouse movement, not scale
    };

    const renderMedia = (item: typeof HERO_ITEMS[0], isNextLayer: boolean = false) => {
        if (item.type === 'video') {
            return (
                <video 
                    ref={isNextLayer ? nextVideoRef : videoRef}
                    src={item.src}
                    autoPlay 
                    muted 
                    loop 
                    playsInline
                    className="w-full h-full object-cover"
                    style={commonMediaStyle}
                />
            );
        }
        return (
            <img 
                src={item.src}
                alt=""
                className="w-full h-full object-cover"
                style={commonMediaStyle}
            />
        );
    };

    return (
        <div 
            ref={heroRef}
            className="relative h-[90vh] w-full overflow-hidden bg-black"
            onMouseMove={handleMouseMove}
        >
            {/* 1. CURRENT ITEM (Background) */}
            <div className="absolute inset-0 w-full h-full z-0">
                {renderMedia(HERO_ITEMS[activeIndex])}
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* 2. NEXT ITEM (Slide Up Overlay) */}
            {isAnimating && (
                <div 
                    className="absolute inset-0 z-10 w-full h-full overflow-hidden"
                    style={{
                        animation: 'slideUpReveal 1.4s cubic-bezier(0.83, 0, 0.17, 1) forwards'
                    }}
                >
                    <div className="w-full h-full relative">
                         {renderMedia(HERO_ITEMS[nextIndex], true)}
                         <div className="absolute inset-0 bg-black/40"></div>
                    </div>
                </div>
            )}

            {/* 3. CONTENT LAYER (Text) */}
            <div className="absolute inset-0 z-20 container mx-auto px-4 sm:px-6 lg:px-8 pb-32 pt-32 flex flex-col justify-end pointer-events-none">
                 <div className="max-w-7xl">
                    {/* 
                       Sync Logic:
                       - Wrapper uses key={activeIndex} to remount (trigger entrance animation) when index changes.
                       - Class transition-opacity handles the exit fade-out when isAnimating becomes true.
                    */}
                    <div 
                        key={activeIndex} 
                        className={`overflow-hidden transition-all duration-500 ease-in-out ${isAnimating ? 'opacity-0 translate-y-[-20px] blur-sm' : 'opacity-100 translate-y-0 blur-0'}`}
                    >
                        <h1 className="flex flex-col font-black font-heading uppercase tracking-tighter leading-[0.85]">
                            <span 
                                className="block animate-[fade-in-up_0.8s_ease-out_forwards] text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white mix-blend-overlay opacity-90"
                                style={{ animationDelay: '0.2s' }} // Slight delay to wait for slide settling
                            >
                                Architektur
                            </span>
                            <span 
                                className="block animate-[fade-in-up_0.8s_ease-out_forwards] translate-y-full text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-outline-bold"
                                style={{ animationDelay: '0.3s' }}
                            >
                                für
                            </span>
                            <span 
                                className="block animate-[fade-in-up_0.8s_ease-out_forwards] translate-y-full text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-brand-orange"
                                style={{ animationDelay: '0.4s' }}
                            >
                                Freiräume
                            </span>
                        </h1>
                    </div>
                    
                    <div 
                         key={`desc-${activeIndex}`}
                         className={`overflow-hidden mt-8 transition-all duration-500 ease-in-out ${isAnimating ? 'opacity-0 translate-y-[-20px]' : 'opacity-100 translate-y-0'}`}
                    >
                        <p 
                            className="animate-[fade-in-up_0.8s_ease-out_forwards] translate-y-full text-xl md:text-2xl text-gray-300 max-w-2xl font-light border-l-4 border-brand-orange pl-6 pointer-events-auto"
                            style={{ animationDelay: '0.6s' }}
                        >
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
      
      {/* Scrollytelling Product Index */}
      <ProductScrollytelling />

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
                                icon="layers" 
                                animationType="float"
                                title="Fundamentfrei"
                                desc="Kein Betonieren vor Ort nötig. Unser modulares System erlaubt die Aufstellung auf einem einfachen Schotterbett. Das spart Zeit, Geld und reduziert CO2-Emissionen massiv."
                            />
                            
                            {/* Feature 2: Shield (Unzerstörbar) */}
                            <ScrollyFeature 
                                icon="shield"
                                animationType="glow-pulse"
                                title="Unzerstörbar"
                                desc="Massiver C35/45 Hochleistungsbeton. Feuerfest, schnittfest und resistent gegen rohe Gewalt. Gebaut für den harten urbanen Einsatz, wo Vandalismus leider oft zum Alltag gehört."
                            />

                            {/* Feature 3: Verified (TÜV) */}
                            <ScrollyFeature 
                                icon="verified"
                                animationType="stamp"
                                title="TÜV Zertifiziert"
                                desc="Sicherheit ohne Kompromisse. Alle unsere Anlagen sind nach DIN EN 14974 zertifiziert und entsprechen höchsten Standards. Haftungsrisiken für Kommunen werden so minimiert."
                            />

                            {/* Feature 4: Recycling (Recyclable) */}
                            <ScrollyFeature 
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