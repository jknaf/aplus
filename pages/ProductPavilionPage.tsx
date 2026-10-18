import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PRODUCTS } from '../constants';
import BrochureRequestForm from '../components/BrochureRequestForm';
import ReferencedProjects from '../components/ReferencedProjects';
import Bild from '../components/Bild';

const OtherProducts: React.FC = () => {
  const otherProducts = PRODUCTS.filter(p => p.id !== 'ueberdachung' && p.id !== 'grillstelle').slice(0, 3);
  return (
    <div className="mt-32 border-t border-brand-dark/10 pt-24">
      <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/10 backdrop-blur-sm rounded-md">
              Portfolio
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-[0.9]">
              Weitere <span className="text-brand-orange">Lösungen</span>
          </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherProducts.map(product => (
          <Link key={product.id} to={product.path} className="group relative block overflow-hidden rounded-sm aspect-[4/5] bg-brand-surface/60 border border-brand-dark/5 backdrop-blur-sm">
            <Bild hoch sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" loading="lazy" decoding="async" src={product.imageUrl} alt={product.altText} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"/>
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
    "description": "C-Profil-Überdachung aus bewehrtem Beton C35/45. 240 × 200 × 262 cm. Einzeln oder als Pavillon-Gruppe. Fundamentfrei, mit integrierter Sitzfläche.",
    "brand": { "@type": "Brand", "name": "A+ Urban Design" },
    "manufacturer": { "@type": "Organization", "name": "A+ Urban Design", "url": "https://www.aplusurbandesign.com" },
    "category": "Stadtmöblierung",
    "material": "Bewehrter Beton C35/45",
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
    <PageShell title="Überdachung und Pavillon aus Beton" description="Überdachung, Pavillon und Unterstellplatz aus Beton: wetterfest, fundamentfrei und vandalismussicher. Stadtmöbel und Wetterschutz für öffentliche Parks, Sportanlagen und Freizeitbereiche." schema={productSchema}>

       {/* 1. HERO */}
       <div className="relative w-full h-[60vh] -mt-16 mb-24 overflow-hidden rounded-b-2xl border-b border-brand-dark/10 z-10">
            <div className="absolute inset-0">
                 <Bild hoch src="/images/ueberdachung/ueberdachung-unterstellplatz-02.jpg"
                        alt="Überdachung aus Beton als Unterstellplatz"
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
                         <span className="px-3 py-1 border border-brand-orange text-brand-orange text-xs font-bold uppercase tracking-[0.2em] bg-black/40 backdrop-blur-sm">Öffentlicher Raum</span>
                         <span className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider bg-black/40 backdrop-blur-sm px-2 py-1">
                            <span className="material-symbols-outlined text-base">umbrella</span> Wetterschutz
                         </span>
                    </div>
                    {/* INDUSTRIAL HEADER UPDATE */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-heading uppercase tracking-tighter text-white leading-[0.85] animate-fade-in-up [animation-delay:100ms]">
                        Beton-<br/>
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
                            Einsatzarten
                        </span>
                        {/* INDUSTRIAL HEADER UPDATE */}
                        <h2 className="text-5xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none mb-8">
                            Ein Element, <span className="text-brand-orange">vier Einsätze</span>
                        </h2>
                        <p className="text-xl text-brand-muted leading-relaxed mb-8">
                            Ein einziges Betonelement lässt sich auf vier Arten einsetzen: einzeln als Unterstellplatz, in einer Reihe als Haltestellenüberdachung, paarweise gegenüber als überdachte Sitznische oder zu dritt oder viert als Pavillon.
                        </p>
                        <p className="text-lg text-brand-muted leading-relaxed mb-12">
                            Das C-Profil aus bewehrtem Beton C35/45 ist 240 cm lang, 200 cm tief und 262 cm hoch. Die Zwischenräume lassen sich mit Edelstahlseilen oder Rankgittern begrünen. Sitzfläche und Bodenplatte sind Teil des Elements. Nötig ist nur ein verdichtetes Schotterbett.
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
                         <Bild sizes="(min-width: 1024px) 60vw, 100vw" src="/images/ueberdachung/pavillon-wetterschutz.jpg" alt="Zeichnung: Anordnungsvarianten der Überdachung mit Bepflanzung" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">Abb. 1: Anordnungsvarianten mit Bepflanzung (Zeichnung)</div>
                    </div>
                    
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-8 my-8 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <h3 className="text-2xl font-bold font-heading text-brand-dark uppercase mb-4">Anwendungen</h3>
                        <ul className="grid grid-cols-2 gap-4 list-disc list-inside text-brand-muted">
                            <li>Haltestellen</li>
                            <li>Sitznischen</li>
                            <li>Pavillons</li>
                        </ul>
                        <p className="text-xs font-mono uppercase tracking-widest text-brand-muted mt-4 pt-3 border-t border-brand-dark/5">
                            Auf Schotterbett · fundamentfrei
                        </p>
                    </div>

                    <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-sm overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                         <Bild sizes="(min-width: 1024px) 60vw, 100vw" src="/images/ueberdachung/ueberdachung-beton-01.jpg" alt="Überdachung aus Beton mit Sitzbänken" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">Abb. 2: Überdachung aus Beton mit Sitzbänken</div>
                    </div>
                </div>
            </div>

            <div className="mb-32 grid lg:grid-cols-2 gap-8">
                <div className="bg-brand-surface/60 border border-brand-dark/10 p-8 md:p-10 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">
                        Einsatzbereiche
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter mb-6">
                        Wetterschutz im <span className="text-brand-orange">öffentlichen Raum</span>
                    </h2>
                    <p className="text-lg text-brand-muted leading-relaxed">
                        Typische Einsatzorte sind Haltestellen, Schulhöfe, Parks, Campingplätze, Sportanlagen, Friedhöfe und Rastplätze. Das Betonelement mit 240 × 200 × 262 cm hat eine Sitzfläche für 4–5 Personen und schützt insgesamt ca. 10 Personen vor Regen und Sonne. Das Element kann einzeln stehen. Nebeneinander ergibt sich eine durchgehende Haltestellenüberdachung, gegenüber eine Sitznische mit Sichtschutz. Drei oder vier Elemente bilden einen Pavillon mit Sitzfläche für bis zu 16 Personen und Schutz für bis zu 40 Personen.
                    </p>
                </div>

                <div className="bg-brand-surface/60 border border-brand-dark/10 p-8 md:p-10 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">
                        Montage
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter mb-6">
                        Aufstellen und <span className="text-brand-orange">versetzen</span>
                    </h2>
                    <div className="space-y-5 text-lg text-brand-muted leading-relaxed">
                        <p>
                            Das Element wird mit dem Autokran auf ein verdichtetes Kies- oder Schotterbett gesetzt, ohne Fundament- und Pflasterarbeiten. Es hat keine Verschraubungen und keine beweglichen Teile. Deshalb ist es wartungsarm und lässt sich einfach versetzen oder abbauen.
                        </p>
                        <p>
                            Im Vergleich zu Stahl- oder Holzvarianten altert bewehrter Beton langsamer und muss nicht ständig vor Rost oder Fäulnis geschützt werden. Beton ist nicht brennbar und benötigt über die gesamte Lebensdauer kaum Wartung. Außerdem lässt sich die fugenlose Oberfläche leicht reinigen. Das zählt besonders an Haltestellen und auf Schulhöfen.
                        </p>
                    </div>
                </div>
            </div>

            {/* 3. EIGENSCHAFTEN (aus ueberdachung-pavillon.md) */}
            <div className="mb-32">
                <div className="mb-8">
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">Das Original</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter mb-4">
                        Das <span className="text-brand-orange">Überdachungselement</span>
                    </h2>
                    <p className="text-lg text-brand-muted leading-relaxed max-w-3xl">
                        Unser Überdachungselement ist ein einziges Fertigteil aus bewehrtem Beton. Bodenplatte und Sitzbank sind angeformt. Der Autokran setzt das Element in einem Stück, es wiegt rund 6,3 t. Zusammenbauen muss man nichts.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-6 rounded-xl">
                        <h3 className="text-base font-bold font-heading text-brand-dark uppercase mb-2">Multifunktional</h3>
                        <p className="text-sm text-brand-muted leading-relaxed">Mehrere Elemente lassen sich frei anordnen und später neu gruppieren. Abgebaut werden muss dafür nichts.</p>
                    </div>
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-6 rounded-xl">
                        <h3 className="text-base font-bold font-heading text-brand-dark uppercase mb-2">Fundamentfrei</h3>
                        <p className="text-sm text-brand-muted leading-relaxed">Kein Fundament und kein Pflaster: Die Vorarbeiten vor Ort sind gering.</p>
                    </div>
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-6 rounded-xl">
                        <h3 className="text-base font-bold font-heading text-brand-dark uppercase mb-2">Robust</h3>
                        <p className="text-sm text-brand-muted leading-relaxed">Bewehrter Beton C35/45 brennt nicht, verbiegt nicht und ist kaum zu beschädigen. Er ist witterungsbeständig und auch unter Dauernutzung im öffentlichen Raum stabil.</p>
                    </div>
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-6 rounded-xl">
                        <h3 className="text-base font-bold font-heading text-brand-dark uppercase mb-2">Wartungsarm</h3>
                        <p className="text-sm text-brand-muted leading-relaxed">Das Element hat keine Schrauben und keine empfindlichen Teile. Der Boden ist leicht zu reinigen. Die Materialien sind recycelbar.</p>
                    </div>
                </div>

                {/* Für Kommunen: Belege Pressemitteilung Stadt Wedel 01.06.2023, Archivtext ueberdachung-pavillon */}
                <div className="mb-12">
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">Für Kommunen und Vereine</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter mb-4">
                        Keine Scheibe, <span className="text-brand-orange">die zerbricht</span>
                    </h2>
                    <p className="text-lg text-brand-muted leading-relaxed max-w-3xl mb-8">
                        Wartehallen aus Glas sind ein häufiges Ziel von Vandalismus. In einer deutschen Stadt mussten nach einer Vandalismuswelle 29 zerschlagene Glasscheiben an 18 Buswartehäuschen ersetzt werden. Die Kosten lagen bei etwa 20.000 Euro. Unser Überdachungselement hat keine Scheiben, die man zerschlagen oder ersetzen müsste.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-brand-surface/60 border border-brand-dark/10 p-6 rounded-xl">
                            <h3 className="text-base font-bold font-heading text-brand-dark uppercase mb-2">Picknickplatz</h3>
                            <p className="text-sm text-brand-muted leading-relaxed">Auf Rastplätzen, Campingplätzen oder dem Vereinsgelände wird das Element zum überdachten Picknickplatz für 8 Personen.</p>
                        </div>
                        <div className="bg-brand-surface/60 border border-brand-dark/10 p-6 rounded-xl">
                            <h3 className="text-base font-bold font-heading text-brand-dark uppercase mb-2">Sportanlagen</h3>
                            <p className="text-sm text-brand-muted leading-relaxed">Am Spielfeldrand schützt das Element Zuschauer und Wartende vor Regen und Sonne.</p>
                        </div>
                    </div>
                </div>

                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                        Technische <span className="text-brand-orange">Daten</span>
                    </h2>
                    <span className="font-mono text-brand-muted text-xs hidden sm:block">DATENBLATT: PAVILLON</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <TechSpecCard title="Länge" value="240 cm" icon="straighten" />
                    <TechSpecCard title="Tiefe" value="200 cm" icon="square_foot" />
                    <TechSpecCard title="Höhe" value="246 + 16 cm" icon="vertical_align_top" />
                    <TechSpecCard title="Material" value="Bewehrter Beton C35/45" icon="architecture" />
                    <TechSpecCard title="Montage" value="Autokran, fundamentfrei" icon="layers" />
                    <TechSpecCard title="Konfiguration" value="Einzeln, Reihe, Gruppe" icon="view_column" />
                    <TechSpecCard title="Sitzfläche" value="Integriert" icon="event_seat" />
                    <TechSpecCard title="Begrünung" value="Edelstahlseile, Rankgitter" icon="eco" />
                    <TechSpecCard title="Aufbau" value="Ein Stück, kein Zusammenbau" icon="build" />
                    <TechSpecCard title="Witterung" value="Witterungsbeständig" icon="thermostat" />
                    <TechSpecCard title="Recycelbar" value="Ja" icon="recycling" />
                    <TechSpecCard title="Einsatz" value="Haltestelle, Sitznische, Pavillon" icon="public" />
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
