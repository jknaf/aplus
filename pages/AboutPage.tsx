import React, { useEffect } from 'react';
import PageShell from '../components/PageShell';
import { Link, useT } from '../i18n';
import BrochureRequestForm from '../components/BrochureRequestForm';
import Bild from '../components/Bild';
import Plankopf from '../components/Plankopf';
import { BOX_B, BOX_B_TITEL, BOX_B_TEXT } from '../components/ProduktBausteine';

const LABEL = 'font-mono text-xs uppercase tracking-widest text-[#4F6E34] mb-4';
const CARD = 'bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]';

const Kennzahl: React.FC<{ zahl: string; label: string }> = ({ zahl, label }) => (
    <div className="flex-1 basis-[45%] md:basis-0 pt-6 pr-6">
        <div className="font-heading font-extrabold text-4xl md:text-5xl leading-none text-white">{zahl}</div>
        <div className="mt-2 font-mono text-xs uppercase tracking-widest text-white/75">{label}</div>
    </div>
);

const Jahr: React.FC<{ jahr: string; text: string; dunkel?: boolean }> = ({ jahr, text, dunkel }) => (
    <div className="flex-1 pt-7 pr-7">
        <div className={`w-3.5 h-3.5 rounded-full -mt-[37px] mb-5 ${dunkel ? 'bg-brand-dark' : 'bg-brand-orange'}`}></div>
        <div className="font-heading font-extrabold text-3xl text-brand-dark">{jahr}</div>
        <p className="mt-2 leading-relaxed text-brand-dark/75">{text}</p>
    </div>
);

const Schritt: React.FC<{ nr: string; titel: string; text: string; src: string; alt: string }> = ({ nr, titel, text, src, alt }) => (
    <div className={CARD}>
        <Bild src={src} alt={alt} loading="lazy" sizes="(min-width: 1024px) 25vw, 100vw" className="w-full h-48 object-cover" />
        <div className="p-8">
            <div className="font-heading font-extrabold text-5xl leading-none text-brand-orange/40">{nr}</div>
            <h3 className="mt-4 mb-3 font-heading font-extrabold uppercase text-xl text-brand-dark">{titel}</h3>
            <p className="text-[15px] leading-relaxed text-brand-dark/75">{text}</p>
        </div>
    </div>
);

const Foto: React.FC<{ src: string; alt: string; titel: string }> = ({ src, alt, titel }) => (
    <div className="relative h-64 md:h-72 rounded-xl overflow-hidden">
        <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover" />
        <div className="absolute inset-x-0 bottom-0 p-4 pt-8 bg-gradient-to-t from-black/80 to-transparent text-white font-bold">{titel}</div>
    </div>
);

