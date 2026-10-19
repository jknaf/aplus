import React from 'react';
import { Link, useT } from '../i18n';
import PageShell from '../components/PageShell';
import { useProducts } from '../localized';
import BrochureRequestForm from '../components/BrochureRequestForm';
import ReferencedProjects from '../components/ReferencedProjects';
import Bild from '../components/Bild';
import { ProduktHero, TechSpecCard, DATENBLATT, BOX_A, BOX_A_TITEL, BOX_A_TEXT, BOX_B, BOX_B_TITEL, BOX_B_TEXT } from '../components/ProduktBausteine';
import Plankopf from '../components/Plankopf';

const OtherProducts: React.FC = () => {
  const t = useT();
  const PRODUCTS = useProducts();
  const otherProducts = PRODUCTS.filter(p => p.id !== 'ueberdachung' && p.id !== 'grillstelle').slice(0, 3);
  return (
    <div className="mt-32 border-t border-brand-dark/10 pt-24">
      <div className="text-center mb-16">
          <Plankopf label="Portfolio">
              {t(<>Weitere <span className="text-brand-orange">Lösungen</span></>, <>More <span className="text-brand-orange">solutions</span></>, <>D'autres <span className="text-brand-orange">solutions</span></>)}
          </Plankopf>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherProducts.map(product => (
          <Link key={product.id} to={product.path} className="group relative block overflow-hidden rounded-sm aspect-[4/5] bg-brand-surface/60 border border-brand-dark/5 backdrop-blur-sm">
            <Bild hoch sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" loading="lazy" decoding="async" src={product.imageUrl} alt={product.altText} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-8">
               <span className="text-brand-orange font-mono text-xs mb-2 hidden group-hover:block">{t('PRODUKT', 'PRODUCT', 'PRODUIT')} 0{PRODUCTS.indexOf(product) + 1}</span>
              <h3 className="text-2xl font-extrabold font-heading text-white uppercase tracking-normal [word-spacing:0.12em] transform group-hover:-translate-y-1 transition-transform duration-300">{product.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const ProductPavilionPage: React.FC = () => {
  const t = useT();
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": t("Überdachung & Pavillon aus Beton", "Concrete Shelter & Pavilion", "Abri et pavillon en béton"),
    "description": t("C-Profil-Überdachung aus bewehrtem Beton C35/45. 240 × 200 × 262 cm. Einzeln oder als Pavillon-Gruppe. Fundamentfrei, mit integrierter Sitzfläche.", "C-profile shelter made of reinforced concrete C35/45. 240 × 200 × 262 cm. Single or as a pavilion group. Foundation-free, with integrated seating.", "Abri à profil en C en béton armé C35/45. 240 × 200 × 262 cm. Seul ou en groupe formant un pavillon. Sans fondation, avec assise intégrée."),
    "brand": { "@type": "Brand", "name": "A+ Urban Design" },
    "manufacturer": { "@type": "Organization", "name": "A+ Urban Design", "url": "https://www.aplusurbandesign.com" },
    "category": t("Stadtmöblierung", "Street furniture", "Mobilier urbain"),
    "material": t("Bewehrter Beton C35/45", "Reinforced concrete C35/45", "Béton armé C35/45"),
    "image": "https://www.aplusurbandesign.com/images/ueberdachung/ueberdachung-unterstellplatz-02.jpg",
    "offers": {
      "@type": "Offer",
      "url": "https://www.aplusurbandesign.com/produkte/ueberdachung-beton",
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
    <PageShell title={t("Überdachung und Pavillon aus Beton", "Concrete Shelter and Pavilion", "Abri et pavillon en béton")} description={t("Überdachung, Pavillon und Unterstellplatz aus Beton: wetterfest, fundamentfrei und vandalismussicher. Stadtmöbel und Wetterschutz für öffentliche Parks, Sportanlagen und Freizeitbereiche.", "Shelter, pavilion and covered seating area in concrete: weatherproof, foundation-free and vandal-resistant. Street furniture and weather protection for public parks, sports grounds and leisure areas.", "Abri, pavillon et espace couvert en béton : résistants aux intempéries, sans fondation et résistants au vandalisme. Mobilier urbain et protection contre les intempéries pour les parcs publics, les équipements sportifs et les espaces de loisirs.")} schema={productSchema}>

       {/* 1. HERO mit Kennzahlen (Werte aus den technischen Daten) */}
       <ProduktHero
            bild={<Bild hoch src="/images/ueberdachung/ueberdachung-unterstellplatz-02.jpg"
                        alt={t("Überdachung aus Beton als Unterstellplatz", "Concrete shelter as a covered seating area", "Abri en béton servant d'espace couvert")}
                        className="absolute inset-0 w-full h-full object-cover animate-kenburns-1"
                        loading="eager"
                        fetchPriority="high" />}
            label={t("Öffentlicher Raum", "Public space", "Espace public")}
            rechts={t("Wetterschutz", "Weather protection", "Protection contre les intempéries")}
            titel={t(<>Beton-<br/>
                        <span className="text-brand-orange">Pavillon</span></>, <>Concrete<br/> <span className="text-brand-orange">pavilion</span></>, <>Pavillon<br/> <span className="text-brand-orange">en béton</span></>)}
            kennzahlen={[
                { wert: t("Ein Stück", "One piece", "D'un seul tenant"), label: t("Kein Zusammenbau", "Nothing to assemble", "Rien à assembler") },
                { wert: t("Autokran, fundamentfrei", "Mobile crane, foundation-free", "Grue mobile, sans fondation"), label: t("Montage", "Installation", "Montage") },
                { wert: t("Einzeln, Reihe, Gruppe", "Single, row, group", "Seul, en rangée, en groupe"), label: t("Konfiguration", "Configuration", "Configuration") },
                { wert: t("Bewehrter Beton C35/45", "Reinforced concrete C35/45", "Béton armé C35/45"), label: t("Material", "Material", "Matériau") },
            ]}
       />

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            
            {/* 2. SPLIT LAYOUT */}
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 mb-32">
                
                <div className="lg:w-5/12">
                    <div className="lg:sticky lg:top-32">
                        <Plankopf label={t("Einsatzarten", "Ways to use it", "Types d'utilisation")} klein className="mb-8">
                            {t(<>Ein Element, <span className="text-brand-orange">vier Einsätze</span></>, <>One element, <span className="text-brand-orange">four uses</span></>, <>Un élément, <span className="text-brand-orange">quatre usages</span></>)}
                        </Plankopf>
                        <p className="text-xl text-brand-dark/75 leading-relaxed mb-8">
                            {t("Ein einziges Betonelement lässt sich auf vier Arten einsetzen: einzeln als Unterstellplatz, in einer Reihe als Haltestellenüberdachung, paarweise gegenüber als überdachte Sitznische oder zu dritt oder viert als Pavillon.", "A single concrete element can be used in four ways: on its own as a shelter, in a row as a bus stop canopy, in facing pairs as a covered seating bay, or in threes or fours as a pavilion.", "Un seul élément en béton peut s'utiliser de quatre façons : seul comme abri, en rangée comme abribus, par paires face à face comme niche d'assise couvert, ou à trois ou quatre comme pavillon.")}
                        </p>
                        <p className="text-lg text-brand-dark/75 leading-relaxed mb-12">
                            {t("Das C-Profil aus bewehrtem Beton C35/45 ist 240 cm lang, 200 cm tief und 262 cm hoch. Die Zwischenräume lassen sich mit Edelstahlseilen oder Rankgittern begrünen. Sitzfläche und Bodenplatte sind Teil des Elements. Nötig ist nur ein verdichtetes Schotterbett.", "The C-profile in reinforced concrete C35/45 is 240 cm long, 200 cm deep and 262 cm high. The gaps can be planted using stainless steel climbing cables or trellises. The seat and base slab are part of the element. All that is needed is a compacted gravel bed.", "Le profil en C en béton armé C35/45 mesure 240 cm de long, 200 cm de profondeur et 262 cm de haut. Les espaces intermédiaires peuvent être végétalisés avec des câbles en inox ou des treillis. L'assise et la dalle de sol font partie de l'élément. Seul un lit de gravier compacté est nécessaire.")}
                        </p>
                        
                        <div className="flex flex-col gap-4">
                            <Link
                                to="/kontakt?projectType=Möblierung"
                                className="inline-flex justify-center items-center gap-2 bg-brand-orange text-white font-extrabold uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-brand-dark hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-xl group"
                            >
                                {t("Beratung anfordern", "Request advice", "Demander conseil")} <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="lg:w-7/12 flex flex-col gap-8">
                    <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-xl overflow-hidden group">
                         <Bild sizes="(min-width: 1024px) 60vw, 100vw" src="/images/ueberdachung/pavillon-wetterschutz.jpg" alt={t("Zeichnung: Anordnungsvarianten der Überdachung mit Bepflanzung", "Drawing: layout options for the shelter with planting", "Dessin : variantes d'agencement de l'abri avec végétalisation")} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">{t("Abb. 1: Anordnungsvarianten mit Bepflanzung (Zeichnung)", "Fig. 1: Layout options with planting (drawing)", "Fig. 1 : variantes d'agencement avec végétalisation (dessin)")}</div>
                    </div>
                    
                    <div className={`${BOX_A} my-8`}>
                        <h3 className={`${BOX_A_TITEL} text-brand-dark`}>{t("Anwendungen", "Applications", "Applications")}</h3>
                        <ul className={`grid grid-cols-2 gap-4 list-disc list-inside ${BOX_A_TEXT}`}>
                            <li>{t("Haltestellen", "Bus stops", "Arrêts de bus")}</li>
                            <li>{t("Sitznischen", "Seating bays", "Niches d'assise")}</li>
                            <li>{t("Pavillons", "Pavilions", "Pavillons")}</li>
                        </ul>
                        <p className="text-xs font-mono uppercase tracking-widest text-brand-dark/75 mt-4 pt-3 border-t border-brand-dark/5">
                            {t("Auf Schotterbett · fundamentfrei", "On a gravel bed · foundation-free", "Sur lit de gravier · sans fondation")}
                        </p>
                    </div>

                    <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-xl overflow-hidden group">
                         <Bild sizes="(min-width: 1024px) 60vw, 100vw" src="/images/ueberdachung/ueberdachung-beton-01.jpg" alt={t("Überdachung aus Beton mit Sitzbänken", "Concrete shelter with benches", "Abri en béton avec bancs")} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">{t("Abb. 2: Überdachung aus Beton mit Sitzbänken", "Fig. 2: Concrete shelter with benches", "Fig. 2 : abri en béton avec bancs")}</div>
                    </div>
                </div>
            </div>

            <div className="mb-32 grid lg:grid-cols-2 gap-8">
                <div className={BOX_A}>
                    <Plankopf label={t("Einsatzbereiche", "Where it is used", "Domaines d'utilisation")} klein className="mb-6">
                        {t(<>Wetterschutz im <span className="text-brand-orange">öffentlichen Raum</span></>, <>Weather protection in <span className="text-brand-orange">public space</span></>, <>Protection contre les intempéries dans <span className="text-brand-orange">l'espace public</span></>)}
                    </Plankopf>
                    <p className="text-xl text-brand-dark/75 leading-relaxed">
                        {t("Typische Einsatzorte sind Haltestellen, Schulhöfe, Parks, Campingplätze, Sportanlagen, Friedhöfe und Rastplätze. Das Betonelement mit 240 × 200 × 262 cm hat eine Sitzfläche für 4–5 Personen und schützt insgesamt ca. 10 Personen vor Regen und Sonne. Das Element kann einzeln stehen. Nebeneinander ergibt sich eine durchgehende Haltestellenüberdachung, gegenüber eine Sitznische mit Sichtschutz. Drei oder vier Elemente bilden einen Pavillon mit Sitzfläche für bis zu 16 Personen und Schutz für bis zu 40 Personen.", "Typical locations are bus stops, school playgrounds, parks, campsites, sports grounds, cemeteries and rest areas. The 240 × 200 × 262 cm concrete element has seating for 4–5 people and shelters about 10 people from rain and sun in total. The element can stand alone. Side by side they form a continuous bus stop canopy, and facing each other a seating bay with a privacy screen. Three or four elements make a pavilion with seating for up to 16 people and shelter for up to 40.", "Les lieux d'implantation typiques sont les arrêts de bus, les cours d'école, les parcs, les campings, les équipements sportifs, les cimetières et les aires de repos. L'élément en béton de 240 × 200 × 262 cm offre une assise pour 4 à 5 personnes et protège au total environ 10 personnes de la pluie et du soleil. L'élément peut être posé seul. Côte à côte, plusieurs éléments forment un abribus continu, face à face un niche d'assise avec protection visuelle. Trois ou quatre éléments forment un pavillon avec assise pour jusqu'à 16 personnes et abri pour jusqu'à 40 personnes.")}
                    </p>
                </div>

                <div className={BOX_A}>
                    <Plankopf label={t("Montage", "Installation", "Montage")} klein className="mb-6">
                        {t(<>Aufstellen und <span className="text-brand-orange">versetzen</span></>, <>Installing and <span className="text-brand-orange">moving</span></>, <>Installer et <span className="text-brand-orange">déplacer</span></>)}
                    </Plankopf>
                    <div className="space-y-5 text-lg text-brand-dark/75 leading-relaxed">
                        <p>
                            {t("Das Element wird mit dem Autokran auf ein verdichtetes Kies- oder Schotterbett gesetzt, ohne Fundament- und Pflasterarbeiten. Es hat keine Verschraubungen und keine beweglichen Teile. Deshalb ist es wartungsarm und lässt sich einfach versetzen oder abbauen.", "The element is set on a compacted gravel or crushed-stone bed with a mobile crane, with no foundation or paving work. It has no bolted joints and no moving parts. That is why it needs little maintenance and is easy to move or dismantle.", "L'élément est posé à la grue mobile sur un lit de gravier ou de concassé compacté, sans travaux de fondation ni de pavage. Il n'a ni assemblages vissés ni pièces mobiles. C'est pourquoi il demande peu d'entretien et se déplace ou se démonte facilement.")}
                        </p>
                        <p>
                            {t("Im Vergleich zu Stahl- oder Holzvarianten altert bewehrter Beton langsamer und muss nicht ständig vor Rost oder Fäulnis geschützt werden. Beton ist nicht brennbar und benötigt über die gesamte Lebensdauer kaum Wartung. Außerdem lässt sich die fugenlose Oberfläche leicht reinigen. Das zählt besonders an Haltestellen und auf Schulhöfen.", "Compared with steel or timber versions, reinforced concrete ages more slowly and does not need constant protection from rust or rot. Concrete does not burn and needs hardly any maintenance over its whole life. The seamless surface is also easy to clean, which matters especially at bus stops and in school playgrounds.", "Comparé aux versions en acier ou en bois, le béton armé vieillit plus lentement et n'a pas besoin d'être protégé en permanence contre la rouille ou la pourriture. Le béton ne brûle pas et demande très peu d'entretien pendant toute sa durée de vie. La surface sans joint est en outre facile à nettoyer, ce qui compte surtout aux arrêts de bus et dans les cours d'école.")}
                        </p>
                    </div>
                </div>
            </div>

            {/* 3. EIGENSCHAFTEN (aus ueberdachung-pavillon.md) */}
            <div className="mb-32">
                <div className="mb-8">
                    <Plankopf label={t("Das Original", "The original", "L'original")} klein className="mb-4">
                        {t(<>Das <span className="text-brand-orange">Überdachungselement</span></>, <>The <span className="text-brand-orange">shelter element</span></>, <>L'<span className="text-brand-orange">élément d'abri</span></>)}
                    </Plankopf>
                    <p className="text-xl text-brand-dark/75 leading-relaxed max-w-3xl">
                        {t("Unser Überdachungselement ist ein einziges Fertigteil aus bewehrtem Beton. Bodenplatte und Sitzbank sind angeformt. Der Autokran setzt das Element in einem Stück, es wiegt rund 6,3 t. Zusammenbauen muss man nichts.", "Our shelter element is a single precast unit in reinforced concrete. The base slab and bench are cast in one piece with it. The mobile crane sets the element in one piece; it weighs about 6.3 t. There is nothing to assemble.", "Notre élément d'abri est une seule pièce préfabriquée en béton armé. La dalle de sol et le banc sont intégrés au moulage. La grue mobile pose l'élément d'un seul tenant ; il pèse environ 6,3 t. Il n'y a rien à assembler.")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    <div className={BOX_B}>
                        <h3 className={BOX_B_TITEL}>{t("Multifunktional", "Multifunctional", "Polyvalent")}</h3>
                        <p className={BOX_B_TEXT}>{t("Mehrere Elemente lassen sich frei anordnen und später neu gruppieren. Abgebaut werden muss dafür nichts.", "Several elements can be arranged freely and regrouped later. Nothing has to be dismantled for that.", "Plusieurs éléments peuvent être disposés librement et regroupés autrement par la suite. Il n'y a rien à démonter pour cela.")}</p>
                    </div>
                    <div className={BOX_B}>
                        <h3 className={BOX_B_TITEL}>{t("Fundamentfrei", "Foundation-free", "Sans fondation")}</h3>
                        <p className={BOX_B_TEXT}>{t("Kein Fundament und kein Pflaster: Die Vorarbeiten vor Ort sind gering.", "No foundation and no paving: the groundwork on site is minimal.", "Ni fondation ni pavage : les travaux préparatoires sur place sont réduits.")}</p>
                    </div>
                    <div className={BOX_B}>
                        <h3 className={BOX_B_TITEL}>{t("Robust", "Robust", "Robuste")}</h3>
                        <p className={BOX_B_TEXT}>{t("Bewehrter Beton C35/45 brennt nicht, verbiegt nicht und ist kaum zu beschädigen. Er ist witterungsbeständig und auch unter Dauernutzung im öffentlichen Raum stabil.", "Reinforced concrete C35/45 does not burn, does not bend and is hard to damage. It is weather-resistant and stays stable even under constant use in public spaces.", "Le béton armé C35/45 ne brûle pas, ne se déforme pas et est difficile à endommager. Il résiste aux intempéries et reste stable même en usage continu dans l'espace public.")}</p>
                    </div>
                    <div className={BOX_B}>
                        <h3 className={BOX_B_TITEL}>{t("Wartungsarm", "Low-maintenance", "Entretien réduit")}</h3>
                        <p className={BOX_B_TEXT}>{t("Das Element hat keine Schrauben und keine empfindlichen Teile. Der Boden ist leicht zu reinigen. Die Materialien sind recycelbar.", "The element has no screws and no delicate parts. The floor is easy to clean. The materials are recyclable.", "L'élément n'a ni vis ni pièces fragiles. Le sol est facile à nettoyer. Les matériaux sont recyclables.")}</p>
                    </div>
                </div>

                {/* Für Kommunen: Belege Pressemitteilung Stadt Wedel 01.06.2023, Archivtext ueberdachung-pavillon */}
                <div className="mb-12">
                    <Plankopf label={t("Für Kommunen und Vereine", "For municipalities and clubs", "Pour les communes et les clubs")} klein className="mb-4">
                        {t(<>Keine Scheibe, <span className="text-brand-orange">die zerbricht</span></>, <>No pane <span className="text-brand-orange">to smash</span></>, <>Aucune vitre <span className="text-brand-orange">à briser</span></>)}
                    </Plankopf>
                    <p className="text-xl text-brand-dark/75 leading-relaxed max-w-3xl mb-8">
                        {t("Wartehallen aus Glas sind ein häufiges Ziel von Vandalismus. In einer deutschen Stadt mussten nach einer Vandalismuswelle 29 zerschlagene Glasscheiben an 18 Buswartehäuschen ersetzt werden. Die Kosten lagen bei etwa 20.000 Euro. Unser Überdachungselement hat keine Scheiben, die man zerschlagen oder ersetzen müsste.", "Glass waiting shelters are a frequent target of vandalism. In one German city, after a wave of vandalism, 29 smashed panes had to be replaced at 18 bus shelters. The cost was about 20,000 euros. Our shelter element has no panes that could be smashed or would need replacing.", "Les abribus en verre sont une cible fréquente du vandalisme. Dans une ville allemande, après une vague de dégradations, 29 vitres brisées ont dû être remplacées dans 18 abribus. Le coût s'est élevé à environ 20 000 euros. Notre élément d'abri n'a aucune vitre à briser ni à remplacer.")}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className={BOX_B}>
                            <h3 className={BOX_B_TITEL}>{t("Picknickplatz", "Picnic area", "Aire de pique-nique")}</h3>
                            <p className={BOX_B_TEXT}>{t("Auf Rastplätzen, Campingplätzen oder dem Vereinsgelände wird das Element zum überdachten Picknickplatz für 8 Personen.", "At rest areas, campsites or club grounds, the element becomes a covered picnic area for 8 people.", "Sur les aires de repos, les campings ou les terrains associatifs, l'élément devient une aire de pique-nique couverte pour 8 personnes.")}</p>
                        </div>
                        <div className={BOX_B}>
                            <h3 className={BOX_B_TITEL}>{t("Sportanlagen", "Sports grounds", "Équipements sportifs")}</h3>
                            <p className={BOX_B_TEXT}>{t("Am Spielfeldrand schützt das Element Zuschauer und Wartende vor Regen und Sonne.", "At the side of the pitch, the element shelters spectators and people waiting from rain and sun.", "En bordure de terrain, l'élément protège les spectateurs et les personnes qui attendent de la pluie et du soleil.")}</p>
                        </div>
                    </div>
                </div>

                {/* Datenblatt im weißen Kasten wie bei der Umkleidekabine */}
                <div className="bg-white rounded-2xl p-8 md:p-14 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                <Plankopf rechts={t("DATENBLATT: PAVILLON", "DATA SHEET: PAVILION", "FICHE TECHNIQUE : PAVILLON")} className="mb-8">
                    {t(<>Technische <span className="text-brand-orange">Daten</span></>, <>Technical <span className="text-brand-orange">data</span></>, <>Données <span className="text-brand-orange">techniques</span></>)}
                </Plankopf>

                <dl className={DATENBLATT}>
                    <TechSpecCard title={t("Länge", "Length", "Longueur")} value="240 cm" icon="straighten" />
                    <TechSpecCard title={t("Tiefe", "Depth", "Profondeur")} value="200 cm" icon="square_foot" />
                    <TechSpecCard title={t("Höhe", "Height", "Hauteur")} value="246 + 16 cm" icon="vertical_align_top" />
                    <TechSpecCard title={t("Material", "Material", "Matériau")} value={t("Bewehrter Beton C35/45", "Reinforced concrete C35/45", "Béton armé C35/45")} icon="architecture" />
                    <TechSpecCard title={t("Montage", "Installation", "Montage")} value={t("Autokran, fundamentfrei", "Mobile crane, foundation-free", "Grue mobile, sans fondation")} icon="layers" />
                    <TechSpecCard title={t("Konfiguration", "Configuration", "Configuration")} value={t("Einzeln, Reihe, Gruppe", "Single, row, group", "Seul, en rangée, en groupe")} icon="view_column" />
                    <TechSpecCard title={t("Sitzfläche", "Seating", "Assise")} value={t("Integriert", "Integrated", "Intégrée")} icon="event_seat" />
                    <TechSpecCard title={t("Begrünung", "Planting", "Végétalisation")} value={t("Edelstahlseile, Rankgitter", "Stainless steel cables, trellis", "Câbles en inox, treillis")} icon="eco" />
                    <TechSpecCard title={t("Aufbau", "Assembly", "Montage")} value={t("Ein Stück, kein Zusammenbau", "One piece, nothing to assemble", "D'un seul tenant, rien à assembler")} icon="build" />
                    <TechSpecCard title={t("Witterung", "Weather", "Intempéries")} value={t("Witterungsbeständig", "Weather-resistant", "Résistant aux intempéries")} icon="thermostat" />
                    <TechSpecCard title={t("Recycelbar", "Recyclable", "Recyclable")} value={t("Ja", "Yes", "Oui")} icon="recycling" />
                    <TechSpecCard title={t("Einsatz", "Use", "Utilisation")} value={t("Haltestelle, Sitznische, Pavillon", "Bus stop, seating bay, pavilion", "Arrêt de bus, niche d'assise, pavillon")} icon="public" />
                </dl>
                </div>
            </div>

            <BrochureRequestForm context="productpage" />
            <ReferencedProjects productPath="/produkte/ueberdachung-beton" />
            <OtherProducts />

       </div>
    </PageShell>
  );
};

export default ProductPavilionPage;
