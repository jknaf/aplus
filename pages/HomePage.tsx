import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Link, useT } from '../i18n';
import { useProducts } from '../localized';
import BrochureRequestForm from '../components/BrochureRequestForm';
import PageShell from '../components/PageShell';
import Bild from '../components/Bild';
import parkStart from '../components/katalog/park-startseite.json';

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
    const t = useT();
    const faqs = [
        {
            q: t("Was kostet ein Beton-Skatepark oder Pumptrack?", "How much does a concrete skatepark or pump track cost?", "Combien coûte un skatepark ou un pumptrack en béton ?"),
            a: t("Die Kosten für einen Skatepark oder Pumptrack hängen von Größe, Auswahl der Elemente und Untergrund ab. Modulare Betonfertigteile sind in vielen Projekten günstiger als Ortbeton, weil Erdarbeiten, Bodenplatten und aufwendige Vorarbeiten weitgehend entfallen. Unsere Preisliste enthält Beispielanlagen mit Kosten, die wir Ihnen gern zusenden. Wir bieten eine unverbindliche Erstberatung mit Kostenschätzung für Ihr Projekt an.", "The cost of a skatepark or pump track depends on size, the choice of elements and the ground. In many projects, modular precast concrete is cheaper than in-situ concrete, because earthworks, base slabs and extensive preparation are largely unnecessary. Our price list includes example parks with costs, which we are happy to send you. We offer a free, no-obligation initial consultation with a cost estimate for your project.", "Le coût d'un skatepark ou d'un pumptrack dépend de la taille, du choix des éléments et du sol. Dans de nombreux projets, les éléments préfabriqués en béton modulaires reviennent moins cher que le béton coulé en place, car les terrassements, les dalles en béton et les gros travaux préparatoires sont largement évités. Notre liste de prix présente des exemples de skateparks avec leurs coûts, que nous vous envoyons volontiers. Nous proposons une première consultation sans engagement, avec estimation des coûts pour votre projet.")
        },
        {
            q: t("Skatepark, Skateanlage oder Skaterpark: Was ist der Unterschied?", "Skatepark, skate park or skate plaza: what is the difference?", "Skatepark, skate-park ou skate plaza : quelle différence ?"),
            a: t("Gebräuchlich sind „Skatepark“ und „Skateanlage“. Umgangssprachlich sagt man auch Skaterpark, Skaterbahn oder Skaterplatz. Gemeint ist immer dasselbe: eine Fläche mit Hindernissen (Obstacles) wie Rampen, Bowls, Rails und Pipes für Skateboard, BMX, Scooter und Inline-Skates. Wir bauen diese Anlagen aus modularen Betonfertigteilen.", "In practice these terms mean the same thing: an area with obstacles such as ramps, bowls, rails and pipes for skateboards, BMX, scooters and inline skates. “Skatepark” is the usual word, and a “skate plaza” usually means a street-style layout. We build all of these from modular precast concrete.", "En pratique, ces termes désignent la même chose : une surface équipée d'obstacles tels que rampes, bowls, rails et pipes, pour le skateboard, le BMX, la trottinette et le roller. « Skatepark » est le terme courant, et un « skate plaza » désigne plutôt un aménagement de type street. Nous construisons toutes ces installations à partir d'éléments préfabriqués en béton modulaires.")
        },
        {
            q: t("Sind die Anlagen auch für BMX und Scooter geeignet?", "Are the parks also suitable for BMX and scooters?", "Les installations conviennent-elles aussi au BMX et à la trottinette ?"),
            a: t("Ja. Die Betonoberflächen halten den Punktlasten von BMX-Pegs und Scooter-Decks dauerhaft stand. Der unversiegelte Beton bleibt auch bei Nässe griffig, für Skateboard, BMX, Scooter und Inline-Skates. Alle Anlagen sind für mehrere Sportarten ausgelegt.", "Yes. The concrete surfaces withstand the point loads of BMX pegs and scooter decks for years. Unsealed concrete stays grippy even when wet, for skateboards, BMX, scooters and inline skates. All parks are designed for several sports.", "Oui. Les surfaces en béton résistent durablement aux charges ponctuelles des pegs de BMX et des decks de trottinette. Le béton non traité reste adhérent même par temps humide, pour le skateboard, le BMX, la trottinette et le roller. Toutes les installations sont pensées pour plusieurs disciplines.")
        },
        {
            q: t("Warum Beton statt Holz oder Asphalt?", "Why concrete instead of timber or asphalt?", "Pourquoi du béton plutôt que du bois ou de l'asphalte ?"),
            a: t("Beton ist formstabil, wartungsarm und vandalismussicher, auch bei Frost und Hitze. Unsere Skaterampen und Pumptrack-Elemente aus bewehrtem Beton C35/45 halten deutlich länger als Rampen aus Holz. Dazu kommt das Modulsystem: Elemente können umgestellt, entfernt oder ergänzt werden, ohne Fundamente aufzubrechen.", "Concrete holds its shape, needs little maintenance and resists vandalism, even in frost and heat. Our skate ramps and pump track elements in reinforced C35/45 concrete last much longer than timber ramps. On top of that comes the modular system: elements can be rearranged, removed or added to without breaking up foundations.", "Le béton est indéformable, demande peu d'entretien et résiste au vandalisme, y compris par temps de gel ou de forte chaleur. Nos rampes de skate et nos éléments de pumptrack en béton armé C35/45 durent bien plus longtemps que des rampes en bois. À cela s'ajoute le système modulaire : les éléments peuvent être déplacés, retirés ou complétés sans casser de fondations.")
        },
        {
            q: t("Gibt es Fördermittel für Skateparks und Pumptracks?", "Is funding available for skateparks and pump tracks?", "Existe-t-il des aides financières pour les skateparks et les pumptracks ?"),
            a: t("Ja. Kommunen können Fördermittel aus der Sportstättenförderung von Bund und Ländern beantragen. Auch Programme für urbane Freiräume und Bewegungsförderung kommen infrage. Wir unterstützen Sie bei Förderantrag und Ausschreibung und liefern die nötigen technischen Unterlagen, vom TÜV-Zertifikat nach DIN EN 14974 bis zur statischen Berechnung.", "In Germany, yes. Municipalities can apply for funds from the federal and state sports facility programmes. Programmes for urban open space and physical activity may also apply. We support you with the funding application and the tender, and supply the technical documents you need, from the EN 14974 TÜV certificate to the structural calculations.", "En Allemagne, oui. Les communes peuvent demander des subventions auprès des programmes de soutien aux équipements sportifs de l'État fédéral et des Länder. Des programmes consacrés aux espaces publics urbains et à la promotion de l'activité physique peuvent aussi entrer en ligne de compte. Nous vous accompagnons pour la demande de subvention et l'appel d'offres, et nous fournissons les documents techniques nécessaires, du certificat TÜV selon la norme EN 14974 aux notes de calcul de structure.")
        },
        {
            q: t("Wie steht es um Lärmschutz und Baugenehmigung?", "What about noise and planning permission?", "Qu'en est-il de les nuisances sonores et du permis de construire ?"),
            a: t("Nach unseren Erfahrungswerten sind Betonelemente rund 5–8 dB(A) leiser als Rampen aus Holz, Metall oder Kunststoff. Das kann die Baugenehmigung erleichtern. Im Genehmigungsverfahren unterstützen wir Sie mit statischen Berechnungen und den nötigen Nachweisen.", "In our experience, concrete elements are around 5–8 dB(A) quieter than ramps made of timber, metal or plastic. That can make planning permission easier. During the approval process we support you with structural calculations and the necessary supporting documents.", "D'après notre expérience, les éléments en béton sont environ 5 à 8 dB(A) plus silencieux que des rampes en bois, en métal ou en plastique. Cela peut faciliter l'obtention du permis de construire. Pendant la procédure d'autorisation, nous vous accompagnons avec des notes de calcul de structure et les justificatifs nécessaires.")
        },
        {
            q: t("Können wir klein anfangen und die Anlage später erweitern?", "Can we start small and extend the park later?", "Peut-on commencer petit et agrandir l'installation plus tard ?"),
            a: t("Ja, genau dafür ist das A+-Modulsystem gemacht. Viele Kommunen starten mit einem Starter-Kit, zum Beispiel aus Quarterpipe, Bank und Rail, und erweitern den Skatepark über Jahre. Weil keine Fundamente gegossen werden, ist das jederzeit möglich. Elemente können auch umgestellt oder an einen neuen Standort versetzt werden.", "Yes, that is exactly what the A+ modular system is for. Many municipalities start with a starter kit, for example a quarter pipe, a bank and a rail, and extend the skatepark over the years. Because no foundations are poured, this is possible at any time. Elements can also be rearranged or moved to a new site.", "Oui, c'est exactement ce pour quoi le système modulaire A+ a été conçu. De nombreuses communes commencent par un kit de départ, par exemple un quarter, un bank et un rail, puis agrandissent le skatepark au fil des ans. Comme aucune fondation n'est coulée, c'est possible à tout moment. Les éléments peuvent aussi être réagencés ou déplacés sur un nouveau site.")
        },
        {
            q: t("Wie laufen Planung und Bau eines Skateparks ab?", "How do planning and construction of a skatepark work?", "Comment se déroulent la planification et la construction d'un skatepark ?"),
            a: t("Der Prozess beginnt mit einer Bedarfsanalyse vor Ort. Wir übernehmen die gesamte Planung: vom Entwurf über die 3D-Planung und die normgerechte Ausarbeitung nach DIN EN 14974 bis zur schlüsselfertigen Montage. Die Betonfertigteile kommen per Lkw und werden mit Gabelstapler, Hubwagen oder, bei Pipes und hohen Elementen, mit dem Autokran aufgestellt. Eine typische Skateanlage steht innerhalb weniger Tage.", "The process starts with a needs analysis on site. We take care of the entire planning: from the design through 3D planning and detailed engineering to EN 14974, to turnkey installation. The precast concrete units arrive by lorry and are set up with a forklift, a pallet truck or, for pipes and tall elements, a mobile crane. A typical skatepark is in place within a few days.", "Le processus commence par une analyse des besoins sur place. Nous prenons en charge toute la planification : de l'avant-projet à la réalisation clé en main, en passant par la planification 3D et l'étude technique conforme à la norme EN 14974. Les éléments préfabriqués arrivent par camion et sont mis en place avec un chariot élévateur, un transpalette ou, pour les pipes et les éléments hauts, une grue mobile. Un skatepark standard est installé en quelques jours.")
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
                        {t("Wissen und Technik", "Technical FAQ", "Savoir et technique")}
                    </span>
                    <h2 className="text-4xl md:text-7xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-[0.9]">
                        {t(<>Häufige <span className="text-brand-orange">Fragen</span></>, <>Frequently asked <span className="text-brand-orange">questions</span></>, <>Questions <span className="text-brand-orange">fréquentes</span></>)}
                    </h2>
                    <p className="text-brand-muted mt-6 max-w-2xl mx-auto">
                        {t("Alles über Planung, Kosten, Fördermittel und Bau von Skateparks, Pumptracks und BMX-Anlagen, von Ihrem Skatepark-Hersteller.", "Everything about planning, costs, funding and construction of skateparks, pump tracks and BMX facilities, from your skatepark manufacturer.", "Tout sur la planification, les coûts, les aides et la construction de skateparks, de pumptracks et d'installations BMX, par votre fabricant de skateparks.")}
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
    const t = useT();
    const PRODUCTS = useProducts();
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
                        {t(<>Unsere<br/><span className="text-brand-orange">Produkte</span></>, <>Our<br/><span className="text-brand-orange">products</span></>, <>Nos<br/><span className="text-brand-orange">produits</span></>)}
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
                                                {t("TÜV-ZERTIFIZIERT", "TÜV-CERTIFIED", "CERTIFIÉ TÜV")}
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
                                                        {t('Produkt', 'Product', 'Produit')} 0{index + 1}
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
                                                                <div className="text-[10px] text-brand-muted uppercase tracking-wider mb-1">{t("Material", "Material", "Matériau")}</div>
                                                                <div className="text-sm font-bold text-brand-dark">{product.material}</div>
                                                            </div>
                                                            <div className="bg-brand-surface/40 p-3 rounded-xl border border-brand-dark/5 shadow-sm">
                                                                <div className="text-[10px] text-brand-muted uppercase tracking-wider mb-1">{t("Besonderheit", "Special feature", "Particularité")}</div>
                                                                <div className="text-sm font-bold text-brand-dark">{product.details}</div>
                                                            </div>
                                                        </div>
                                                        <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-brand-dark hover:text-brand-orange transition-colors group/link">
                                                            {t("Technische Daten", "Technical data", "Données techniques")} <span className="material-symbols-outlined text-sm ml-1 group-hover/link:translate-x-1 transition-transform">chevron_right</span>
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
                        {t("Zur Produkt-Übersicht", "View all products", "Voir tous les produits")}
                        <span className="text-xl group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </Link>
                </AnimatedSection>
            </div>
        </section>
    );
};

