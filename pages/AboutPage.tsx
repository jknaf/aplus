import React, { useEffect, useRef, useState } from 'react';
import PageShell from '../components/PageShell';
import { useT } from '../i18n';
import BrochureRequestForm from '../components/BrochureRequestForm';
import Bild from '../components/Bild';

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
  const t = useT();
  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);

  return (
    <PageShell title={t("Über A+ Urban Design: Skatepark-Hersteller seit 1998", "About A+ Urban Design: Skatepark Manufacturer Since 1998", "À propos d'A+ Urban Design : fabricant de skateparks depuis 1998")} description={t("Skatepark-Hersteller mit über 25 Jahren Erfahrung: TÜV-zertifizierte Beton-Skateparks und urbane Anlagen. Ihr Ansprechpartner: Dipl.-Ing. Cüneyit Akcakoca, Stuttgart.", "Skatepark manufacturer with more than 25 years of experience: TÜV-certified concrete skateparks and urban facilities. Your contact: Dipl.-Ing. Cüneyit Akcakoca, Stuttgart.", "Fabricant de skateparks avec plus de 25 ans d'expérience : skateparks en béton et équipements urbains certifiés TÜV. Votre interlocuteur : Dipl.-Ing. Cüneyit Akcakoca, Stuttgart.")}>
      
      {/* 1. CINEMATIC HERO - UNIFIED STYLE */}
      <div className="relative w-full h-[80vh] -mt-16 mb-32 flex items-center justify-center overflow-hidden">
        {/* Background Texture/Image */}
        <div className="absolute inset-0 z-0">
             <Bild hoch 
                src="/images/planung/skateanlage-planung-02.jpg" 
                alt={t("3D-Planung eines Skateparks", "3D design of a skatepark", "Conception 3D d'un skatepark")} 
                className="w-full h-full object-cover grayscale opacity-40 scale-105 animate-[kenburns-1_30s_infinite_alternate]"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent"></div>
             <div className="absolute inset-0 bg-[url('/images/noise.svg')] opacity-20"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-heading uppercase tracking-tighter text-white leading-[0.85] mb-8 animate-fade-in-up [animation-delay:200ms]">
                {t(<>Beton<br/>
                <span className="text-brand-orange">in Bestform</span></>, <>Concrete<br/> <span className="text-brand-orange">at its best</span></>, <>Le béton<br/> <span className="text-brand-orange">au meilleur de sa forme</span></>)}
            </h1>
            <p className="text-xl md:text-2xl text-white/95 font-light max-w-2xl mx-auto animate-fade-in-up [animation-delay:400ms]">
                {t("Skatepark-Hersteller und Planungsbüro aus Stuttgart. Wir machen aus Asphaltflächen Orte für Sport und Bewegung.", "Skatepark manufacturer and design office based in Stuttgart. We turn asphalt surfaces into places for sport and movement.", "Fabricant de skateparks et bureau d'études à Stuttgart. Nous transformons des surfaces d'asphalte en lieux de sport et de mouvement.")}
                {/* Roland §2.1: 30-Jahre-Jubiläums-Claim noch klären */}
                <span className="text-white font-bold"> {t("Modular, vandalismussicher, langlebig.", "Modular, vandal-resistant, long-lasting.", "Modulaire, résistant au vandalisme, durable.")}</span>
            </p>
        </div>
      </div>

      {/* 2. STATS GRID: Zahlen nach Rolands Screenshot-Anmerkungen */}
      <div className="container mx-auto px-4 mb-32">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <StatCounter end={350} suffix="+" label={t("Realisierte Skate-Anlagen", "Skateparks built", "Skateparks réalisés")} />
              <StatCounter end={25} suffix="+" label={t("Jahre Erfahrung", "Years of experience", "Années d'expérience")} />
              <StatCounter end={100} suffix="%" label={t("Made in Europe", "Made in Europe", "Made in Europe")} />
              <StatCounter end={100} suffix="%" label={t("Recycelbar", "Recyclable", "Recyclable")} />
          </div>
      </div>

      {/* 2b. QUALITÄTSNACHWEISE */}
      <div className="container mx-auto px-4 mb-32">
          <div className="max-w-5xl mx-auto bg-brand-surface/60 border border-brand-dark/10 rounded-xl p-8 md:p-12 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/10 backdrop-blur-sm rounded-md">
                  {t("Qualitätsnachweise", "Proof of quality", "Garanties de qualité")}
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter mb-8 leading-none">
                  {t(<>Geprüfte <span className="text-brand-orange">Skate-Elemente</span></>, <>Tested <span className="text-brand-orange">skate elements</span></>, <>Éléments de skate <span className="text-brand-orange">contrôlés</span></>)}
              </h2>
              <p className="text-lg text-brand-muted leading-relaxed">
                  {t("Unsere ersten modularen Skate-Elemente entstanden 1998. Im Jahr 2000 erhielten sie das TÜV-Zertifikat und das GS-Zeichen für geprüfte Sicherheit. Heute sind sie nach DIN EN 14974 („Skateparks: Sicherheitstechnische Anforderungen und Prüfverfahren“), nach PPP 63126B und weiteren Normen geprüft. Die Zertifikatsnummer lautet Z1A 056616 0012. Damit waren wir weltweit vermutlich die ersten Hersteller modularer Beton-Skate-Elemente mit TÜV-Siegel. 27 Fachartikel berichten über Anlagen mit unserem System. Inzwischen wurden mehr als 350 Anlagen mit unserem System gebaut.", "Our first modular skate elements were made in 1998. In 2000 they received the TÜV certificate and the GS mark for tested safety. Today they are tested to EN 14974 (“Skateparks: Safety requirements and test methods”), to PPP 63126B and to further standards. The certificate number is Z1A 056616 0012. That probably made us the first manufacturer in the world of modular concrete skate elements with a TÜV seal. 27 trade articles report on parks built with our system. More than 350 parks have now been built with it.", "Nos premiers éléments de skate modulaires ont vu le jour en 1998. En 2000, ils ont obtenu le certificat TÜV et la marque GS pour la sécurité contrôlée. Aujourd'hui, ils sont testés selon la norme EN 14974 (« Skateparks : exigences de sécurité et méthodes d'essai »), selon PPP 63126B et d'autres normes. Le numéro du certificat est Z1A 056616 0012. Nous avons ainsi probablement été les premiers fabricants au monde d'éléments de skate modulaires en béton portant le sceau TÜV. 27 articles spécialisés rendent compte d'installations réalisées avec notre système. Plus de 350 installations ont désormais été construites avec lui.")}
              </p>
          </div>
      </div>

      {/* 3. THE MISSION (Split Layout) */}
      <div className="container mx-auto px-4 mb-32">
          <div className="flex flex-col lg:flex-row gap-16 items-center mb-16">
              <div className="lg:w-1/2">
                  <div className="relative rounded-xl overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                      <img src="/images/montage/transport-01.jpg" alt={t("Logistik und Montage", "Logistics and installation", "Logistique et montage")} className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700"/>
                      <div className="absolute bottom-4 right-4 bg-black/80 px-2 py-1 text-[10px] font-mono text-brand-orange">{t("Abb. 1: Gabelstapler entlädt Betonelemente vom Lkw", "Fig. 1: Forklift unloading concrete elements from a lorry", "Fig. 1 : un chariot élévateur décharge des éléments en béton d'un camion")}</div>
                  </div>
              </div>
              <div className="lg:w-1/2">
                   <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/10 backdrop-blur-sm rounded-md">{t("Haltung", "Approach", "Philosophie")}</span>
                  <h2 className="text-5xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter mb-8 leading-none">
                      {t(<>Unsere <span className="text-brand-orange">Philosophie</span></>, <>Our <span className="text-brand-orange">philosophy</span></>, <>Notre <span className="text-brand-orange">philosophie</span></>)}
                  </h2>
                  <div className="space-y-6">
                      <p className="text-lg text-brand-muted leading-relaxed border-l-2 border-brand-orange pl-6">
                          {t("Unsere Elemente sollen lange halten, wenig Pflege brauchen und sich später versetzen, umbauen oder recyceln lassen. Die Module lassen sich fast beliebig kombinieren.", "Our elements should last long, need little care and be easy to move, rearrange or recycle later. The modules can be combined almost freely.", "Nos éléments doivent durer longtemps, demander peu d'entretien et pouvoir être déplacés, réagencés ou recyclés par la suite. Les modules se combinent presque à volonté.")}
                      </p>
                      <p className="text-lg text-brand-muted leading-relaxed">
                          {t("Wir fertigen im Werk unter kontrollierten Bedingungen und bauen vor Ort in wenigen Tagen auf.", "We manufacture at the factory under controlled conditions and build on site in a few days.", "Nous fabriquons en usine dans des conditions contrôlées et montons sur place en quelques jours.")}
                      </p>
                      <p className="text-lg text-brand-muted leading-relaxed">
                          {t("Die Elemente entstehen im Werk in lasergeschnittenen Stahlschalungen, nicht als Ortbeton auf der Baustelle. Bewehrung, Wandstärke und Form lassen sich so unabhängig vom Wetter prüfen. Unsere Kantenschutzprofile, eingeführt in den 1990er-Jahren, werden in jede befahrbare Kante eingegossen. Die ersten Elemente sind nach 25 Jahren im öffentlichen Raum noch in Betrieb und mussten nicht saniert werden.", "The elements are made at the factory in laser-cut steel formwork, not as in-situ concrete on the building site. Reinforcement, wall thickness and shape can therefore be checked whatever the weather. Our edge protection profiles, introduced in the 1990s, are cast into every rideable edge. The first elements are still in use in public spaces after 25 years and have not needed refurbishment.", "Les éléments sont fabriqués en usine dans des coffrages en acier découpés au laser, et non coulés en place sur le chantier. L'armature, l'épaisseur des parois et la forme peuvent ainsi être contrôlées quelle que soit la météo. Nos profilés de protection d'arête, introduits dans les années 1990, sont scellés dans chaque arête de roulement. Les premiers éléments sont toujours en service dans l'espace public après 25 ans et n'ont pas eu besoin d'être rénovés.")}
                      </p>
                      <p className="text-lg text-brand-muted leading-relaxed">
                          {t("Die gleiche Fertigungsphilosophie steht hinter unseren Hockey-Banden, Pumptrack-Modulen, Umkleidekabinen, Grillstellen und Überdachungen: massiv, fundamentfrei und wartungsarm.", "The same manufacturing approach is behind our hockey boards, pump track modules, changing cubicles, barbecue areas and shelters: solid, foundation-free and low-maintenance.", "La même philosophie de fabrication est à l'origine de nos bandes de hockey, de nos modules de pumptrack, de nos cabines de change, de nos aires de barbecue et de nos abris : massifs, sans fondation et à entretien réduit.")}
                      </p>
                      <div className="grid grid-cols-2 gap-4 mt-8">
                          <div className="bg-brand-surface/60 p-6 rounded-lg border border-brand-dark/5 shadow-sm">
                              <span className="material-symbols-outlined text-brand-orange mb-2 text-3xl">eco</span>
                              <h4 className="font-bold text-brand-dark uppercase text-sm mb-1">{t("Nachhaltig", "Sustainable", "Durable")}</h4>
                              <p className="text-xs text-brand-muted">{t("Beton und Stahl sind weitgehend recycelbar.", "Concrete and steel are largely recyclable.", "Le béton et l'acier sont largement recyclables.")}</p>
                          </div>
                          <div className="bg-brand-surface/60 p-6 rounded-lg border border-brand-dark/5 shadow-sm">
                              <span className="material-symbols-outlined text-brand-orange mb-2 text-3xl">engineering</span>
                              <h4 className="font-bold text-brand-dark uppercase text-sm mb-1">{t("Präzise", "Precise", "Précis")}</h4>
                              <p className="text-xs text-brand-muted">{t("Millimetergenaue Werksfertigung", "Factory manufacture accurate to the millimetre", "Fabrication en usine au millimètre près")}</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          {/* MONTAGE PROZESS: alle 4 Bilder */}
          <div className="mb-8">
              <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">{t("Montage-Prozess", "Installation process", "Processus de montage")}</span>
              <h3 className="text-3xl md:text-4xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter mb-4">
                  {t(<>Vom Lkw zum fertigen <span className="text-brand-orange">Park</span></>, <>From lorry to finished <span className="text-brand-orange">park</span></>, <>Du camion au <span className="text-brand-orange">skatepark</span> fini</>)}
              </h3>
              <p className="text-brand-muted max-w-2xl mb-8">
                  {t("Wir montieren unsere Skate-Elemente entweder mit Übergangsblechen direkt auf einer betonierten oder asphaltierten Rollfläche oder auf einer Fundamentplatte, an die sie anbetoniert werden. Wir stellen eine Montage- und Wartungsanleitung zur Verfügung.", "We install our skate elements either with transition plates directly on a concrete or asphalt riding surface, or or on a foundation slab, with concrete then cast up against them. We provide installation and maintenance instructions.", "Nous montons nos éléments de skate soit avec des plaques de transition directement sur une surface de roulement en béton ou en asphalte, soit sur une dalle de fondation à laquelle ils sont raccordés en béton. Nous fournissons une notice de montage et d'entretien.")}
              </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                  <img src="/images/montage/transport-01.jpg" alt={t("Transport der Skate-Elemente", "Transporting the skate elements", "Transport des éléments de skate")} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <span className="text-brand-orange font-mono text-xs">01</span>
                      <span className="text-white text-sm font-bold ml-2">{t("Transport", "Transport", "Transport")}</span>
                  </div>
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                  <img src="/images/montage/abladen-02.jpg" alt={t("Abladen der Skate-Elemente", "Unloading the skate elements", "Déchargement des éléments de skate")} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <span className="text-brand-orange font-mono text-xs">02</span>
                      <span className="text-white text-sm font-bold ml-2">{t("Abladen", "Unloading", "Déchargement")}</span>
                  </div>
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                  <img src="/images/montage/anbetonieren-03.jpg" alt={t("Montage zum Anbetonieren", "Installation before concreting in", "Montage avant scellement")} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <span className="text-brand-orange font-mono text-xs">03</span>
                      <span className="text-white text-sm font-bold ml-2">{t("Positionieren", "Positioning", "Positionnement")}</span>
                  </div>
              </div>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                  <img src="/images/montage/aufbau-04.jpg" alt={t("Montage der Skate-Pipe mit Autokran", "Installing the skate pipe with a mobile crane", "Montage de la pipe de skate à la grue mobile")} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                      <span className="text-brand-orange font-mono text-xs">04</span>
                      <span className="text-white text-sm font-bold ml-2">{t("Aufbau", "Assembly", "Assemblage")}</span>
                  </div>
              </div>
          </div>
      </div>

      {/* 4. DAS PRINZIP (Redesigned - Transparent Background) */}
      <div className="border-y border-brand-dark/10 py-32 mb-32 relative overflow-hidden bg-brand-surface/60">
          <div className="container mx-auto px-4 relative z-10">
              <div className="text-center mb-20">
                  <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/10 backdrop-blur-sm rounded-md">
                        {t("Der A+ Standard", "The A+ standard", "Le standard A+")}
                  </span>
                  <h2 className="text-6xl md:text-8xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                      {t(<>So arbeiten <span className="text-brand-orange">wir</span></>, <>How <span className="text-brand-orange">we</span> work</>, <>Notre façon de <span className="text-brand-orange">travailler</span></>)}
                  </h2>
              </div>
              
              {/* Roland §2.6: Ob der 4-Schritt-Prozess für alle Produkte gilt oder nur Skate noch klären */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <PrincipleCard
                      number="01"
                      title={t("Planung", "Design", "Conception")}
                      desc={t("Individuelle 3D-Planung, bauliche Anpassung und Absteckung, inkl. ansatzfreiem Fundamentschutz und Abtrag Bewehrung (nur für Skate-Anlagen).", "Individual 3D design, structural adaptation and setting out, including seamless foundation protection and reinforcement removal (skateparks only).", "Conception 3D personnalisée, adaptation de l'ouvrage et piquetage, y compris protection de fondation sans ressaut et dépose de l'armature (uniquement pour les skateparks).")}
                  />
                  <PrincipleCard
                      number="02"
                      title={t("Fertigung", "Manufacture", "Fabrication")}
                      desc={t("Die Elemente bestehen aus Stahlbeton C35/45. Wandstärke, Bewehrung und Fugen werden im Werk geprüft, unabhängig vom Wetter. Der TÜV überwacht die Fertigung regelmäßig.", "The elements are made of reinforced concrete C35/45. Wall thickness, reinforcement and joints are checked at the factory, whatever the weather. TÜV monitors production regularly.", "Les éléments sont en béton armé C35/45. L'épaisseur des parois, les armatures et les joints sont contrôlés en usine, quelle que soit la météo. Le TÜV surveille régulièrement la fabrication.")}
                  />
                  <PrincipleCard
                      number="03"
                      title={t("Transport", "Transport", "Transport")}
                      desc={t("Abgeladen wird mit Gabelstapler oder Autokran. Die Hohlkörperbauweise spart Gewicht. Die Ladung wird je nach Produkt gesichert.", "Unloading is done with a forklift or mobile crane. The hollow construction saves weight. The load is secured according to the product.", "Le déchargement se fait au chariot élévateur ou à la grue mobile. La construction creuse réduit le poids. La charge est arrimée selon le produit.")}
                  />
                  <PrincipleCard
                      number="04"
                      title={t("Montage", "Installation", "Montage")}
                      desc={t("Die Elemente sind in wenigen Tagen aufgestellt und brauchen keine Bodenbefestigung. Erweitern lässt sich die Anlage jederzeit mit weiteren Modulen.", "The elements are set up in a few days and need no ground fixings. The park can be extended at any time with further modules.", "Les éléments sont installés en quelques jours et n'ont besoin d'aucune fixation au sol. L'installation peut être agrandie à tout moment avec d'autres modules.")}
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
                        <div className="inline-block px-3 py-1 bg-brand-surface text-xs font-mono text-brand-dark mb-6 rounded uppercase tracking-widest">{t("Ihr Ansprechpartner", "Your contact", "Votre interlocuteur")}</div>
                        <h3 className="text-4xl font-extrabold font-heading text-brand-dark uppercase mb-2 tracking-tight">Dipl.-Ing. Cüneyit Akcakoca</h3>
                        <p className="text-brand-orange font-bold mb-6 text-lg">{t("Architekt · A+ Urban Design", "Architect · A+ Urban Design", "Architecte · A+ Urban Design")}</p>
                        <p className="text-brand-muted leading-relaxed text-lg max-w-lg">
                            {t("„Architektur endet nicht an der Gebäudekante. Der Raum dazwischen, wo das Leben stattfindet, verdient dieselbe Qualität und Aufmerksamkeit.“", "“Architecture does not stop at the edge of the building. The space in between, where life happens, deserves the same quality and attention.”", "« L'architecture ne s'arrête pas à la limite du bâtiment. L'espace entre les bâtiments, là où la vie se déroule, mérite la même qualité et la même attention. »")}
                        </p>
                        <p className="text-brand-muted leading-relaxed text-lg max-w-lg mt-6">
                            {t("Das Unternehmen hat bis heute über 350 Skate-Anlagen europaweit realisiert: von den Kanaren bis Norwegen und von Großbritannien bis zur Türkei. Entwicklung, Fertigung und Logistik steuern wir seit 2025 aus Stuttgart.", "To date, the company has built more than 350 skateparks across Europe: from the Canary Islands to Norway and from Great Britain to Turkey. We have run development, manufacturing and logistics from Stuttgart since 2025.", "À ce jour, l'entreprise a réalisé plus de 350 skateparks à travers l'Europe : des Canaries à la Norvège et de la Grande-Bretagne à la Turquie. Nous pilotons le développement, la fabrication et la logistique depuis Stuttgart depuis 2025.")}
                        </p>
                         <div className="mt-8 flex justify-center md:justify-start gap-4">
                             <a href="mailto:post@aplusurbandesign.com" className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-surface/60 hover:bg-brand-orange hover:text-white transition-all text-brand-muted"><span className="material-symbols-outlined">mail</span></a>
                             <a href="https://www.linkedin.com/in/cüneyit-akcakoca-6577673/" target="_blank" rel="noopener noreferrer" aria-label={t("LinkedIn-Profil", "LinkedIn profile", "Profil LinkedIn")} className="w-12 h-12 flex items-center justify-center rounded-full bg-brand-surface/60 hover:bg-[#0077b5] hover:text-white transition-all text-brand-muted">
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
