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
          <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">
              Portfolio
          </span>
          <h2 className="text-4xl md:text-6xl font-black font-heading text-white uppercase tracking-tighter leading-[0.9]">
              Weitere <span className="text-outline-orange">Lösungen.</span>
          </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherProducts.map(product => (
          <Link key={product.id} to={product.path} className="group relative block overflow-hidden rounded-sm aspect-[4/5] bg-brand-surface border border-white/5 z-20">
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
    <div className="bg-brand-surface/50 border border-white/10 p-6 backdrop-blur-sm hover:border-brand-orange/50 transition-colors duration-300 relative z-20">
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
    "description": "Modulare Skate-Anlagen aus Beton. TÜV-zertifiziert, fundamentfrei und extrem langlebig für den öffentlichen Raum.",
    "brand": {
      "@type": "Brand",
      "name": "A+ Urban Design"
    },
    "category": "Urban Furniture",
    "image": "https://www.kommunaldirekt.de/wp-content/uploads/2020/03/kd120_aplusurbandesign2-1.jpg",
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
    >
       
       {/* 1. IMMERSIVE HERO */}
       <div className="relative w-full h-[85vh] -mt-16 mb-24 overflow-hidden z-10">
            <div className="absolute inset-0">
                <img 
                    src="https://www.kommunaldirekt.de/wp-content/uploads/2020/03/kd120_aplusurbandesign2-1.jpg" 
                    alt="Hero Beton Skatepark" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-brand-bg"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-12 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-6 animate-fade-in-up">
                         <span className="px-3 py-1 border border-brand-orange text-brand-orange text-xs font-bold uppercase tracking-[0.2em]">Original A+</span>
                         <span className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider">
                            <span className="material-symbols-outlined text-base">verified_user</span> DIN EN 14974
                         </span>
                    </div>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-heading uppercase tracking-tighter text-white leading-[0.85] animate-fade-in-up [animation-delay:100ms]">
                        Beton<br/>
                        <span className="text-outline-bold">Skateparks</span>
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
                         <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">
                            Das Original
                        </span>
                        <h2 className="text-5xl md:text-6xl font-black font-heading text-white uppercase tracking-tighter leading-none mb-8">
                            Seit den <span className="text-outline-orange">90ern.</span>
                        </h2>
                        <p className="text-xl text-gray-400 leading-relaxed mb-8">
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
                    <div className="aspect-[16/10] bg-brand-surface rounded-sm overflow-hidden border border-white/10 group relative z-10">
                         <img src="https://images.pexels.com/photos/1739942/pexels-photo-1739942.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Skate Bowl Detail" width="800" height="500" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">ABB 01. BOWL ELEMENT</div>
                    </div>
                    
                    {/* Feature Highlight Box */}
                    <div className="bg-brand-surface border border-brand-orange/20 p-8 my-8 relative overflow-hidden z-10">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <span className="material-symbols-outlined text-9xl text-brand-orange">engineering</span>
                        </div>
                        <h3 className="text-2xl font-bold font-heading text-white uppercase mb-4 relative z-10">Warum Beton?</h3>
                        <ul className="space-y-4 relative z-10">
                            <li className="flex gap-4">
                                <span className="text-brand-orange font-mono">01</span>
                                <span className="text-gray-300">Flüsterleise: Hohe Masse absorbiert Schall.</span>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-brand-orange font-mono">02</span>
                                <span className="text-gray-300">Unzerstörbar: Resistent gegen Feuer & Schnitte.</span>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-brand-orange font-mono">03</span>
                                <span className="text-gray-300">Grip: Perfekte Haftung, trocknet schnell ab.</span>
                            </li>
                        </ul>
                    </div>

                    <div className="aspect-[16/10] bg-brand-surface rounded-sm overflow-hidden border border-white/10 group relative z-10">
                         <img src="https://images.pexels.com/photos/1233319/pexels-photo-1233319.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Street Skateboarding" width="800" height="500" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">ABB 02. STREET PLAZA</div>
                    </div>
                </div>
            </div>

            {/* 3. TECHNICAL SPECS GRID */}
            <div className="mb-32 relative z-20">
                <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
                    <h2 className="text-5xl md:text-6xl font-black font-heading text-white uppercase tracking-tighter leading-none">
                        Technische<span className="text-brand-orange">Daten</span>
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