// --- Service Overview Section (Planung / Montage / Service) ---
const ServiceOverviewSection: React.FC = () => {
    const t = useT();
    const services = [
        {
            title: t("Planung & Beratung", "Design & Advice", "Conception & conseil"),
            desc: t("Wir begleiten Sie von der ersten Idee bis zur Ausführungsplanung nach DIN EN 14974. Auf Grundlage Ihrer Fläche und Ihres Budgets erstellen wir Draufsichten und 3D-Entwürfe.", "We guide you from the first idea to the detailed design to EN 14974. Based on your site and budget, we produce plan views and 3D designs.", "Nous vous accompagnons de la première idée jusqu'à l'étude d'exécution selon la norme EN 14974. À partir de votre terrain et de votre budget, nous établissons des plans de masse et des esquisses 3D.")
        },
        {
            title: t("Bau & Montage", "Build & Installation", "Construction & montage"),
            desc: t("Schneller, meist günstiger und weniger wetterabhängig als Ortbeton: Unsere modularen Fertigteile werden direkt auf Asphalt, Beton oder Fundamentplatte montiert. Eine typische Anlage baut unser Team in wenigen Tagen schlüsselfertig auf.", "Faster, usually cheaper and less weather-dependent than in-situ concrete: our modular precast units are installed directly on asphalt, concrete or a foundation slab. Our team typically completes a turnkey park in a few days.", "Plus rapides, le plus souvent moins chers et moins dépendants de la météo que le béton coulé en place : nos éléments préfabriqués modulaires se posent directement sur l'asphalte, le béton ou une dalle de fondation. Notre équipe monte une installation courante clé en main en quelques jours.")
        },
        {
            title: t("Service & Wartung", "Service & Maintenance", "Service & entretien"),
            desc: t("Auch nach der Eröffnung lässt sich die Anlage erweitern, umbauen oder versetzen. Einzelne Module können repariert werden. Wir liefern Wartungsanleitungen, unterstützen bei Erweiterungen und bleiben Ihr Ansprechpartner.", "Even after opening, the park can be extended, rearranged or moved. Individual modules can be repaired. We supply maintenance instructions, support extensions and remain your point of contact.", "Même après l'inauguration, l'installation peut être agrandie, réaménagée ou déplacée. Les modules peuvent être réparés individuellement. Nous fournissons les instructions d'entretien, vous accompagnons pour les extensions et restons votre interlocuteur.")
        }
    ];

    return (
        <section id="leistungen" className="py-24 relative bg-brand-surface/30 border-y border-brand-dark/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <AnimatedSection className="mb-16 text-center">
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">
                        {t("Alles aus einer Hand", "One partner from design to aftercare", "Un seul interlocuteur")}
                    </span>
                    <h2 className="text-4xl md:text-7xl font-extrabold font-heading text-brand-dark uppercase tracking-normal [word-spacing:0.12em] leading-[1.02]">
                        {t(<>Planung, Bau<br />& <span className="text-brand-orange">Service</span></>, <>Design, build<br />& <span className="text-brand-orange">service</span></>, <>Conception, réalisation<br />& <span className="text-brand-orange">service</span></>)}
                    </h2>
                    <p className="text-brand-muted mt-6 max-w-2xl mx-auto">
                        {t("Seit über 25 Jahren begleiten wir Kommunen, Architekten und Landschaftsplaner durch jede Phase eines Skatepark-Projekts, von der Beratung bis zur langfristigen Wartung.", "For more than 25 years we have guided municipalities, architects and landscape planners through every phase of a skatepark project, from consultation to long-term maintenance.", "Depuis plus de 25 ans, nous accompagnons les communes, les architectes et les paysagistes à chaque étape d'un projet de skatepark, du conseil à l'entretien à long terme.")}
                    </p>
                </AnimatedSection>


            <div className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-[440px_240px] gap-4 max-w-6xl mx-auto">
                <PhaseKachel className="lg:col-span-4" nr={1} info="DIN EN 14974" service={services[0]} unten={false}>
                    <Park3D alt={t("3D-Modell eines Skateparks aus Katalogelementen", "3D model of a skatepark made of catalogue elements", "Modèle 3D d'un skatepark en éléments du catalogue")} />
                </PhaseKachel>
                <PhaseKachel className="lg:col-span-4" nr={2} info={t("Montage", "Installation", "Montage")} service={services[1]} unten
                    foto="/images/leistungen/bau-montage-kran.jpg" alt={t("Montage einer Skate-Pipe mit Autokran", "Installing a skate pipe with a mobile crane", "Montage d'une pipe de skate à la grue mobile")} pos="50% 55%"
                    plan={<circle cx="400" cy="170" r="44" strokeWidth="2" strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />} />
                <PhaseKachel className="lg:col-span-4" nr={3} info={t("Wartung", "Maintenance", "Entretien")} service={services[2]} unten={false}
                    foto="/images/leistungen/service-anlage-abend.jpg" alt={t("Luftaufnahme einer Skateanlage am Abend", "Aerial view of a skatepark in the evening", "Vue aérienne d'un skatepark en soirée")} pos="50% 50%"
                    plan={<rect x="470" y="230" width="150" height="90" strokeWidth="2" strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />} />

                <article className="lg:col-span-8 rounded-2xl bg-brand-orange text-white p-7 flex flex-col justify-between gap-6 min-h-[200px]">
                    <span className="font-mono text-xs tracking-[0.18em] uppercase text-[#F2F7EC]">{t("Bauzeit", "Build time", "Durée du chantier")}</span>
                    <div className="flex flex-col gap-3">
                        <strong className="font-heading font-extrabold uppercase text-5xl md:text-6xl leading-[1.05] [word-spacing:0.12em]">{t("Wenige Tage", "A few days", "Quelques jours")}</strong>
                        <span className="text-[#F2F7EC]">{t("bis zur schlüsselfertigen Anlage, bei einer typischen Anlage", "to a turnkey park, for a typical park", "jusqu'à l'installation clé en main, pour une installation type")}</span>
                    </div>
                </article>
                <article className="lg:col-span-4 rounded-2xl bg-brand-bg border-[1.5px] border-brand-dark p-7 flex flex-col justify-between gap-6 min-h-[200px]">
                    <span className="font-mono text-xs tracking-[0.18em] uppercase text-[#4F6E34]">{t("Planung", "Design", "Conception")}</span>
                    <Link to="/planung" className="inline-flex items-center gap-2 min-h-12 self-start text-brand-dark font-bold border-b-2 border-brand-orange pb-1 hover:text-brand-orange transition-colors uppercase tracking-wider group">
                        {t("Kompletten Planungsprozess ansehen", "See the complete planning process", "Voir tout le processus de planification")}
                        <span className="text-xl group-hover:translate-x-1 transition-transform">&rarr;</span>
                    </Link>
                </article>
            </div>
            </div>
        </section>
    );
};

