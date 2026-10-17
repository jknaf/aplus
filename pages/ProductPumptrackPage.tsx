import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PRODUCTS } from '../constants';
import BrochureRequestForm from '../components/BrochureRequestForm';
import ReferencedProjects from '../components/ReferencedProjects';

const OtherProducts: React.FC = () => {
  const otherProducts = PRODUCTS.filter(p => p.id !== 'pumptrack' && p.id !== 'skate-anlagen').slice(0, 3);
  return (
    <div className="mt-32 border-t border-brand-dark/10 pt-24">
      <h2 className="text-4xl font-extrabold font-heading text-center mb-16 uppercase tracking-widest text-brand-dark">
        Weitere <span className="text-brand-orange">Lösungen.</span>
      </h2>
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

const TechSpecCard: React.FC<{ title: string; value: string; icon: string; href?: string; linkLabel?: string }> = ({ title, value, icon, href, linkLabel }) => {
    const content = (
        <>
            <span className="material-symbols-outlined text-brand-orange text-3xl mb-4">{icon}</span>
            <h4 className="text-brand-muted font-mono text-xs uppercase tracking-widest mb-2">{title}</h4>
            <p className="text-brand-dark font-bold text-lg leading-tight">{value}</p>
            {href && (
                <span className="mt-3 inline-flex items-center gap-1 text-brand-orange font-mono text-xs uppercase tracking-wider">
                    {linkLabel ?? 'Zertifikat ansehen'}
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                </span>
            )}
        </>
    );
    const baseClass = "bg-brand-surface/40 border border-brand-dark/5 p-6 rounded-xl shadow-sm hover:border-brand-orange/50 transition-colors duration-300";
    if (href) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title}: ${value}, ${linkLabel ?? 'Zertifikat in der TÜV-SÜD-Datenbank ansehen'}`}
                className={`${baseClass} block group hover:shadow-md`}
            >
                {content}
            </a>
        );
    }
    return <div className={baseClass}>{content}</div>;
};

const ProductPumptrackPage: React.FC = () => {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Pumptrack aus Beton",
    "description": "Modularer Pumptrack aus Beton-Fertigteilen. TÜV-zertifiziert, formstabil, wartungsarm. Für Bikes, Skateboards und Scooter.",
    "brand": { "@type": "Brand", "name": "A+ Urban Design" },
    "manufacturer": { "@type": "Organization", "name": "A+ Urban Design", "url": "https://www.aplusurbandesign.com" },
    "category": "Sportanlagen",
    "material": "Beton",
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
    <PageShell title="Pumptrack-Hersteller: Beton-Pumptrack planen & bauen" description="Pumptrack-Hersteller A+ Urban Design: Pumptracks aus Beton: TÜV-zertifiziert, formstabil und wartungsarm. Modular, sofort befahrbar, in ganz Europa gebaut." schema={productSchema}>
       
       {/* 1. IMMERSIVE HERO */}
       <div className="relative w-full h-[60vh] -mt-16 mb-24 overflow-hidden z-10 rounded-b-2xl border-b border-brand-dark/10">
            <div className="absolute inset-0">
                 {/* OPTIMIZED HERO IMAGE for Mobile Speed */}
                 <img src="/images/pumptrack/pumptrack-beton-elemente-01.jpg"
                        alt="Pumptrack aus Betonelementen"
                        className="w-full h-full object-cover animate-kenburns-2"
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
                         <span className="px-3 py-1 border border-brand-orange text-brand-orange text-xs font-bold uppercase tracking-[0.2em] bg-black/40 backdrop-blur-sm">Für Bike, Skate, Scooter</span>
                         <span className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider bg-black/40 backdrop-blur-sm px-2 py-1">
                            <span className="material-symbols-outlined text-base">verified_user</span> DIN EN 14974
                         </span>
                    </div>
                    {/* INDUSTRIAL HEADER UPDATE */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-heading uppercase tracking-tighter text-white leading-[0.85] animate-fade-in-up [animation-delay:100ms]">
                        Beton<br/>
                        <span className="text-brand-orange">Pumptracks</span>
                    </h1>
                </div>
            </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            
            {/* 2. SPLIT LAYOUT */}
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 mb-32">
                
                {/* Sticky Narrative */}
                <div className="lg:w-5/12">
                    <div className="lg:sticky lg:top-32">
                        {/* INDUSTRIAL HEADER UPDATE */}
                        <h2 className="text-3xl md:text-5xl font-bold font-heading text-brand-dark mb-8 uppercase tracking-tighter">
                            Fahren ohne <span className="text-brand-orange">Treten.</span>
                        </h2>
                        <p className="text-xl text-brand-muted leading-relaxed mb-8">
                            Ein Pumptrack ist ein Rundkurs aus Wellen und Steilkurven, nutzbar für alle Altersgruppen. Die ca. 1,25 m breite Fahrbahn wird ohne Treten, allein durch Gewichtsverlagerung („Pumpen“) befahren.
                        </p>
                        <p className="text-lg text-brand-muted leading-relaxed mb-6">
                            Im Gegensatz zu Asphaltpisten behalten unsere Betonelemente dauerhaft ihre Form. Für den Aufbau gibt es drei Varianten. Die Elemente können auch angeböscht werden.
                        </p>
                        <div className="bg-brand-orange/10 border border-brand-orange/30 rounded-xl p-5 mb-12">
                            <p className="text-brand-dark font-bold uppercase text-sm tracking-widest mb-2">Lieferung & Montage aus einer Hand</p>
                            <p className="text-sm text-brand-muted leading-relaxed">
                                A+ Urban Design plant, fertigt, liefert und baut auf. Kommunen können Fördermittel aus der Sportstättenförderung nutzen.
                            </p>
                        </div>
                        
                        <div className="flex flex-col gap-4">
                            <Link
                                to="/kontakt?projectType=Pumptrack"
                                className="inline-flex justify-center items-center gap-2 bg-brand-orange text-white font-extrabold uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-brand-dark hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-xl group"
                            >
                                Strecke planen <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Scrolling Gallery */}
                <div className="lg:w-7/12 flex flex-col gap-8">
                    <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-sm overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                         <img src="/images/pumptrack/pumptrack-beton-module-03.jpg" alt="Pumptrack in einem Park mit Fahrern" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">Abb. 1: Pumptrack in einem Park, mit Fahrern</div>
                    </div>
                    
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-8 my-8 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <p className="text-xs font-mono uppercase tracking-widest text-brand-orange">
                            TÜV-zertifiziert mit GS-Zeichen
                        </p>
                    </div>

                    <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-sm overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                         <img src="/images/pumptrack/pumptrack-beton-elemente-01.jpg" alt="Startbereich und Strecke aus Betonelementen" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">Abb. 2: Startbereich und Strecke aus Betonelementen</div>
                    </div>
                </div>
            </div>

            {/* 2b. ELEMENT GALLERY */}
            <div className="mb-32">
                <div className="mb-10">
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">Modulsystem</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter">
                        Bauteile & <span className="text-brand-orange">Elemente.</span>
                    </h2>
                    <p className="text-lg text-brand-muted mt-4 max-w-3xl">
                        Jede Kurve, jede Welle und jeder Roller ist ein im Werk gefertigtes Betonteil mit fester Geometrie. Die Module lassen sich frei zu eigenen Streckenverläufen kombinieren.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-xl overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <img src="/images/pumptrack/pumptrack-beton-elemente-02.jpg" alt="Pumptrack Betonelemente Detail" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">Abb. 3: Wellen und Steilkurven auf einer Rasenfläche</div>
                    </div>
                    <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-xl overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <img src="/images/pumptrack/pumptrack-beton-module-04.jpg" alt="3D-Visualisierung eines geplanten Pumptracks" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">Abb. 4: 3D-Visualisierung eines geplanten Pumptracks</div>
                    </div>
                </div>
                <div className="mt-6 bg-brand-surface/60 border border-brand-orange/20 rounded-xl p-6 text-sm text-brand-muted">
                    Der Pumptrack lässt sich auf <strong className="text-brand-dark">drei Arten</strong> aufbauen: auf einer vorhandenen befahrbaren Fläche, auf der die Trasse markiert wird, auf einer neu angelegten Trasse aus Beton oder Asphalt oder auf Fundamentplatten, an die die Trasse anbetoniert oder anasphaltiert wird. Die Elemente können auch angeböscht werden.
                </div>
            </div>

            {/* 3. TECHNICAL SPECS */}
            <div className="mb-32">
                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    {/* INDUSTRIAL HEADER UPDATE */}
                    <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                        Technische <span className="text-brand-orange">Daten</span>
                    </h2>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <TechSpecCard title="Fahrbreite" value="~1,25 Meter" icon="straighten" />
                    <TechSpecCard title="Zielgruppe" value="Bike, Skate, Scooter, Inline" icon="groups" />
                    <TechSpecCard title="Oberfläche" value="Spezialbeton" icon="texture" />
                    <TechSpecCard title="Aufbau" value="3 Varianten" icon="view_module" />
                    <TechSpecCard title="Witterung" value="Ganzjährig" icon="wb_sunny" />
                    <TechSpecCard title="Erweiterbar" value="Symmetrisch / Parallel" icon="add_circle" />
                    <TechSpecCard
                        title="Zertifikat"
                        value="TÜV / GS"
                        icon="verified"
                        href="https://www.tuvsud.com/de-de/dienstleistungen/produktpruefung-und-produktzertifizierung/zertifikatsdatenbank/?q=Z1A+056616+0012+Rev.+00"
                        linkLabel="Zertifikat TÜV SÜD"
                    />
                    <TechSpecCard title="Montage" value="Durch A+ Urban Design" icon="construction" />
                </div>
            </div>

            <BrochureRequestForm context="productpage" />
            <ReferencedProjects productPath="/produkte/pumptrack-beton" />
            <OtherProducts />

       </div>
    </PageShell>
  );
};

export default ProductPumptrackPage;