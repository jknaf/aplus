import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Link, useT } from '../i18n';
import { useNavLinks, useProducts } from '../localized';
import BrochureRequestForm from '../components/BrochureRequestForm';
import PageShell from '../components/PageShell';
import Bild from '../components/Bild';
import parkStart from '../components/katalog/park-startseite.json';
import Plankopf, { Kopfleiste } from '../components/Plankopf';

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
                <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-20 items-start">
                    <AnimatedSection className="lg:sticky lg:top-32">
                        <Plankopf label={t("Wissen und Technik", "Technical FAQ", "Savoir et technique")} klein className="mb-6">
                            {t(<>Häufige <span className="text-brand-orange">Fragen</span></>, <>Frequently asked <span className="text-brand-orange">questions</span></>, <>Questions <span className="text-brand-orange">fréquentes</span></>)}
                        </Plankopf>
                        <p className="text-xl leading-relaxed text-brand-dark/75">
                            {t("Alles über Planung, Kosten, Fördermittel und Bau von Skateparks, Pumptracks und BMX-Anlagen, von Ihrem Skatepark-Hersteller.", "Everything about planning, costs, funding and construction of skateparks, pump tracks and BMX facilities, from your skatepark manufacturer.", "Tout sur la planification, les coûts, les aides et la construction de skateparks, de pumptracks et d'installations BMX, par votre fabricant de skateparks.")}
                        </p>
                    </AnimatedSection>
                    <div className="border-t-2 border-brand-dark">
                        {faqs.map((faq, index) => (
                            <details key={index} name="faq" open={index === 0} className="group border-b border-brand-dark/15">
                                <summary className="grid grid-cols-[40px_minmax(0,1fr)_44px] md:grid-cols-[64px_minmax(0,1fr)_44px] items-center gap-3 md:gap-4 py-6 md:py-7 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                                    <span className="font-mono text-[13px] tracking-[0.1em] text-brand-dark/70 group-open:text-brand-orange">{String(index + 1).padStart(2, '0')}</span>
                                    <span className="font-heading font-bold text-lg md:text-[22px] leading-snug text-brand-dark group-hover:text-brand-orange transition-colors">{faq.q}</span>
                                    <span className="w-11 h-11 rounded-full border border-brand-dark/30 flex items-center justify-center text-brand-dark transition-colors group-open:bg-brand-orange group-open:border-brand-orange group-open:text-white" aria-hidden="true">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 8h10" /><path d="M8 3v10" className="group-open:hidden" /></svg>
                                    </span>
                                </summary>
                                <p className="pb-8 md:pl-[80px] pr-2 md:pr-[60px] text-lg leading-relaxed text-brand-dark/75 max-w-3xl">{faq.a}</p>
                            </details>
                        ))}
                    </div>
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
                <AnimatedSection className="mb-24">
                    <Plankopf label="Portfolio">
                        {t(<>Unsere <span className="text-brand-orange">Produkte</span></>, <>Our <span className="text-brand-orange">products</span></>, <>Nos <span className="text-brand-orange">produits</span></>)}
                    </Plankopf>
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
                                        <div className="bg-white rounded-lg p-2 shadow-lg">
                                            <img src="/images/details/tuev-gs.png" alt={t("GS-Zeichen von TÜV SÜD", "GS mark from TÜV SÜD", "Marque GS du TÜV SÜD")} width="317" height="320" loading="lazy" className="h-14 w-auto" />
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
                                        className="w-full h-full object-cover"
                                    />
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
                                        <div className={`absolute left-[14px] top-1/2 -translate-y-1/2 w-[11px] h-[11px] rounded-full border-2 transition-all duration-500 hidden md:block z-10 ${isActive ? 'bg-brand-orange border-brand-orange' : 'bg-brand-bg border-brand-dark/20'}`}></div>
                                        <div className={`relative w-full rounded-md border transition-[background-color,border-color] duration-500 overflow-hidden ${isActive ? 'bg-white border-brand-dark/15' : 'bg-white/60 border-brand-dark/5'}`}>
                                            <div className="lg:hidden h-48 relative overflow-hidden border-b border-brand-dark/10">
                                                <Bild 
                                                    src={product.imageUrl}
                                                    alt={product.title}
                                                    className="w-full h-full object-cover"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <Link to={product.path} className="group/link block p-6 md:p-10">
                                                <div className={`text-[13px] font-semibold mb-4 transition-colors ${isActive ? 'text-[#4E6B35]' : 'text-brand-muted'}`}>
                                                    {t('Produkt', 'Product', 'Produit')} 0{index + 1}
                                                </div>
                                                <h3 className={`text-3xl md:text-[38px] font-extrabold font-heading uppercase leading-[1.04] tracking-normal [word-spacing:0.12em] mb-5 transition-colors ${isActive ? 'text-brand-dark' : 'text-brand-muted'}`}>
                                                    {product.title}
                                                </h3>
                                                <p className="text-[17px] leading-[1.6] text-[#454D48] mb-7">{product.usp}</p>
                                                <dl className="mb-7 border-t border-brand-dark/[0.18]">
                                                    <div className="grid grid-cols-[110px_minmax(0,1fr)] sm:grid-cols-[136px_minmax(0,1fr)] gap-4 py-3 border-b border-brand-dark/[0.12]">
                                                        <dt className="text-sm text-[#5F665F]">{t("Material", "Material", "Matériau")}</dt>
                                                        <dd className="text-[15px] font-semibold text-brand-dark">{product.material}</dd>
                                                    </div>
                                                    <div className="grid grid-cols-[110px_minmax(0,1fr)] sm:grid-cols-[136px_minmax(0,1fr)] gap-4 py-3 border-b border-brand-dark/[0.12]">
                                                        <dt className="text-sm text-[#5F665F]">{t("Besonderheit", "Special feature", "Particularité")}</dt>
                                                        <dd className="text-[15px] font-semibold text-brand-dark">{product.details}</dd>
                                                    </div>
                                                </dl>
                                                <span className="inline-flex items-center gap-2 min-h-[44px] text-[15px] font-semibold text-[#4E6B35] underline underline-offset-[5px] decoration-1 group-hover/link:text-brand-dark transition-colors">
                                                    {t("Technische Daten", "Technical data", "Données techniques")}
                                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className="group-hover/link:translate-x-1 transition-transform"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
                                                </span>
                                            </Link>
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
                <AnimatedSection className="mb-16">
                    <Plankopf label={t("Alles aus einer Hand", "One partner from design to aftercare", "Un seul interlocuteur")} text={t("Seit über 25 Jahren begleiten wir Kommunen, Architekten und Landschaftsplaner durch jede Phase eines Skatepark-Projekts, von der Beratung bis zur langfristigen Wartung.", "For more than 25 years we have guided municipalities, architects and landscape planners through every phase of a skatepark project, from consultation to long-term maintenance.", "Depuis plus de 25 ans, nous accompagnons les communes, les architectes et les paysagistes à chaque étape d'un projet de skatepark, du conseil à l'entretien à long terme.")}>
                        {t(<>Planung, Bau<br />& <span className="text-brand-orange">Service</span></>, <>Design, build<br />& <span className="text-brand-orange">service</span></>, <>Conception, réalisation<br />& <span className="text-brand-orange">service</span></>)}
                    </Plankopf>
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
// Fotos leicht getönt (der Block soll nicht zu dunkel wirken), darüber Hinweislinien wie in einer Bauzeichnung, Text im Plankopf. Beim Überfahren wird das Foto farbig.
// Linien im Koordinatensystem des Fotos (756 × 430); "slice" schneidet wie object-cover, die Linien bleiben auf dem Detail.
const Plan: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <svg viewBox="0 0 756 430" preserveAspectRatio="xMidYMid slice" aria-hidden="true"
        className="absolute inset-0 w-full h-full fill-none stroke-white group-hover:stroke-[#C9E3AE] transition-[stroke] duration-500">
        {children}
    </svg>
);