const AboutPage: React.FC = () => {
  const t = useT();
  useEffect(() => {
      window.scrollTo(0, 0);
  }, []);

  return (
    <PageShell title={t("Über A+ Urban Design: Skatepark-Hersteller seit 1998", "About A+ Urban Design: Skatepark Manufacturer Since 1998", "À propos d'A+ Urban Design : fabricant de skateparks depuis 1998")} description={t("Skatepark-Hersteller mit über 25 Jahren Erfahrung: TÜV-zertifizierte Beton-Skateparks und urbane Anlagen. Ihr Ansprechpartner: Dipl.-Ing. Cüneyit Akcakoca, Stuttgart.", "Skatepark manufacturer with more than 25 years of experience: TÜV-certified concrete skateparks and urban facilities. Your contact: Dipl.-Ing. Cüneyit Akcakoca, Stuttgart.", "Fabricant de skateparks avec plus de 25 ans d'expérience : skateparks en béton et équipements urbains certifiés TÜV. Votre interlocuteur : Dipl.-Ing. Cüneyit Akcakoca, Stuttgart.")}>

      {/* 1. HERO mit Kennzahlen */}
      <div className="relative w-full min-h-[620px] -mt-16 mb-28 flex flex-col justify-end overflow-hidden bg-brand-dark">
        <Bild hoch
            src="/images/ueber-uns/anlage-luftbild-01.jpg"
            alt={t("Luftaufnahme einer fertigen Skateanlage aus Beton", "Aerial view of a finished concrete skatepark", "Vue aérienne d'un skatepark en béton terminé")}
            className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/65 to-brand-dark/15"></div>
        <div className="relative z-10 container mx-auto px-4 pt-32 pb-10">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-heading uppercase tracking-normal [word-spacing:0.12em] text-white leading-none mb-6 animate-fade-in-up [animation-delay:200ms]">
                {t(<>Beton<br/>
                <span className="text-brand-orange">in Bestform</span></>, <>Concrete<br/> <span className="text-brand-orange">at its best</span></>, <>Le béton<br/> <span className="text-brand-orange">au meilleur de sa forme</span></>)}
            </h1>
            <p className="text-xl leading-relaxed text-white/90 max-w-2xl mb-12 animate-fade-in-up [animation-delay:400ms]">
                {t("Skatepark-Hersteller und Planungsbüro aus Stuttgart. Wir machen aus Asphaltflächen Orte für Sport und Bewegung.", "Skatepark manufacturer and design office based in Stuttgart. We turn asphalt surfaces into places for sport and movement.", "Fabricant de skateparks et bureau d'études à Stuttgart. Nous transformons des surfaces d'asphalte en lieux de sport et de mouvement.")}
                {/* Roland §2.1: 30-Jahre-Jubiläums-Claim noch klären */}
                <span className="text-white font-bold"> {t("Modular, vandalismussicher, langlebig.", "Modular, vandal-resistant, long-lasting.", "Modulaire, résistant au vandalisme, durable.")}</span>
            </p>
            <div className="flex flex-wrap border-t border-white/25">
                <Kennzahl zahl="350+" label={t("Realisierte Skate-Anlagen", "Skateparks built", "Skateparks réalisés")} />
                <Kennzahl zahl="25+" label={t("Jahre Erfahrung", "Years of experience", "Années d'expérience")} />
                <Kennzahl zahl="100 %" label={t("Made in Europe", "Made in Europe", "Made in Europe")} />
                <Kennzahl zahl="100 %" label={t("Recycelbar", "Recyclable", "Recyclable")} />
            </div>
        </div>
      </div>

      {/* 2. WERDEGANG */}
      <div className="container mx-auto px-4 mb-28">
          <Plankopf label={t("Werdegang", "Our story", "Notre histoire")} klein className="mb-14">
              {t(<>Seit 1998 <span className="text-brand-orange">Skate-Elemente aus Beton</span></>, <>Concrete skate elements <span className="text-brand-orange">since 1998</span></>, <>Éléments de skate en béton <span className="text-brand-orange">depuis 1998</span></>)}
          </Plankopf>
          <div className="flex flex-wrap border-t-2 border-brand-dark [&>div]:basis-full md:[&>div]:basis-0">
              <Jahr jahr="1998" text={t("Die ersten modularen Skate-Elemente entstehen.", "The first modular skate elements are made.", "Naissance des premiers éléments de skate modulaires.")} />
              <Jahr jahr="2000" text={t("TÜV-Zertifikat und GS-Zeichen für geprüfte Sicherheit.", "TÜV certificate and GS mark for tested safety.", "Certificat TÜV et marque GS pour la sécurité contrôlée.")} />
              <Jahr jahr="2025" dunkel text={t("Entwicklung, Fertigung und Logistik werden von Stuttgart aus gesteuert.", "Development, manufacturing and logistics are run from Stuttgart.", "Le développement, la fabrication et la logistique sont pilotés depuis Stuttgart.")} />
          </div>
      </div>

      {/* 3. QUALITÄTSNACHWEISE */}
      <div className="container mx-auto px-4 mb-28">
          <div className="flex flex-wrap bg-brand-dark text-white rounded-2xl overflow-hidden">
              <div className="basis-full lg:basis-2/3 p-8 md:p-14">
                  <Plankopf label={t("Qualitätsnachweise", "Proof of quality", "Garanties de qualité")} klein dunkel className="mb-6">
                      {t(<>Geprüfte <span className="text-brand-orange">Skate-Elemente</span></>, <>Tested <span className="text-brand-orange">skate elements</span></>, <>Éléments de skate <span className="text-brand-orange">contrôlés</span></>)}
                  </Plankopf>
                  <p className="text-xl leading-relaxed text-white/90">
                      {t("Unsere ersten modularen Skate-Elemente entstanden 1998. Im Jahr 2000 erhielten sie das TÜV-Zertifikat und das GS-Zeichen für geprüfte Sicherheit. Heute sind sie nach DIN EN 14974 („Skateparks: Sicherheitstechnische Anforderungen und Prüfverfahren“), nach PPP 63126B und weiteren Normen geprüft. Die Zertifikatsnummer lautet Z1A 056616 0012. Damit waren wir weltweit vermutlich die ersten Hersteller modularer Beton-Skate-Elemente mit TÜV-Siegel. 27 Fachartikel berichten über Anlagen mit unserem System. Inzwischen wurden mehr als 350 Anlagen mit unserem System gebaut.", "Our first modular skate elements were made in 1998. In 2000 they received the TÜV certificate and the GS mark for tested safety. Today they are tested to EN 14974 (“Skateparks: Safety requirements and test methods”), to PPP 63126B and to further standards. The certificate number is Z1A 056616 0012. That probably made us the first manufacturer in the world of modular concrete skate elements with a TÜV seal. 27 trade articles report on parks built with our system. More than 350 parks have now been built with it.", "Nos premiers éléments de skate modulaires ont vu le jour en 1998. En 2000, ils ont obtenu le certificat TÜV et la marque GS pour la sécurité contrôlée. Aujourd'hui, ils sont testés selon la norme EN 14974 (« Skateparks : exigences de sécurité et méthodes d'essai »), selon PPP 63126B et d'autres normes. Le numéro du certificat est Z1A 056616 0012. Nous avons ainsi probablement été les premiers fabricants au monde d'éléments de skate modulaires en béton portant le sceau TÜV. 27 articles spécialisés rendent compte d'installations réalisées avec notre système. Plus de 350 installations ont désormais été construites avec lui.")}
                  </p>
              </div>
              <div className="basis-full lg:basis-1/3 p-8 md:p-10 bg-[#35413A] flex flex-col justify-center gap-7">
                  <div>
                      <div className="font-mono text-xs uppercase tracking-widest text-white/70">{t("Zertifikatsnummer", "Certificate number", "Numéro du certificat")}</div>
                      <div className="mt-2 font-mono text-2xl text-white">Z1A 056616 0012</div>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                      {['TÜV', 'GS', 'DIN EN 14974', 'PPP 63126B'].map(s => (
                          <span key={s} className="px-3.5 py-2 border border-white/35 rounded-md font-mono text-sm">{s}</span>
                      ))}
                  </div>
              </div>
          </div>
      </div>

      {/* 4. PHILOSOPHIE: zwei Fotos links, bündig mit dem Text */}
      <div className="container mx-auto px-4 mb-28">
          <div className="flex flex-col lg:flex-row gap-14 items-stretch">
              <div className="lg:w-5/12 flex flex-col gap-4">
                  <div className="relative flex-1 min-h-[240px] rounded-xl overflow-hidden">
                      <img src="/images/ueber-uns/bowl-01.jpg" alt={t("Bowl aus modularen Betonelementen", "Bowl made of modular concrete elements", "Bowl en éléments modulaires en béton")} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                  </div>
                  <div className="relative flex-1 min-h-[240px] rounded-xl overflow-hidden">
                      <img src="/images/ueber-uns/rampe-01.jpg" alt={t("Rampe und Kicker aus Betonelementen", "Ramp and kicker made of concrete elements", "Rampe et kicker en éléments en béton")} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
                  </div>
              </div>
              <div className="lg:w-7/12">
                  <Plankopf label={t("Haltung", "Approach", "Philosophie")} klein className="mb-8">
                      {t(<>Unsere <span className="text-brand-orange">Philosophie</span></>, <>Our <span className="text-brand-orange">philosophy</span></>, <>Notre <span className="text-brand-orange">philosophie</span></>)}
                  </Plankopf>
                  <div className="space-y-5">
                      <p className="text-xl text-brand-dark/75 leading-relaxed">
                          {t("Unsere Elemente sollen lange halten, wenig Pflege brauchen und sich später versetzen, umbauen oder recyceln lassen. Die Module lassen sich fast beliebig kombinieren.", "Our elements should last long, need little care and be easy to move, rearrange or recycle later. The modules can be combined almost freely.", "Nos éléments doivent durer longtemps, demander peu d'entretien et pouvoir être déplacés, réagencés ou recyclés par la suite. Les modules se combinent presque à volonté.")}
                      </p>
                      <p className="text-lg text-brand-dark/75 leading-relaxed">
                          {t("Wir fertigen im Werk unter kontrollierten Bedingungen und bauen vor Ort in wenigen Tagen auf.", "We manufacture at the factory under controlled conditions and build on site in a few days.", "Nous fabriquons en usine dans des conditions contrôlées et montons sur place en quelques jours.")}
                      </p>
                      <p className="text-lg text-brand-dark/75 leading-relaxed">
                          {t("Die Elemente entstehen im Werk in lasergeschnittenen Stahlschalungen, nicht als Ortbeton auf der Baustelle. Bewehrung, Wandstärke und Form lassen sich so unabhängig vom Wetter prüfen. Unsere Kantenschutzprofile, eingeführt in den 1990er-Jahren, werden in jede befahrbare Kante eingegossen. Die ersten Elemente sind nach 25 Jahren im öffentlichen Raum noch in Betrieb und mussten nicht saniert werden.", "The elements are made at the factory in laser-cut steel formwork, not as in-situ concrete on the building site. Reinforcement, wall thickness and shape can therefore be checked whatever the weather. Our edge protection profiles, introduced in the 1990s, are cast into every rideable edge. The first elements are still in use in public spaces after 25 years and have not needed refurbishment.", "Les éléments sont fabriqués en usine dans des coffrages en acier découpés au laser, et non coulés en place sur le chantier. L'armature, l'épaisseur des parois et la forme peuvent ainsi être contrôlées quelle que soit la météo. Nos profilés de protection d'arête, introduits dans les années 1990, sont scellés dans chaque arête de roulement. Les premiers éléments sont toujours en service dans l'espace public après 25 ans et n'ont pas eu besoin d'être rénovés.")}
                      </p>
                      <p className="text-lg text-brand-dark/75 leading-relaxed">
                          {t("Die gleiche Fertigungsphilosophie steht hinter unseren Hockey-Banden, Pumptrack-Modulen, Umkleidekabinen, Grillstellen und Überdachungen: massiv, fundamentfrei und wartungsarm.", "The same manufacturing approach is behind our hockey boards, pump track modules, changing cubicles, barbecue areas and shelters: solid, foundation-free and low-maintenance.", "La même philosophie de fabrication est à l'origine de nos bandes de hockey, de nos modules de pumptrack, de nos cabines de change, de nos aires de barbecue et de nos abris : massifs, sans fondation et à entretien réduit.")}
                      </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                      <div className={BOX_B}>
                          <h4 className={BOX_B_TITEL}>{t("Nachhaltig", "Sustainable", "Durable")}</h4>
                          <p className={BOX_B_TEXT}>{t("Beton und Stahl sind weitgehend recycelbar.", "Concrete and steel are largely recyclable.", "Le béton et l'acier sont largement recyclables.")}</p>
                      </div>
                      <div className={BOX_B}>
                          <h4 className={BOX_B_TITEL}>{t("Präzise", "Precise", "Précis")}</h4>
                          <p className={BOX_B_TEXT}>{t("Millimetergenaue Werksfertigung", "Factory manufacture accurate to the millimetre", "Fabrication en usine au millimètre près")}</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      {/* 5. SO ARBEITEN WIR */}
      <div className="container mx-auto px-4 mb-28">
          <Plankopf label={t("Der A+ Standard", "The A+ standard", "Le standard A+")} className="mb-12">
              {t(<>So arbeiten <span className="text-brand-orange">wir</span></>, <>How <span className="text-brand-orange">we</span> work</>, <>Notre façon de <span className="text-brand-orange">travailler</span></>)}
          </Plankopf>
          {/* Roland §2.6: Ob der 4-Schritt-Prozess für alle Produkte gilt oder nur Skate noch klären */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              <Schritt nr="01" src="/images/planung/skateanlage-planung-02.jpg"
                  alt={t("3D-Planung eines Skateparks", "3D design of a skatepark", "Conception 3D d'un skatepark")}
                  titel={t("Planung", "Design", "Conception")}
                  text={t("Individuelle 3D-Planung, bauliche Anpassung und Absteckung, inkl. ansatzfreiem Fundamentschutz und Abtrag Bewehrung (nur für Skate-Anlagen).", "Individual 3D design, structural adaptation and setting out, including seamless foundation protection and reinforcement removal (skateparks only).", "Conception 3D personnalisée, adaptation de l'ouvrage et piquetage, y compris protection de fondation sans ressaut et dépose de l'armature (uniquement pour les skateparks).")} />
              <Schritt nr="02" src="/images/skate-elemente/skate-module-beton-04.jpg"
                  alt={t("Gefertigte Betonelemente im Lager", "Finished concrete elements in storage", "Éléments en béton fabriqués, en stock")}
                  titel={t("Fertigung", "Manufacture", "Fabrication")}
                  text={t("Die Elemente bestehen aus Stahlbeton C35/45. Wandstärke, Bewehrung und Fugen werden im Werk geprüft, unabhängig vom Wetter. Der TÜV überwacht die Fertigung regelmäßig.", "The elements are made of reinforced concrete C35/45. Wall thickness, reinforcement and joints are checked at the factory, whatever the weather. TÜV monitors production regularly.", "Les éléments sont en béton armé C35/45. L'épaisseur des parois, les armatures et les joints sont contrôlés en usine, quelle que soit la météo. Le TÜV surveille régulièrement la fabrication.")} />
              <Schritt nr="03" src="/images/montage/transport-01.jpg"
                  alt={t("Transport der Skate-Elemente", "Transporting the skate elements", "Transport des éléments de skate")}
                  titel={t("Transport", "Transport", "Transport")}
                  text={t("Abgeladen wird mit Gabelstapler oder Autokran. Die Hohlkörperbauweise spart Gewicht. Die Ladung wird je nach Produkt gesichert.", "Unloading is done with a forklift or mobile crane. The hollow construction saves weight. The load is secured according to the product.", "Le déchargement se fait au chariot élévateur ou à la grue mobile. La construction creuse réduit le poids. La charge est arrimée selon le produit.")} />
              <Schritt nr="04" src="/images/montage/aufbau-04.jpg"
                  alt={t("Montage der Skate-Pipe mit Autokran", "Installing the skate pipe with a mobile crane", "Montage de la pipe de skate à la grue mobile")}
                  titel={t("Montage", "Installation", "Montage")}
                  text={t("Die Elemente sind in wenigen Tagen aufgestellt und brauchen keine Bodenbefestigung. Erweitern lässt sich die Anlage jederzeit mit weiteren Modulen.", "The elements are set up in a few days and need no ground fixings. The park can be extended at any time with further modules.", "Les éléments sont installés en quelques jours et n'ont besoin d'aucune fixation au sol. L'installation peut être agrandie à tout moment avec d'autres modules.")} />
          </div>

          <div className="mt-20">
              <div className={LABEL}>{t("Montage-Prozess", "Installation process", "Processus de montage")}</div>
              <h3 className="font-heading font-extrabold uppercase tracking-normal [word-spacing:0.12em] text-brand-dark leading-tight text-3xl md:text-4xl mb-4">
                  {t(<>Vom Lkw zum fertigen <span className="text-brand-orange">Park</span></>, <>From lorry to finished <span className="text-brand-orange">park</span></>, <>Du camion au <span className="text-brand-orange">skatepark</span> fini</>)}
              </h3>
              <p className="text-lg text-brand-dark/75 leading-relaxed max-w-3xl mb-8">
                  {t("Wir montieren unsere Skate-Elemente entweder mit Übergangsblechen direkt auf einer betonierten oder asphaltierten Rollfläche oder auf einer Fundamentplatte, an die sie anbetoniert werden. Wir stellen eine Montage- und Wartungsanleitung zur Verfügung.", "We install our skate elements either with transition plates directly on a concrete or asphalt riding surface, or on a foundation slab, with concrete then cast up against them. We provide installation and maintenance instructions.", "Nous montons nos éléments de skate soit avec des plaques de transition directement sur une surface de roulement en béton ou en asphalte, soit sur une dalle de fondation à laquelle ils sont raccordés en béton. Nous fournissons une notice de montage et d'entretien.")}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Foto src="/images/montage/abladen-02.jpg" alt={t("Abladen der Skate-Elemente", "Unloading the skate elements", "Déchargement des éléments de skate")} titel={t("Abladen", "Unloading", "Déchargement")} />
                  <Foto src="/images/montage/anbetonieren-03.jpg" alt={t("Montage zum Anbetonieren", "Installation before concreting in", "Montage avant scellement")} titel={t("Positionieren", "Positioning", "Positionnement")} />
              </div>
          </div>
      </div>

      {/* 6. PRESSE: drei Projekte mit Foto, alles Weitere auf /referenzen-presse */}
      <div className="container mx-auto px-4 mb-28">
          <Plankopf label={t("Presse", "Press", "Presse")} text={t("Kommunale Fachmedien berichten seit über zehn Jahren über Anlagen und Produkte von A+ Urban Design. Hier finden Sie die Projektberichte und Fachbeiträge.", "Municipal trade media have been reporting on A+ Urban Design parks and products for more than ten years. Here you will find the project reports and trade articles. The articles are in German.", "La presse spécialisée destinée aux collectivités rend compte depuis plus de dix ans des installations et des produits d'A+ Urban Design. Vous trouverez ici les reportages sur les projets et les articles spécialisés. Les articles sont en allemand.")} className="mb-10">
              {t(<>A+ in der <span className="text-brand-orange">Fachpresse</span></>, <>A+ in the <span className="text-brand-orange">trade press</span></>, <>A+ dans la <span className="text-brand-orange">presse spécialisée</span></>)}
          </Plankopf>
          <div className="grid md:grid-cols-3 gap-6">
              {([
                  ['/images/homepage/hero-anlage-02.jpg', t("Skatepark Friedrichsdorf", "Friedrichsdorf Skatepark", "Skatepark de Friedrichsdorf"), 'Kommunaldirekt · Freiraum Gestalten'],
                  ['/images/umkleide/umkleidekabine-freibad-03.jpg', t("Umkleide- und Duschkabine „Schnecke“", "“Schnecke” changing and shower cubicle", "Cabine de change et de douche « Schnecke »"), 'Flächenmanager · Kommunaldirekt · Kommunalclick24'],
                  ['/images/pumptrack/pumptrack-beton-elemente-01.jpg', t("Pumptrack Berlin-Reinickendorf", "Berlin-Reinickendorf pump track", "Pumptrack de Berlin-Reinickendorf"), 'Kommunaldirekt · Freiraum Gestalten'],
              ] as const).map(([src, titel, medien]) => (
                  <Link key={src} to="/referenzen-presse" className={`${CARD} group flex flex-col`}>
                      <div className="h-52 overflow-hidden"><Bild src={src} sizes="(min-width: 768px) 33vw, 100vw" alt={titel} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" /></div>
                      <div className="p-6 flex flex-col gap-2">
                          <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#4F6E34]">{medien}</div>
                          <h3 className={`${BOX_B_TITEL} !mb-0 group-hover:text-[#4F6E34] transition-colors`}>{titel}</h3>
                      </div>
                  </Link>
              ))}
          </div>
          <Link to="/referenzen-presse" className="mt-8 inline-flex items-center gap-2 min-h-[52px] px-8 rounded-lg bg-brand-orange hover:bg-brand-dark text-white font-extrabold uppercase tracking-wider text-sm transition-colors">
              {t("Alle Presseberichte", "All press reports", "Tous les articles de presse")}
              <span className="material-symbols-outlined text-lg" aria-hidden="true">arrow_forward</span>
          </Link>
      </div>

      {/* 7. ANSPRECHPARTNER */}
      <div className="container mx-auto px-4 mb-28">
          <div className="flex flex-wrap bg-white rounded-2xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <div className="basis-full lg:basis-3/5 p-8 md:p-14">
                  <div className={`${LABEL} !mb-5`}>{t("Ihr Ansprechpartner", "Your contact", "Votre interlocuteur")}</div>
                  <p className="font-heading font-bold text-2xl md:text-3xl leading-snug mb-8">
                      {t("„Architektur endet nicht an der Gebäudekante. Der Raum dazwischen, wo das Leben stattfindet, verdient dieselbe Qualität und Aufmerksamkeit.“", "“Architecture does not stop at the edge of the building. The space in between, where life happens, deserves the same quality and attention.”", "« L'architecture ne s'arrête pas à la limite du bâtiment. L'espace entre les bâtiments, là où la vie se déroule, mérite la même qualité et la même attention. »")}
                  </p>
                  <h3 className="font-heading font-extrabold uppercase text-xl text-brand-dark">Dipl.-Ing. Cüneyit Akcakoca</h3>
                  <p className="mt-1 font-semibold text-[#4F6E34]">{t("Architekt · A+ Urban Design", "Architect · A+ Urban Design", "Architecte · A+ Urban Design")}</p>
              </div>
              <div className="basis-full lg:basis-2/5 p-8 md:p-12 bg-brand-surface flex flex-col justify-center gap-5">
                  <p className="leading-relaxed text-brand-dark">
                      {t("A+ Urban Design hat bis heute über 350 Skateanlagen europaweit realisiert: von den Kanaren bis Norwegen und von Großbritannien bis zur Türkei. Entwicklung, Fertigung und Logistik steuern wir seit 2025 aus Stuttgart.", "To date, A+ Urban Design has built more than 350 skateparks across Europe: from the Canary Islands to Norway and from Great Britain to Turkey. We have run development, manufacturing and logistics from Stuttgart since 2025.", "À ce jour, A+ Urban Design a réalisé plus de 350 skateparks à travers l'Europe : des Canaries à la Norvège et de la Grande-Bretagne à la Turquie. Nous pilotons le développement, la fabrication et la logistique depuis Stuttgart depuis 2025.")}
                  </p>
                  <div className="flex flex-wrap gap-3">
                      <a href="mailto:post@aplusurbandesign.com" className="inline-flex items-center min-h-12 px-7 rounded-md bg-brand-orange text-white font-heading font-bold text-sm uppercase tracking-widest hover:bg-brand-dark transition-colors">{t("E-Mail senden", "Send an email", "Envoyer un e-mail")}</a>
                      <a href="https://www.linkedin.com/in/cüneyit-akcakoca-6577673/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center min-h-12 px-7 rounded-md border-2 border-brand-dark text-brand-dark font-heading font-bold text-sm uppercase tracking-widest hover:bg-brand-dark hover:text-white transition-colors">LinkedIn</a>
                      <Link to="/referenzen-presse" className="inline-flex items-center min-h-12 px-7 rounded-md border-2 border-brand-dark text-brand-dark font-heading font-bold text-sm uppercase tracking-widest hover:bg-brand-dark hover:text-white transition-colors">{t("Presse", "Press", "Presse")}</Link>
                  </div>
                  <a href="mailto:post@aplusurbandesign.com" className="text-sm text-brand-dark/75 hover:text-brand-dark">post@aplusurbandesign.com</a>
              </div>
          </div>
      </div>

      <BrochureRequestForm context="homepage" />

    </PageShell>
  );
};

export default AboutPage;
