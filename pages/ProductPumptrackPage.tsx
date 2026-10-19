import React from 'react';
import { Link, useT } from '../i18n';
import PageShell from '../components/PageShell';
import { useProducts } from '../localized';
import BrochureRequestForm from '../components/BrochureRequestForm';
import ReferencedProjects from '../components/ReferencedProjects';
import Bild from '../components/Bild';
import { ProduktHero, TechSpecCard, DATENBLATT, SCHILD, SCHILD_ICON, GsSiegel } from '../components/ProduktBausteine';

const OtherProducts: React.FC = () => {
  const t = useT();
  const PRODUCTS = useProducts();
  const otherProducts = PRODUCTS.filter(p => p.id !== 'pumptrack' && p.id !== 'skate-anlagen').slice(0, 3);
  return (
    <div className="mt-32 border-t border-brand-dark/10 pt-24">
      <h2 className="text-4xl font-extrabold font-heading text-center mb-16 uppercase tracking-widest text-brand-dark">
        {t(<>Weitere <span className="text-brand-orange">Lösungen</span></>, <>More <span className="text-brand-orange">solutions</span></>, <>D'autres <span className="text-brand-orange">solutions</span></>)}
      </h2>
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

const ProductPumptrackPage: React.FC = () => {
  const t = useT();
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": t("Pumptrack aus Beton", "Concrete Pump Track", "Pumptrack en béton"),
    "description": t("Modularer Pumptrack aus Beton-Fertigteilen. TÜV-zertifiziert, formstabil, wartungsarm. Für Bikes, Skateboards und Scooter.", "Modular pump track made of precast concrete units. TÜV-certified, dimensionally stable, low-maintenance. For bikes, skateboards and scooters.", "Pumptrack modulaire en éléments préfabriqués en béton. Certifié TÜV, indéformable, à entretien réduit. Pour vélos, skateboards et trottinettes."),
    "brand": { "@type": "Brand", "name": "A+ Urban Design" },
    "manufacturer": { "@type": "Organization", "name": "A+ Urban Design", "url": "https://www.aplusurbandesign.com" },
    "category": t("Sportanlagen", "Sports facilities", "Équipements sportifs"),
    "material": t("Beton", "Concrete", "Béton"),
    "image": "https://www.aplusurbandesign.com/images/pumptrack/pumptrack-beton-elemente-01.jpg",
    "offers": {
      "@type": "Offer",
      "url": "https://www.aplusurbandesign.com/produkte/pumptrack-beton",
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
    <PageShell title={t("Pumptrack-Hersteller: Beton-Pumptrack planen & bauen", "Pump Track Manufacturer: Designing & Building Concrete Pump Tracks", "Fabricant de pumptracks : conception et construction de pumptracks en béton")} description={t("Pumptrack-Hersteller A+ Urban Design: Pumptracks aus Beton: TÜV-zertifiziert, formstabil und wartungsarm. Modular, sofort befahrbar, in ganz Europa gebaut.", "Pump track manufacturer A+ Urban Design: concrete pump tracks, TÜV-certified, dimensionally stable and low-maintenance. Modular, ready to ride straight away, built all over Europe.", "Fabricant de pumptracks A+ Urban Design : pumptracks en béton certifiés TÜV, indéformables et à entretien réduit. Modulaires, utilisables immédiatement, construits dans toute l'Europe.")} schema={productSchema}>
       
       {/* 1. HERO mit Kennzahlen (Werte aus den technischen Daten) */}
       <ProduktHero
            bild={<Bild hoch src="/images/pumptrack/pumptrack-beton-elemente-01.jpg"
                        alt={t("Pumptrack aus Betonelementen", "Pump track made of concrete elements", "Pumptrack en éléments de béton")}
                        className="absolute inset-0 w-full h-full object-cover animate-kenburns-2"
                        loading="eager"
                        fetchPriority="high" />}
            schilder={<>
                <span className={SCHILD}>{t("Für Bike, Skate, Scooter", "For bike, skate and scooter", "Pour vélo, skate et trottinette")}</span>
                         <span className={SCHILD_ICON}>
                            <span className="material-symbols-outlined text-base">verified_user</span> {t("DIN EN 14974", "EN 14974", "EN 14974")}
                         </span>
            </>}
            titel={t(<>Pumptracks<br/>
                        <span className="text-brand-orange">aus Beton</span></>, <>Concrete<br/> <span className="text-brand-orange">pump tracks</span></>, <>Pumptracks<br/> <span className="text-brand-orange">en béton</span></>)}
            kennzahlen={[
                { wert: "TÜV / GS", label: t("Zertifikat", "Certificate", "Certificat") },
                { wert: t("Bike, Skate, Scooter, Inline", "Bike, skate, scooter, inline", "Vélo, skate, trottinette, roller"), label: t("Einsatzzweck", "Purpose", "Usage") },
                { wert: t("Ganzjährig", "All year round", "Toute l'année"), label: t("Witterung", "Weather", "Intempéries") },
                { wert: t("Leicht erweiterbar", "Easy to extend", "Facile à agrandir"), label: t("Modulsystem", "Modular system", "Système modulaire") },
            ]}
       />

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            
            {/* 2. SPLIT LAYOUT */}
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 mb-32">
                
                {/* Sticky Narrative */}
                <div className="lg:w-5/12">
                    <div className="lg:sticky lg:top-32">
                        {/* INDUSTRIAL HEADER UPDATE */}
                        <h2 className="text-3xl md:text-5xl font-bold font-heading text-brand-dark mb-8 uppercase tracking-normal [word-spacing:0.12em]">
                            {t(<>Fahren ohne <span className="text-brand-orange">Treten</span></>, <>Riding without <span className="text-brand-orange">pedalling</span></>, <>Rouler sans <span className="text-brand-orange">pédaler</span></>)}
                        </h2>
                        <p className="text-xl text-brand-dark/75 leading-relaxed mb-8">
                            {t("Ein Pumptrack ist ein Rundkurs aus Wellen und Steilkurven, nutzbar für alle Altersgruppen. Die ca. 1,25 m breite Fahrbahn wird ohne Treten, allein durch Gewichtsverlagerung („Pumpen“) befahren.", "A pump track is a loop of rollers and berms that people of all ages can use. The track, about 1.25 m wide, is ridden without pedalling, by shifting your weight alone (“pumping”).", "Un pumptrack est un circuit en boucle composé de bosses et de virages relevés, utilisable à tout âge. La piste, large d'environ 1,25 m, se parcourt sans pédaler, par simple transfert de poids (« pumper »).")}
                        </p>
                        <p className="text-lg text-brand-dark/75 leading-relaxed mb-6">
                            {t("Im Gegensatz zu Asphaltpisten behalten unsere Betonelemente dauerhaft ihre Form. Für den Aufbau gibt es drei Varianten. Die Elemente können auch angeböscht werden.", "Unlike asphalt tracks, our concrete elements keep their shape permanently. There are three ways to build it. The elements can also be banked up with soil.", "Contrairement aux pistes en asphalte, nos éléments en béton conservent leur forme durablement. Il existe trois variantes de montage. Les éléments peuvent aussi être talutés.")}
                        </p>
                        <div className="bg-brand-orange/10 border border-brand-orange/30 rounded-xl p-5 mb-12">
                            <p className="text-brand-dark font-bold uppercase text-sm tracking-widest mb-2">{t("Lieferung & Montage aus einer Hand", "Delivery & installation from a single source", "Livraison et montage par un seul interlocuteur")}</p>
                            <p className="text-sm text-brand-dark/75 leading-relaxed">
                                {t("A+ Urban Design plant, fertigt, liefert und baut auf. Kommunen können Fördermittel aus der Sportstättenförderung nutzen.", "A+ Urban Design designs, manufactures, delivers and installs. In Germany, municipalities can use funding from sports facility programmes.", "A+ Urban Design conçoit, fabrique, livre et monte. En Allemagne, les communes peuvent recourir aux subventions des programmes de soutien aux équipements sportifs.")}
                            </p>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                            <Link
                                to="/kontakt?projectType=Pumptrack"
                                className="inline-flex justify-center items-center gap-2 bg-brand-orange text-white font-extrabold uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-brand-dark hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-xl group"
                            >
                                {t("Strecke planen", "Plan your track", "Concevoir votre piste")} <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Scrolling Gallery */}
                <div className="lg:w-7/12 flex flex-col gap-8">
                    <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-xl overflow-hidden group">
                         <img src="/images/pumptrack/pumptrack-beton-module-03.jpg" alt={t("Pumptrack in einem Park mit Fahrern", "Pump track in a park with riders", "Pumptrack dans un parc, avec des riders")} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">{t("Abb. 1: Pumptrack in einem Park, mit Fahrern", "Fig. 1: Pump track in a park, with riders", "Fig. 1 : pumptrack dans un parc, avec des riders")}</div>
                    </div>
                    
                    <GsSiegel linkLabel={t("Zertifikat TÜV SÜD", "TÜV SÜD certificate", "Certificat TÜV SÜD")}>
                        {t("TÜV-zertifiziert mit GS-Zeichen", "TÜV-certified with the GS mark", "Certifié TÜV, avec marque GS")}
                    </GsSiegel>

                    <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-xl overflow-hidden group">
                         <Bild sizes="(min-width: 1024px) 60vw, 100vw" src="/images/pumptrack/pumptrack-beton-elemente-01.jpg" alt={t("Startbereich und Strecke aus Betonelementen", "Start area and track made of concrete elements", "Zone de départ et piste en éléments de béton")} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">{t("Abb. 2: Startbereich und Strecke aus Betonelementen", "Fig. 2: Start area and track made of concrete elements", "Fig. 2 : zone de départ et piste en éléments de béton")}</div>
                    </div>
                </div>
            </div>

            {/* 2b. ELEMENT GALLERY */}
            <div className="mb-32">
                <div className="mb-10">
                    <span className="block font-mono text-xs mb-6 uppercase tracking-widest text-[#4F6E34]">{t("Modulsystem", "Modular system", "Système modulaire")}</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-brand-dark uppercase tracking-normal [word-spacing:0.12em]">
                        {t(<>Kurven, Wellen, <span className="text-brand-orange">Rampen</span></>, <>Berms, rollers, <span className="text-brand-orange">ramps</span></>, <>Virages, bosses, <span className="text-brand-orange">rampes</span></>)}
                    </h2>
                    <p className="text-lg text-brand-dark/75 mt-4 max-w-3xl">
                        {t("Jede Kurve, jede Welle und jeder Roller ist ein im Werk gefertigtes Betonteil mit fester Geometrie. Die Module lassen sich frei zu eigenen Streckenverläufen kombinieren.", "Every berm, every wave and every roller is a concrete unit made in the factory to a fixed geometry. The modules can be combined freely into your own track layouts.", "Chaque virage, chaque bosse et chaque roller est une pièce en béton fabriquée en usine, à la géométrie définie. Les modules se combinent librement pour créer vos propres tracés.")}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-xl overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <img src="/images/pumptrack/pumptrack-beton-elemente-02.jpg" alt={t("Pumptrack Betonelemente Detail", "Pump track concrete elements, detail", "Éléments de pumptrack en béton, détail")} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">{t("Abb. 3: Wellen und Steilkurven auf einer Rasenfläche", "Fig. 3: Rollers and berms on a lawn", "Fig. 3 : bosses et virages relevés sur une pelouse")}</div>
                    </div>
                    <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-xl overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <img src="/images/pumptrack/pumptrack-beton-module-04.jpg" alt={t("3D-Visualisierung eines geplanten Pumptracks", "3D visualisation of a planned pump track", "Visualisation 3D d'un pumptrack en projet")} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">{t("Abb. 4: 3D-Visualisierung eines geplanten Pumptracks", "Fig. 4: 3D visualisation of a planned pump track", "Fig. 4 : visualisation 3D d'un pumptrack en projet")}</div>
                    </div>
                </div>
                <div className="mt-6 bg-brand-surface/60 border border-brand-orange/20 rounded-xl p-6 text-sm text-brand-dark/75">
                    {t(<>Der Pumptrack lässt sich auf <strong className="text-brand-dark">drei Arten</strong> aufbauen: auf einer vorhandenen befahrbaren Fläche, auf der die Trasse markiert wird, auf einer neu angelegten Trasse aus Beton oder Asphalt oder auf Fundamentplatten, an die die Trasse anbetoniert oder anasphaltiert wird. Die Elemente können auch angeböscht werden.</>, <>The pump track can be built in <strong className="text-brand-dark">three ways</strong>: on an existing rideable surface with the route marked out, on a newly laid concrete or asphalt route, or on foundation slabs that the route is then cast or asphalted up to. The elements can also be banked up with soil.</>, <>Le pumptrack peut être monté de <strong className="text-brand-dark">trois façons</strong> : sur une surface roulante existante sur laquelle le tracé est marqué, sur un tracé neuf en béton ou en asphalte, ou sur des dalles de fondation auxquelles le tracé est raccordé en béton ou en asphalte. Les éléments peuvent aussi être talutés.</>)}
                </div>
            </div>

            {/* 3. TECHNICAL SPECS */}
            <div className="mb-32">
                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    {/* INDUSTRIAL HEADER UPDATE */}
                    <h2 className="text-4xl sm:text-5xl md:text-6xl hyphens-auto font-extrabold font-heading text-brand-dark uppercase tracking-normal [word-spacing:0.12em] leading-[1.02]">
                        {t(<>Technische <span className="text-brand-orange">Daten</span></>, <>Technical <span className="text-brand-orange">data</span></>, <>Données <span className="text-brand-orange">techniques</span></>)}
                    </h2>
                </div>
                
                <dl className={DATENBLATT}>
                    <TechSpecCard title={t("Fahrbreite", "Track width", "Largeur de piste")} value={t("~1,25 Meter", "~1.25 metres", "~1,25 mètre")} icon="straighten" />
                    <TechSpecCard title={t("Zielgruppe", "Who it's for", "Public visé")} value={t("Bike, Skate, Scooter, Inline", "Bike, skate, scooter, inline", "Vélo, skate, trottinette, roller")} icon="groups" />
                    <TechSpecCard title={t("Oberfläche", "Surface", "Surface")} value={t("Spezialbeton", "Special concrete", "Béton spécial")} icon="texture" />
                    <TechSpecCard title={t("Aufbau", "Set-up", "Montage")} value={t("3 Varianten", "3 options", "3 variantes")} icon="view_module" />
                    <TechSpecCard title={t("Witterung", "Weather", "Intempéries")} value={t("Ganzjährig", "All year round", "Toute l'année")} icon="wb_sunny" />
                    <TechSpecCard title={t("Erweiterbar", "Extendable", "Extensible")} value={t("Symmetrisch / Parallel", "Symmetrical / Parallel", "Symétrique / Parallèle")} icon="add_circle" />
                    <TechSpecCard
                        title={t("Zertifikat", "Certificate", "Certificat")}
                        value="TÜV / GS"
                        icon="verified"
                        href="https://www.tuvsud.com/de-de/dienstleistungen/produktpruefung-und-produktzertifizierung/zertifikatsdatenbank/?q=Z1A+056616+0012+Rev.+00"
                        linkLabel={t("Zertifikat TÜV SÜD", "TÜV SÜD certificate", "Certificat TÜV SÜD")}
                    />
                    <TechSpecCard title={t("Montage", "Installation", "Montage")} value={t("Durch A+ Urban Design", "By A+ Urban Design", "Par A+ Urban Design")} icon="construction" />
                </dl>
            </div>

            <BrochureRequestForm context="productpage" />
            <ReferencedProjects productPath="/produkte/pumptrack-beton" />
            <OtherProducts />

       </div>
    </PageShell>
  );
};

export default ProductPumptrackPage;