// Phase 01: der Park aus dem Katalog dreht sich beim Überfahren (am Handy dauerhaft langsam). Three.js lädt erst, wenn der Abschnitt nahe ist.
const ParkAnsicht3D = lazy(() => import('../components/katalog/ParkAnsicht'));
const Park3D: React.FC<{ alt: string }> = ({ alt }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [nah, setNah] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el || typeof IntersectionObserver === 'undefined') { setNah(true); return; }
        const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setNah(true); io.disconnect(); } }, { rootMargin: '400px' });
        io.observe(el);
        return () => io.disconnect();
    }, []);
    return (
        <div ref={ref} className="relative h-[260px] lg:absolute lg:inset-x-0 lg:bottom-0 lg:h-[54%]">
            {nah && <Suspense fallback={null}><ParkAnsicht3D beiHover teile={parkStart.teile} extra={parkStart.extra} flaeche={parkStart.flaeche} boeschung={null} alt={alt} /></Suspense>}
            <span className="absolute left-4 bottom-3 flex items-center gap-2 px-3 py-2 rounded-full border border-brand-dark/45 bg-brand-bg/85 font-mono text-[11px] uppercase tracking-[0.14em] text-brand-dark pointer-events-none">
                <span className="material-symbols-outlined text-base group-hover:animate-spin">3d_rotation</span>
                <Dreh />
            </span>
        </div>
    );
};
const Dreh: React.FC = () => { const t = useT(); return <>{t("3D, drehbar", "3D, rotatable", "3D, rotatif")}</>; };

