import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PRODUCTS } from '../constants';
import BrochureRequestForm from '../components/BrochureRequestForm';
import ReferencedProjects from '../components/ReferencedProjects';
import Bild from '../components/Bild';

const OtherProducts: React.FC = () => {
  const otherProducts = PRODUCTS.filter(p => p.id !== 'skate-pipes' && p.id !== 'skate-anlagen').slice(0, 3);
  return (
    <div className="mt-32 border-t border-brand-dark/10 pt-24 relative z-20">
      <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/10 backdrop-blur-sm rounded-md">Portfolio</span>
          <h2 className="text-4xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-[0.9]">Weitere <span className="text-brand-orange">Lösungen</span></h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherProducts.map(product => (
          <Link key={product.id} to={product.path} className="group relative block overflow-hidden rounded-sm aspect-[4/5] bg-brand-surface/60 border border-brand-dark/5 z-20 backdrop-blur-sm">
            <Bild hoch sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" loading="lazy" decoding="async" src={product.imageUrl} alt={product.altText} width="600" height="800" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"/>
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
        <Bild src={src} alt={alt} sizes="(min-width: 1024px) 60vw, 100vw" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">{label}</div>
    </div>
);

const ProductSkatePipesPage: React.FC = () => {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Skate-Pipes aus Beton: Pipe 165, 200 und 255",
    "description": "Skate-Pipes aus bewehrtem Beton in drei Gesamthöhen (inklusive Flat): 165, 200 und 255 cm. Standardaufstellung oder Kombi mit Banks, Coping-Ramps, Spines. TÜV-zertifiziert nach DIN EN 14974.",
    "brand": { "@type": "Brand", "name": "A+ Urban Design" },
    "manufacturer": { "@type": "Organization", "name": "A+ Urban Design", "url": "https://www.aplusurbandesign.com" },
    "category": "Sportanlagen",
    "material": "Beton",
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
        title="Skate-Pipes aus Beton: Mini-Pipes in 165, 200 und 255 cm"
        description="Skate-Pipes aus bewehrtem Beton in drei Gesamthöhen (inklusive Flat): 165, 200 und 255 cm. Standardaufstellung oder Kombi-Pipe mit Banks, Coping-Ramps und Spines. TÜV-zertifiziert nach DIN EN 14974. Fundamentfrei montierbar."
        schema={productSchema}
    >
       {/* 1. HERO */}
       <div className="relative w-full h-[60vh] -mt-16 mb-24 overflow-hidden rounded-b-2xl border-b border-brand-dark/10 z-10">
            <div className="absolute inset-0">
                 <Bild hoch src="/images/skate-pipes/skate-pipe-01.jpg" alt="Skate-Pipe aus Betonfertigteilen" className="w-full h-full object-cover animate-kenburns-1" loading="eager" fetchPriority="high" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-dark/80 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-12 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-6 animate-fade-in-up">
                         <span className="px-3 py-1 border border-brand-orange text-brand-orange text-xs font-bold uppercase tracking-[0.2em] bg-black/40 backdrop-blur-sm">165 · 200 · 255</span>
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
                         <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/10 backdrop-blur-sm rounded-md">Aufbau</span>
                        <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none mb-8">
                            Pipes <br/><span className="text-brand-orange">aus Beton</span>
                        </h2>
                        <p className="text-xl text-brand-muted leading-relaxed mb-6">
                            Die Halfpipe entstand in den 1970er-Jahren aus leeren Schwimmbecken. Heute gehört eine Pipe in fast jeden Skatepark. Aus Beton gebaut hält sie besonders lange.
                        </p>
                        <p className="text-lg text-brand-muted leading-relaxed mb-6">
                            Unsere Skate-Pipes sind aus bewehrtem Beton gefertigt. Unter jeder Plattform sitzt eine arretierbare Stütze, an der Oberkante läuft ein verzinktes Copingrohr durch. Wir liefern sie in <strong className="text-brand-dark">165, 200 und 255 cm</strong> Gesamthöhe, jeweils inklusive 15 cm Flat. Es gibt sie als Standard-Pipe oder als Kombi-Pipe mit Banks, Coping-Ramps und Spines.
                        </p>
                        <p className="text-lg text-brand-muted leading-relaxed mb-8">
                            Die kleine Pipe ist mindestens 375 cm breit und lässt sich in Schritten von 187,5 cm erweitern. Mittlere und große Pipes sind mindestens 500 cm breit und folgen einem Modulraster von 250 cm. Montiert wird ohne Fundament auf Asphalt, Beton oder verdichtetem Schotterbett.
                        </p>

                        <div className="flex flex-col gap-4">
                            <Link to="/kontakt?projectType=Skatepark" className="inline-flex justify-center items-center gap-2 bg-brand-orange text-white font-extrabold uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-brand-dark hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-xl relative z-30 group">
                                Pipe anfragen <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                            <span className="text-xs text-brand-muted font-mono text-center">Mit 3D-Voranalyse. Wir liefern und montieren schlüsselfertig.</span>
                        </div>
                    </div>
                </div>

                <div className="lg:w-7/12 flex flex-col gap-6">
                    <GalleryImage src="/images/skate-pipes/skate-pipe-02.jpg" alt="Skate-Pipe aus Beton in Standardaufstellung" label="Abb. 1: Standard-Pipe mit Geländer" />
                    <GalleryImage src="/images/skate-pipes/skate-pipe-bank-03.jpg" alt="Skate-Pipe mit Bank-Anfahrt" label="Abb. 2: Pipe mit angesetzter Bank" />
                    <GalleryImage src="/images/skate-pipes/skate-pipe-kombi-04.jpg" alt="Kombi-Pipe mit mehreren Höhen und Banks" label="Abb. 3: Pipe-Kombination mit Box" />
                </div>
            </div>

            {/* 3. PIPE-HÖHEN */}
            <div className="mb-32 relative z-20">
                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    <div>
                        <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-4 uppercase tracking-widest bg-brand-orange/10 rounded-md">Höhen</span>
                        <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                            165, 200 und <span className="text-brand-orange">255 cm</span>
                        </h2>
                    </div>
                </div>

                <p className="text-lg text-brand-muted leading-relaxed mb-8 max-w-4xl">
                    Die Pipes 165, 200 und 255 sind gleich aufgebaut. Alle Höhen können untereinander kombiniert werden, beispielsweise als Pipe-zu-Pipe-Transfer mit Zwischen-Spine. Die Nutzfläche zwischen den Pipes ist aus massivem Beton, weil dort die stärkste Belastung auftritt.
                </p>

                <div className="grid grid-cols-3 gap-4 mb-10">
                    <div className="bg-brand-surface/60 border border-brand-orange/40 rounded-xl p-5 text-center">
                        <div className="text-3xl font-extrabold font-mono text-brand-orange">165 cm</div>
                        <div className="text-xs font-mono text-brand-muted uppercase tracking-widest mt-1">Pipe 165</div>
                    </div>
                    <div className="bg-brand-surface/60 border border-brand-dark/10 rounded-xl p-5 text-center">
                        <div className="text-3xl font-extrabold font-mono text-brand-orange">200 cm</div>
                        <div className="text-xs font-mono text-brand-muted uppercase tracking-widest mt-1">Pipe 200</div>
                    </div>
                    <div className="bg-brand-surface/60 border border-brand-dark/10 rounded-xl p-5 text-center">
                        <div className="text-3xl font-extrabold font-mono text-brand-orange">255 cm</div>
                        <div className="text-xs font-mono text-brand-muted uppercase tracking-widest mt-1">Pipe 255</div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-8 rounded-xl">
                        <h3 className="text-2xl font-bold font-heading text-brand-dark uppercase mb-4">Standard-Aufstellung</h3>
                        <p className="text-brand-muted leading-relaxed">
                            Die Pipe steht frei, mit Flat auf beiden Seiten, Plattform und Copingrohr. Komplett aufgebaut ist eine Pipe je nach Höhe 862 bis 1.143 cm lang. Freistehende Skate-Pipes müssen eine <strong className="text-brand-dark">Absturzsicherung (Geländer)</strong> und auf beiden Seiten einen Sicherheitsbereich von mindestens 2 m haben.
                        </p>
                    </div>
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-8 rounded-xl">
                        <h3 className="text-2xl font-bold font-heading text-brand-dark uppercase mb-4">Kombi-Pipe</h3>
                        <p className="text-brand-muted leading-relaxed">
                            Kombi-Pipes werden mit weiteren Elementen ergänzt. Sie können unterschiedliche Höhen haben, mit zusätzlichen An- und Abfahrtsteilen (Banks oder Quarter-Ramps) ausgestattet sein oder andere Elemente auf dem Flat haben (Spine, Wave oder Bank to Bank). Je nach Höhe gilt für die Zusatzteile eine Mindestbreite.
                        </p>
                    </div>
                </div>
            </div>

            {/* 4. CONSTRUCTION */}
            <div className="mb-32 relative z-20">
                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    <div>
                        <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-4 uppercase tracking-widest bg-brand-orange/10 rounded-md">Halfpipe und Mini-Pipe</span>
                        <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                            So ist eine Pipe <span className="text-brand-orange">gebaut</span>
                        </h2>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-xl font-bold font-heading text-brand-dark uppercase mb-4">Halfpipe vs. Mini-Pipe</h3>
                        <p className="text-brand-muted leading-relaxed mb-4">
                            Die Halfpipe besteht aus einer halben Röhre mit Radius über 3 m, unten in zwei Transitions geteilt und durch ein Flat verbunden. Die Transition wird oben um einen 30–70 cm hohen senkrechten Teil (Vert) verlängert; an der Oberkante sitzt das Copingrohr. Komplette Halfpipes haben Höhen von 3,5 bis 5 m.
                        </p>
                        <p className="text-brand-muted leading-relaxed">
                            Unsere Mini-Pipes sind vereinfachte Halfpipes mit kleineren Radien, niedrigerer Plattform und ohne Vert. Sie sind dadurch leichter zu fahren, für Einsteiger wie für Fortgeschrittene, und lassen sich als Fertigteil liefern.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold font-heading text-brand-dark uppercase mb-4">Montage</h3>
                        <p className="text-brand-muted leading-relaxed mb-4">
                            Die Pipes werden als vorgefertigte Betonmodule geliefert. Jede Pipe gibt es in zwei Ausführungen: mit Geländer zum freien Aufstellen oder in eine Böschung gebaut. Der Radius beträgt 240 cm bei der Pipe 165 und 280 cm bei den Pipes 200 und 255.
                        </p>
                        <p className="text-brand-muted leading-relaxed">
                            Alle Module sind nach DIN EN 14974 geprüft, vom TÜV zertifiziert und tragen das GS-Zeichen. Das Copingrohr ist verzinkt, alle Fahrkanten haben einen Kantenschutz aus Hartgummi.
                        </p>
                    </div>
                </div>
            </div>

            {/* 5. TECH SPECS */}
            <div className="mb-32 relative z-20">
                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                        Technische <span className="text-brand-orange">Daten</span>
                    </h2>
                    <span className="font-mono text-brand-muted text-xs hidden sm:block">DATENBLATT: PIPES</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <TechSpecCard
                        title="Zertifizierung"
                        value="DIN EN 14974 / TÜV / GS"
                        icon="verified"
                        href="https://www.tuvsud.com/de-de/dienstleistungen/produktpruefung-und-produktzertifizierung/zertifikatsdatenbank/?q=Z1A+056616+0012+Rev.+00"
                        linkLabel="Zertifikat TÜV SÜD"
                    />
                    <TechSpecCard title="Pipe-Höhen" value="165 / 200 / 255 cm" icon="straighten" />
                    <TechSpecCard title="Flat-Höhe" value="15 cm" icon="square_foot" />
                    <TechSpecCard title="Mindestbreite Pipe 165" value="375 cm (+187,5 cm)" icon="width" />
                    <TechSpecCard title="Mindestbreite Pipe 200/255" value="500 cm (+250 cm)" icon="width" />
                    <TechSpecCard title="Material" value="Bewehrter Beton C35/45" icon="architecture" />
                    <TechSpecCard title="Copingrohr" value="Verzinkt · fortlaufend" icon="commit" />
                    <TechSpecCard title="Aufstellung" value="Fundamentfrei" icon="layers" />
                    <TechSpecCard title="Sicherheitszone" value="2 m beidseitig" icon="safety_check" />
                    <TechSpecCard title="Absturzsicherung" value="freistehend: Geländer" icon="shield" />
                    <TechSpecCard title="Kombi-Elemente" value="Banks · Spines · Waves" icon="extension" />
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
