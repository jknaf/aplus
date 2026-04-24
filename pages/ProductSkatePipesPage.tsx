import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PRODUCTS } from '../constants';
import BrochureRequestForm from '../components/BrochureRequestForm';
import ReferencedProjects from '../components/ReferencedProjects';

const OtherProducts: React.FC = () => {
  const otherProducts = PRODUCTS.filter(p => p.id !== 'skate-pipes' && p.id !== 'skate-anlagen').slice(0, 3);
  return (
    <div className="mt-32 border-t border-brand-dark/10 pt-24 relative z-20">
      <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/10 backdrop-blur-sm rounded-md">Portfolio</span>
          <h2 className="text-4xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-[0.9]">Weitere <span className="text-brand-orange">Lösungen.</span></h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherProducts.map(product => (
          <Link key={product.id} to={product.path} className="group relative block overflow-hidden rounded-sm aspect-[4/5] bg-brand-surface/60 border border-brand-dark/5 z-20 backdrop-blur-sm">
            <img loading="lazy" decoding="async" src={product.imageUrl} alt={product.altText} width="600" height="800" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-8 z-30">
               <span className="text-brand-orange font-mono text-xs mb-2 hidden group-hover:block">PRODUKT 0{PRODUCTS.indexOf(product) + 1}</span>
              <h3 className="text-2xl font-extrabold font-heading text-white uppercase tracking-tighter transform group-hover:-translate-y-1 transition-transform duration-300">{product.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

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
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${title}: ${value}`} className={`${baseClass} block group hover:shadow-md`}>
                {content}
            </a>
        );
    }
    return <div className={baseClass}>{content}</div>;
};

const GalleryImage: React.FC<{ src: string; alt: string; label: string }> = ({ src, alt, label }) => (
    <div className="aspect-[16/10] bg-brand-surface/60 rounded-xl overflow-hidden border border-brand-dark/10 group relative shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">{label}</div>
    </div>
);

const ProductSkatePipesPage: React.FC = () => {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Beton Skate-Pipes — Halfpipe, Mini-Pipe, Super-Pipe",
    "description": "Skate-Pipes aus bewehrtem Beton in drei Gesamthöhen (inkl. Flat): 165 cm (Mini-Pipe), 240 und 255 cm (Super-Pipe). Standardaufstellung oder Kombi mit Banks, Coping-Ramps, Spines. TÜV-zertifiziert nach DIN EN 14974.",
    "brand": { "@type": "Brand", "name": "A+ Urban Design" },
    "manufacturer": { "@type": "Organization", "name": "A+ Urban Design", "url": "https://www.aplusurbandesign.com" },
    "category": "Sportanlagen / Urban Sports",
    "material": "Beton",
    "countryOfOrigin": "DE",
    "image": "https://www.aplusurbandesign.com/images/skate-pipes/skate-pipe-01.jpg",
    "offers": {
      "@type": "Offer",
      "url": "https://www.aplusurbandesign.com/produkte/skate-pipes-beton",
      "availability": "https://schema.org/InStock",
      "businessFunction": "https://schema.org/Sell",
      "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "EUR", "valueAddedTaxIncluded": false }
    }
  };

  return (
    <PageShell
        title="Beton Skate-Pipes — Halfpipe, Mini-Pipe & Super-Pipe"
        description="Skate-Pipes aus bewehrtem Beton in drei Gesamthöhen (inkl. Flat): 165, 240 und 255 cm. Standardaufstellung oder Combi-Pipe mit Banks, Coping-Ramps und Spines. TÜV-zertifiziert nach DIN EN 14974. Fundamentfrei montierbar."
        schema={productSchema}
    >
       {/* 1. HERO */}
       <div className="relative w-full h-[60vh] -mt-16 mb-24 overflow-hidden rounded-b-2xl border-b border-brand-dark/10 z-10">
            <div className="absolute inset-0">
                 <img src="/images/skate-pipes/skate-pipe-01.jpg" alt="Beton Skate-Pipe vom Hersteller A+ Urban Design" className="w-full h-full object-cover animate-kenburns-1" loading="eager" fetchPriority="high" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-dark/80 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-12 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-6 animate-fade-in-up">
                         <span className="px-3 py-1 border border-brand-orange text-brand-orange text-xs font-bold uppercase tracking-[0.2em] bg-black/40 backdrop-blur-sm">Half · Mini · Super</span>
                         <span className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider bg-black/40 backdrop-blur-sm px-2 py-1">
                            <span className="material-symbols-outlined text-base">verified_user</span> DIN EN 14974
                         </span>
                    </div>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-heading uppercase tracking-tighter text-white leading-[0.85] animate-fade-in-up [animation-delay:100ms] drop-shadow-2xl">
                        Skate-<br/><span className="text-brand-orange">Pipes</span>
                    </h1>
                </div>
            </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">

            {/* 2. INTRO */}
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 mb-32">
                <div className="lg:w-5/12">
                    <div className="lg:sticky lg:top-32 relative z-20">
                         <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/10 backdrop-blur-sm rounded-md">Mini · Standard · Super</span>
                        <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none mb-8">
                            Die Pipe. <br/><span className="text-brand-orange">In Beton.</span>
                        </h2>
                        <p className="text-xl text-brand-muted leading-relaxed mb-6">
                            Die Halfpipe entstand in den 1970er Jahren aus leeren Schwimmbecken. Heute ist sie das prägende Element jedes Skateparks — und in Beton die dauerhafteste Ausführung überhaupt.
                        </p>
                        <p className="text-lg text-brand-muted leading-relaxed mb-6">
                            Unsere Skate-Pipes sind aus bewehrtem Beton gefertigt. Unter jeder Plattform sitzt eine arretierbare Stütze, die Fugen sind mit verzinktem Copingrohr abgedeckt. Lieferbar in <strong className="text-brand-dark">165, 240 und 255 cm</strong> Gesamthöhe (inkl. Flat = 15 cm), als Standard oder als Combi-Pipe mit Banks, Coping-Ramps und Spines.
                        </p>
                        <p className="text-lg text-brand-muted leading-relaxed mb-8">
                            Mindestbreite: 375 cm für die kleine Pipe (erweiterbar in 187,5-cm-Schritten), 500 cm für mittlere und große Pipes (Modulraster 250 cm). Montage fundamentfrei auf Asphalt, Betonplatte oder Schotterbett.
                        </p>

                        <div className="flex flex-col gap-4">
                            <Link to="/kontakt?projectType=Skatepark" className="inline-flex justify-center items-center gap-2 bg-brand-orange text-white font-extrabold uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-brand-dark hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-xl relative z-30 group">
                                Pipe konfigurieren <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                            <span className="text-xs text-brand-muted font-mono text-center">Inklusive 3D-Voranalyse, schlüsselfertige Lieferung und Montage</span>
                        </div>
                    </div>
                </div>

                <div className="lg:w-7/12 flex flex-col gap-6">
                    <GalleryImage src="/images/skate-pipes/skate-pipe-02.jpg" alt="Beton Skate-Pipe in Standardaufstellung" label="ABB 01. STANDARD-PIPE" />
                    <GalleryImage src="/images/skate-pipes/skate-pipe-bank-03.jpg" alt="Skate-Pipe mit Bank-Anfahrt" label="ABB 02. PIPE + BANK" />
                    <GalleryImage src="/images/skate-pipes/skate-pipe-kombi-04.jpg" alt="Combi-Pipe mit mehreren Höhen und Banks" label="ABB 03. COMBI-PIPE" />
                </div>
            </div>

            {/* 3. PIPE-HÖHEN */}
            <div className="mb-32 relative z-20">
                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    <div>
                        <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-4 uppercase tracking-widest bg-brand-orange/10 rounded-md">Höhen-Raster</span>
                        <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                            Drei Höhen. <span className="text-brand-orange">Ein System.</span>
                        </h2>
                    </div>
                </div>

                <p className="text-lg text-brand-muted leading-relaxed mb-8 max-w-4xl">
                    Mini-Pipe (165 cm) und Super-Pipes (240/255 cm) sind in derselben modularen Betonbauweise erhältlich. Alle Höhen können untereinander kombiniert werden — beispielsweise als Pipe-zu-Pipe-Transfer mit Zwischen-Spine. Die Nutzfläche zwischen den Pipes ist aus massivem Beton, weil dort die stärkste Belastung auftritt.
                </p>

                <div className="grid grid-cols-3 gap-4 mb-10">
                    <div className="bg-brand-surface/60 border border-brand-orange/40 rounded-xl p-5 text-center">
                        <div className="text-3xl font-extrabold font-mono text-brand-orange">165 cm</div>
                        <div className="text-xs font-mono text-brand-muted uppercase tracking-widest mt-1">Mini-Pipe</div>
                    </div>
                    <div className="bg-brand-surface/60 border border-brand-dark/10 rounded-xl p-5 text-center">
                        <div className="text-3xl font-extrabold font-mono text-brand-orange">240 cm</div>
                        <div className="text-xs font-mono text-brand-muted uppercase tracking-widest mt-1">Super</div>
                    </div>
                    <div className="bg-brand-surface/60 border border-brand-dark/10 rounded-xl p-5 text-center">
                        <div className="text-3xl font-extrabold font-mono text-brand-orange">255 cm</div>
                        <div className="text-xs font-mono text-brand-muted uppercase tracking-widest mt-1">Super-Pipe</div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-8 rounded-xl">
                        <h3 className="text-2xl font-bold font-heading text-brand-dark uppercase mb-4">Standard-Aufstellung</h3>
                        <p className="text-brand-muted leading-relaxed">
                            Die Pipe steht für sich allein — mit beidseitigem Flat, Plattform, Copingrohr. Mindestbreite: 375 cm bei der kleinen Pipe, 500 cm bei mittlerer und großer. Freistehende Skate-Pipes müssen eine <strong className="text-brand-dark">Absturzsicherung (Geländer)</strong> und auf beiden Seiten einen Sicherheitsbereich von mindestens 2 m haben.
                        </p>
                    </div>
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-8 rounded-xl">
                        <h3 className="text-2xl font-bold font-heading text-brand-dark uppercase mb-4">Combi-Pipe</h3>
                        <p className="text-brand-muted leading-relaxed">
                            Im Gegensatz zu den Standard-Pipes werden Combi-Pipes mit anderen Elementen kombiniert. Sie können unterschiedliche Höhen haben, mit zusätzlichen Anfahrt- oder Abfahrtteilen (Banks oder Quarter-Ramps) ausgestattet sein oder andere Elemente auf dem Flat haben (Spine, Wave oder Bank to Bank). Abhängig von der Höhe der Zusatzteile müssen diese eine bestimmte Minimalbreite einhalten.
                        </p>
                    </div>
                </div>
            </div>

            {/* 4. CONSTRUCTION */}
            <div className="mb-32 relative z-20">
                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    <div>
                        <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-4 uppercase tracking-widest bg-brand-orange/10 rounded-md">Konstruktion</span>
                        <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                            Die Pipe<span className="text-brand-orange">.</span>
                        </h2>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-xl font-bold font-heading text-brand-dark uppercase mb-4">Halfpipe vs. Mini-Pipe</h3>
                        <p className="text-brand-muted leading-relaxed mb-4">
                            Die Halfpipe besteht aus einer halben Röhre mit Radius über 3 m, unten in zwei Transitions geteilt und durch ein Flat verbunden. Die Transition wird oben um einen 30–70 cm langen senkrechten Vert verlängert; an der Oberkante sitzt das Copingrohr. Komplette Halfpipes haben Höhen von 3,5 bis 5 m.
                        </p>
                        <p className="text-brand-muted leading-relaxed">
                            Unsere Mini-Pipes sind vereinfachte Halfpipes: kleinere Radien, kein Vert, niedrigere Plattform. Dadurch fahrerfreundlicher für Einsteiger und Fortgeschrittene — und logistisch als Fertigteil lieferbar.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold font-heading text-brand-dark uppercase mb-4">Montage</h3>
                        <p className="text-brand-muted leading-relaxed mb-4">
                            Die Pipes werden als vorgefertigte Betonmodule geliefert. Unter jeder Plattform sitzt eine arretierbare Stütze, mit der sich das Modul an leichte Unebenheiten anpassen lässt. Die Montage erfolgt fundamentfrei auf Asphalt, Setzbeton oder verdichtetem Schotterbett.
                        </p>
                        <p className="text-brand-muted leading-relaxed">
                            Alle Module sind nach DIN EN 14974 zertifiziert, mit GS-Zeichen und TÜV-Prüfprotokoll. Copingrohr verzinkt, Fugen mit Hartgummi-Kantenschutz.
                        </p>
                    </div>
                </div>
            </div>

            {/* 5. TECH SPECS */}
            <div className="mb-32 relative z-20">
                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                        Tech<span className="text-brand-orange">Specs</span>
                    </h2>
                    <span className="font-mono text-brand-muted text-xs hidden sm:block">DATENBLATT: PIPES</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <TechSpecCard
                        title="Zertifizierung"
                        value="DIN EN 14974 / TÜV / GS"
                        icon="verified"
                        href="https://www.tuvsud.com/de-de/dienstleistungen/produktpruefung-und-produktzertifizierung/zertifikatsdatenbank/?q=Z1A+056616+0012+Rev.+00"
                        linkLabel="TÜV-SÜD Zertifikat"
                    />
                    <TechSpecCard title="Pipe-Höhen" value="165 / 240 / 255 cm" icon="straighten" />
                    <TechSpecCard title="Flat-Höhe" value="15 cm" icon="square_foot" />
                    <TechSpecCard title="Mindestbreite kl." value="375 cm (+187,5 cm)" icon="width" />
                    <TechSpecCard title="Mindestbreite gr." value="500 cm (+250 cm)" icon="width" />
                    <TechSpecCard title="Material" value="Bewehrter Beton C35/45" icon="architecture" />
                    <TechSpecCard title="Copingrohr" value="Verzinkt · fortlaufend" icon="commit" />
                    <TechSpecCard title="Montage" value="Fundamentfrei" icon="layers" />
                    <TechSpecCard title="Sicherheitszone" value="2 m beidseitig" icon="safety_check" />
                    <TechSpecCard title="Absturzsicherung" value="freistehend: Geländer" icon="shield" />
                    <TechSpecCard title="Combi-Elemente" value="Banks · Spines · Waves" icon="extension" />
                    <TechSpecCard title="Montage" value="Durch A+ Urban Design" icon="build" />
                </div>
            </div>

            <BrochureRequestForm context="productpage" />
            <ReferencedProjects productPath="/produkte/skate-pipes-beton" />
            <OtherProducts />

       </div>
    </PageShell>
  );
};

export default ProductSkatePipesPage;