type Service = { title: string; desc: string };
const PhaseKachel: React.FC<{ className: string; nr: number; info: string; service: Service; unten: boolean; foto?: string; alt?: string; pos?: string; plan?: React.ReactNode; children?: React.ReactNode }> = ({ className, nr, info, service, unten, foto, alt, pos, plan, children }) => (
    <article className={`group relative rounded-2xl overflow-hidden flex flex-col lg:block ${foto ? 'bg-brand-dark' : 'bg-[#D3DDC6] bg-[linear-gradient(rgba(44,53,48,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(44,53,48,.07)_1px,transparent_1px),radial-gradient(ellipse_at_65%_75%,#F2F5EC,#C6D3B8_75%)] bg-[length:40px_40px,40px_40px,100%_100%]'} ${className}`}>
        {foto && (
            <div className="relative h-[260px] lg:absolute lg:inset-0 lg:h-full">
                <img src={foto} alt={alt} loading="lazy" style={{ objectPosition: pos }} className="absolute inset-0 w-full h-full object-cover grayscale contrast-[1.15] brightness-90 transition-[filter,transform] duration-700 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:scale-[1.04]" />
                <div className="absolute inset-0 bg-[#33502B] mix-blend-multiply opacity-60 transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />
                {plan && <div className="hidden lg:block"><Plan>{plan}</Plan></div>}
            </div>
        )}
        {children}
        <div className={`relative m-4 lg:absolute lg:left-5 lg:right-5 lg:m-0 ${unten ? 'lg:bottom-5' : 'lg:top-5'} bg-brand-bg text-brand-dark border-[1.5px] border-brand-dark grid grid-cols-2`}>
            <span className="px-3 py-2 border-r border-b border-brand-dark font-mono text-[11px] tracking-[0.14em] uppercase">Phase 0{nr} / 03</span>
            <span className="px-3 py-2 border-b border-brand-dark font-mono text-[11px] tracking-[0.14em] uppercase">{info}</span>
            <div className="col-span-2 px-4 pt-3 pb-4 flex flex-col gap-2">
                <h3 className="font-heading font-extrabold uppercase text-2xl leading-[1.08] [word-spacing:0.12em]">{service.title}</h3>
                <p className="text-sm text-brand-dark/75 leading-snug">{service.desc}</p>
            </div>
        </div>
    </article>
);

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

