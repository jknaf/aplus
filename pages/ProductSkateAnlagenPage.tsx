import React, { useRef, useState } from 'react';
import { Link, useT } from '../i18n';
import PageShell from '../components/PageShell';
import { useProducts } from '../localized';
import BrochureRequestForm from '../components/BrochureRequestForm';
import ReferencedProjects from '../components/ReferencedProjects';
import Bild from '../components/Bild';
import { ProduktHero, TechSpecCard, DATENBLATT, BOX_B, BOX_B_TITEL, BOX_B_TEXT, BOX_NR } from '../components/ProduktBausteine';
import Plankopf from '../components/Plankopf';

const OtherProducts: React.FC = () => {
  const t = useT();
  const PRODUCTS = useProducts();
  const otherProducts = PRODUCTS.filter(p => p.id !== 'skate-anlagen' && p.id !== 'pumptrack').slice(0, 3);
  return (
    <div className="mt-32 border-t border-brand-dark/10 pt-24 relative z-20">
      <div className="text-center mb-16">
          <Plankopf label="Portfolio">
{t(<>Weitere <span className="text-brand-orange">Lösungen</span></>, <>More <span className="text-brand-orange">solutions</span></>, <>D'autres <span className="text-brand-orange">solutions</span></>)}
          </Plankopf>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherProducts.map(product => (
          <Link key={product.id} to={product.path} className="group relative block overflow-hidden rounded-sm aspect-[4/5] bg-brand-surface/60 border border-brand-dark/5 z-20 backdrop-blur-sm">
            <Bild hoch sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" loading="lazy" decoding="async" src={product.imageUrl} alt={product.altText} width="600" height="800" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-8 z-30">
               <span className="text-brand-orange font-mono text-xs mb-2 hidden group-hover:block">{t('PRODUKT', 'PRODUCT', 'PRODUIT')} 0{PRODUCTS.indexOf(product) + 1}</span>
              <h3 className="text-2xl font-extrabold font-heading text-white uppercase tracking-normal [word-spacing:0.12em] transform group-hover:-translate-y-1 transition-transform duration-300">{product.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const GalleryImage: React.FC<{ src: string; alt: string; label: string }> = ({ src, alt, label }) => (
    <div className="aspect-[16/10] bg-brand-surface/60 rounded-xl overflow-hidden border border-brand-dark/10 group relative shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <Bild src={src} alt={alt} sizes="(min-width: 1024px) 60vw, 100vw" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">{label}</div>
    </div>
);

const VIDEOS: { src: string; poster: string; title: [string, string, string] }[] = [
  { src: '/videos/skateparks/contest-skate-bmx-inline-scooter.mp4', poster: '/videos/skateparks/poster-contest-skate-bmx.jpg', title: ['Contest: Skate / BMX / Inline / Scooter', 'Contest: Skate / BMX / Inline / Scooter', 'Contest : skate / BMX / roller / trottinette'] },
  { src: '/videos/skateparks/session-skate-bmx-inline-scooter.mp4', poster: '/videos/skateparks/poster-session-skate-bmx.jpg', title: ['Session: Skate / BMX / Inline / Scooter', 'Session: Skate / BMX / Inline / Scooter', 'Session : skate / BMX / roller / trottinette'] },
  { src: '/videos/skateparks/contest-skateboard.mp4', poster: '/videos/skateparks/poster-contest-skateboard.jpg', title: ['Contest: Skateboard', 'Contest: Skateboard', 'Contest : skateboard'] },
  { src: '/videos/skateparks/contest-bmx.mp4', poster: '/videos/skateparks/poster-contest-bmx.jpg', title: ['Contest: BMX', 'Contest: BMX', 'Contest : BMX'] },
  { src: '/videos/skateparks/contest-inliner.mp4', poster: '/videos/skateparks/poster-contest-inliner.jpg', title: ['Contest: Inliner', 'Contest: Inline', 'Contest : roller'] },
  { src: '/videos/skateparks/contest-scooter.mp4', poster: '/videos/skateparks/poster-contest-scooter.jpg', title: ['Contest: Scooter', 'Contest: Scooter', 'Contest : trottinette'] },
];

const VideoCard: React.FC<{ video: typeof VIDEOS[0] }> = ({ video }) => {
  const t = useT();
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const toggle = () => {
    if (!ref.current) return;
    if (playing) { ref.current.pause(); } else { ref.current.play(); }
    setPlaying(!playing);
  };
  return (
    <div className="group relative aspect-video bg-black rounded-xl overflow-hidden border border-brand-dark/10 cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.08)]" onClick={toggle}>
      <video ref={ref} src={video.src} poster={video.poster} muted loop playsInline preload="none" className="w-full h-full object-cover" />
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/15 group-hover:bg-black/5 transition-colors">
          <div className="w-16 h-16 rounded-full bg-brand-orange/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
            <span className="material-symbols-outlined text-white text-3xl ml-1">play_arrow</span>
          </div>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 to-transparent">
        <span className="text-white text-sm font-bold uppercase tracking-wider">{t(...video.title)}</span>
      </div>
    </div>
  );
};

const ProductSkateAnlagenPage: React.FC = () => {
  const t = useT();
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": t("Skate-Anlagen aus Beton", "Concrete Skateparks", "Skateparks en béton"),
    "description": t("Modulare Skate-Anlagen aus Beton. TÜV-zertifiziert, fundamentfrei und langlebig.", "Modular concrete skateparks. TÜV-certified, foundation-free and long-lasting.", "Skateparks modulaires en béton. Certifiés TÜV, sans fondation et durables."),
    "brand": { "@type": "Brand", "name": "A+ Urban Design" },
    "manufacturer": { "@type": "Organization", "name": "A+ Urban Design", "url": "https://www.aplusurbandesign.com" },
    "category": t("Sportanlagen", "Sports facilities", "Équipements sportifs"),
    "material": t("Beton", "Concrete", "Béton"),
    "image": "https://www.aplusurbandesign.com/images/skate-bowls/skate-bowl-01.jpg",
    "offers": {
      "@type": "Offer",
      "url": "https://www.aplusurbandesign.com/produkte/skate-anlagen",
      "availability": "https://schema.org/InStock",
      "businessFunction": "https://schema.org/Sell",
      "priceSpecification": {
        "@type": "PriceSpecification",
        "priceCurrency": "EUR",
        "valueAddedTaxIncluded": false
      }
    }
  };

  return (
    <PageShell
        title={t("Skatepark-Hersteller: Beton-Skateparks planen & bauen", "Skatepark Manufacturer: Designing & Building Concrete Skateparks", "Fabricant de skateparks : conception et construction de skateparks en béton")}
        description={t("A+ Urban Design plant und baut modulare Beton-Skateparks. TÜV-zertifizierte Skate-Elemente wie Ramps, Bowls & Rails. Fundamentfrei, europaweite Lieferung.", "A+ Urban Design designs and builds modular concrete skateparks. TÜV-certified skate elements such as ramps, bowls and rails. Foundation-free, delivered across Europe.", "A+ Urban Design conçoit et construit des skateparks modulaires en béton. Éléments de skate certifiés TÜV : rampes, bowls, rails. Sans fondation, livraison dans toute l'Europe.")}
        schema={productSchema}
    >

       {/* 1. HERO mit Kennzahlen (Werte aus den technischen Daten) */}
       <ProduktHero
            bild={<Bild hoch src="/images/homepage/hero-anlage-01.jpg" alt={t("Skatepark aus Betonelementen, Gesamtansicht", "Skatepark made of concrete elements, overall view", "Skatepark en éléments de béton, vue d'ensemble")} className="absolute inset-0 w-full h-full object-cover animate-kenburns-1" loading="eager" fetchPriority="high" />}
            label={t("Skate-Anlagen", "Skateparks", "Skateparks")}
            rechts={t("Geprüft nach DIN EN 14974", "Tested to EN 14974", "Testé selon la norme EN 14974")}
            titel={t(<>Skatepark<br/><span className="text-brand-orange">aus Beton</span></>, <>Concrete<br/><span className="text-brand-orange">skatepark</span></>, <>Skatepark<br/><span className="text-brand-orange">en béton</span></>)}
            kennzahlen={[
                { wert: "TÜV / GS", label: t("Zertifizierung", "Certification", "Certification") },
                { wert: t("Fundamentfrei", "Foundation-free", "Sans fondation"), label: t("Montage", "Installation", "Montage") },
                { wert: t("Erweiterbar / versetzbar", "Extendable / relocatable", "Extensible / déplaçable"), label: t("Modularität", "Modularity", "Modularité") },
                { wert: t("ca. 5–8 dB(A) leiser als Holz", "approx. 5–8 dB(A) quieter than timber", "environ 5 à 8 dB(A) de moins que le bois"), label: t("Lärmschutz", "Noise reduction", "Réduction du bruit") },
            ]}
       />

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">

            {/* 2. INTRO: GESCHICHTE & ÜBERBLICK */}
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 mb-32">
                <div className="lg:w-5/12">
                    <div className="lg:sticky lg:top-32 relative z-20">
                         <Plankopf label={t("Das Original", "The original", "L'original")} className="mb-8">
                            {t(<>Seit den <span className="text-brand-orange">90ern</span></>, <>Since the <span className="text-brand-orange">1990s</span></>, <>Depuis les <span className="text-brand-orange">années 1990</span></>)}
                         </Plankopf>
                        <p className="text-xl text-brand-dark/75 leading-relaxed mb-6">
                            {t("Wir entwickeln modulare Skate-Elemente aus Beton für dauerhafte Skateparks im öffentlichen Raum. Unsere Elemente gehörten zu den ersten Beton-Skateelementen in Europa mit TÜV-Zertifikat.", "We develop modular concrete skate elements for permanent skateparks in public spaces. Ours were among the first concrete skate elements in Europe with a TÜV certificate.", "Nous développons des éléments de skate modulaires en béton pour des skateparks durables dans l'espace public. Les nôtres figuraient parmi les premiers éléments de skate en béton d'Europe à obtenir un certificat TÜV.")}
                        </p>
                        <p className="text-lg text-brand-dark/75 leading-relaxed mb-6">
                            {t("Auf der Landesgartenschau 2000 in Memmingen wurde erstmals unsere Combi-Pipe ins Erdreich eingebaut. 2002 folgte der erste Bowl auf Gran Canaria.", "Our combi pipe was first sunk into the ground at the Landesgartenschau (regional garden show) 2000 in Memmingen. The first bowl followed in 2002 on Gran Canaria.", "C'est à la Landesgartenschau (exposition horticole régionale) 2000 de Memmingen que notre mini-rampe combi a été enterrée pour la première fois. Le premier bowl a suivi en 2002, à Gran Canaria.")}
                        </p>
                        <p className="text-lg text-brand-dark/75 leading-relaxed mb-8">
                            {t("Unsere Skateelemente stehen auf Meereshöhe ebenso wie auf über 1.000 m, von Norwegen bis zu den Kanaren und von England bis in die Türkei.", "Our skate elements stand at sea level as well as above 1,000 m, from Norway to the Canary Islands and from England to Turkey.", "Nos éléments de skate sont installés aussi bien au niveau de la mer qu'à plus de 1 000 m d'altitude, de la Norvège aux Canaries et de l'Angleterre à la Turquie.")}
                        </p>

                        <div className="flex flex-col gap-4">
                            <Link to="/konfigurator" className="inline-flex justify-center items-center gap-2 bg-white text-brand-dark border border-brand-dark/15 font-extrabold uppercase tracking-widest py-4 px-8 rounded-lg hover:border-brand-orange hover:text-brand-orange transition-all duration-300 relative z-30">
                                <span className="material-symbols-outlined">view_in_ar</span> {t("Im Konfigurator planen", "Plan it in the planner", "Concevoir avec le configurateur")}
                            </Link>
                            <Link to="/kontakt?projectType=Skatepark" className="inline-flex justify-center items-center gap-2 bg-brand-orange text-white font-extrabold uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-brand-dark hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-xl relative z-30 group">
                                {t("3D-Planung anfragen", "Request a 3D design", "Demander une étude 3D")} <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                            <span className="text-xs text-brand-dark/75 font-mono text-center">{t("Mit Kostenschätzung. Wir liefern und montieren schlüsselfertig.", "With a cost estimate. We deliver and install turnkey.", "Avec estimation des coûts. Nous livrons et installons clé en main.")}</span>
                        </div>
                    </div>
                </div>

                <div className="lg:w-7/12 flex flex-col gap-6">
                    <GalleryImage src="/images/skateparks/skatepark-01.jpg" alt={t("Skatepark aus modularen Beton-Elementen", "Skatepark made of modular concrete elements", "Skatepark en éléments modulaires de béton")} label={t("Abb. 1: Anlage mit Pipes, Quarterpipes und Funbox", "Fig. 1: Park with pipes, quarter pipes and a fun box", "Fig. 1 : installation avec mini-rampes, quarters et funbox")} />
                    <GalleryImage src="/images/skate-anlagen/skate-anlage-01.jpg" alt={t("Skate-Anlage mit offenen und geschlossenen Bowls", "Skatepark with open and closed bowls", "Skatepark avec bowls ouverts et fermés")} label={t("Abb. 2: Große Anlage mit Bowls und Street-Bereich, von oben", "Fig. 2: Large park with bowls and a street area, from above", "Fig. 2 : grande installation avec bowls et zone street, vue de dessus")} />
                    <GalleryImage src="/images/skateparks/skatepark-04.jpg" alt={t("Skatepark mit Pipe und Bowl aus Beton-Fertigteilen", "Skatepark with pipe and bowl made of precast concrete", "Skatepark avec mini-rampe et bowl en éléments préfabriqués en béton")} label={t("Abb. 3: Funbox und Bowl in einer Grünanlage", "Fig. 3: Fun box and bowl in a green space", "Fig. 3 : funbox et bowl dans un espace vert")} />
                </div>
            </div>

            {/* 4. SKATE-ELEMENTE / MODULE SEKTION */}
            <div className="mb-32 relative z-20">
                <div className="mb-12">
                    <div>
                        <Plankopf label={t("Baukastensystem", "Modular system", "Système modulaire")}>
                            {t(<>Skatepark-<span className="text-brand-orange">Elemente</span></>, <>Skatepark <span className="text-brand-orange">elements</span></>, <>Éléments de <span className="text-brand-orange">skatepark</span></>)}
                        </Plankopf>
                    </div>
                </div>

                <div className="grid lg:grid-cols-5 gap-8 mb-8">
                    <div className="lg:col-span-2">
                        <p className="text-xl text-brand-dark/75 leading-relaxed mb-6">
                            {t(<>Unsere Skate-Module sind aus bewehrtem Beton hergestellt. Elemente von 35 bis 150 cm Höhe haben höhenverstellbare Füße und sind in Hohlkörperbauweise gebaut. Das spart Gewicht. Module bis 150 cm haben unten Aussparungen für Hubwagen oder Gabelstapler, durch die auch Regenwasser abläuft.</>, <>Our skate modules are made of reinforced concrete. Elements from 35 to 150 cm high have height-adjustable feet and are cast as hollow units, which saves weight. Modules up to 150 cm have fork pockets underneath for a pallet truck or forklift, which also let rainwater drain away.</>, <>Nos modules de skate sont fabriqués en béton armé. Les éléments de 35 à 150 cm de haut ont des pieds réglables en hauteur et sont conçus en construction creuse, ce qui réduit le poids. Les modules jusqu'à 150 cm comportent en dessous des réservations pour un transpalette ou un chariot élévateur, qui permettent aussi l'écoulement de l'eau de pluie.</>)}
                        </p>
                        <p className="text-lg text-brand-dark/75 leading-relaxed mb-6">
                            {t(<>Die Elemente gibt es in den Höhen 35, 45, 60, 75, 98, 125 und 150 cm, die Wände sind 8 bis 16 cm stark. Die Pipes sind 165, 200 oder 255 cm hoch. Darin ist das Flat, also der ebene Boden, schon eingerechnet. Sie stehen auf arretierbaren Stützen. Kleine Pipes lassen sich auch aus den niedrigeren Elementen zusammenstellen. Mehr dazu auf der Seite <Link to="/produkte/skate-pipes-beton" className="text-brand-orange hover:underline">Skate-Pipes</Link>.</>, <>The elements come in heights of 35, 45, 60, 75, 98, 125 and 150 cm, with walls 8 to 16 cm thick. The pipes are 165, 200 or 255 cm high, with the flat (the level floor) already included. They stand on lockable supports. Small pipes can also be put together from the lower elements. More on the <Link to="/produkte/skate-pipes-beton" className="text-brand-orange hover:underline">skate pipes</Link> page.</>, <>Les éléments existent en hauteurs de 35, 45, 60, 75, 98, 125 et 150 cm, avec des parois de 8 à 16 cm d'épaisseur. Les mini-rampes mesurent 165, 200 ou 255 cm de haut, le plat (le sol horizontal) étant déjà compris. Elles reposent sur des supports verrouillables. De petites mini-rampes peuvent aussi être composées à partir des éléments plus bas. Plus d'informations sur la page <Link to="/produkte/skate-pipes-beton" className="text-brand-orange hover:underline">mini-rampes</Link>.</>)}
                        </p>
                        <p className="text-lg text-brand-dark/75 leading-relaxed mb-6">
                            {t("Die Skate-Elemente aus Beton sind UV- und witterungsbeständig und durch die konische Form auch auf leicht unebenem Untergrund montierbar. Die eingebauten Kantenschutzprofile ermöglichen es, die Skate-Elemente mit offenen Fugen aufzustellen. Auf Wunsch schließen wir die Fugen mit unserem eigenen Verfahren.", "The concrete skate elements are UV- and weather-resistant, and their tapered shape means they can be installed even on slightly uneven ground. The built-in edge protection profiles allow the elements to be set up with open joints. On request, we close the joints using our own method.", "Les éléments de skate en béton résistent aux UV et aux intempéries, et leur forme conique permet de les monter même sur un sol légèrement irrégulier. Les profilés de protection d'arête intégrés permettent de poser les éléments avec des joints ouverts. Sur demande, nous fermons les joints grâce à notre propre procédé.")}
                        </p>
                        <p className="text-lg text-brand-dark/75 leading-relaxed">
                            {t("Die Elemente gibt es in zwei Ausführungen: zum direkten Aufstellen auf einer vorhandenen Fläche oder zum Aufstellen auf einer Fundamentplatte. Im zweiten Fall wird das Flat anschließend mit unserem Fugenverfahren anbetoniert oder anasphaltiert.", "The elements come in two versions: for setting up directly on an existing surface, or for setting up on a foundation slab. In the second case, the flat is then finished in concrete or asphalt using our jointing method.", "Les éléments existent en deux versions : pour une pose directe sur une surface existante, ou pour une pose sur une dalle de fondation. Dans le second cas, le plat est ensuite bétonné ou revêtu d'asphalte avec notre procédé de jointoiement.")}
                        </p>
                    </div>
                    <div className="lg:col-span-3 grid grid-cols-2 gap-4">
                        <GalleryImage src="/images/skate-elemente/skate-elemente-beton-01.jpg" alt={t("Rampen und Boxen an einer Strandpromenade", "Ramps and boxes on a seafront promenade", "Rampes et boxes sur une promenade en bord de mer")} label={t("Rampen und Boxen an einer Strandpromenade", "Ramps and boxes on a seafront promenade", "Rampes et boxes sur une promenade en bord de mer")} />
                        <GalleryImage src="/images/skate-elemente/skate-elemente-beton-02.jpg" alt={t("Skate-Elemente als Beton-Fertigteil-Module", "Skate elements as precast concrete modules", "Éléments de skate en modules préfabriqués en béton")} label={t("Quarterpipes in einer Reihe", "Quarter pipes in a row", "Quarters alignés")} />
                        <GalleryImage src="/images/skate-elemente/skateelemente-beton-03.jpg" alt={t("Skatemodule mit Übergangsblech", "Skate modules with transition plate", "Modules de skate avec plaque de transition")} label={t("Quarterpipes und Boxen", "Quarter pipes and boxes", "Quarters et boxes")} />
                        <GalleryImage src="/images/skate-elemente/skate-module-beton-04.jpg" alt={t("Zusammengebaute Beton-Skatemodule", "Assembled concrete skate modules", "Modules de skate en béton assemblés")} label={t("Fertigteile auf dem Lagerplatz", "Precast units in the storage yard", "Éléments préfabriqués sur l'aire de stockage")} />
                    </div>
                </div>
            </div>

            {/* 4b. CORE ELEMENTS: 4 Kombinationstypen */}
            <div className="mb-32 relative z-20">
                <div className="mb-12">
                    <div>
                        <Plankopf label={t("Aufstellungsvarianten", "Layout variants", "Variantes d'installation")}>
                            {t(<>Vier <span className="text-brand-orange">Grundformen</span></>, <>Four <span className="text-brand-orange">basic forms</span></>, <>Quatre <span className="text-brand-orange">formes de base</span></>)}
                        </Plankopf>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className={BOX_B}>
                        <div className={BOX_NR}>01</div>
                        <h3 className={BOX_B_TITEL}>{t("Standard mit variabler Breite", "Standard with variable width", "Standard à largeur variable")}</h3>
                        <p className={BOX_B_TEXT}>{t("Die Grundaufstellung hat auf beiden Seiten ein Flat und eine Plattform. Die Breite ist im Modulraster flexibel.", "The basic layout has a flat and a platform on both sides. The width is flexible within the module grid.", "La disposition de base comporte un plat et une plateforme de chaque côté. La largeur est modulable selon la trame des modules.")}</p>
                    </div>
                    <div className={BOX_B}>
                        <div className={BOX_NR}>02</div>
                        <h3 className={BOX_B_TITEL}>{t("Kombi mit Spine", "Combi with spine", "Combi avec spine")}</h3>
                        <p className={BOX_B_TEXT}>{t("Zwei Rampen stehen Rücken an Rücken und sind über einen gemeinsamen Grat verbunden, den Spine.", "Two ramps stand back to back and are joined by a shared ridge, the spine.", "Deux rampes sont placées dos à dos et reliées par une arête commune, la spine.")}</p>
                    </div>
                    <div className={BOX_B}>
                        <div className={BOX_NR}>03</div>
                        <h3 className={BOX_B_TITEL}>{t("Kombi mit Banks", "Combi with banks", "Combi avec banks")}</h3>
                        <p className={BOX_B_TEXT}>{t("Zusatz-Banks erweitern die Anlage seitlich und bieten flache An- und Abfahrten.", "Additional banks extend the park sideways and provide gentle approaches and exits.", "Des banks supplémentaires élargissent l'installation sur les côtés et offrent des entrées et des sorties en pente douce.")}</p>
                    </div>
                    <div className={BOX_B}>
                        <div className={BOX_NR}>04</div>
                        <h3 className={BOX_B_TITEL}>{t("Kombi mit Coping-Ramps", "Combi with coping ramps", "Combi avec rampes à coping")}</h3>
                        <p className={BOX_B_TEXT}>{t("Coping-Ramps haben ein durchlaufendes Copingrohr. Die Rundung ist zum Fahren da, das Rohr zum Grinden.", "Coping ramps have a continuous coping tube. The curve is for riding, the tube for grinding.", "Les rampes à coping sont équipées d'un tube de coping continu. La courbe sert à rouler, le tube à grinder.")}</p>
                    </div>
                </div>
            </div>

            {/* 5. TECHNISCHE DETAILS: alle 3 Detail-Bilder */}
            <div className="mb-32 relative z-20">
                <div className="mb-12">
                    <div>
                        <Plankopf label={t("Konstruktion", "Construction", "Construction")}>
                            {t("Details", "Details", "Détails")}
                        </Plankopf>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <img src="/images/details/schutzkante-01.jpg" alt={t("Gerundetes Kantenschutzprofil", "Rounded edge protection profile", "Profilé de protection d'arête arrondi")} loading="lazy" className="w-full aspect-[16/10] object-cover" />
                        <div className="p-6">
                            <h3 className="text-lg font-bold font-heading text-brand-dark uppercase mb-2">{t("Kantenschutzprofil", "Edge protection profile", "Profilé de protection d'arête")}</h3>
                            <p className="text-sm text-brand-dark/75 leading-relaxed">
                                {t("Alle Kanten ohne Copingrohr haben ein gerundetes Kantenschutzprofil aus Hartgummi. Es ist auf allen Seiten der Fahrfläche einbetoniert, auch an gewölbten Flächen.", "All edges without a coping tube have a rounded edge protection profile made of hard rubber. It is cast in on all sides of the riding surface, including on curved surfaces.", "Toutes les arêtes sans tube de coping sont équipées d'un profilé de protection arrondi en caoutchouc dur. Il est scellé dans le béton sur tous les côtés de la surface de roulement, y compris sur les surfaces galbées.")}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <img src="/images/details/copingrohr-02.jpg" alt={t("Copingrohr mit Alu-Kappe", "Coping tube with aluminium cap", "Tube de coping avec capuchon en aluminium")} loading="lazy" className="w-full aspect-[16/10] object-cover" />
                        <div className="p-6">
                            <h3 className="text-lg font-bold font-heading text-brand-dark uppercase mb-2">{t("Copingrohre", "Coping tubes", "Tubes de coping")}</h3>
                            <p className="text-sm text-brand-dark/75 leading-relaxed">
                                {t("Die durchlaufenden Copingrohre werden vollständig in Zweikomponentenkleber eingebettet und mit Stahlzapfen im Beton befestigt. Die Enden werden mit gedrehten Alu-Kappen verschlossen.", "The continuous coping tubes are bedded completely in two-part adhesive and fixed to the concrete with steel pins. The ends are closed with turned aluminium caps.", "Les tubes de coping continus sont entièrement noyés dans une colle bicomposant et fixés au béton par des goujons en acier. Les extrémités sont fermées par des capuchons en aluminium tournés.")}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <Bild sizes="(min-width: 1024px) 60vw, 100vw" src="/images/skate-anlagen/uebergangsblech.jpg" alt={t("Edelstahl-Übergangsblech zwischen Skate-Element und angrenzender Fläche", "Stainless steel transition plate between the skate element and the adjoining surface", "Plaque de transition en inox entre l'élément de skate et la surface voisine")} loading="lazy" className="w-full aspect-[16/10] object-cover" />
                        <div className="p-6">
                            <h3 className="text-lg font-bold font-heading text-brand-dark uppercase mb-2">{t("Übergangsblech", "Transition plate", "Plaque de transition")}</h3>
                            <p className="text-sm text-brand-dark/75 leading-relaxed">
                                {t("Ein Übergangsblech aus Edelstahl am unteren Rand sorgt für einen bündigen, stolperfreien Übergang zur angrenzenden Fläche aus Asphalt oder Beton. Es wird im Werk einbetoniert.", "A stainless steel transition plate along the bottom edge gives a flush, trip-free transition to the adjoining asphalt or concrete surface. It is cast in at the factory.", "Une plaque de transition en inox sur le bord inférieur assure un raccord affleurant, sans risque de trébucher, avec la surface voisine en asphalte ou en béton. Elle est scellée en usine.")}
                            </p>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <img src="/images/details/einstellung-04.jpg" alt={t("Arretierungsfuß auf verzinkter Platte", "Locking foot on a galvanised plate", "Pied verrouillable sur plaque galvanisée")} loading="lazy" className="w-full aspect-[16/10] object-cover" />
                        <div className="p-6">
                            <h3 className="text-lg font-bold font-heading text-brand-dark uppercase mb-2">{t("Arretierungsfuß", "Locking foot", "Pied verrouillable")}</h3>
                            <p className="text-sm text-brand-dark/75 leading-relaxed">
                                {t("Elemente ab 35 cm haben Arretierungsfüße. Mit ihnen gleicht man Unebenheiten der Aufstellfläche in der Höhe aus. Verankerungen oder ein Mörtelbett sind nicht nötig. Das erleichtert den Auf-, Um- und Abbau der Skate-Elemente.", "Elements from 35 cm upwards have locking feet. They compensate for unevenness in the installation surface. No anchoring or mortar bed is needed, which makes it easier to set up, rearrange and dismantle the skate elements.", "Les éléments à partir de 35 cm sont équipés de pieds verrouillables. Ils permettent de rattraper en hauteur les irrégularités de la surface de pose. Ni ancrage ni lit de mortier ne sont nécessaires, ce qui facilite le montage, le réagencement et le démontage des éléments de skate.")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 6. WEITERE SKATEPARKS GALERIE */}
            <div className="mb-32 relative z-20">
                <Plankopf rechts={t("REFERENZEN", "REFERENCES", "RÉFÉRENCES")} className="mb-12">
                    Skate<span className="text-brand-orange">parks</span>
                </Plankopf>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <GalleryImage src="/images/skate-anlagen/skate-anlagen-02.jpg" alt={t("Skateanlage mit offenem Bowl", "Skatepark with an open bowl", "Skatepark avec bowl ouvert")} label={t("Anlage mit Bowl, von oben", "Park with bowl, from above", "Installation avec bowl, vue de dessus")} />
                    <GalleryImage src="/images/skate-anlagen/skateanlage-03.jpg" alt={t("Skatepark mit Bowl und Pipe", "Skatepark with bowl and pipe", "Skatepark avec bowl et mini-rampe")} label={t("Skatepark mit Bowl in einer Parkanlage", "Skatepark with bowl in a park", "Skatepark avec bowl dans un parc")} />
                    <GalleryImage src="/images/skate-anlagen/skateanlagen-04.jpg" alt={t("Skatepark aus Beton-Fertigteilen", "Skatepark made of precast concrete", "Skatepark en éléments préfabriqués en béton")} label={t("Anlage mit Pipe und farbiger Bowl", "Park with pipe and coloured bowl", "Installation avec mini-rampe et bowl coloré")} />
                    <GalleryImage src="/images/skateparks/skatepark-02.jpg" alt={t("Skatepark aus modularen Elementen", "Skatepark made of modular elements", "Skatepark en éléments modulaires")} label={t("Sprung über eine Funbox", "Jump over a fun box", "Saut au-dessus d'une funbox")} />
                </div>
            </div>

            {/* 7. TECHNICAL SPECS GRID */}
            <div className="mb-32 relative z-20">
                {/* Datenblatt im weißen Kasten wie bei der Umkleidekabine */}
                <div className="bg-white rounded-2xl p-8 md:p-14 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                <Plankopf rechts={t("DATENBLATT: SKATE-SYSTEME", "DATA SHEET: SKATE SYSTEMS", "FICHE TECHNIQUE : SYSTÈMES DE SKATE")} className="mb-8">
                    {t(<>Technische <span className="text-brand-orange">Daten</span></>, <>Technical <span className="text-brand-orange">data</span></>, <>Données <span className="text-brand-orange">techniques</span></>)}
                </Plankopf>

                <dl className={DATENBLATT}>
                    <TechSpecCard
                        title={t("Zertifizierung", "Certification", "Certification")}
                        value={t("DIN EN 14974 / TÜV / GS", "EN 14974 / TÜV / GS", "EN 14974 / TÜV / GS")}
                        icon="verified"
                        href="https://www.tuvsud.com/de-de/dienstleistungen/produktpruefung-und-produktzertifizierung/zertifikatsdatenbank/?q=Z1A+056616+0012+Rev.+00"
                        linkLabel={t("Zertifikat TÜV SÜD", "TÜV SÜD certificate", "Certificat TÜV SÜD")}
                    />
                    <TechSpecCard title={t("Material", "Material", "Matériau")} value={t("Bewehrter Beton C35/45", "Reinforced concrete C35/45", "Béton armé C35/45")} icon="architecture" />
                    <TechSpecCard title={t("Höhenraster", "Height range", "Trame de hauteurs")} value="35–150 cm" icon="straighten" />
                    <TechSpecCard title={t("Wandstärke", "Wall thickness", "Épaisseur des parois")} value="8–16 cm" icon="square_foot" />
                    <TechSpecCard title={t("Bauweise", "Construction", "Mode de construction")} value={t("Hohlkörper", "Hollow-cast", "Corps creux")} icon="view_in_ar" />
                    <TechSpecCard title={t("Kantenschutz", "Edge protection", "Protection d'arête")} value={t("Hartgummi", "Hard rubber", "Caoutchouc dur")} icon="shield" />
                    <TechSpecCard title="Coping" value={t("Verzinkt + Alu-Kappen", "Galvanised + aluminium caps", "Galvanisé + capuchons en aluminium")} icon="commit" />
                    <TechSpecCard title={t("Montage", "Installation", "Montage")} value={t("Fundamentfrei", "Foundation-free", "Sans fondation")} icon="layers" />
                    <TechSpecCard title={t("Oberfläche", "Surface", "Surface")} value={t("Offenporig / rutschfest", "Open-pored / non-slip", "À pores ouverts / antidérapante")} icon="texture" />
                    <TechSpecCard title={t("Lärm", "Noise", "Bruit")} value={t("ca. 5–8 dB(A) leiser als Holz", "approx. 5–8 dB(A) quieter than timber", "environ 5 à 8 dB(A) de moins que le bois")} icon="volume_off" />
                    <TechSpecCard title={t("Modularität", "Modularity", "Modularité")} value={t("Erweiterbar / versetzbar", "Extendable / relocatable", "Extensible / déplaçable")} icon="extension" />
                    <TechSpecCard title={t("Einsatzgebiet", "Where it is used", "Zone d'utilisation")} value={t("0 bis über 1.000 m ü. NN", "0 to over 1,000 m above sea level", "De 0 à plus de 1 000 m d'altitude")} icon="landscape" />
                </dl>
                </div>
            </div>

            {/* 8. VIDEO GALERIE */}
            <div className="mb-32 relative z-20">
                <Plankopf rechts={t("CONTESTS & SESSIONS", "CONTESTS & SESSIONS", "CONTESTS & SESSIONS")} className="mb-12">
                    {t("Videos", "Videos", "Vidéos")}
                </Plankopf>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {VIDEOS.map((video, i) => <VideoCard key={i} video={video} />)}
                </div>
                <p className="text-xs text-brand-dark/75 font-mono mt-4 text-right">{t("Videos: HaiHai Media", "Videos: HaiHai Media", "Vidéos : HaiHai Media")}</p>
            </div>

            {/* 9. BROCHURE & CTA */}
            <BrochureRequestForm context="productpage" />
            <ReferencedProjects productPath="/produkte/skate-anlagen" />
            <OtherProducts />

       </div>
    </PageShell>
  );
};

export default ProductSkateAnlagenPage;
