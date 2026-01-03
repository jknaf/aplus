import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PRODUCTS } from '../constants';
import BrochureRequestForm from '../components/BrochureRequestForm';

const OtherProducts: React.FC = () => {
  const otherProducts = PRODUCTS.filter(p => p.id !== 'skate-anlagen' && p.id !== 'pumptrack').slice(0, 3);
  return (
    <div className="mt-32 border-t border-white/10 pt-24 relative z-20">
      <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/10 backdrop-blur-sm rounded-md">
              Portfolio
          </span>
          <h2 className="text-4xl md:text-6xl font-black font-heading text-white uppercase tracking-tighter leading-[0.9]">
              Weitere <span className="text-transparent text-outline-bold">Lösungen.</span>
          </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherProducts.map(product => (
          <Link key={product.id} to={product.path} className="group relative block overflow-hidden rounded-sm aspect-[4/5] bg-white/5 border border-white/5 z-20 backdrop-blur-sm">
            <img loading="lazy" decoding="async" src={product.imageUrl} alt={product.altText} width="600" height="800" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
            <div className="relative h-full flex flex-col justify-end p-8 z-30">
               <span className="text-brand-orange font-mono text-xs mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">PRODUKT 0{PRODUCTS.indexOf(product) + 1}</span>
              <h3 className="text-2xl font-black font-heading text-white uppercase tracking-tighter transform group-hover:-translate-y-1 transition-transform duration-300">{product.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

const TechSpecCard: React.FC<{ title: string; value: string; icon: string }> = ({ title, value, icon }) => (
    <div className="bg-white/5 border border-white/10 p-6 backdrop-blur-md hover:border-brand-orange/50 transition-colors duration-300 relative z-20">
        <span className="material-symbols-outlined text-brand-orange text-3xl mb-4">{icon}</span>
        <h4 className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-2">{title}</h4>
        <p className="text-white font-bold text-lg leading-tight">{value}</p>
    </div>
);

const ProductSkateAnlagenPage: React.FC = () => {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Beton Skate-Anlagen",
    "description": "Modulare Skate-Anlagen aus Beton. TÜV-zertifizierte, fundamentfrei und extrem langlebig für den öffentlichen Raum.",
    "brand": {
      "@type": "Brand",
      "name": "A+ Urban Design"
    },
    "category": "Urban Furniture",
    "image": "https://www.aplusurbandesign.com/.cm4all/uproc.php/0/BOWLS/.1-Skate-Bowl_A%2B-756x430.jpg/picture-1200?_=193735e8e88",
    "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "EUR",
        "price": "0", // Price upon request
        "url": window.location.href
    }
  };

  return (
    <PageShell 
        title="Planung & Bau von Beton-Skateanlagen" 
        description="Planung und Bau von modularen Beton-Skateparks. TÜV-zertifizierte Skate-Elemente wie Ramps, Bowls & Rails. Langlebig, fundamentfrei und europaweite Lieferung."
        schema={productSchema}
        fullWidth={true}
    >
       
       {/* 1. IMMERSIVE HERO */}
       <div className="relative w-full h-[85vh] -mt-16 mb-24 overflow-hidden z-10 rounded-b-2xl border-b border-white/10">
            <div className="absolute inset-0">
                {/* OPTIMIZED HERO IMAGE for Mobile Speed */}
                 <picture>
                    <source 
                        media="(max-width: 600px)" 
                        srcSet="https://www.aplusurbandesign.com/.cm4all/uproc.php/0/BOWLS/.1-Skate-Bowl_A%2B-756x430.jpg/picture-1200?_=193735e8e88&width=600&q=75" 
                    />
                    <source 
                        media="(max-width: 1200px)" 
                        srcSet="https://www.aplusurbandesign.com/.cm4all/uproc.php/0/BOWLS/.1-Skate-Bowl_A%2B-756x430.jpg/picture-1200?_=193735e8e88&width=1200&q=80" 
                    />
                    <img 
                        src="https://www.aplusurbandesign.com/.cm4all/uproc.php/0/BOWLS/.1-Skate-Bowl_A%2B-756x430.jpg/picture-2600?_=193735e8e88" 
                        alt="Hero Beton Skatepark" 
                        className="w-full h-full object-cover"
                        loading="eager"
                        fetchPriority="high"
                    />
                 </picture>
                
                {/* Center area clears for image, edges fade to black/transparent */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent"></div>
                {/* BOTTOM FADE: Must fade to TRANSPARENT to show the global grid below */}
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#050505] to-transparent opacity-90"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-12 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-6 animate-fade-in-up">
                         <span className="px-3 py-1 border border-brand-orange text-brand-orange text-xs font-bold uppercase tracking-[0.2em] bg-black/40 backdrop-blur-sm">Original A+</span>
                         <span className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider bg-black/40 backdrop-blur-sm px-2 py-1">
                            <span className="material-symbols-outlined text-base">verified_user</span> DIN EN 14974
                         </span>
                    </div>
                    {/* INDUSTRIAL HEADER UPDATE */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-heading uppercase tracking-tighter text-white leading-[0.85] animate-fade-in-up [animation-delay:100ms] drop-shadow-2xl">
                        Beton<br/>
                        <span className="text-transparent text-outline-bold">Skateparks</span>
                    </h1>
                </div>
            </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
            
            {/* 2. SPLIT LAYOUT: STICKY INFO & SCROLLING GALLERY */}
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 mb-32">
                
                {/* Left: Sticky Narrative */}
                <div className="lg:w-5/12">
                    <div className="lg:sticky lg:top-32 relative z-20">
                         <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/10 backdrop-blur-sm rounded-md">
                            Das Original
                        </span>
                        {/* INDUSTRIAL HEADER UPDATE */}
                        <h2 className="text-5xl md:text-6xl font-black font-heading text-white uppercase tracking-tighter leading-none mb-8">
                            Seit den <span className="text-transparent text-outline-bold">90ern.</span>
                        </h2>
                        <p className="text-xl text-gray-300 leading-relaxed mb-8">
                            Unsere modularen Skate-Elemente haben den öffentlichen Raum revolutioniert. Sie bieten die perfekte Symbiose aus der Haltbarkeit von Beton und der Flexibilität eines Baukastensystems.
                        </p>
                        <p className="text-lg text-brand-muted leading-relaxed mb-12">
                             Egal ob Street-Plaza oder Flow-Park: Wir liefern TÜV-zertifizierte Module, die einfach auf eine verdichtete Schotterfläche gestellt werden. Kein aufwendiger Tiefbau, keine teuren Fundamente.
                        </p>
                        
                        <div className="flex flex-col gap-4">
                            <Link 
                                to="/kontakt" 
                                className="inline-flex justify-center items-center gap-2 bg-brand-orange text-black font-black uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-white hover:text-brand-orange transition-all duration-300 transform hover:-translate-y-1 shadow-xl relative z-30 group"
                            >
                                3D-Planung anfragen <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                            <span className="text-xs text-gray-500 font-mono text-center">Inklusive Kostenschätzung & Layout</span>
                        </div>
                    </div>
                </div>

                {/* Right: Scrolling Gallery & Features */}
                <div className="lg:w-7/12 flex flex-col gap-8">
                    <div className="aspect-[16/10] bg-white/5 rounded-sm overflow-hidden border border-white/10 group relative z-10 backdrop-blur-sm">
                         <img src="https://www.aplusurbandesign.com/.cm4all/uproc.php/0/SKATEPARK/.1-Skate-Park_A%2B-756x430.jpg/picture-1200?_=19373432300" alt="Skate Bowl Detail" width="800" height="500" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">ABB 01. STREET ELEMENTS</div>
                    </div>
                    
                    {/* Feature Highlight Box - NEW TECHNICAL SECTION */}
                    <div className="bg-white/5 border border-brand-orange/20 p-8 my-8 relative overflow-hidden z-10 backdrop-blur-md">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="w-full md:w-1/2">
                                <h3 className="text-2xl font-bold font-heading text-white uppercase mb-4 relative z-10">Material & Details</h3>
                                <ul className="space-y-4 relative z-10">
                                    <li className="flex gap-4">
                                        <span className="text-brand-orange font-mono">01</span>
                                        <span className="text-gray-300"><strong>Coping:</strong> Verzinktes Stahlrohr, perfekt integriert.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-brand-orange font-mono">02</span>
                                        <span className="text-gray-300"><strong>Kanten:</strong> Feuerverzinkter Stahl-Kantenschutz.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-brand-orange font-mono">03</span>
                                        <span className="text-gray-300"><strong>Übergang:</strong> Nahtloses Bodenblech.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full md:w-1/2">
                                <img src="https://www.aplusurbandesign.com/.cm4all/uproc.php/0/DETAILS/.2-Skate-Element-Copingrohr_A%2B-756x430.jpg/picture-1200?_=193736d3488" className="rounded border border-white/10" alt="Technical Detail" />
                                <span className="block text-[10px] text-gray-500 font-mono mt-1 text-right">FIG 02. COPING DETAIL</span>
                            </div>
                        </div>
                    </div>

                    <div className="aspect-[16/10] bg-white/5 rounded-sm overflow-hidden border border-white/10 group relative z-10 backdrop-blur-sm">
                         <img src="https://www.aplusurbandesign.com/.cm4all/uproc.php/0/SKATEPARK/.4-Skatepark_A%2B-756x430.jpg/picture-1200?_=19373431b30" alt="Street Skateboarding" width="800" height="500" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">ABB 03. MODULAR PARK</div>
                    </div>
                </div>
            </div>

            {/* 3. TECHNICAL SPECS GRID */}
            <div className="mb-32 relative z-20">
                <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
                    {/* INDUSTRIAL HEADER UPDATE */}
                    <h2 className="text-5xl md:text-6xl font-black font-heading text-white uppercase tracking-tighter leading-none">
                        Tech<span className="text-transparent text-outline-bold">Specs</span>
                    </h2>
                    <span className="font-mono text-brand-muted text-xs hidden sm:block">DATENBLATT: SKATE-SYSTEME</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <TechSpecCard title="Zertifizierung" value="DIN EN 14974" icon="verified" />
                    <TechSpecCard title="Montage" value="Fundamentfrei" icon="layers" />
                    <TechSpecCard title="Material" value="C35/45 Beton" icon="architecture" />
                    <TechSpecCard title="Kantenschutz" value="Verzinkt / Gummi" icon="shield" />
                    <TechSpecCard title="Lautstärke" value="Lärmmindernd" icon="volume_off" />
                    <TechSpecCard title="Oberfläche" value="Besenstrich / Glatt" icon="texture" />
                    <TechSpecCard title="Modularität" value="Erweiterbar" icon="extension" />
                    <TechSpecCard title="Gewährleistung" value="5 Jahre" icon="security" />
                </div>
            </div>

            {/* 4. BROCHURE & CTA */}
            <BrochureRequestForm context="productpage" />
            <OtherProducts />

       </div>
    </PageShell>
  );
};

export default ProductSkateAnlagenPage;