const Anspruch: React.FC = () => {
  const t = useT();
  return (
    <section id="philosophie" className="bg-[#1F2622] text-brand-bg py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col gap-12 lg:gap-14">
            <div className="flex flex-wrap gap-x-16 gap-y-6 items-end justify-between">
                <div className="flex flex-col gap-5">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#A9C98A]">{t("Unser Anspruch", "Our standard", "Notre exigence")}</span>
                    <h2 className="text-5xl md:text-8xl font-extrabold font-heading uppercase leading-[0.88] tracking-tighter">{t(<>Gebaut für<br /><span className="text-[#A9C98A]">Jahrzehnte</span></>, <>Built for<br /><span className="text-[#A9C98A]">decades</span></>, <>Conçu pour<br /><span className="text-[#A9C98A]">des décennies</span></>)}</h2>
                </div>
                <p className="max-w-sm text-lg leading-relaxed text-[#C9CCC4]">{t("Beton, Stahl und Gummi, im Werk gefertigt und vom TÜV geprüft. Und wenn sich der Ort ändert, ziehen die Elemente einfach mit.", "Concrete, steel and rubber, made in the factory and tested by TÜV. And when the place changes, the elements simply move with it.", "Béton, acier et caoutchouc, fabriqués en usine et contrôlés par le TÜV. Et quand le lieu change, les éléments suivent tout simplement.")}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 lg:auto-rows-[290px] gap-4">
                <Fotokachel src="/images/details/einstellung-04.jpg" alt={t("Höhenverstellbarer Fuß eines Betonelements auf Asphalt", "Height-adjustable foot of a concrete element on asphalt", "Pied réglable en hauteur d'un élément en béton sur de l'asphalte")} className="h-[440px] lg:h-auto lg:col-span-7 lg:row-span-2">
                    <Plan>
                        <circle cx="368" cy="300" r="30" strokeWidth="2" strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
                    </Plan>
                    <Plankopf gross oben blatt={t("BLATT 01 / 04", "SHEET 01 / 04", "PLANCHE 01 / 04")} info={t("Detail Fuß", "Detail: foot", "Détail : pied")} titel={t("Fundamentfrei", "No foundations", "Sans fondation")} text={t("Steht auf vorhandenem Asphalt oder Beton. Vor Ort wird nicht betoniert.", "Stands on existing asphalt or concrete. No concreting on site.", "Se pose sur de l'asphalte ou du béton existant. Aucun bétonnage sur place.")} />
                </Fotokachel>

                <Fotokachel src="/images/details/schutzkante-01.jpg" alt={t("Einbetonierter Kantenschutz an der Fahrkante", "Cast-in edge protection on the riding edge", "Protection d'arête scellée sur l'arête de roulement")} className="h-[320px] lg:h-auto lg:col-span-5">
                    <Plan>
                        <circle cx="340" cy="238" r="32" strokeWidth="2" strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
                    </Plan>
                    <Plankopf oben blatt={t("BLATT 02 / 04", "SHEET 02 / 04", "PLANCHE 02 / 04")} info="C35/45" titel={t("Vandalismussicher", "Vandal-resistant", "Résistant au vandalisme")} text={t("Wand 8 bis 16 cm. Nicht schneidbar, nicht brennbar.", "Wall 8 to 16 cm. Cannot be cut, does not burn.", "Paroi de 8 à 16 cm. Impossible à découper, incombustible.")} />
                </Fotokachel>

                <article className="lg:col-span-5 rounded-2xl bg-brand-bg text-brand-dark p-5 grid grid-cols-1 sm:grid-cols-[auto_minmax(0,1fr)] gap-5 lg:min-h-0">
                    <img src="/images/details/tuev-gs.png" alt={t("GS-Zeichen von TÜV SÜD", "GS mark from TÜV SÜD", "Marque GS du TÜV SÜD")} width="317" height="320" loading="lazy" className="h-44 sm:h-full max-h-[250px] w-auto justify-self-center object-contain" />
                    <div className="flex flex-col justify-between gap-5 sm:border-l-[1.5px] sm:border-brand-dark sm:pl-5 min-w-0">
                        <div className="flex flex-col gap-1 font-mono text-[11px] tracking-[0.14em]"><span>{t("BLATT 03 / 04", "SHEET 03 / 04", "PLANCHE 03 / 04")}</span><span>EN 14974</span></div>
                        <div className="flex flex-col gap-1.5">
                            <h3 className="font-heading font-extrabold uppercase text-2xl leading-none">{t("Geprüfte Sicherheit", "Tested safety", "Sécurité contrôlée")}</h3>
                            <p className="text-sm text-brand-dark/75 leading-snug">{t("TÜV-zertifiziert seit 2000. Der TÜV überwacht auch die Fertigung.", "TÜV-certified since 2000. TÜV also monitors production.", "Certifié TÜV depuis 2000. Le TÜV surveille aussi la fabrication.")}</p>
                        </div>
                    </div>
                </article>

                <Fotokachel src="/images/montage/transport-01.jpg" alt={t("Gabelstapler hebt ein Betonelement vom Lkw", "Forklift lifting a concrete element off a lorry", "Chariot élévateur déchargeant un élément en béton d'un camion")} className="h-[320px] lg:h-auto lg:col-span-8">
                    <Plan>
                        <rect x="345" y="212" width="112" height="54" strokeWidth="2" strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
                    </Plan>
                    <Plankopf blatt={t("BLATT 04 / 04", "SHEET 04 / 04", "PLANCHE 04 / 04")} info="KrWG § 6" titel={t("Versetzen statt abreißen", "Move it, don't demolish it", "Déplacer plutôt que démolir")} text={t("Kein Abbruch, kein Bauschutt. Ihre Investition zieht mit.", "No demolition, no rubble. Your investment moves with you.", "Ni démolition, ni gravats. Votre investissement vous suit.")} />
                </Fotokachel>

                <article className="lg:col-span-4 rounded-2xl bg-brand-orange text-white p-7 flex flex-col justify-between gap-6 min-h-[240px]">
                    <span className="font-mono text-xs tracking-[0.18em] text-[#F2F7EC]">{t("IM EINSATZ", "IN USE", "EN SERVICE")}</span>
                    <div className="flex flex-col gap-1">
                        <strong className="font-heading font-extrabold text-8xl leading-[0.85] tracking-tighter">350+</strong>
                        <span className="text-[#F2F7EC]">{t("Anlagen seit 1998", "installations since 1998", "installations depuis 1998")}</span>
                    </div>
                </article>
            </div>

            <Link to="/ueber-uns" className="self-start inline-flex items-center gap-2 min-h-12 font-bold uppercase tracking-wider border-b-2 border-[#A9C98A] pb-1 hover:text-[#C9DDB6] transition-colors group">
                {t("Mehr über unsere Philosophie", "More about our philosophy", "En savoir plus sur notre philosophie")} <span className="text-xl group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
        </div>
    </section>
  );
};

