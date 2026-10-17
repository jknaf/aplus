import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PRODUCTS } from '../constants';
import BrochureRequestForm from '../components/BrochureRequestForm';
import ReferencedProjects from '../components/ReferencedProjects';

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
    "name": "Umkleidekabine „Schnecke“",
    "description": "Vandalismussichere Umkleidekabine aus Beton und Edelstahl. Zweiteilig, ohne Tür, fundamentfrei. Für Freibäder und Sportanlagen.",
    "brand": { "@type": "Brand", "name": "A+ Urban Design" },
    "manufacturer": { "@type": "Organization", "name": "A+ Urban Design", "url": "https://www.aplusurbandesign.com" },
    "category": "Stadtmöblierung",
    "material": "Beton, Edelstahl",
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
    <PageShell title="Umkleidekabine aus Beton für Freibad und Sportplatz" description="Vandalismussichere Outdoor-Umkleidekabine aus Beton: türlos, zweiteilig und fundamentfrei. Für Freibäder, Badeseen, Sportplätze und Parks. Ohne Tür, leicht zu reinigen und wartungsarm." schema={productSchema}>

       {/* 1. HERO */}
       <div className="relative w-full h-[60vh] -mt-16 mb-24 overflow-hidden rounded-b-2xl border-b border-brand-dark/10 z-10">
            <div className="absolute inset-0">
                 <img src="/images/umkleide/umkleidekabine-schnecke-04.jpg"
                        alt="Umkleidekabine Schnecke aus Beton im Freien"
                        className="w-full h-full object-cover animate-kenburns-3"
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
                         <span className="px-3 py-1 border border-brand-orange text-brand-orange text-xs font-bold uppercase tracking-[0.2em] bg-black/40 backdrop-blur-sm">Freibad und Sport</span>
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
                            Prinzip
                        </span>
                         {/* INDUSTRIAL HEADER UPDATE */}
                        <h2 className="text-5xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none mb-8">
                            Privatsphäre <span className="text-brand-orange">ohne Türen.</span>
                        </h2>
                        <p className="text-xl text-brand-muted leading-relaxed mb-6">
                            In Freibädern und an Badeseen sind Türen oft das erste Opfer von Vandalismus. Unsere Lösung ist die Schnecke. Beim Betreten und Verlassen berührt man nichts. Oben und unten bleibt die Kabine offen und sie ist nicht abschließbar. Beides erschwert Missbrauch. Die fugenlose Oberfläche ist leicht zu reinigen.
                        </p>
                        <p className="text-lg text-brand-muted leading-relaxed mb-12">
                            Die Kabine ist schnell aufgestellt und lässt sich später versetzen. Die Bodenplatte ist fugenlos und liegt direkt auf einem verdichteten Schotterbett. Die Kabine besteht aus bewehrtem Beton und steht auf drei Edelstahlfüßen. Sie ist witterungsbeständig und vandalismussicher.
                        </p>
                        
                        <div className="flex flex-col gap-4">
                            <Link
                                to="/kontakt?projectType=Möblierung"
                                className="inline-flex justify-center items-center gap-2 bg-brand-orange text-white font-extrabold uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-brand-dark hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-xl group"
                            >
                                Angebot anfordern <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="lg:w-7/12 flex flex-col gap-8">
                    <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-sm overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                         <img src="/images/umkleide/umkleide-kabine-01.jpg" alt="Umkleidekabine auf Edelstahlfüßen, Eingang ohne Tür" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">Abb. 1: Kabine auf Edelstahlfüßen, Eingang ohne Tür</div>
                    </div>
                    
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-8 my-8 relative rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <h3 className="text-2xl font-bold font-heading text-brand-dark uppercase mb-4">Wartungsarm</h3>
                        <p className="text-brand-muted">
                            Es gibt keine Scharniere, keine Schlösser und kein Holz. Die Kabine bleibt im Winter stehen und verrottet nicht.
                        </p>
                    </div>

                    <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-sm overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                         <img src="/images/umkleide/umkleide-kabine-02.jpg" alt="Schnecke neben einem Spielplatz" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">Abb. 2: Aufstellung neben einem Spielplatz</div>
                    </div>

                    <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-sm overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                         <img src="/images/umkleide/umkleidekabine-freibad-03.jpg" alt="Schnecken-Kabine im Freibad" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">Abb. 3: Aufstellung im Freibad</div>
                    </div>
                </div>
            </div>

            <div className="mb-32 grid lg:grid-cols-2 gap-8">
                <div className="bg-brand-surface/60 border border-brand-dark/10 p-8 md:p-10 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">
                        Schnecken-Prinzip
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter mb-6">
                        Form statt <span className="text-brand-orange">Mechanik.</span>
                    </h2>
                    <div className="space-y-5 text-lg text-brand-muted leading-relaxed">
                        <p>
                            Herkömmliche Umkleidekabinen halten im öffentlichen Raum oft nicht lange: Verriegelungen brechen, Scharniere korrodieren, Holz verrottet. Die Schnecke hat nichts davon. Sie schützt durch ihre Form statt durch Mechanik und besteht aus Beton und Edelstahl. Die spiralförmige Wand führt in einen geschützten Innenraum, ganz ohne bewegliche Teile. Unten bleibt ein Abstand von 30 cm zur Bodenplatte, oben ist die Kabine offen. Das sorgt für Luft.
                        </p>
                        <p>
                            Eine Kabine bietet Platz für eine Person mit Kleidung und Tasche. Die Spiralform schützt vor Blicken. Von außen sieht man aber, ob die Kabine belegt ist. Die Kabine besteht aus zwei Teilen ohne Verschraubung und steht ohne Fundament auf verdichtetem Schotterbett. Bei Bedarf wird sie mit Autokran, Radlader oder Gabelstapler an einen anderen Ort versetzt.
                        </p>
                    </div>
                </div>

                <div className="bg-brand-surface/60 border border-brand-dark/10 p-8 md:p-10 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">
                        Einsatz
                    </span>
                    <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter mb-6">
                        Umkleide <span className="text-brand-orange">oder Dusche.</span>
                    </h2>
                    <p className="text-lg text-brand-muted leading-relaxed">
                        Die Schnecke ist für Freibäder, Badeseen, Strandbäder, Campingplätze und Sportanlagen gedacht. Sie steht frei als Außenkabine und ist wahlweise auch als Duschkabine erhältlich. Die fugenlose Innenfläche ist in wenigen Minuten gereinigt. Es gibt keine Fugen, in denen sich Schmutz oder Schimmel festsetzt. Im Winter bleibt die Kabine stehen. Wind, Frost und UV-Strahlung schaden ihr nicht. Die Schnecke muss nicht ständig beaufsichtigt werden: Sie ist vandalismussicher und brennt nicht.
                    </p>
                </div>
            </div>

            {/* 2b. PANORAMA */}
            <div className="mb-32">
                <div className="mb-8">
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">Einsatzbereich</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter">
                        Freibad und <span className="text-brand-orange">Badesee.</span>
                    </h2>
                    <p className="text-lg text-brand-muted mt-4 max-w-3xl">
                        Die Umkleidekabine steht frei im Freibad oder am Badesee. Die Bodenplatte wird auf ein verdichtetes Schotterbett gelegt. Pflaster- und Fundamentarbeiten entfallen.
                    </p>
                </div>
                <div className="relative w-full aspect-[21/9] bg-brand-surface/60 rounded-xl overflow-hidden border border-brand-dark/10 shadow-[0_4px_24px_rgba(0,0,0,0.08)]">
                    <img src="/images/umkleide/umkleide-panorama.jpg" alt="Mehrere Schnecken-Kabinen auf einer gepflasterten Fläche" loading="lazy" className="w-full h-full object-cover" />
                    <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">Abb. 4: Freistehend auf gepflasterter Fläche</div>
                </div>
            </div>

            {/* 3. TECH SPECS */}
            <div className="mb-32">
                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    {/* INDUSTRIAL HEADER UPDATE */}
                    <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                        Technische <span className="text-brand-orange">Daten</span>
                    </h2>
                    <span className="font-mono text-brand-muted text-xs hidden sm:block">DATENBLATT: UMKLEIDE</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <TechSpecCard title="Aufbau" value="2 Teile, ohne Schrauben" icon="view_in_ar" />
                    <TechSpecCard title="Tür" value="Keine (Spirale)" icon="no_meeting_room" />
                    <TechSpecCard title="Boden" value="Fugenlos integriert" icon="check_box_outline_blank" />
                    <TechSpecCard title="Material" value="Beton + Edelstahl" icon="wallpaper" />
                    <TechSpecCard title="Montage" value="Fundamentfrei" icon="layers" />
                    <TechSpecCard title="Einsatz" value="Freibad, Badesee" icon="water_drop" />
                    <TechSpecCard title="Missbrauchsschutz" value="Oben + unten offen" icon="shield" />
                    <TechSpecCard title="Winterbetrieb" value="Kein Abbau nötig" icon="ac_unit" />
                </div>
            </div>

            <BrochureRequestForm context="productpage" />
            <ReferencedProjects productPath="/produkte/umkleidekabine-beton" />
            <OtherProducts />

       </div>
    </PageShell>
  );
};

export default ProductChangingCabinePage;
