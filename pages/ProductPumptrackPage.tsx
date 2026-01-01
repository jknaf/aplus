import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PRODUCTS } from '../constants';
import BrochureRequestForm from '../components/BrochureRequestForm';

const OtherProducts: React.FC = () => {
  const otherProducts = PRODUCTS.filter(p => p.id !== 'pumptrack' && p.id !== 'skate-anlagen').slice(0, 3);
  return (
    <div className="mt-32 border-t border-white/10 pt-24">
      <h2 className="text-4xl font-black font-heading text-center mb-16 uppercase tracking-widest text-white">
        Weitere <span className="text-transparent text-outline-bold">Systemlösungen</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherProducts.map(product => (
          <Link key={product.id} to={product.path} className="group relative block overflow-hidden rounded-sm aspect-[4/5] bg-white/5 border border-white/5 backdrop-blur-sm">
            <img loading="lazy" decoding="async" src={product.imageUrl} alt={product.altText} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
            <div className="relative h-full flex flex-col justify-end p-8">
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
    <div className="bg-white/5 border border-white/10 p-6 backdrop-blur-sm hover:border-brand-orange/50 transition-colors duration-300">
        <span className="material-symbols-outlined text-brand-orange text-3xl mb-4">{icon}</span>
        <h4 className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-2">{title}</h4>
        <p className="text-white font-bold text-lg leading-tight">{value}</p>
    </div>
);

const ProductPumptrackPage: React.FC = () => {
  useEffect(() => {
    document.title = "Pumptrack aus Beton planen | A+ Urban Design";
    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', 'A+ Urban Design plant und baut TÜV-zertifizierte Pumptracks aus modularen Betonelementen. Langlebig, wartungsarm und perfekt für Bikes, Skateboards und Scooter.');
    }
  }, []);

  return (
    <PageShell title="Pumptrack aus Beton planen & bauen">
       
       {/* 1. IMMERSIVE HERO */}
       <div className="relative w-full h-[85vh] -mt-16 mb-24 overflow-hidden z-10 rounded-b-2xl border-b border-white/10">
            <div className="absolute inset-0">
                <img 
                    src="https://www.kommunaldirekt.de/wp-content/uploads/2024/09/kd424_aplus-urbandesign1.jpg.webp" 
                    alt="Hero Pumptrack" 
                    className="w-full h-full object-cover"
                />
                 {/* Gradient to transparent to show grid */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-12 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-6 animate-fade-in-up">
                         <span className="px-3 py-1 border border-brand-orange text-brand-orange text-xs font-bold uppercase tracking-[0.2em] bg-black/40 backdrop-blur-sm">Flow & Dynamik</span>
                         <span className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider bg-black/40 backdrop-blur-sm px-2 py-1">
                            <span className="material-symbols-outlined text-base">verified_user</span> DIN EN 14974
                         </span>
                    </div>
                    {/* INDUSTRIAL HEADER UPDATE */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-heading uppercase tracking-tighter text-white leading-[0.85] animate-fade-in-up [animation-delay:100ms]">
                        Beton<br/>
                        <span className="text-transparent text-outline-bold">Pumptracks</span>
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
                        <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-8 uppercase tracking-tighter">
                            Endloser <span className="text-transparent text-outline-bold">Flow.</span>
                        </h2>
                        <p className="text-xl text-gray-300 leading-relaxed mb-8">
                            Ein Pumptrack ist mehr als nur eine Strecke – er ist ein biomechanischer Spielplatz. Durch Gewichtsverlagerung ("Pumpen") wird Geschwindigkeit aufgebaut, ohne in die Pedale zu treten.
                        </p>
                        <p className="text-lg text-brand-muted leading-relaxed mb-12">
                            Unsere Betonelemente bieten im Gegensatz zu Asphalt oder Erde eine dauerhaft perfekte Geometrie. Wartungsfrei, griffig und sicher für Skateboarder, Scooter-Kids und Mountainbiker gleichermaßen.
                        </p>
                        
                        <div className="flex flex-col gap-4">
                            <Link 
                                to="/kontakt" 
                                className="inline-flex justify-center items-center gap-2 bg-brand-orange text-black font-black uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-white hover:text-brand-orange transition-all duration-300 transform hover:-translate-y-1 shadow-xl group"
                            >
                                Strecke planen <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Scrolling Gallery */}
                <div className="lg:w-7/12 flex flex-col gap-8">
                    <div className="aspect-[16/10] bg-white/5 rounded-sm overflow-hidden border border-white/10 group backdrop-blur-sm">
                         <img src="https://images.pexels.com/photos/5413303/pexels-photo-5413303.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Pumptrack Curve" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">ABB 01. STEILKURVE</div>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 p-8 my-8 backdrop-blur-sm">
                        <h3 className="text-2xl font-bold font-heading text-white uppercase mb-4">Track Features</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-400 font-mono uppercase">
                             <div className="flex items-center gap-2"><div className="w-2 h-2 bg-brand-orange"></div>Rollers (Wellen)</div>
                             <div className="flex items-center gap-2"><div className="w-2 h-2 bg-brand-orange"></div>Steilkurven</div>
                             <div className="flex items-center gap-2"><div className="w-2 h-2 bg-brand-orange"></div>Doubles</div>
                             <div className="flex items-center gap-2"><div className="w-2 h-2 bg-brand-orange"></div>Tabletops</div>
                        </div>
                    </div>

                    <div className="aspect-[16/10] bg-white/5 rounded-sm overflow-hidden border border-white/10 group backdrop-blur-sm">
                         <img src="https://images.pexels.com/photos/2241144/pexels-photo-2241144.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Pumptrack Overview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">ABB 02. MODULARES SYSTEM</div>
                    </div>
                </div>
            </div>

            {/* 3. TECHNICAL SPECS */}
            <div className="mb-32">
                <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
                    {/* INDUSTRIAL HEADER UPDATE */}
                    <h2 className="text-5xl md:text-6xl font-black font-heading text-white uppercase tracking-tighter leading-none">
                        Tech<span className="text-transparent text-outline-bold">Specs</span>
                    </h2>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <TechSpecCard title="Zielgruppe" value="Bike, Skate, Scooter" icon="groups" />
                    <TechSpecCard title="Oberfläche" value="Spezialbeton" icon="texture" />
                    <TechSpecCard title="Wartung" value="Minimal" icon="build_circle" />
                    <TechSpecCard title="Aufbau" value="Modular" icon="view_module" />
                    <TechSpecCard title="Witterung" value="Ganzjährig" icon="wb_sunny" />
                    <TechSpecCard title="Erweiterbar" value="Ja" icon="add_circle" />
                    <TechSpecCard title="Zertifikat" value="TÜV / GS" icon="verified" />
                    <TechSpecCard title="Individualität" value="Custom Layouts" icon="draw" />
                </div>
            </div>

            <BrochureRequestForm context="productpage" />
            <OtherProducts />

       </div>
    </PageShell>
  );
};

export default ProductPumptrackPage;