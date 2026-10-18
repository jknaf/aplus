import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../constants';
import BrochureRequestForm from '../components/BrochureRequestForm';
import PageShell from '../components/PageShell';
import Bild from '../components/Bild';

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
            a: "Die Kosten für einen Skatepark oder Pumptrack hängen von Größe, Auswahl der Elemente und Untergrund ab. Modulare Betonfertigteile sind in vielen Projekten günstiger als Ortbeton, weil Erdarbeiten, Bodenplatten und aufwendige Vorarbeiten weitgehend entfallen. Unsere Preisliste enthält Beispielanlagen mit Kosten, die wir Ihnen gern zusenden. Wir bieten eine unverbindliche Erstberatung mit Kostenschätzung für Ihr Projekt an."
        },
        {
            q: "Skatepark, Skateanlage oder Skaterpark: Was ist der Unterschied?",
            a: "Gebräuchlich sind „Skatepark“ und „Skateanlage“. Umgangssprachlich sagt man auch Skaterpark, Skaterbahn oder Skaterplatz. Gemeint ist immer dasselbe: eine Fläche mit Hindernissen (Obstacles) wie Rampen, Bowls, Rails und Pipes für Skateboard, BMX, Scooter und Inline-Skates. Wir bauen diese Anlagen aus modularen Betonfertigteilen."
        },
        {
            q: "Sind die Anlagen auch für BMX und Scooter geeignet?",
            a: "Ja. Die Betonoberflächen halten den Punktlasten von BMX-Pegs und Scooter-Decks dauerhaft stand. Der unversiegelte Beton bleibt auch bei Nässe griffig, für Skateboard, BMX, Scooter und Inline-Skates. Alle Anlagen sind für mehrere Sportarten ausgelegt."
        },
        {
            q: "Warum Beton statt Holz oder Asphalt?",
            a: "Beton ist formstabil, wartungsarm und vandalismussicher, auch bei Frost und Hitze. Unsere Skaterampen und Pumptrack-Elemente aus bewehrtem Beton C35/45 halten deutlich länger als Rampen aus Holz. Dazu kommt das Modulsystem: Elemente können umgestellt, entfernt oder ergänzt werden, ohne Fundamente aufzubrechen."
        },
        {
            q: "Gibt es Fördermittel für Skateparks und Pumptracks?",
            a: "Ja. Kommunen können Fördermittel aus der Sportstättenförderung von Bund und Ländern beantragen. Auch Programme für urbane Freiräume und Bewegungsförderung kommen infrage. Wir unterstützen Sie bei Förderantrag und Ausschreibung und liefern die nötigen technischen Unterlagen, vom TÜV-Zertifikat nach DIN EN 14974 bis zur statischen Berechnung."
        },
        {
            q: "Wie steht es um Lärmschutz und Baugenehmigung?",
            a: "Nach unseren Erfahrungswerten sind Betonelemente rund 5–8 dB(A) leiser als Rampen aus Holz, Metall oder Kunststoff. Das kann die Baugenehmigung erleichtern. Im Genehmigungsverfahren unterstützen wir Sie mit statischen Berechnungen und den nötigen Nachweisen."
        },
        {
            q: "Können wir klein anfangen und die Anlage später erweitern?",
            a: "Ja, genau dafür ist das A+-Modulsystem gemacht. Viele Kommunen starten mit einem Starter-Kit, zum Beispiel aus Quarterpipe, Bank und Rail, und erweitern den Skatepark über Jahre. Weil keine Fundamente gegossen werden, ist das jederzeit möglich. Elemente können auch umgestellt oder an einen neuen Standort versetzt werden."
        },
        {
            q: "Wie laufen Planung und Bau eines Skateparks ab?",
            a: "Der Prozess beginnt mit einer Bedarfsanalyse vor Ort. Wir übernehmen die gesamte Planung: vom Entwurf über die 3D-Planung und die normgerechte Ausarbeitung nach DIN EN 14974 bis zur schlüsselfertigen Montage. Die Betonfertigteile kommen per Lkw und werden mit Gabelstapler, Hubwagen oder, bei Pipes und hohen Elementen, mit dem Autokran aufgestellt. Eine typische Skateanlage steht innerhalb weniger Tage."
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
                        Wissen und Technik
                    </span>
                    <h2 className="text-4xl md:text-7xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-[0.9]">
                        Häufige <span className="text-brand-orange">Fragen</span>
                    </h2>
                    <p className="text-brand-muted mt-6 max-w-2xl mx-auto">
                        Alles über Planung, Kosten, Fördermittel und Bau von Skateparks, Pumptracks und BMX-Anlagen, von Ihrem Skatepark-Hersteller.
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

    // Aktiv ist der Schritt, dessen Mitte der Bildschirmmitte am nächsten liegt. Genau einer, ohne Flackern:
    // Die Schritte haben feste Höhen, beim Wechsel verschiebt sich nichts.
    useEffect(() => {
        let raf = 0;
        const pruefen = () => {
            raf = 0;
            const mitte = window.innerHeight / 2;
            let best: string | null = null, abstand = Infinity;
            itemRefs.current.forEach((el) => {
                if (!el) return;
                const r = el.getBoundingClientRect(), d = Math.abs(r.top + r.height / 2 - mitte);
                if (d < abstand) { abstand = d; best = el.getAttribute('data-id'); }
            });
            if (best) setActiveId(best);
        };
        const beimScrollen = () => { if (!raf) raf = requestAnimationFrame(pruefen); };
        pruefen();
        window.addEventListener('scroll', beimScrollen, { passive: true });
        window.addEventListener('resize', beimScrollen);
        return () => { window.removeEventListener('scroll', beimScrollen); window.removeEventListener('resize', beimScrollen); cancelAnimationFrame(raf); };
    }, []);

    return (
        <section id="produkte" className="relative z-10 py-24 border-y border-brand-dark/5 bg-transparent">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <AnimatedSection className="mb-24 text-center">
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">
                        Portfolio
                    </span>
                    <h2 className="text-4xl md:text-7xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-[0.9]">
                        Unsere<br/>
                        <span className="text-brand-orange">Produkte</span>
                    </h2>
                </AnimatedSection>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
                    {/* Sticky HUD */}
                    <div className="hidden lg:block lg:w-1/2 sticky top-[calc(50vh-min(22vw,300px))]">
                        <div className="relative aspect-square w-full max-h-[600px] rounded-2xl overflow-hidden border border-brand-dark/10 bg-brand-surface/50 shadow-[0_8px_30px_rgba(0,0,0,0.1)] group">
                            {PRODUCTS.map((product) => product.tuvCertified && (
                                <div
                                    key={`tuv-${product.id}`}
                                    className={`absolute inset-0 z-20 pointer-events-none p-6 flex flex-col justify-end transition-opacity duration-500 ${activeId === product.id ? 'opacity-100' : 'opacity-0'}`}
                                >
                                    <div className="flex justify-end">
                                        <div className="border border-white/20 px-2 py-1 bg-brand-dark/60 backdrop-blur-md rounded-sm">
                                            <span className="text-xs font-bold text-white uppercase tracking-wider">
                                                TÜV-ZERTIFIZIERT
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {PRODUCTS.map((product) => (
                                <div
                                    key={product.id}
                                    className={`absolute inset-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${activeId === product.id ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]'}`}
                                >
                                    <Bild sizes="(min-width: 1024px) 60vw, 100vw" 
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
                        <div className="flex flex-col gap-6 lg:gap-0">
                            {PRODUCTS.map((product, index) => {
                                const isActive = activeId === product.id;
                                return (
                                    <div 
                                        key={product.id}
                                        data-id={product.id}
                                        ref={(el) => { itemRefs.current[index] = el; }}
                                        className={`group relative pl-0 md:pl-12 lg:h-[72vh] lg:min-h-[560px] lg:flex lg:items-center lg:snap-center transition-opacity duration-500 ${isActive ? 'opacity-100' : 'lg:opacity-35 lg:hover:opacity-60'}`}
                                    >
                                        <div className={`absolute left-[14px] top-1/2 -translate-y-1/2 w-[11px] h-[11px] rounded-full border-2 transition-all duration-500 hidden md:block z-10 ${isActive ? 'bg-brand-orange border-brand-orange shadow-[0_0_15px_rgba(107,143,74,0.4)] scale-125' : 'bg-brand-bg border-brand-dark/20'}`}></div>
                                        <div className={`relative w-full rounded-2xl border transition-[background-color,border-color,box-shadow] duration-500 overflow-hidden ${isActive ? 'bg-white border-brand-orange/40 shadow-[0_8px_30px_rgba(0,0,0,0.08)]' : 'bg-white/60 border-brand-dark/5'}`}>
                                            <div className="lg:hidden h-48 relative overflow-hidden border-b border-brand-dark/10">
                                                <Bild 
                                                    src={product.imageUrl}
                                                    alt={product.title}
                                                    className="w-full h-full object-cover opacity-60" 
                                                    loading="lazy"
                                                />
                                                <div className="absolute inset-0 bg-black/40"></div>
                                            </div>
                                            <Link to={product.path} className="block p-6 md:p-8">
                                                <div className="flex justify-between items-start mb-4">
                                                    <span className={`font-mono text-xs tracking-widest uppercase mb-1 block transition-colors ${isActive ? 'text-brand-orange' : 'text-brand-muted'}`}>
                                                        Produkt 0{index + 1}
                                                    </span>
                                                    <span className={`material-symbols-outlined text-brand-orange transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`}>arrow_outward</span>
                                                </div>
                                                <h3 className={`text-3xl md:text-4xl font-extrabold font-heading uppercase tracking-tight mb-4 transition-colors ${isActive ? 'text-brand-dark' : 'text-brand-muted'}`}>
                                                    {product.title}
                                                </h3>
                                                <div className="mt-6">
                                                    <div>
                                                        <p className="text-brand-muted leading-relaxed mb-6 border-l-2 border-brand-dark/10 pl-4">{product.usp}</p>
                                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                                            <div className="bg-brand-surface/40 p-3 rounded-xl border border-brand-dark/5 shadow-sm">
                                                                <div className="text-[10px] text-brand-muted uppercase tracking-wider mb-1">Material</div>
                                                                <div className="text-sm font-bold text-brand-dark">{product.material}</div>
                                                            </div>
                                                            <div className="bg-brand-surface/40 p-3 rounded-xl border border-brand-dark/5 shadow-sm">
                                                                <div className="text-[10px] text-brand-muted uppercase tracking-wider mb-1">Besonderheit</div>
                                                                <div className="text-sm font-bold text-brand-dark">{product.details}</div>
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

                <AnimatedSection className="text-center mt-16">
                    <Link
                        to="/produkte"
                        className="inline-flex items-center gap-2 text-brand-dark font-bold border-b-2 border-brand-orange pb-1 hover:text-brand-orange transition-colors uppercase tracking-wider group"
                    >
                        Zur Produkt-Übersicht
                        <span className="text-xl group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </Link>
                </AnimatedSection>
            </div>
        </section>
    );
};

// --- Service Overview Section (Planung / Montage / Service) ---
const ServiceOverviewSection: React.FC = () => {
    const services = [
        {
            icon: "design_services",
            title: "Planung & Beratung",
            desc: "Wir begleiten Sie von der ersten Idee bis zur Ausführungsplanung nach DIN EN 14974. Auf Grundlage Ihrer Fläche und Ihres Budgets erstellen wir Draufsichten und 3D-Entwürfe."
        },
        {
            icon: "construction",
            title: "Bau & Montage",
            desc: "Schneller, meist günstiger und weniger wetterabhängig als Ortbeton: Unsere modularen Fertigteile werden direkt auf Asphalt, Beton oder Fundamentplatte montiert. Eine typische Anlage baut unser Team in wenigen Tagen schlüsselfertig auf."
        },
        {
            icon: "build_circle",
            title: "Service & Wartung",
            desc: "Auch nach der Eröffnung lässt sich die Anlage erweitern, umbauen oder versetzen. Einzelne Module können repariert werden. Wir liefern Wartungsanleitungen, unterstützen bei Erweiterungen und bleiben Ihr Ansprechpartner."
        }
    ];

    return (
        <section id="leistungen" className="py-24 relative bg-brand-surface/30 border-y border-brand-dark/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <AnimatedSection className="mb-16 text-center">
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">
                        Alles aus einer Hand
                    </span>
                    <h2 className="text-4xl md:text-7xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-[0.9]">
                        Planung, Bau<br />
                        & <span className="text-brand-orange">Service</span>
                    </h2>
                    <p className="text-brand-muted mt-6 max-w-2xl mx-auto">
                        Seit über 25 Jahren begleiten wir Kommunen, Architekten und Landschaftsplaner durch jede Phase eines Skatepark-Projekts, von der Beratung bis zur langfristigen Wartung.
                    </p>
                </AnimatedSection>

                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {services.map((service, index) => (
                        <AnimatedSection
                            key={service.title}
                            className={`bg-white rounded-2xl border border-brand-dark/5 shadow-[0_2px_12px_rgba(0,0,0,0.05)] p-8 hover:border-brand-orange/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group`}
                        >
                            <div className="flex items-start gap-5 mb-5">
                                <div className="p-4 rounded-xl bg-brand-surface/60 border border-brand-dark/5 text-brand-orange shadow-sm group-hover:border-brand-orange/30 group-hover:shadow-[0_4px_12px_rgba(107,143,74,0.15)] transition-all duration-300 shrink-0">
                                    <span className="material-symbols-outlined text-4xl">{service.icon}</span>
                                </div>
                                <div>
                                    <span className="font-mono text-xs tracking-widest uppercase text-brand-muted block mb-2">
                                        Phase 0{index + 1}
                                    </span>
                                    <h3 className="text-2xl font-extrabold font-heading uppercase text-brand-dark tracking-tight leading-tight">
                                        {service.title}
                                    </h3>
                                </div>
                            </div>
                            <p className="text-brand-muted leading-relaxed text-sm md:text-base border-l-2 border-brand-dark/10 group-hover:border-brand-orange/40 pl-4 transition-colors duration-300">
                                {service.desc}
                            </p>
                        </AnimatedSection>
                    ))}
                </div>

                <AnimatedSection className="text-center mt-16">
                    <Link
                        to="/planung"
                        className="inline-flex items-center gap-2 text-brand-dark font-bold border-b-2 border-brand-orange pb-1 hover:text-brand-orange transition-colors uppercase tracking-wider group"
                    >
                        Kompletten Planungsprozess ansehen
                        <span className="text-xl group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </Link>
                </AnimatedSection>
            </div>
        </section>
    );
};

// --- Anspruch: Bild-Mosaik mit Werkplan-Layer ---
// Fotos getönt, darüber Hinweislinien wie in einer Bauzeichnung, Text im Plankopf. Beim Überfahren wird das Foto farbig.
// Linien im Koordinatensystem des Fotos (756 × 430); "slice" schneidet wie object-cover, die Linien bleiben auf dem Detail.
const Plan: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <svg viewBox="0 0 756 430" preserveAspectRatio="xMidYMid slice" aria-hidden="true"
        className="absolute inset-0 w-full h-full fill-none stroke-white group-hover:stroke-[#C9E3AE] transition-[stroke] duration-500">
        {children}
    </svg>
);

const Plankopf: React.FC<{ blatt: string; info: string; titel: string; text: string; gross?: boolean; oben?: boolean }> = ({ blatt, info, titel, text, gross, oben }) => (
    <div className={`absolute left-4 sm:left-5 ${oben ? 'top-4 sm:top-5' : 'bottom-4 sm:bottom-5'} max-w-[calc(100%-2rem)] bg-brand-bg text-brand-dark border-[1.5px] border-brand-dark grid grid-cols-2 ${gross ? 'w-[380px]' : 'w-[330px]'}`}>
        <span className="px-3 py-2 border-r border-b border-brand-dark font-mono text-[11px] tracking-[0.14em]">{blatt}</span>
        <span className="px-3 py-2 border-b border-brand-dark font-mono text-[11px] tracking-[0.14em] uppercase">{info}</span>
        <div className="col-span-2 px-4 pt-3 pb-4 flex flex-col gap-1.5">
            <h3 className={`font-heading font-extrabold uppercase leading-[0.95] tracking-tight ${gross ? 'text-3xl md:text-4xl' : 'text-2xl'}`}>{titel}</h3>
            <p className="text-sm text-brand-dark/75 leading-snug">{text}</p>
        </div>
    </div>
);

const Fotokachel: React.FC<{ src: string; alt: string; className: string; children: React.ReactNode }> = ({ src, alt, className, children }) => (
    <article className={`group relative rounded-2xl overflow-hidden bg-brand-dark ${className}`}>
        <img src={src} alt={alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.15] brightness-90 transition-[filter,transform] duration-700 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-[#33502B] mix-blend-multiply opacity-60 transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />
        {children}
    </article>
);

const Anspruch: React.FC = () => (
    <section id="philosophie" className="bg-[#1F2622] text-brand-bg py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col gap-12 lg:gap-14">
            <div className="flex flex-wrap gap-x-16 gap-y-6 items-end justify-between">
                <div className="flex flex-col gap-5">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A9C98A]">Unser Anspruch</span>
                    <h2 className="text-5xl md:text-8xl font-extrabold font-heading uppercase leading-[0.88] tracking-tighter">Gebaut für<br /><span className="text-[#A9C98A]">Jahrzehnte</span></h2>
                </div>
                <p className="max-w-sm text-lg leading-relaxed text-[#C9CCC4]">Beton, Stahl und Gummi, im Werk gefertigt und vom TÜV geprüft. Und wenn sich der Ort ändert, ziehen die Elemente einfach mit.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 lg:auto-rows-[290px] gap-4">
                <Fotokachel src="/images/details/einstellung-04.jpg" alt="Höhenverstellbarer Fuß eines Betonelements auf Asphalt" className="h-[440px] lg:h-auto lg:col-span-7 lg:row-span-2">
                    <Plan>
                        <circle cx="368" cy="300" r="30" strokeWidth="2" strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
                    </Plan>
                    <Plankopf gross oben blatt="BLATT 01 / 04" info="Detail Fuß" titel="Fundamentfrei" text="Steht auf vorhandenem Asphalt oder Beton. Vor Ort wird nicht betoniert." />
                </Fotokachel>

                <Fotokachel src="/images/details/schutzkante-01.jpg" alt="Einbetonierter Kantenschutz an der Fahrkante" className="h-[320px] lg:h-auto lg:col-span-5">
                    <Plan>
                        <circle cx="340" cy="238" r="32" strokeWidth="2" strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
                    </Plan>
                    <Plankopf oben blatt="BLATT 02 / 04" info="C35/45" titel="Vandalismussicher" text="Wand 8 bis 16 cm. Nicht schneidbar, nicht brennbar." />
                </Fotokachel>

                <article className="lg:col-span-5 rounded-2xl bg-brand-bg text-brand-dark p-5 grid grid-cols-1 sm:grid-cols-[auto_minmax(0,1fr)] gap-5 lg:min-h-0">
                    <img src="/images/details/tuev-gs.png" alt="GS-Zeichen von TÜV SÜD" width="317" height="320" loading="lazy" className="h-44 sm:h-full max-h-[250px] w-auto justify-self-center object-contain" />
                    <div className="flex flex-col justify-between gap-5 sm:border-l-[1.5px] sm:border-brand-dark sm:pl-5 min-w-0">
                        <div className="flex flex-col gap-1 font-mono text-[11px] tracking-[0.14em]"><span>BLATT 03 / 04</span><span>DIN EN 14974</span></div>
                        <div className="flex flex-col gap-1.5">
                            <h3 className="font-heading font-extrabold uppercase text-2xl leading-none">Geprüfte Sicherheit</h3>
                            <p className="text-sm text-brand-dark/75 leading-snug">TÜV-zertifiziert seit 2000. Der TÜV überwacht auch die Fertigung.</p>
                        </div>
                    </div>
                </article>

                <Fotokachel src="/images/montage/transport-01.jpg" alt="Gabelstapler hebt ein Betonelement vom Lkw" className="h-[320px] lg:h-auto lg:col-span-8">
                    <Plan>
                        <rect x="345" y="212" width="112" height="54" strokeWidth="2" strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
                    </Plan>
                    <Plankopf blatt="BLATT 04 / 04" info="KrWG § 6" titel="Versetzen statt abreißen" text="Kein Abbruch, kein Bauschutt. Ihre Investition zieht mit." />
                </Fotokachel>

                <article className="lg:col-span-4 rounded-2xl bg-brand-orange text-white p-7 flex flex-col justify-between gap-6 min-h-[240px]">
                    <span className="font-mono text-xs tracking-[0.18em] text-[#F2F7EC]">IM EINSATZ</span>
                    <div className="flex flex-col gap-1">
                        <strong className="font-heading font-extrabold text-8xl leading-[0.85] tracking-tighter">350+</strong>
                        <span className="text-[#F2F7EC]">Anlagen seit 1998</span>
                    </div>
                </article>
            </div>

            <Link to="/ueber-uns" className="self-start inline-flex items-center gap-2 min-h-12 font-bold uppercase tracking-wider border-b-2 border-[#A9C98A] pb-1 hover:text-[#C9DDB6] transition-colors group">
                Mehr über unsere Philosophie <span className="text-xl group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
        </div>
    </section>
);

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
  { type: 'image', src: '/images/homepage/hero-anlage-01.jpg', alt: 'Beton-Skatepark, Totalaufnahme', duration: 5000 },
  { type: 'image', src: '/images/homepage/hero-anlage-panorama.jpg', alt: 'Skatepark-Panorama mit Bowl und Street-Area', duration: 5000 },
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

                if (video.readyState >= 3) {
                    // Video ist ausreichend gepuffert (HAVE_FUTURE_DATA)
                    seekAndPlay();
                } else {
                    // Noch nicht genug gepuffert, auf canplay warten
                    video.addEventListener('canplay', seekAndPlay, { once: true });
                    video.load();
                    cleanupListener = () => video.removeEventListener('canplay', seekAndPlay);
                }
            }
        }

        // Smart-Preload: während dieser Slide läuft, das nächste Video-Slide
        // im Hintergrund vorladen. So nutzen wir bewusst die Bild-Slots (5 s)
        // als Ladezeit fuer das kommende Video, ohne beim Page-Load alle
        // Videos gleichzeitig herunterzuladen (Safari 26 unter macOS Tahoe
        // nimmt preload="auto" als "alles sofort voll laden" wortwoertlich).
        const nextIndex = (currentIndex + 1) % SLIDES.length;
        const nextSlide = SLIDES[nextIndex];
        if (nextSlide.type === 'video') {
            const nextVideo = videoRefs.current[nextIndex];
            if (nextVideo && nextVideo.readyState < 3) {
                try { nextVideo.load(); } catch {}
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

            {/* LAYER 1: KARUSSELL: alle Slides mit Crossfade */}
            <div className="absolute inset-0 z-0">
                {SLIDES.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-[1200ms] ease-in-out ${
                            index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        {slide.type === 'image' ? (
                            <Bild hoch
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
                                preload="metadata"
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
                            {/* Roland §3.2: 30-Jahre-Jubiläums-Claim noch klären, vorläufig */}
                            Skateparks, Pumptracks und urbane Anlagen aus Beton und Stahl. <span className="text-white font-bold">Modular. Robust. Fundamentfrei. Recycelbar.</span>
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
        description="A+ Urban Design: Ihr Skatepark-Hersteller aus Stuttgart. Wir planen und bauen Skateparks, Pumptracks und Hockey-Banden aus Beton. Unsere Skate-Elemente sind TÜV-zertifiziert. Modular, fundamentfrei, seit 1999."
        fullWidth={true}
    >
      <Hero />
      <ProductScrollytelling />

      <Anspruch />

      <ServiceOverviewSection />

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
                    Ihr Projekt
                 </span>
              </div>
              <h2 className="text-6xl md:text-[10rem] font-extrabold font-heading uppercase tracking-tighter mb-12 leading-[0.85] text-brand-dark">
                Start<br/>
                <span className="text-brand-orange">klar?</span>
              </h2>
              <p className="text-lg md:text-2xl text-brand-muted max-w-2xl mx-auto mb-16 font-light">
                  Sprechen Sie mit uns über Ihre Fläche. <br/>
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
