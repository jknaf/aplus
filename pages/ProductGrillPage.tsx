import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PRODUCTS } from '../constants';
import BrochureRequestForm from '../components/BrochureRequestForm';
import ReferencedProjects from '../components/ReferencedProjects';

const OtherProducts: React.FC = () => {
  const otherProducts = PRODUCTS.filter(p => p.id !== 'grillstelle' && p.id !== 'ueberdachung').slice(0, 3);
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

const ProductGrillPage: React.FC = () => {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Öffentliche Grillstelle aus Beton",
    "description": "Runder Beton-Grillplatz mit 4,20 m Durchmesser. Vandalismussicher, höhenverstellbarer Edelstahlrost, integrierte Bodenplatte. Fundamentfrei.",
    "brand": { "@type": "Brand", "name": "A+ Urban Design" },
    "manufacturer": { "@type": "Organization", "name": "A+ Urban Design", "url": "https://www.aplusurbandesign.com" },
    "category": "Stadtmöblierung",
    "material": "Beton, Edelstahl, verzinkter Stahl",
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
    <PageShell title="Öffentlicher Grillplatz aus Beton, vandalismussicher" description="Öffentlicher Grillplatz aus Beton: vandalismussicher, wartungsarm und langlebig. Für Parks, Campingplätze und kommunale Freiflächen. Mit diebstahlsicherem Edelstahlrost." schema={productSchema}>

       {/* 1. HERO */}
       <div className="relative w-full h-[60vh] -mt-16 mb-24 overflow-hidden z-10 rounded-b-2xl border-b border-brand-dark/10">
            <div className="absolute inset-0">
                 <img src="/images/grill/grillstelle-background.jpg"
                        alt="Runder Grillplatz aus Beton im Park"
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
                         <span className="px-3 py-1 border border-brand-orange text-brand-orange text-xs font-bold uppercase tracking-[0.2em] bg-black/40 backdrop-blur-sm">Öffentlicher Raum</span>
                         <span className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider bg-black/40 backdrop-blur-sm px-2 py-1">
                            <span className="material-symbols-outlined text-base">security</span> Vandalismussicher
                         </span>
                    </div>
                    {/* INDUSTRIAL HEADER UPDATE */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-heading uppercase tracking-tighter text-white leading-[0.85] animate-fade-in-up [animation-delay:100ms]">
                        Grill-<br/>
                        <span className="text-brand-orange">platz</span>
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
                            Treffpunkt
                        </span>
                        {/* INDUSTRIAL HEADER UPDATE */}
                        <h2 className="text-5xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none mb-8">
                            Feuer und <span className="text-brand-orange">Beton.</span>
                        </h2>
                        <p className="text-xl text-brand-muted leading-relaxed mb-8">
                            Der runde Grillplatz ist für Freibäder, Campingplätze, Sportanlagen und Kleingartenanlagen gedacht. Er hat 4,20 m Durchmesser, ist 2,70 m hoch und bietet 12–16 Personen Platz.
                        </p>
                        <p className="text-lg text-brand-muted leading-relaxed mb-12">
                            Der Edelstahlrost ist höhenverstellbar, leicht zu reinigen und über eine zentrale Öse gegen Schwenken und Diebstahl gesichert. Die 16 cm starke Bodenplatte gehört dazu. Pflasterarbeiten entfallen. Der Grillplatz steht ohne Fundament auf einem verdichteten Schotterbett.
                        </p>
                        
                        <div className="flex flex-col gap-4">
                            <Link
                                to="/kontakt?projectType=Möblierung"
                                className="inline-flex justify-center items-center gap-2 bg-brand-orange text-white font-extrabold uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-brand-dark hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-xl group"
                            >
                                Angebot anfordern <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                            <Link
                                to="/produkte/grillstelle-beton/montageanleitung"
                                className="inline-flex justify-center items-center gap-2 border border-brand-dark/15 bg-white/60 backdrop-blur-sm text-brand-dark font-extrabold uppercase tracking-widest py-4 px-8 rounded-lg hover:border-brand-orange hover:text-brand-orange transition-all duration-300 group"
                            >
                                <span className="material-symbols-outlined">menu_book</span>
                                Montageanleitung ansehen
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="lg:w-7/12 flex flex-col gap-8">
                    <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-sm overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                         <img src="/images/grill/grillstelle-background.jpg" alt="Grillplatz mit Sitzring im Grünen" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         {/* Roland: Bildunterschriften pro Bild noch mit tatsächlichem Motiv abgleichen */}
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">Abb. 1: Grillplatz mit Sitzring im Grünen</div>
                    </div>
                    
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-8 my-8 flex rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)] items-center justify-between backdrop-blur-sm">
                         <div>
                            <h3 className="text-2xl font-bold font-heading text-brand-dark uppercase">Abmessungen</h3>
                            <p className="text-brand-muted mt-2">Zwei halbrunde Teile mit je rund 3,3 t und ein Mittelteil mit rund 1,0 t.</p>
                         </div>
                         <div className="text-right">
                             <div className="text-4xl font-mono text-brand-orange font-bold">4,20 m</div>
                             <div className="text-xs uppercase tracking-widest text-brand-muted">Durchmesser</div>
                         </div>
                    </div>

                    <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-sm overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                         <img src="/images/grill/grill-platz-01.jpg" alt="Grillplatz unter Bäumen" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">Abb. 2: Grillplatz unter Bäumen</div>
                    </div>
                </div>
            </div>

            {/* 3. KONSTRUKTION & EIGENSCHAFTEN (aus grill-grillplatz.md) */}
            <div className="mb-32">
                <div className="mb-8">
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">Konstruktion & Eigenschaften</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter mb-4">
                        Aufbau und <span className="text-brand-orange">Material.</span>
                    </h2>
                    <p className="text-lg text-brand-muted leading-relaxed max-w-3xl">
                        Der Grillplatz besteht aus drei Betonfertigteilen. Der Grillrost ist aus Edelstahl, die Stütze aus verzinktem Stahl. Der Rost hängt an einer Kette mit Gegengewicht. Gesetzt werden die Teile mit Autokran, Radlader oder Gabelstapler mit mindestens 3,5 t Hublast. Die Konstruktion ist einfach zu bedienen und hat wenige Verschleißteile.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-6 rounded-xl">
                        <h3 className="text-base font-bold font-heading text-brand-dark uppercase mb-2">Materialien</h3>
                        <p className="text-sm text-brand-muted leading-relaxed">Beton, Edelstahl und verzinkter Stahl sind durchweg witterungsbeständig und recycelbar. Der Edelstahlrost ist für Dauernutzung ausgelegt.</p>
                    </div>
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-6 rounded-xl">
                        <h3 className="text-base font-bold font-heading text-brand-dark uppercase mb-2">Ohne Fundamente</h3>
                        <p className="text-sm text-brand-muted leading-relaxed">Als Unterbau genügt ein verdichtetes Kies- oder Schotterbett (Körnung 5/30 mm). Fundamente entfallen, und die Bauzeit ist kurz.</p>
                    </div>
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-6 rounded-xl">
                        <h3 className="text-base font-bold font-heading text-brand-dark uppercase mb-2">Vandalismussicher</h3>
                        <p className="text-sm text-brand-muted leading-relaxed">Der Grillplatz ist massiv gebaut und für den unbeaufsichtigten Betrieb im öffentlichen Raum ausgelegt.</p>
                    </div>
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-6 rounded-xl">
                        <h3 className="text-base font-bold font-heading text-brand-dark uppercase mb-2">Höhenverstellbar</h3>
                        <p className="text-sm text-brand-muted leading-relaxed">Die Grillfläche lässt sich einfach in der Höhe einstellen. Der Windschutzring schützt die Glut vor Wind. Zweimal im Jahr wird die Rolle geölt.</p>
                    </div>
                </div>

                {/* Für Betreiber: Belege Montageanleitung Grillplatz, Grillregeln Städte (z. B. Stuttgart) */}
                <div className="mb-12">
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">Für Kommunen und Vereine</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter mb-4">
                        Ein fester Ort <span className="text-brand-orange">fürs Feuer.</span>
                    </h2>
                    <p className="text-lg text-brand-muted leading-relaxed max-w-3xl mb-6">
                        Viele Städte erlauben das Grillen in Parks nur an fest eingerichteten Feuerstellen. Mitgebrachte Grills und Einweggrills sind dort aus Brandschutzgründen oft verboten. Ein fester Grillplatz gibt Badegästen, Campern und Vereinsmitgliedern einen erlaubten Ort zum Grillen. Gegrillt wird über Beton, nicht über der Wiese.
                    </p>
                    <p className="text-lg text-brand-muted leading-relaxed max-w-3xl">
                        Die Bodenplatte liegt wahlweise bündig mit dem Gelände oder darüber. Der Träger sitzt fest in der Bodenplatte und ist gegen Diebstahl gesichert.
                    </p>
                </div>

                 <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                        Technische <span className="text-brand-orange">Daten</span>
                    </h2>
                    <span className="font-mono text-brand-muted text-xs hidden sm:block">DATENBLATT: GRILLSTELLE</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <TechSpecCard title="Durchmesser" value="4,20 Meter" icon="straighten" />
                    <TechSpecCard title="Höhe" value="2,70 Meter" icon="vertical_align_top" />
                    <TechSpecCard title="Rost" value="Edelstahl" icon="grid_on" />
                    <TechSpecCard title="Bodenplatte" value="16 cm" icon="foundation" />
                    <TechSpecCard title="Diebstahlschutz" value="Zentrale Öse" icon="lock" />
                    <TechSpecCard title="Montage" value="Schotterbett 5/30 mm" icon="layers" />
                    <TechSpecCard title="Grillhöhe" value="Verstellbar" icon="tune" />
                    <TechSpecCard title="Einsatz" value="Öffentlicher Raum" icon="public" />
                    <TechSpecCard title="Stütze" value="Verzinkter Stahl" icon="construction" />
                    <TechSpecCard title="Witterung" value="Witterungsbeständig" icon="thermostat" />
                    <TechSpecCard title="Recycelbar" value="Ja" icon="recycling" />
                    <TechSpecCard title="Bauweise" value="Betonfertigteile" icon="view_in_ar" />
                </div>

                {/* Montageanleitung: CTA */}
                <div className="mt-16 rounded-2xl border border-brand-dark/10 bg-brand-surface/50 p-8 lg:p-10 backdrop-blur-sm">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div>
                            <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-4 uppercase tracking-widest bg-brand-orange/5 rounded-md">
                                Dokumentation
                            </span>
                            <h3 className="font-heading text-2xl lg:text-3xl font-extrabold uppercase tracking-tighter text-brand-dark">
                                Montageanleitung <span className="text-brand-orange">Grillplatz.</span>
                            </h3>
                            <p className="mt-3 text-brand-muted max-w-xl leading-relaxed">
                                Die vollständige Aufbauanleitung erklärt Unterbau, Abladen, Setzreihenfolge, das Ausrichten des Trägers mit dem Schnurlot,
                                Kette und Gegengewicht. Dazu kommen Werkzeugliste und Wartungsplan. Sie können die Anleitung online lesen oder als PDF herunterladen.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                            <Link
                                to="/produkte/grillstelle-beton/montageanleitung"
                                className="inline-flex justify-center items-center gap-2 bg-brand-dark text-white font-extrabold uppercase tracking-widest py-3 px-6 rounded-lg hover:bg-brand-orange transition-colors duration-300 group text-sm"
                            >
                                <span className="material-symbols-outlined">menu_book</span>
                                Online ansehen
                            </Link>
                            <a
                                href="/downloads/montage-grillplatz.pdf"
                                download
                                className="inline-flex justify-center items-center gap-2 border border-brand-dark/20 bg-white/60 text-brand-dark font-extrabold uppercase tracking-widest py-3 px-6 rounded-lg hover:border-brand-orange hover:text-brand-orange transition-colors duration-300 text-sm"
                            >
                                <span className="material-symbols-outlined">download</span>
                                PDF (625 KB)
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