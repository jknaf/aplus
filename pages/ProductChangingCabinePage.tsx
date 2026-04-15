import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PRODUCTS } from '../constants';
import BrochureRequestForm from '../components/BrochureRequestForm';

const OtherProducts: React.FC = () => {
  const otherProducts = PRODUCTS.filter(p => p.id !== 'umkleide' && p.id !== 'grillstelle').slice(0, 3);
  return (
    <div className="mt-32 border-t border-brand-dark/10 pt-24">
      <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/10 backdrop-blur-sm rounded-md">
              Portfolio
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-[0.9]">
              Weitere <span className="text-brand-orange">Lösungen.</span>
          </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherProducts.map(product => (
          <Link key={product.id} to={product.path} className="group relative block overflow-hidden rounded-sm aspect-[4/5] bg-brand-surface/60 border border-brand-dark/5 backdrop-blur-sm">
            <img loading="lazy" decoding="async" src={product.imageUrl} alt={product.altText} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-8">
               <span className="text-brand-orange font-mono text-xs mb-2 hidden group-hover:block">PRODUKT 0{PRODUCTS.indexOf(product) + 1}</span>
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

const ProductChangingCabinePage: React.FC = () => {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Umkleidekabine 'Die Schnecke'",
    "description": "Vandalismussichere Umkleidekabine aus Beton und Edelstahl. Zweiteilig, ohne Türen, fundamentfrei. Ideal für Freibäder und Sportanlagen.",
    "brand": { "@type": "Brand", "name": "A+ Urban Design" },
    "manufacturer": { "@type": "Organization", "name": "A+ Urban Design", "url": "https://www.aplusurbandesign.com" },
    "category": "Stadtmöblierung / Urban Furniture",
    "material": "Beton, Edelstahl",
    "countryOfOrigin": "DE",
    "image": "https://www.aplusurbandesign.com/images/umkleide/umkleidekabine-schnecke-04.jpg",
    "offers": {
      "@type": "Offer",
      "url": "https://www.aplusurbandesign.com/produkte/umkleidekabine-beton",
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
    <PageShell title="Umkleidekabine Beton — Freibad, Sportplatz & Outdoor" description="Vandalismussichere Outdoor-Umkleidekabine aus Beton: türlos, zweiteilig und fundamentfrei. Ideal für Freibäder, Sportplätze, Schwimmbäder und öffentliche Parks. Das Schnecken-Prinzip — hygienisch und wartungsfrei." schema={productSchema}>

       {/* 1. HERO */}
       <div className="relative w-full h-[60vh] -mt-16 mb-24 overflow-hidden rounded-b-2xl border-b border-brand-dark/10 z-10">
            <div className="absolute inset-0">
                 <img src="/images/umkleide/umkleidekabine-schnecke-04.jpg"
                        alt="Hero Umkleidekabine"
                        className="w-full h-full object-cover animate-kenburns-3"
                        loading="eager"
                        fetchPriority="high" />

                 {/* Gradient to transparent to show grid */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-dark/80 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-12 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-6 animate-fade-in-up">
                         <span className="px-3 py-1 border border-brand-orange text-brand-orange text-xs font-bold uppercase tracking-[0.2em] bg-black/40 backdrop-blur-sm">Sanitary Solution</span>
                         <span className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider bg-black/40 backdrop-blur-sm px-2 py-1">
                            <span className="material-symbols-outlined text-base">privacy_tip</span> Sichtschutz
                         </span>
                    </div>
                    {/* INDUSTRIAL HEADER UPDATE */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-heading uppercase tracking-tighter text-white leading-[0.85] animate-fade-in-up [animation-delay:100ms]">
                        Die<br/>
                        <span className="text-brand-orange">Schnecke</span>
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
                            Innovation
                        </span>
                         {/* INDUSTRIAL HEADER UPDATE */}
                        <h2 className="text-5xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none mb-8">
                            Privatsphäre <span className="text-brand-orange">ohne Türen.</span>
                        </h2>
                        <p className="text-xl text-brand-muted leading-relaxed mb-8">
                            In Freibädern und an Badeseen sind Türen oft das erste Opfer von Vandalismus. Unsere Lösung: "Die Schnecke" — kein Kabinenkontakt beim Betreten und Verlassen. Oben und unten offener Freiraum zur Einsicht, nicht verschließbar, missbrauchshemmend.
                        </p>
                        <p className="text-lg text-brand-muted leading-relaxed mb-12">
                            Die Kabine besteht aus nur zwei Teilen ohne Verschraubungen — einfach aufstellen, abbauen oder versetzen. Die fugenlose Bodenplatte dient zugleich als Fundamentplatte auf verdichtetem Schotterbett. Aus bewehrtem Beton und Edelstahl gefertigt — extrem widerstandsfähig gegen Vandalismus.
                        </p>
                        
                        <div className="flex flex-col gap-4">
                            <Link 
                                to="/kontakt" 
                                className="inline-flex justify-center items-center gap-2 bg-brand-orange text-white font-extrabold uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-brand-dark hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-xl group"
                            >
                                Angebot anfordern <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="lg:w-7/12 flex flex-col gap-8">
                    <div className="aspect-[16/10] bg-brand-surface/60 rounded-sm overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                         <img src="/images/umkleide/umkleide-kabine-01.jpg" alt="Umkleide Architektur" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">FIG 01. EXTERIOR</div>
                    </div>
                    
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-8 my-8 relative rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <div className="absolute top-4 right-4 text-brand-orange opacity-20 text-6xl font-extrabold font-heading">0%</div>
                        <h3 className="text-2xl font-bold font-heading text-brand-dark uppercase mb-4">Zero Maintenance</h3>
                        <p className="text-brand-muted">
                            Keine Scharniere. Keine Schlösser. Keine Holzteile. Diese Kabine muss im Winter nicht abgebaut werden und verrottet nicht.
                        </p>
                    </div>

                    <div className="aspect-[16/10] bg-brand-surface/60 rounded-sm overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                         <img src="/images/umkleide/umkleide-kabine-02.jpg" alt="Bodenplatte Detail" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">FIG 02. CLEAN SURFACE</div>
                    </div>

                    <div className="aspect-[16/10] bg-brand-surface/60 rounded-sm overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                         <img src="/images/umkleide/umkleidekabine-freibad-03.jpg" alt="Schnecken-Kabine im Freibad" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">FIG 03. FREIBAD-INSTALLATION</div>
                    </div>
                </div>
            </div>

            {/* 2b. PANORAMA */}
            <div className="mb-32">
                <div className="mb-8">
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">Einsatzbereich</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter">
                        Im <span className="text-brand-orange">Kontext.</span>
                    </h2>
                    <p className="text-lg text-brand-muted mt-4 max-w-3xl">
                        Freibäder, Seen und Sportanlagen — überall dort, wo Türen zum Problem werden. Das Panoramabild zeigt die typische Aufstellsituation: mehrere Kabinen nebeneinander auf einem verdichteten Schotterbett, ohne Fundament, ohne Vorarbeiten.
                    </p>
                </div>
                <div className="relative w-full aspect-[21/9] bg-brand-surface/60 rounded-xl overflow-hidden border border-brand-dark/10 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
                    <img src="/images/umkleide/umkleide-panorama.jpg" alt="Schnecken-Kabinen im Freibad Panorama" loading="lazy" className="w-full h-full object-cover" />
                    <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">FIG 04. PANORAMA — TYPISCHE AUFSTELLUNG</div>
                </div>
            </div>

            {/* 3. TECH SPECS */}
            <div className="mb-32">
                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    {/* INDUSTRIAL HEADER UPDATE */}
                    <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                        Tech<span className="text-brand-orange">Specs</span>
                    </h2>
                    <span className="font-mono text-brand-muted text-xs hidden sm:block">DATENBLATT: UMKLEIDE</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <TechSpecCard title="Aufbau" value="2 Teile, ohne Schrauben" icon="view_in_ar" />
                    <TechSpecCard title="Tür" value="Keine (Spirale)" icon="no_meeting_room" />
                    <TechSpecCard title="Boden" value="Fugenlos integriert" icon="check_box_outline_blank" />
                    <TechSpecCard title="Material" value="Beton + Edelstahl" icon="wallpaper" />
                    <TechSpecCard title="Montage" value="Fundamentfrei" icon="layers" />
                    <TechSpecCard title="Einsatz" value="Freibad / See" icon="water_drop" />
                    <TechSpecCard title="Missbrauchschutz" value="Oben + unten offen" icon="shield" />
                    <TechSpecCard title="Winterbetrieb" value="Kein Abbau nötig" icon="ac_unit" />
                </div>
            </div>

            <BrochureRequestForm context="productpage" />
            <OtherProducts />

       </div>
    </PageShell>
  );
};

export default ProductChangingCabinePage;