// --- HYBRID HERO COMPONENT (Mobile Optimized + Video) ---
// Strategy: 
// 1. Show Image IMMEDIATELY (LCP < 0.5s)
// 2. Wait 2.5 seconds (Allow Mobile UI to settle)
// 3. Inject Video (Cool factor returns without blocking initial scroll)
// Hero-Karussell: Wechselt automatisch zwischen Bildern (5s) und Videos (10s)
type Slide =
  | { type: 'image'; src: string; alt: [string, string, string]; duration: number }
  | { type: 'video'; src: string; poster: string; duration: number };

// Videos starten bei Sekunde 15 (um Logos/Intro zu überspringen) und spielen 10 Sek
const VIDEO_START_TIME = 15;

const SLIDES: Slide[] = [
  { type: 'image', src: '/images/homepage/hero-banner.jpg', alt: ["A+ Urban Design Skatepark", "A+ Urban Design skatepark", "Skatepark A+ Urban Design"], duration: 5000 },
  { type: 'video', src: '/videos/skateparks/contest-skateboard.mp4', poster: '/videos/skateparks/poster-contest-skateboard.jpg', duration: 10000 },
  { type: 'image', src: '/images/homepage/hero-anlage-01.jpg', alt: ["Beton-Skatepark, Totalaufnahme", "Concrete skatepark, wide shot", "Skatepark en béton, vue d'ensemble"], duration: 5000 },
  { type: 'image', src: '/images/homepage/hero-anlage-panorama.jpg', alt: ["Skatepark-Panorama mit Bowl und Street-Area", "Skatepark panorama with bowl and street area", "Panorama d'un skatepark avec bowl et zone street"], duration: 5000 },
  { type: 'video', src: '/videos/skateparks/contest-bmx.mp4', poster: '/videos/skateparks/poster-contest-bmx.jpg', duration: 10000 },
  { type: 'image', src: '/images/homepage/hero-anlage-02.jpg', alt: ["Skatepark-Anlage komplett", "Complete skatepark", "Skatepark complet"], duration: 5000 },
];

