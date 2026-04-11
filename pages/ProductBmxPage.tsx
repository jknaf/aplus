import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PRODUCTS } from '../constants';
import BrochureRequestForm from '../components/BrochureRequestForm';

const OtherProducts: React.FC = () => {
  const otherProducts = PRODUCTS.filter(p => p.id !== 'bmx-anlagen' && p.id !== 'skate-anlagen').slice(0, 3);
  return (
    <div className="mt-32 border-t border-brand-dark/10 pt-24">
      <h2 className="text-3xl font-bold font-heading text-center mb-16 uppercase tracking-widest text-brand-dark">
        Weitere <span className="text-brand-orange">Lösungen</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherProducts.map(product => (
          <Link key={product.id} to={product.path} className="group relative block overflow-hidden rounded-sm aspect-[4/5] bg-brand-surface/60 border border-brand-dark/5 backdrop-blur-sm shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            <img loading="lazy" decoding="async" src={product.imageUrl} alt={product.altText} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-8">
               <span className="text-brand-orange font-mono text-xs mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">PRODUKT 0{PRODUCTS.indexOf(product) + 1}</span>
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

const ProductBmxPage: React.FC = () => {
  const productSchema = {
    "@context": "https://schema.org", "@type": "Product",
    "name": "BMX-Anlagen aus Beton",
    "description": "BMX-Anlagen und Skate-Pipes aus Beton: Halfpipes, Mini-Pipes und Kombinationsanlagen in drei Höhen (165/200/255 cm). Fundamentfrei und TÜV-zertifiziert.",
    "brand": { "@type": "Brand", "name": "A+ Urban Design" },
    "category": "Urban Furniture",
    "image": "/images/skate-pipes/skate-pipe-bank-03.jpg",
    "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "EUR", "price": "0", "url": "https://www.aplusurbandesign.com/produkte/bmx-anlagen" }
  };

  return (
    <PageShell title="BMX-Anlagen aus Beton — Hersteller A+ Urban Design" description="BMX-Anlagen und Skate-Pipes vom Hersteller: Halfpipes, Mini-Pipes und Kombinationsanlagen aus Beton in drei Höhen (165/200/255 cm). Fundamentfrei und TÜV-zertifiziert." schema={productSchema}>

       {/* 1. HERO — Video */}
       <div className="relative w-full h-[60vh] -mt-16 mb-24 overflow-hidden rounded-b-2xl border-b border-brand-dark/10 z-10">

            {/* VIDEO LAYER — startet bei Sekunde 15 (überspringt Logos), loopt manuell */}
            <div className="absolute inset-0 z-0">
                <video
                    src="/videos/skateparks/contest-bmx.mp4"
                    poster="/videos/skateparks/poster-contest-bmx.jpg"
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                    className="w-full h-full object-cover"
                    onLoadedMetadata={(e) => { e.currentTarget.currentTime = 15; }}
                    onEnded={(e) => {
                        e.currentTarget.currentTime = 15;
                        e.currentTarget.play().catch(() => {});
                    }}
                />
            </div>
            
             {/* Gradient to transparent to show grid */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-20"></div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-dark/80 to-transparent z-20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-20"></div>
            
            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-12 z-30">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-6 animate-fade-in-up">
                         <span className="px-3 py-1 border border-brand-orange text-brand-orange text-xs font-bold uppercase tracking-[0.2em] bg-black/40 backdrop-blur-sm">Dirt & Street</span>
                         <span className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider bg-black/40 backdrop-blur-sm px-2 py-1">
                            <span className="material-symbols-outlined text-base">verified_user</span> DIN EN 14974
                         </span>
                    </div>
                    {/* INDUSTRIAL HEADER UPDATE */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-heading uppercase tracking-tighter text-white leading-[0.85] animate-fade-in-up [animation-delay:100ms]">
                        BMX<br/>
                        <span className="text-brand-orange">Parks</span>
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
                        <h2 className="text-3xl font-bold font-heading text-brand-dark mb-8">Big Air. Hard Concrete.</h2>
                        <p className="text-xl text-brand-muted leading-relaxed mb-8">
                            Ein BMX-Park muss extremen Belastungen standhalten. Wenn Pegs auf Kanten treffen und Reifen mit hoher Geschwindigkeit landen, versagen Holz und Asphalt schnell. Unsere Halfpipes und BMX-Rampen aus bewehrtem Beton gibt es in 165, 200 und 255 cm Höhe — ideal für Kommunen, die eine BMX-Anlage bauen lassen möchten.
                        </p>
                        <p className="text-lg text-brand-muted leading-relaxed mb-12">
                            Unsere Beton-Lösungen für Jump-Ramps, Dirt-Lines und Bowls sind für die Ewigkeit gebaut. Standard- und Kombi-Pipes können mit Banks, Coping-Ramps und Spines kombiniert werden. Freistehende Pipes erfordern beidseitig 2 m Sicherheitszone und Absturzsicherung.
                        </p>
                        
                        <div className="flex flex-col gap-4">
                            <Link 
                                to="/kontakt" 
                                className="inline-flex justify-center items-center gap-2 bg-brand-orange text-white font-extrabold uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-brand-dark hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-xl group"
                            >
                                Park anfragen <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Scrolling Gallery */}
                <div className="lg:w-7/12 flex flex-col gap-8">
                    <div className="aspect-[16/10] bg-brand-surface/60 rounded-sm overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                         <img src="/images/skate-pipes/skate-pipe-bank-03.jpg" alt="BMX Jump Ramp / Bank" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">FIG 01. JUMP RAMPS</div>
                    </div>

                    {/* Elements Grid */}
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-8 my-8 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <h3 className="text-2xl font-bold font-heading text-brand-dark uppercase mb-4">Core Elements</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm text-brand-muted font-mono">
                             <div className="border-b border-brand-dark/5 py-2 flex justify-between"><span>Dirt-Lines</span> <span className="text-brand-orange">+</span></div>
                             <div className="border-b border-brand-dark/5 py-2 flex justify-between"><span>Spines</span> <span className="text-brand-orange">+</span></div>
                             <div className="border-b border-brand-dark/5 py-2 flex justify-between"><span>Vertebrate</span> <span className="text-brand-orange">+</span></div>
                             <div className="border-b border-brand-dark/5 py-2 flex justify-between"><span>Wall-Rides</span> <span className="text-brand-orange">+</span></div>
                        </div>
                    </div>

                    <div className="aspect-[16/10] bg-brand-surface/60 rounded-sm overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                         <img src="/images/skate-pipes/skate-pipe-kombi-04.jpg" alt="Kombipipe mit Bank und Coping" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">FIG 02. KOMBI-PIPE</div>
                    </div>
                </div>
            </div>

            {/* 2b. PIPE-TYPEN GALLERY */}
            <div className="mb-32">
                <div className="mb-10">
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">Pipe-Typen</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter">
                        Drei Höhen. <span className="text-brand-orange">Ein System.</span>
                    </h2>
                    <p className="text-lg text-brand-muted mt-4 max-w-3xl">
                        Mini-Pipe (165 cm), Standard-Pipe (200 cm) und Super-Pipe (255 cm) sind in derselben modularen Betonbauweise erhältlich. Alle Varianten können mit Banks, Coping-Ramps und Spines zu Kombi-Anlagen kombiniert werden. Die Nutzfläche zwischen den Pipes ist aus massivem Beton — der am stärksten beanspruchte Bereich.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-xl overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <img src="/images/skate-pipes/skate-pipe-02.jpg" alt="Mini-Pipe 165cm Beton" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">Standard Pipes</div>
                    </div>
                    <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-xl overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <img src="/images/skate-pipes/skate-pipe-01.jpg" alt="Standard-Pipe 200cm" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">Standard Pipes</div>
                    </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="bg-brand-surface/60 border border-brand-dark/10 rounded-xl p-5 text-center">
                        <div className="text-3xl font-extrabold font-mono text-brand-orange">165 cm</div>
                        <div className="text-xs font-mono text-brand-muted uppercase tracking-widest mt-1">Mini-Pipe</div>
                    </div>
                    <div className="bg-brand-surface/60 border border-brand-orange/30 rounded-xl p-5 text-center">
                        <div className="text-3xl font-extrabold font-mono text-brand-orange">200 cm</div>
                        <div className="text-xs font-mono text-brand-muted uppercase tracking-widest mt-1">Standard-Pipe</div>
                    </div>
                    <div className="bg-brand-surface/60 border border-brand-dark/10 rounded-xl p-5 text-center">
                        <div className="text-3xl font-extrabold font-mono text-brand-orange">255 cm</div>
                        <div className="text-xs font-mono text-brand-muted uppercase tracking-widest mt-1">Super-Pipe</div>
                    </div>
                </div>
            </div>

            {/* 3. TECHNICAL SPECS */}
            <div className="mb-32">
                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    {/* INDUSTRIAL HEADER UPDATE */}
                    <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                        Specs<span className="text-brand-orange">Sheet</span>
                    </h2>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <TechSpecCard title="Pipe-Höhen" value="165 / 200 / 255 cm" icon="straighten" />
                    <TechSpecCard title="Mindestbreite" value="500 cm (Pipe)" icon="width" />
                    <TechSpecCard title="Disziplinen" value="Dirt, Park, Street" icon="sports_motorsports" />
                    <TechSpecCard title="Montage" value="Fundamentfrei" icon="layers" />
                    <TechSpecCard title="Sicherheitszone" value="2 m beidseitig" icon="safety_check" />
                    <TechSpecCard title="Bauweise" value="Bewehrter Beton" icon="update" />
                    <TechSpecCard title="Sicherheit" value="TÜV / GS" icon="security" />
                    <TechSpecCard title="Oberfläche" value="Offenporig / Grip" icon="terrain" />
                </div>
            </div>

            <BrochureRequestForm context="productpage" />
            <OtherProducts />

       </div>
    </PageShell>
  );
};

export default ProductBmxPage;