const PlanKachel: React.FC<{ blatt: string; info: string; titel: string; text: string; gross?: boolean; oben?: boolean }> = ({ blatt, info, titel, text, gross, oben }) => (
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
        <img src={src} alt={alt} loading="lazy" className="absolute inset-0 w-full h-full object-cover grayscale-[0.6] contrast-[1.05] transition-[filter,transform] duration-700 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-100 group-hover:scale-[1.04]" />
        <div className="absolute inset-0 bg-[#33502B] mix-blend-multiply opacity-30 transition-opacity duration-700 group-hover:opacity-0 pointer-events-none" />
        {children}
    </article>
);

const Anspruch: React.FC = () => {
  const t = useT();
  return (
    <section id="philosophie" className="bg-brand-dark text-brand-bg py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col gap-12 lg:gap-14">
            <Plankopf label={t("Unser Anspruch", "Our standard", "Notre exigence")} dunkel text={<span className="text-[#C9CCC4]">{t("Beton, Stahl und Gummi, im Werk gefertigt und vom TÜV geprüft. Und wenn sich der Ort ändert, ziehen die Elemente einfach mit.", "Concrete, steel and rubber, made in the factory and tested by TÜV. And when the place changes, the elements simply move with it.", "Béton, acier et caoutchouc, fabriqués en usine et contrôlés par le TÜV. Et quand le lieu change, les éléments suivent tout simplement.")}</span>}>
                {t(<>Gebaut für<br /><span className="text-[#A9C98A]">Jahrzehnte</span></>, <>Built for<br /><span className="text-[#A9C98A]">decades</span></>, <>Conçu pour<br /><span className="text-[#A9C98A]">des décennies</span></>)}
            </Plankopf>

            <div className="grid grid-cols-1 lg:grid-cols-12 lg:auto-rows-[290px] gap-4">
                <Fotokachel src="/images/details/einstellung-04-hell.jpg" alt={t("Höhenverstellbarer Fuß eines Betonelements auf Asphalt", "Height-adjustable foot of a concrete element on asphalt", "Pied réglable en hauteur d'un élément en béton sur de l'asphalte")} className="h-[440px] lg:h-auto lg:col-span-7 lg:row-span-2">
                    <Plan>
                        <circle cx="367" cy="310" r="30" strokeWidth="2" strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
                    </Plan>
                    <PlanKachel gross oben blatt={t("BLATT 01 / 04", "SHEET 01 / 04", "PLANCHE 01 / 04")} info={t("Detail Fuß", "Detail: foot", "Détail : pied")} titel={t("Fundamentfrei", "No foundations", "Sans fondation")} text={t("Steht auf vorhandenem Asphalt oder Beton. Vor Ort wird nicht betoniert.", "Stands on existing asphalt or concrete. No concreting on site.", "Se pose sur de l'asphalte ou du béton existant. Aucun bétonnage sur place.")} />
                </Fotokachel>

                <Fotokachel src="/images/skate-elemente/skate-module-beton-04.jpg" alt={t("Massive Skate-Module aus Beton mit Kantenschutz aus Stahl", "Solid concrete skate modules with steel edge protection", "Modules de skate massifs en béton avec protection d'arête en acier")} className="h-[320px] lg:h-auto lg:col-span-5">
                    <Plan>
                        <circle cx="430" cy="168" r="32" strokeWidth="2" strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
                    </Plan>
                    <PlanKachel oben blatt={t("BLATT 02 / 04", "SHEET 02 / 04", "PLANCHE 02 / 04")} info="C35/45" titel={t("Vandalismussicher", "Vandal-resistant", "Résistant au vandalisme")} text={t("Wand 8 bis 16 cm. Nicht schneidbar, nicht brennbar.", "Wall 8 to 16 cm. Cannot be cut, does not burn.", "Paroi de 8 à 16 cm. Impossible à découper, incombustible.")} />
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

                <Fotokachel src="/images/montage/transport-01-scharf.jpg" alt={t("Gabelstapler hebt ein Betonelement vom Lkw", "Forklift lifting a concrete element off a lorry", "Chariot élévateur déchargeant un élément en béton d'un camion")} className="h-[320px] lg:h-auto lg:col-span-8">
                    <Plan>
                        <rect x="364" y="216" width="148" height="58" strokeWidth="2" strokeDasharray="5 4" vectorEffect="non-scaling-stroke" />
                    </Plan>
                    <PlanKachel blatt={t("BLATT 04 / 04", "SHEET 04 / 04", "PLANCHE 04 / 04")} info="KrWG § 6" titel={t("Versetzen statt abreißen", "Move it, don't demolish it", "Déplacer plutôt que démolir")} text={t("Kein Abbruch, kein Bauschutt. Ihre Investition zieht mit.", "No demolition, no rubble. Your investment moves with you.", "Ni démolition, ni gravats. Votre investissement vous suit.")} />
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

// Die Hero-Videos sind fertig geschnittene 10-s-Clips (ab 0:15 der Contest-Videos),
// das Poster ist ihr erster Frame. Kein Springen im Video nötig.
const SLIDES: Slide[] = [
  { type: 'image', src: '/images/homepage/hero-banner.jpg', alt: ["A+ Urban Design Skatepark", "A+ Urban Design skatepark", "Skatepark A+ Urban Design"], duration: 5000 },
  { type: 'video', src: '/videos/skateparks/hero-skateboard.mp4', poster: '/videos/skateparks/poster-hero-skateboard.jpg', duration: 10000 },
  { type: 'image', src: '/images/homepage/hero-anlage-01.jpg', alt: ["Beton-Skatepark, Totalaufnahme", "Concrete skatepark, wide shot", "Skatepark en béton, vue d'ensemble"], duration: 5000 },
  { type: 'image', src: '/images/homepage/hero-anlage-panorama.jpg', alt: ["Skatepark-Panorama mit Bowl und Street-Area", "Skatepark panorama with bowl and street area", "Panorama d'un skatepark avec bowl et zone street"], duration: 5000 },
  { type: 'video', src: '/videos/skateparks/hero-bmx.mp4', poster: '/videos/skateparks/poster-hero-bmx.jpg', duration: 10000 },
];

const KENNWERTE: { wert: [string, string, string]; label: [string, string, string] }[] = [
  { wert: ["Modular", "Modular", "Modulaires"], label: ["Aus Betonelementen", "Made of concrete elements", "En éléments béton"] },
  { wert: ["Robust", "Robust", "Robustes"], label: ["Bewehrter Beton", "Reinforced concrete", "Béton armé"] },
  { wert: ["Fundamentfrei", "Foundation-free", "Sans fondation"], label: ["Direkt auf Asphalt", "Straight onto asphalt", "Directement sur l'asphalte"] },
  { wert: ["Recycelbar", "Recyclable", "Recyclables"], label: ["Beton und Stahl", "Concrete and steel", "Béton et acier"] },
];

// Läuft ein Video nach dieser Zeit noch nicht (langsames Netz), geht das Karussell trotzdem weiter
const VIDEO_WAIT_MAX = 5000;

const Hero: React.FC = () => {
    const t = useT();
    // Die acht Produkte aus dem Menü, in der Sprache der Seite
    const produkte = (useNavLinks().find((l) => l.href === '/produkte')?.subLinks ?? []).map((s) => s.name);
    const [currentIndex, setCurrentIndex] = useState(0);
    const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

    useEffect(() => {
        const current = SLIDES[currentIndex];
        let timer: ReturnType<typeof setTimeout> | undefined;
        let fallback: ReturnType<typeof setTimeout> | undefined;
        const startTimer = () => {
            if (timer) return;
            clearTimeout(fallback);
            timer = setTimeout(() => setCurrentIndex((prev) => (prev + 1) % SLIDES.length), current.duration);
        };

        // Bei Videos: von vorn abspielen, Slide-Timer erst starten, wenn das Video läuft
        const video = current.type === 'video' ? videoRefs.current[currentIndex] : null;
        if (video) {
            video.addEventListener('playing', startTimer, { once: true });
            video.currentTime = 0;
            video.play().catch(startTimer); // Autoplay blockiert: Poster zeigen, weiterdrehen
            fallback = setTimeout(startTimer, VIDEO_WAIT_MAX);
        } else {
            startTimer();
        }

        // Nächstes Video schon während dieser Slide ganz laden, damit es beim
        // Einblenden sofort läuft. Nur das nächste, nicht alle beim Seitenstart
        // (Safari 26 lädt bei preload="auto" sonst alles auf einmal).
        const nextIndex = (currentIndex + 1) % SLIDES.length;
        const nextVideo = SLIDES[nextIndex].type === 'video' ? videoRefs.current[nextIndex] : null;
        if (nextVideo && nextVideo.preload !== 'auto') {
            nextVideo.preload = 'auto';
            nextVideo.load();
        }

        return () => {
            clearTimeout(timer);
            clearTimeout(fallback);
            video?.removeEventListener('playing', startTimer);
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
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* LAYER 3: Verlauf von links (Lesbarkeit, siehe .hero-scrim in index.css) */}
            <div className="absolute inset-0 z-20 hero-scrim"></div>

            {/* LAYER 4: CONTENT */}
            {/* safe center: reicht die Höhe nicht (z. B. 800 × 600), beginnt der Text unter dem Menü statt nach oben darunter zu rutschen */}
            <div className="absolute inset-0 z-30 container mx-auto px-4 pb-24 md:pb-32 pt-32 md:pt-24 flex flex-col [justify-content:safe_center] pointer-events-none hero-text">
                 <div className="max-w-7xl w-full">
                    {/* Wisch-Animation am Wrapper: .hero-wisch setzt display:block und würde die Flex-Zeile der Kopfleiste brechen */}
                    <div className="mb-6 md:mb-8 hero-wisch">
                    <Kopfleiste
                        dunkel
                        label={<>
                            <span className="hero-wort" aria-hidden="true"><span>
                                {[...produkte, produkte[0]].map((p, i) => <b key={i}>{p}</b>)}
                            </span></span>
                            <span className="sr-only">{produkte.join(', ')}</span>
                        </>}
                        rechts={
                            <span className="flex items-center gap-2.5 -my-1">
                                <img src="/images/details/tuev-gs.png" alt={t("GS-Zeichen von TÜV SÜD", "GS mark from TÜV SÜD", "Marque GS du TÜV SÜD")} width={24} height={24} className="w-6 h-6 bg-white rounded-sm p-px" />
                                <span>EN 14974</span>
                            </span>
                        }
                    />
                    </div>
                    <h1 className="flex flex-col font-extrabold font-heading uppercase tracking-normal leading-[1.2] md:leading-[1.05] [word-spacing:0.12em]">
                        <span className="hero-wisch text-[clamp(2rem,6vw,6rem)] text-white" style={{ '--d': '0.3s' } as React.CSSProperties}>{t("Architektur", "Architecture", "Architecture")}</span>
                        <span className="hero-wisch text-[clamp(2rem,6vw,6rem)] text-white" style={{ '--d': '0.55s' } as React.CSSProperties}>{t("für", "for", "pour les")}</span>
                        <span className="hero-wisch text-[clamp(2rem,6vw,6rem)] text-brand-orange" style={{ '--d': '0.8s' } as React.CSSProperties}>{t("Freiräume", "open spaces", "espaces publics")}</span>
                    </h1>
                    {/* Roland §3.2: 30-Jahre-Jubiläums-Claim noch klären, vorläufig */}
                    <div className="relative mt-8 md:mt-12">
                        <div className="hero-linie absolute top-0 left-0 w-full h-px bg-white/40"></div>
                        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-y-4">
                            {KENNWERTE.map((k, i) => (
                                <div key={i} className="hero-spalte pt-5 pr-4" style={{ '--i': i } as React.CSSProperties}>
                                    <dt className="font-heading font-extrabold text-xl md:text-2xl xl:text-3xl leading-tight text-white">{t(...k.wert)}</dt>
                                    <dd className="mt-2 font-mono text-xs uppercase tracking-widest text-white/75">{t(...k.label)}</dd>
                                </div>
                            ))}
                        </dl>
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
    </PageShell>
  );
};

export default HomePage;