const Hero: React.FC = () => {
    const t = useT();
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
                                alt={t(...slide.alt)}
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

            {/* LAYER 3: Verlauf von links (Lesbarkeit, siehe .hero-scrim in index.css) */}
            <div className="absolute inset-0 z-20 hero-scrim"></div>

            {/* LAYER 4: CONTENT */}
            <div className="absolute inset-0 z-30 container mx-auto px-4 pb-24 md:pb-32 pt-32 flex flex-col justify-center pointer-events-none hero-text">
                 <div className="max-w-7xl">
                    <div className="animate-fade-in-up">
                        <h1 className="flex flex-col font-extrabold font-heading uppercase tracking-normal leading-[1.2] md:leading-[1.05]">
                            <span className="text-[clamp(2rem,6vw,6rem)] text-white">{t("Architektur", "Architecture", "Architecture")}</span>
                            <span className="text-[clamp(2rem,6vw,6rem)] text-white">{t("für", "for", "pour les")}</span>
                            <span className="text-[clamp(2rem,6vw,6rem)] text-brand-orange">{t("Freiräume", "open spaces", "espaces publics")}</span>
                        </h1>
                        <p className="mt-6 md:mt-8 text-lg md:text-2xl text-white max-w-xl md:max-w-2xl font-normal border-l-4 border-brand-orange pl-4 md:pl-6 animate-fade-in-up [animation-delay:300ms]">
                            {/* Roland §3.2: 30-Jahre-Jubiläums-Claim noch klären, vorläufig */}
                            {t(
                                <>Skateparks, Pumptracks und urbane Anlagen aus Beton und Stahl. <span className="text-white font-bold">Modular. Robust. Fundamentfrei. Recycelbar.</span></>,
                                <>Skateparks, pump tracks and urban facilities made of concrete and steel. <span className="text-white font-bold">Modular. Robust. Foundation-free. Recyclable.</span></>,
                                <>Skateparks, pumptracks et équipements urbains en béton et en acier. <span className="text-white font-bold">Modulaires. Robustes. Sans fondation. Recyclables.</span></>,
                            )}
                        </p>
                    </div>
                 </div>
            </div>
        </div>
    );
};


