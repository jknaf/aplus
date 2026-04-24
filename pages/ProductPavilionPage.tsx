import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PRODUCTS } from '../constants';
import BrochureRequestForm from '../components/BrochureRequestForm';
import ReferencedProjects from '../components/ReferencedProjects';

const OtherProducts: React.FC = () => {
  const otherProducts = PRODUCTS.filter(p => p.id !== 'ueberdachung' && p.id !== 'grillstelle').slice(0, 3);
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

const ProductPavilionPage: React.FC = () => {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Überdachung & Pavillon aus Beton",
    "description": "C-Profil-Überdachung aus bewehrtem Beton C35/45. 240 x 200 x 262 cm. Einzeln oder als Pavillon-Gruppe. Fundamentfrei, mit integrierter Sitzfläche.",
    "brand": { "@type": "Brand", "name": "A+ Urban Design" },
    "manufacturer": { "@type": "Organization", "name": "A+ Urban Design", "url": "https://www.aplusurbandesign.com" },
    "category": "Stadtmöblierung / Urban Furniture",
    "material": "Bewehrter Beton C35/45",
    "countryOfOrigin": "DE",
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
    <PageShell title="Beton-Überdachung & Pavillon — Unterstellplatz öffentlich" description="Überdachung, Pavillon und Unterstellplatz aus Beton: wetterfest, fundamentfrei und vandalismussicher. Stadtmöbel und Wetterschutz für öffentliche Parks, Sportanlagen und Freizeitbereiche." schema={productSchema}>

       {/* 1. HERO */}
       <div className="relative w-full h-[60vh] -mt-16 mb-24 overflow-hidden rounded-b-2xl border-b border-brand-dark/10 z-10">
            <div className="absolute inset-0">
                 <img src="/images/ueberdachung/ueberdachung-unterstellplatz-02.jpg"
                        alt="Hero Pavillon"
                        className="w-full h-full object-cover animate-kenburns-1"
                        loading="eager"
                        fetchPriority="high" />

                 {/* Gradient to transparent to show grid */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-dark/80 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-12 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-6 animate-fade-in-up">
                         <span className="px-3 py-1 border border-brand-orange text-brand-orange text-xs font-bold uppercase tracking-[0.2em] bg-black/40 backdrop-blur-sm">Urban Shelter</span>
                         <span className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider bg-black/40 backdrop-blur-sm px-2 py-1">
                            <span className="material-symbols-outlined text-base">umbrella</span> Wetterschutz
                         </span>
                    </div>
                    {/* INDUSTRIAL HEADER UPDATE */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-heading uppercase tracking-tighter text-white leading-[0.85] animate-fade-in-up [animation-delay:100ms]">
                        Beton<br/>
                        <span className="text-brand-orange">Pavillon</span>
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
                            Architektur
                        </span>
                        {/* INDUSTRIAL HEADER UPDATE */}
                        <h2 className="text-5xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none mb-8">
                            Schutz. <span className="text-brand-orange">Raum.</span> Ästhetik.
                        </h2>
                        <p className="text-xl text-brand-muted leading-relaxed mb-8">
                            Ein einziges Betonelement, vier Funktionen: Einzeln als Unterstellplatz, nebeneinander als Haltestellenüberdachung, gegenüber für überdachte Sitznischen, oder als Dreier-/Vierergruppe zum Pavillon.
                        </p>
                        <p className="text-lg text-brand-muted leading-relaxed mb-12">
                            Bei 240 cm Länge, 200 cm Tiefe und 262 cm Höhe deckt das C-Profil aus bewehrtem Beton C35/45 diverse Einsatzzwecke ab. Abstände zwischen Elementen können mit Edelstahlseilen oder Kletterpflanzen-Netzen begrünt werden. Inklusive Sitzfläche und Bodenplatte — keine Vorarbeiten nötig.
                        </p>
                        
                        <div className="flex flex-col gap-4">
                            <Link
                                to="/kontakt?projectType=Möblierung"
                                className="inline-flex justify-center items-center gap-2 bg-brand-orange text-white font-extrabold uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-brand-dark hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-xl group"
                            >
                                Beratung anfordern <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="lg:w-7/12 flex flex-col gap-8">
                    <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-sm overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                         <img src="/images/ueberdachung/pavillon-wetterschutz.jpg" alt="Pavillon Varianten" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">FIG 01. VARIANTEN & SYSTEM</div>
                    </div>
                    
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-8 my-8 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <h3 className="text-2xl font-bold font-heading text-brand-dark uppercase mb-4">Anwendungen</h3>
                        <ul className="grid grid-cols-2 gap-4 list-disc list-inside text-brand-muted">
                            <li>Haltestellen</li>
                            <li>Sitznischen</li>
                            <li>Pavillons</li>
                        </ul>
                        <p className="text-xs font-mono uppercase tracking-widest text-brand-muted mt-4 pt-3 border-t border-brand-dark/5">
                            Schotterbett-Aufbau · fundamentfrei · ohne TÜV-Zertifizierung für Pavillons
                        </p>
                    </div>

                    <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-sm overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                         <img src="/images/ueberdachung/ueberdachung-beton-01.jpg" alt="Beton-Pavillon Strukturdetail" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">FIG 02. SOLID CONSTRUCTION</div>
                    </div>
                </div>
            </div>

            <div className="mb-32 grid lg:grid-cols-2 gap-8">
                <div className="bg-brand-surface/60 border border-brand-dark/10 p-8 md:p-10 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">
                        Einsatzbereiche
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter mb-6">
                        Wetterschutz im <span className="text-brand-orange">öffentlichen Raum.</span>
                    </h2>
                    <p className="text-lg text-brand-muted leading-relaxed">
                        Typische Einsatzorte unserer Überdachung / Pavillon als Wetterschutz sind Haltestellen, Schulhöfe, Parks, Campingplätze, Sportanlagen, Friedhöfe, Rastplätze und allgemein der öffentliche Raum. Das Beton-Element mit 240 × 200 × 262 cm hat eine integrierte Sitzfläche für 4-5 Personen und schützt insgesamt ca. 10 Personen vor Regen und Sonne. Sie kann einzeln oder nebeneinander aufgestellt werden, so entsteht eine durchgehende Haltestellenüberdachung, gegenüber aufgestellt entsteht eine Sitznische mit Sichtschutz, als Dreier- oder Viererkombination entsteht ein vollwertiger Pavillon mit Sitzfläche für bis zu 16 Personen und Schutz für bis zu 40 Personen. Abstände zwischen den Elementen lassen sich mit Edelstahlseilen oder Netzen für Kletterpflanzen begrünen.
                    </p>
                </div>

                <div className="bg-brand-surface/60 border border-brand-dark/10 p-8 md:p-10 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">
                        Montage & Lebensdauer
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter mb-6">
                        Positionieren. <span className="text-brand-orange">Nutzen.</span> Versetzen.
                    </h2>
                    <div className="space-y-5 text-lg text-brand-muted leading-relaxed">
                        <p>
                            Ein Modul wird mit Autokran schnell an den Standort auf ein verdichtetes Kies- oder Schotterbett positioniert, ohne Fundamentarbeiten und ohne Pflasterarbeiten. Da keine Verschraubungen und keine beweglichen Teile verbaut sind, ist das modulare Fertigteil-Element wartungsarm und lässt sich einfach an einen anderen Standort verlegen oder zurückbauen und abtransportieren.
                        </p>
                        <p>
                            Im Vergleich zu Stahl- oder Holzvarianten altert bewehrter Beton langsamer und muss nicht ständig vor Rost oder Fäulnis geschützt werden. Beton ist nicht brennbar und benötigt über die gesamte Lebensdauer kaum Wartung. Außerdem lässt sich die fugenlose Oberfläche leicht reinigen. Argumente, die besonders im öffentlichen Raum, an Haltestellen und auf Schulhöfen zählen.
                        </p>
                    </div>
                </div>
            </div>

            {/* 3. EIGENSCHAFTEN (aus ueberdachung-pavillon.md) */}
            <div className="mb-32">
                <div className="mb-8">
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">Das Original</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter mb-4">
                        Überdachungselement <span className="text-brand-orange">Bogen.</span>
                    </h2>
                    <p className="text-lg text-brand-muted leading-relaxed max-w-3xl">
                        Das Überdachungselement von A+ Urban Design ist multifunktional: Einsetzbar als Überdachung für Haltestellen und Sitznischen sowie Pavillons. Das Modul wird inklusive Bodenplatte und Sitzbank mit Autokran versetzt — es sind keine Teile zusammenzubauen, und es sind keine Fundament- oder Pflasterarbeiten notwendig. Die Aufstellung erfolgt auf verdichtetem Kies- oder Schotterbett.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-6 rounded-xl">
                        <h3 className="text-base font-bold font-heading text-brand-dark uppercase mb-2">Multifunktional</h3>
                        <p className="text-sm text-brand-muted leading-relaxed">Einzeln als Unterstellplatz, nebeneinander als Haltestellenüberdachung, gegenüber als überdachte Sitznische, oder als Dreier-/Vierergruppe zum Pavillon konfigurierbar.</p>
                    </div>
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-6 rounded-xl">
                        <h3 className="text-base font-bold font-heading text-brand-dark uppercase mb-2">Fundamentfrei</h3>
                        <p className="text-sm text-brand-muted leading-relaxed">Aufstellen ohne Fundament auf verdichtetem Kies- oder Schotterbett. Geringe Vorarbeiten — keine Fundamentarbeiten oder Pflasterarbeiten notwendig.</p>
                    </div>
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-6 rounded-xl">
                        <h3 className="text-base font-bold font-heading text-brand-dark uppercase mb-2">Robust</h3>
                        <p className="text-sm text-brand-muted leading-relaxed">Kann nicht verbogen, angezündet oder zerschlagen werden. Aus bewehrtem Beton C 35/45 — witterungsbeständig und auch unter Dauernutzung im öffentlichen Raum stabil.</p>
                    </div>
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-6 rounded-xl">
                        <h3 className="text-base font-bold font-heading text-brand-dark uppercase mb-2">Wartungsarm</h3>
                        <p className="text-sm text-brand-muted leading-relaxed">Keine Verschraubungen, keine zerbrechlichen Teile. Der Boden ist einfach zu reinigen. Materialien recycelbar — das Modul lässt sich jederzeit versetzen oder zurückbauen.</p>
                    </div>
                </div>

                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                        Tech<span className="text-brand-orange">Specs</span>
                    </h2>
                    <span className="font-mono text-brand-muted text-xs hidden sm:block">DATENBLATT: PAVILLON</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <TechSpecCard title="Länge" value="240 cm" icon="straighten" />
                    <TechSpecCard title="Tiefe" value="200 cm" icon="square_foot" />
                    <TechSpecCard title="Höhe" value="246 + 16 cm" icon="vertical_align_top" />
                    <TechSpecCard title="Material" value="Bewehrter Beton C35/45" icon="architecture" />
                    <TechSpecCard title="Montage" value="Autokran, fundamentfrei" icon="layers" />
                    <TechSpecCard title="Konfiguration" value="Einzel / Gruppe / Arkade" icon="view_column" />
                    <TechSpecCard title="Sitzfläche" value="Integriert" icon="event_seat" />
                    <TechSpecCard title="Begrünung" value="Stahlseile / Netze" icon="eco" />
                    <TechSpecCard title="Aufbauen" value="Keine Teile zusammenbauen" icon="build" />
                    <TechSpecCard title="Witterung" value="Wetterbeständig" icon="thermostat" />
                    <TechSpecCard title="Recycelbar" value="Ja" icon="recycling" />
                    <TechSpecCard title="Einsatz" value="Haltestellen / Sitznischen / Pavillons" icon="public" />
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
