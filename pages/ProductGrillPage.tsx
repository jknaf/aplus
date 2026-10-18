import React from 'react';
import { Link, useT } from '../i18n';
import PageShell from '../components/PageShell';
import { useProducts } from '../localized';
import BrochureRequestForm from '../components/BrochureRequestForm';
import ReferencedProjects from '../components/ReferencedProjects';
import Bild from '../components/Bild';

const OtherProducts: React.FC = () => {
  const t = useT();
  const PRODUCTS = useProducts();
  const otherProducts = PRODUCTS.filter(p => p.id !== 'grillstelle' && p.id !== 'ueberdachung').slice(0, 3);
  return (
    <div className="mt-32 border-t border-brand-dark/10 pt-24">
      <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/10 backdrop-blur-sm rounded-md">
              Portfolio
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-[0.9]">
              {t(<>Weitere <span className="text-brand-orange">Lösungen</span></>, <>More <span className="text-brand-orange">solutions</span></>, <>D'autres <span className="text-brand-orange">solutions</span></>)}
          </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherProducts.map(product => (
          <Link key={product.id} to={product.path} className="group relative block overflow-hidden rounded-sm aspect-[4/5] bg-brand-surface/60 border border-brand-dark/5 backdrop-blur-sm">
            <Bild hoch sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" loading="lazy" decoding="async" src={product.imageUrl} alt={product.altText} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-8">
               <span className="text-brand-orange font-mono text-xs mb-2 hidden group-hover:block">{t('PRODUKT', 'PRODUCT', 'PRODUIT')} 0{PRODUCTS.indexOf(product) + 1}</span>
              <h3 className="text-2xl font-extrabold font-heading text-white uppercase tracking-tighter transform group-hover:-translate-y-1 transition-transform duration-300">{product.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const TechSpecCard: React.FC<{ title: string; value: string; icon: string }> = ({ title, value, icon }) => (
    <div className="bg-brand-surface/40 border border-brand-dark/5 p-6 rounded-xl shadow-sm hover:border-brand-orange/50 transition-colors duration-300">
        <span className="material-symbols-outlined text-brand-orange text-3xl mb-4">{icon}</span>
        <h4 className="text-brand-muted font-mono text-xs uppercase tracking-widest mb-2">{title}</h4>
        <p className="text-brand-dark font-bold text-lg leading-tight">{value}</p>
    </div>
);

const ProductGrillPage: React.FC = () => {
  const t = useT();
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": t("Öffentliche Grillstelle aus Beton", "Public Concrete Barbecue Area", "Aire de barbecue publique en béton"),
    "description": t("Runder Beton-Grillplatz mit 4,20 m Durchmesser. Vandalismussicher, höhenverstellbarer Edelstahlrost, integrierte Bodenplatte. Fundamentfrei.", "Round concrete barbecue area, 4.20 m in diameter. Vandal-resistant, height-adjustable stainless steel grate, integrated base slab. No foundation needed.", "Aire de barbecue circulaire en béton de 4,20 m de diamètre. Résistante au vandalisme, grille en inox réglable en hauteur, dalle de sol intégrée. Sans fondation."),
    "brand": { "@type": "Brand", "name": "A+ Urban Design" },
    "manufacturer": { "@type": "Organization", "name": "A+ Urban Design", "url": "https://www.aplusurbandesign.com" },
    "category": t("Stadtmöblierung", "Street furniture", "Mobilier urbain"),
    "material": t("Beton, Edelstahl, verzinkter Stahl", "Concrete, stainless steel, galvanised steel", "Béton, inox, acier galvanisé"),
    "image": "https://www.aplusurbandesign.com/images/grill/grillstelle-background.jpg",
    "offers": {
      "@type": "Offer",
      "url": "https://www.aplusurbandesign.com/produkte/grillstelle-beton",
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
    <PageShell title={t("Öffentlicher Grillplatz aus Beton, vandalismussicher", "Public Concrete Barbecue Area, Vandal-Resistant", "Aire de barbecue publique en béton, résistante au vandalisme")} description={t("Öffentlicher Grillplatz aus Beton: vandalismussicher, wartungsarm und langlebig. Für Parks, Campingplätze und kommunale Freiflächen. Mit diebstahlsicherem Edelstahlrost.", "Public concrete barbecue area: vandal-resistant, low-maintenance and long-lasting. For parks, campsites and municipal open spaces. With a theft-proof stainless steel grate.", "Aire de barbecue publique en béton : résistante au vandalisme, à entretien réduit et durable. Pour les parcs, les campings et les espaces verts communaux. Avec une grille en inox protégée contre le vol.")} schema={productSchema}>

       {/* 1. HERO */}
       <div className="relative w-full h-[60vh] -mt-16 mb-24 overflow-hidden z-10 rounded-b-2xl border-b border-brand-dark/10">
            <div className="absolute inset-0">
                 <Bild hoch src="/images/grill/grillstelle-background.jpg"
                        alt={t("Runder Grillplatz aus Beton im Park", "Round concrete barbecue area in a park", "Aire de barbecue circulaire en béton dans un parc")}
                        className="w-full h-full object-cover animate-kenburns-2"
                        loading="eager"
                        fetchPriority="high" />

                <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-dark/80 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-12 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-6 animate-fade-in-up">
                         <span className="px-3 py-1 border border-brand-orange text-brand-orange text-xs font-bold uppercase tracking-[0.2em] bg-black/40 backdrop-blur-sm">{t("Öffentlicher Raum", "Public space", "Espace public")}</span>
                         <span className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider bg-black/40 backdrop-blur-sm px-2 py-1">
                            <span className="material-symbols-outlined text-base">security</span> {t("Vandalismussicher", "Vandal-resistant", "Résistant au vandalisme")}
                         </span>
                    </div>
                    {/* INDUSTRIAL HEADER UPDATE */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-heading uppercase tracking-tighter text-white leading-[0.85] animate-fade-in-up [animation-delay:100ms]">
                        {t(<>Grill-<br/>
                        <span className="text-brand-orange">platz</span></>, <>Barbecue<br/> <span className="text-brand-orange">area</span></>, <>Aire de<br/> <span className="text-brand-orange">barbecue</span></>)}
                    </h1>
                </div>
            </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            
            {/* 2. SPLIT LAYOUT */}
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 mb-32">
                
                <div className="lg:w-5/12">
                    <div className="lg:sticky lg:top-32">
                        <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">
                            {t("Treffpunkt", "Meeting point", "Lieu de rencontre")}
                        </span>
                        {/* INDUSTRIAL HEADER UPDATE */}
                        <h2 className="text-5xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none mb-8">
                            {t(<>Feuer und <span className="text-brand-orange">Beton</span></>, <>Fire and <span className="text-brand-orange">concrete</span></>, <>Feu et <span className="text-brand-orange">béton</span></>)}
                        </h2>
                        <p className="text-xl text-brand-muted leading-relaxed mb-8">
                            {t("Der runde Grillplatz ist für Freibäder, Campingplätze, Sportanlagen und Kleingartenanlagen gedacht. Er hat 4,20 m Durchmesser, ist 2,70 m hoch und bietet 12–16 Personen Platz.", "The round barbecue area is intended for outdoor pools, campsites, sports grounds and allotment sites. It is 4.20 m in diameter and 2.70 m high, with room for 12–16 people.", "L'aire de barbecue circulaire est destinée aux piscines de plein air, aux campings, aux équipements sportifs et aux jardins familiaux. Elle mesure 4,20 m de diamètre, 2,70 m de haut et accueille 12 à 16 personnes.")}
                        </p>
                        <p className="text-lg text-brand-muted leading-relaxed mb-12">
                            {t("Der Edelstahlrost ist höhenverstellbar, leicht zu reinigen und über eine zentrale Öse gegen Schwenken und Diebstahl gesichert. Die 16 cm starke Bodenplatte gehört dazu. Pflasterarbeiten entfallen. Der Grillplatz steht ohne Fundament auf einem verdichteten Schotterbett.", "The stainless steel grate is height-adjustable, easy to clean and secured against swivelling and theft by a central eyelet. The 16 cm base slab is included. No paving work is needed. The barbecue area stands without a foundation on a compacted gravel bed.", "La grille en inox est réglable en hauteur, facile à nettoyer et sécurisée contre la rotation et le vol par un œillet central. La dalle de sol de 16 cm d'épaisseur est comprise. Aucun pavage n'est nécessaire. L'aire de barbecue se pose sans fondation sur un lit de gravier compacté.")}
                        </p>
                        
                        <div className="flex flex-col gap-4">
                            <Link
                                to="/kontakt?projectType=Möblierung"
                                className="inline-flex justify-center items-center gap-2 bg-brand-orange text-white font-extrabold uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-brand-dark hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-xl group"
                            >
                                {t("Angebot anfordern", "Request a quote", "Demander un devis")} <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                            <Link
                                to="/produkte/grillstelle-beton/montageanleitung"
                                className="inline-flex justify-center items-center gap-2 border border-brand-dark/15 bg-white/60 backdrop-blur-sm text-brand-dark font-extrabold uppercase tracking-widest py-4 px-8 rounded-lg hover:border-brand-orange hover:text-brand-orange transition-all duration-300 group"
                            >
                                <span className="material-symbols-outlined">menu_book</span>
                                {t("Montageanleitung ansehen", "View the installation instructions", "Voir la notice de montage")}
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="lg:w-7/12 flex flex-col gap-8">
                    <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-sm overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                         <Bild sizes="(min-width: 1024px) 60vw, 100vw" src="/images/grill/grillstelle-background.jpg" alt={t("Grillplatz mit Sitzring im Grünen", "Barbecue area with seating ring in a green setting", "Aire de barbecue avec banc circulaire dans la verdure")} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         {/* Roland: Bildunterschriften pro Bild noch mit tatsächlichem Motiv abgleichen */}
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">{t("Abb. 1: Grillplatz mit Sitzring im Grünen", "Fig. 1: Barbecue area with seating ring in a green setting", "Fig. 1 : aire de barbecue avec banc circulaire dans la verdure")}</div>
                    </div>
                    
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-8 my-8 flex rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] items-center justify-between backdrop-blur-sm">
                         <div>
                            <h3 className="text-2xl font-bold font-heading text-brand-dark uppercase">{t("Abmessungen", "Dimensions", "Dimensions")}</h3>
                            <p className="text-brand-muted mt-2">{t("Zwei halbrunde Teile mit je rund 3,3 t und ein Mittelteil mit rund 1,0 t.", "Two semicircular parts of about 3.3 t each and a centre part of about 1.0 t.", "Deux éléments demi-circulaires d'environ 3,3 t chacun et un élément central d'environ 1,0 t.")}</p>
                         </div>
                         <div className="text-right">
                             <div className="text-4xl font-mono text-brand-orange font-bold">{t("4,20 m", "4.20 m", "4,20 m")}</div>
                             <div className="text-xs uppercase tracking-widest text-brand-muted">{t("Durchmesser", "Diameter", "Diamètre")}</div>
                         </div>
                    </div>

                    <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-sm overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                         <Bild sizes="(min-width: 1024px) 60vw, 100vw" src="/images/grill/grill-platz-01.jpg" alt={t("Grillplatz unter Bäumen", "Barbecue area under trees", "Aire de barbecue sous les arbres")} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">{t("Abb. 2: Grillplatz unter Bäumen", "Fig. 2: Barbecue area under trees", "Fig. 2 : aire de barbecue sous les arbres")}</div>
                    </div>
                </div>
            </div>

            {/* 3. KONSTRUKTION & EIGENSCHAFTEN (aus grill-grillplatz.md) */}
            <div className="mb-32">
                <div className="mb-8">
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">{t("Konstruktion & Eigenschaften", "Construction & features", "Construction et caractéristiques")}</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter mb-4">
                        {t(<>Aufbau und <span className="text-brand-orange">Material</span></>, <>Structure and <span className="text-brand-orange">materials</span></>, <>Structure et <span className="text-brand-orange">matériaux</span></>)}
                    </h2>
                    <p className="text-lg text-brand-muted leading-relaxed max-w-3xl">
                        {t("Der Grillplatz besteht aus drei Betonfertigteilen. Der Grillrost ist aus Edelstahl, die Stütze aus verzinktem Stahl. Der Rost hängt an einer Kette mit Gegengewicht. Gesetzt werden die Teile mit Autokran, Radlader oder Gabelstapler mit mindestens 3,5 t Hublast. Die Konstruktion ist einfach zu bedienen und hat wenige Verschleißteile.", "The barbecue area consists of three precast concrete units. The grate is stainless steel and the support is galvanised steel. The grate hangs from a chain with a counterweight. The parts are set with a mobile crane, wheel loader or a forklift with a lifting capacity of at least 3.5 t. The design is easy to operate and has few wearing parts.", "L'aire de barbecue se compose de trois éléments préfabriqués en béton. La grille est en inox, le support en acier galvanisé. La grille est suspendue à une chaîne avec contrepoids. Les éléments sont posés avec une grue mobile, une chargeuse sur pneus ou un chariot élévateur d'une capacité de levage d'au moins 3,5 t. L'ensemble est simple à utiliser et compte peu de pièces d'usure.")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-6 rounded-xl">
                        <h3 className="text-base font-bold font-heading text-brand-dark uppercase mb-2">{t("Materialien", "Materials", "Matériaux")}</h3>
                        <p className="text-sm text-brand-muted leading-relaxed">{t("Beton, Edelstahl und verzinkter Stahl sind durchweg witterungsbeständig und recycelbar. Der Edelstahlrost ist für Dauernutzung ausgelegt.", "Concrete, stainless steel and galvanised steel are all weather-resistant and recyclable. The stainless steel grate is designed for continuous use.", "Le béton, l'inox et l'acier galvanisé résistent tous aux intempéries et sont recyclables. La grille en inox est conçue pour un usage continu.")}</p>
                    </div>
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-6 rounded-xl">
                        <h3 className="text-base font-bold font-heading text-brand-dark uppercase mb-2">{t("Ohne Fundamente", "No foundations", "Sans fondation")}</h3>
                        <p className="text-sm text-brand-muted leading-relaxed">{t("Als Unterbau genügt ein verdichtetes Kies- oder Schotterbett (Körnung 5/30 mm). Fundamente entfallen, und die Bauzeit ist kurz.", "A compacted gravel or crushed-stone bed (grading 5/30 mm) is enough as a base. No foundations are needed, and construction time is short.", "Un lit de gravier ou de concassé compacté (granulométrie 5/30 mm) suffit comme sous-couche. Les fondations sont inutiles et la durée du chantier est courte.")}</p>
                    </div>
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-6 rounded-xl">
                        <h3 className="text-base font-bold font-heading text-brand-dark uppercase mb-2">{t("Vandalismussicher", "Vandal-resistant", "Résistant au vandalisme")}</h3>
                        <p className="text-sm text-brand-muted leading-relaxed">{t("Der Grillplatz ist massiv gebaut und für den unbeaufsichtigten Betrieb im öffentlichen Raum ausgelegt.", "The barbecue area is solidly built and designed to be used unsupervised in public spaces.", "L'aire de barbecue est de construction massive et conçue pour fonctionner sans surveillance dans l'espace public.")}</p>
                    </div>
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-6 rounded-xl">
                        <h3 className="text-base font-bold font-heading text-brand-dark uppercase mb-2">{t("Höhenverstellbar", "Height-adjustable", "Réglable en hauteur")}</h3>
                        <p className="text-sm text-brand-muted leading-relaxed">{t("Die Grillfläche lässt sich einfach in der Höhe einstellen. Der Windschutzring schützt die Glut vor Wind. Zweimal im Jahr wird die Rolle geölt.", "The cooking surface is easy to adjust in height. The windbreak ring protects the embers from the wind. The pulley is oiled twice a year.", "La surface de cuisson se règle facilement en hauteur. L'anneau pare-vent protège les braises du vent. La poulie est huilée deux fois par an.")}</p>
                    </div>
                </div>

                {/* Für Betreiber: Belege Montageanleitung Grillplatz, Grillregeln Städte (z. B. Stuttgart) */}
                <div className="mb-12">
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">{t("Für Kommunen und Vereine", "For municipalities and clubs", "Pour les communes et les clubs")}</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter mb-4">
                        {t(<>Ein fester Ort <span className="text-brand-orange">fürs Feuer</span></>, <>A permanent place <span className="text-brand-orange">for the fire</span></>, <>Un lieu fixe <span className="text-brand-orange">pour le feu</span></>)}
                    </h2>
                    <p className="text-lg text-brand-muted leading-relaxed max-w-3xl mb-6">
                        {t("Viele Städte erlauben das Grillen in Parks nur an fest eingerichteten Feuerstellen. Mitgebrachte Grills und Einweggrills sind dort aus Brandschutzgründen oft verboten. Ein fester Grillplatz gibt Badegästen, Campern und Vereinsmitgliedern einen erlaubten Ort zum Grillen. Gegrillt wird über Beton, nicht über der Wiese.", "Many cities only allow barbecues in parks at designated sites. Portable and disposable barbecues are often banned there for fire safety reasons. A permanent barbecue area gives pool visitors, campers and club members a permitted place to cook. The fire is over concrete, not over the lawn.", "De nombreuses villes n'autorisent les barbecues dans les parcs qu'aux foyers aménagés. Les barbecues apportés par les visiteurs et les barbecues jetables y sont souvent interdits pour des raisons de sécurité incendie. Une aire de barbecue fixe offre aux baigneurs, aux campeurs et aux membres d'associations un endroit autorisé pour griller. On grille au-dessus du béton, pas au-dessus de la pelouse.")}
                    </p>
                    <p className="text-lg text-brand-muted leading-relaxed max-w-3xl">
                        {t("Die Bodenplatte liegt wahlweise bündig mit dem Gelände oder darüber. Der Träger sitzt fest in der Bodenplatte und ist gegen Diebstahl gesichert.", "The base slab sits either flush with the ground or above it. The support is fixed firmly in the base slab and secured against theft.", "La dalle de sol est posée au choix à fleur du terrain ou au-dessus. Le support est solidement fixé dans la dalle de sol et protégé contre le vol.")}
                    </p>
                </div>

                 <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                        {t(<>Technische <span className="text-brand-orange">Daten</span></>, <>Technical <span className="text-brand-orange">data</span></>, <>Données <span className="text-brand-orange">techniques</span></>)}
                    </h2>
                    <span className="font-mono text-brand-muted text-xs hidden sm:block">{t("DATENBLATT: GRILLSTELLE", "DATA SHEET: BARBECUE AREA", "FICHE TECHNIQUE : AIRE DE BARBECUE")}</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <TechSpecCard title={t("Durchmesser", "Diameter", "Diamètre")} value={t("4,20 Meter", "4.20 metres", "4,20 mètres")} icon="straighten" />
                    <TechSpecCard title={t("Höhe", "Height", "Hauteur")} value={t("2,70 Meter", "2.70 metres", "2,70 mètres")} icon="vertical_align_top" />
                    <TechSpecCard title={t("Rost", "Grate", "Grille")} value={t("Edelstahl", "Stainless steel", "Inox")} icon="grid_on" />
                    <TechSpecCard title={t("Bodenplatte", "Base slab", "Dalle de sol")} value="16 cm" icon="foundation" />
                    <TechSpecCard title={t("Diebstahlschutz", "Theft protection", "Protection antivol")} value={t("Zentrale Öse", "Central eyelet", "Œillet central")} icon="lock" />
                    <TechSpecCard title={t("Montage", "Installation", "Montage")} value={t("Schotterbett 5/30 mm", "Gravel bed 5/30 mm", "Lit de gravier 5/30 mm")} icon="layers" />
                    <TechSpecCard title={t("Grillhöhe", "Grill height", "Hauteur de grille")} value={t("Verstellbar", "Adjustable", "Réglable")} icon="tune" />
                    <TechSpecCard title={t("Einsatz", "Use", "Utilisation")} value={t("Öffentlicher Raum", "Public space", "Espace public")} icon="public" />
                    <TechSpecCard title={t("Stütze", "Support", "Support")} value={t("Verzinkter Stahl", "Galvanised steel", "Acier galvanisé")} icon="construction" />
                    <TechSpecCard title={t("Witterung", "Weather", "Intempéries")} value={t("Witterungsbeständig", "Weather-resistant", "Résistant aux intempéries")} icon="thermostat" />
                    <TechSpecCard title={t("Recycelbar", "Recyclable", "Recyclable")} value={t("Ja", "Yes", "Oui")} icon="recycling" />
                    <TechSpecCard title={t("Bauweise", "Construction", "Mode de construction")} value={t("Betonfertigteile", "Precast concrete units", "Éléments préfabriqués en béton")} icon="view_in_ar" />
                </div>

                {/* Montageanleitung: CTA */}
                <div className="mt-16 rounded-2xl border border-brand-dark/10 bg-brand-surface/50 p-8 lg:p-10 backdrop-blur-sm">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-4 uppercase tracking-widest bg-brand-orange/5 rounded-md">
                                {t("Dokumentation", "Documentation", "Documentation")}
                            </span>
                            <h3 className="font-heading text-2xl lg:text-3xl font-extrabold uppercase tracking-tighter text-brand-dark">
                                {t(<>Montageanleitung <span className="text-brand-orange">Grillplatz</span></>, <>Installation instructions: <span className="text-brand-orange">barbecue area</span></>, <>Notice de montage : <span className="text-brand-orange">aire de barbecue</span></>)}
                            </h3>
                            <p className="mt-3 text-brand-muted max-w-xl leading-relaxed">
                                {t("Die vollständige Aufbauanleitung erklärt Unterbau, Abladen, Setzreihenfolge, das Ausrichten des Trägers mit dem Schnurlot, Kette und Gegengewicht. Dazu kommen Werkzeugliste und Wartungsplan. Sie können die Anleitung online lesen oder als PDF herunterladen.", "The complete installation guide covers the base, unloading, the order of setting, aligning the support with a plumb line, the chain and the counterweight. A tool list and maintenance schedule are included. You can read the guide online or download it as a PDF.", "La notice de montage complète explique la sous-couche, le déchargement, l'ordre de pose, l'alignement du support au fil à plomb, la chaîne et le contrepoids. Une liste d'outils et un plan d'entretien y sont joints. Vous pouvez lire la notice en ligne ou la télécharger en PDF.")}
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                            <Link
                                to="/produkte/grillstelle-beton/montageanleitung"
                                className="inline-flex justify-center items-center gap-2 bg-brand-dark text-white font-extrabold uppercase tracking-widest py-3 px-6 rounded-lg hover:bg-brand-orange transition-colors duration-300 group text-sm"
                            >
                                <span className="material-symbols-outlined">menu_book</span>
                                {t("Online ansehen", "View online", "Consulter en ligne")}
                            </Link>
                            <a
                                href="/downloads/montage-grillplatz.pdf"
                                download
                                className="inline-flex justify-center items-center gap-2 border border-brand-dark/20 bg-white/60 text-brand-dark font-extrabold uppercase tracking-widest py-3 px-6 rounded-lg hover:border-brand-orange hover:text-brand-orange transition-colors duration-300 text-sm"
                            >
                                <span className="material-symbols-outlined">download</span>
                                {t("PDF (625 KB)", "PDF (625 KB, in German)", "PDF (625 Ko, en allemand)")}
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <BrochureRequestForm context="productpage" />
            <ReferencedProjects productPath="/produkte/grillstelle-beton" />
            <OtherProducts />

       </div>
    </PageShell>
  );
};

export default ProductGrillPage;