const HomePage: React.FC = () => {
  const t = useT();
  return (
    <PageShell 
        title={t("Skatepark-Hersteller | Beton-Skateparks & Pumptracks", "Skatepark Manufacturer | Concrete Skateparks & Pump Tracks", "Fabricant de skateparks | Skateparks en béton & pumptracks")}
        description={t("A+ Urban Design: Ihr Skatepark-Hersteller aus Stuttgart. Wir planen und bauen Skateparks, Pumptracks und Hockey-Banden aus Beton. Unsere Skate-Elemente sind TÜV-zertifiziert. Modular, fundamentfrei, seit 1999.", "A+ Urban Design: your Stuttgart-based skatepark manufacturer. We design and build skateparks, pump tracks and hockey boards in concrete. Our skate elements are TÜV-certified. Modular, foundation-free, since 1999.", "A+ Urban Design : votre fabricant de skateparks à Stuttgart. Nous concevons et construisons des skateparks, des pumptracks et des bandes de hockey en béton. Nos éléments de skate sont certifiés TÜV. Modulaires, sans fondation, depuis 1999.")}
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
                    {t("Ihr Projekt", "Your project", "Votre projet")}
                 </span>
              </div>
              <h2 className="text-6xl md:text-[10rem] font-extrabold font-heading uppercase tracking-tighter mb-12 leading-[0.85] text-brand-dark">
                {t(<>Start<br/><span className="text-brand-orange">klar?</span></>, <>Ready<br/><span className="text-brand-orange">to go?</span></>, <>Prêt<br/><span className="text-brand-orange">à démarrer ?</span></>)}
              </h2>
              <p className="text-lg md:text-2xl text-brand-muted max-w-2xl mx-auto mb-16 font-light">
                  {t("Sprechen Sie mit uns über Ihre Fläche.", "Talk to us about your site.", "Parlez-nous de votre terrain.")} <br/>
                  <span className="text-brand-dark font-bold">{t("Von der ersten Skizze bis zur Eröffnung.", "From the first sketch to the opening.", "De la première esquisse à l'inauguration.")}</span>
              </p>
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-4 bg-brand-orange text-white font-extrabold uppercase tracking-widest text-base md:text-lg py-5 px-10 md:py-6 md:px-12 rounded-2xl hover:bg-brand-dark hover:text-white transition-all duration-300 transform hover:-translate-y-2 shadow-[0_8px_30px_rgba(107,143,74,0.3)] hover:shadow-[0_12px_40px_rgba(44,53,48,0.25)] group"
              >
                {t("Projekt starten", "Start your project", "Lancer votre projet")} <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform text-2xl">arrow_forward</span>
              </Link>
            </AnimatedSection>
          </div>
        </section>
    </PageShell>
  );
};

export default HomePage;
