import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PRODUCTS } from '../constants';
import BrochureRequestForm from '../components/BrochureRequestForm';

const OtherProducts: React.FC = () => {
  const otherProducts = PRODUCTS.filter(p => p.id !== 'hockey' && p.id !== 'pumptrack').slice(0, 3);
  return (
    <div className="mt-32 border-t border-white/10 pt-24">
      <h2 className="text-3xl font-bold font-heading text-center mb-16 uppercase tracking-widest">Alternativen</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherProducts.map(product => (
          <Link key={product.id} to={product.path} className="group relative block overflow-hidden rounded-sm aspect-[4/5] bg-brand-surface border border-white/5">
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
    <div className="bg-brand-surface/50 border border-white/10 p-6 backdrop-blur-sm hover:border-brand-orange/50 transition-colors duration-300">
        <span className="material-symbols-outlined text-brand-orange text-3xl mb-4">{icon}</span>
        <h4 className="text-gray-400 font-mono text-xs uppercase tracking-widest mb-2">{title}</h4>
        <p className="text-white font-bold text-lg leading-tight">{value}</p>
    </div>
);

const ProductHockeyRinkPage: React.FC = () => {
  useEffect(() => {
    document.title = "Inline-Hockey-Banden | A+ Urban Design";
  }, []);

  return (
    <PageShell title="Inline-Hockey-Banden (fundamentfrei)">
       
       {/* 1. HERO */}
       <div className="relative w-full h-[85vh] -mt-16 mb-24 overflow-hidden">
            <div className="absolute inset-0">
                <img 
                    src="https://www.aplusurbandesign.com/.cm4all/uproc.php/0/HOCKEY/.Roll-Hockey-Bande_A%2B.jpg/picture-2600?_=1938211b1d0" 
                    alt="Hero Hockey Rink" 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-brand-bg"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-12 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-6 animate-fade-in-up">
                         <span className="px-3 py-1 border border-brand-orange text-brand-orange text-xs font-bold uppercase tracking-[0.2em]">Multi-Season</span>
                         <span className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider">
                            <span className="material-symbols-outlined text-base">verified_user</span> DIN EN 14974
                         </span>
                    </div>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-heading uppercase tracking-tighter text-white leading-[0.85] animate-fade-in-up [animation-delay:100ms]">
                        Hockey<br/>
                        <span className="text-outline-bold">System</span>
                    </h1>
                </div>
            </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* 2. SPLIT LAYOUT */}
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 mb-32">
                
                <div className="lg:w-5/12">
                    <div className="lg:sticky lg:top-32">
                        <h2 className="text-3xl font-bold font-heading text-white mb-8">Game On. All Year.</h2>
                        <p className="text-xl text-gray-400 leading-relaxed mb-8">
                            Ein Feld, alle Möglichkeiten. Unser patentiertes Bandensystem verwandelt jeden Platz in eine Arena für Inline-Hockey, Rollhockey und im Winter sogar für Eishockey.
                        </p>
                        <p className="text-lg text-brand-muted leading-relaxed mb-12">
                            Die fundamentfreie Konstruktion erlaubt eine Installation auf bestehenden Hartplätzen ohne Beschädigung des Bodens. Robust, modular in 1,5m Schritten erweiterbar und extrem langlebig.
                        </p>
                        
                        <div className="flex flex-col gap-4">
                            <Link to="/kontakt" className="inline-flex justify-center items-center gap-3 bg-brand-orange text-black font-black uppercase tracking-widest py-4 px-8 hover:bg-white transition-all duration-300">
                                Spielfeld anfragen <span className="material-symbols-outlined">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="lg:w-7/12 flex flex-col gap-8">
                    <div className="aspect-[16/10] bg-brand-surface rounded-sm overflow-hidden border border-white/10 group">
                         <img src="https://images.pexels.com/photos/848612/pexels-photo-848612.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Modular Rink Element" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">FIG 01. MODULAR PANELS</div>
                    </div>
                    
                    <div className="bg-brand-surface border border-white/10 p-8 my-8">
                        <h3 className="text-2xl font-bold font-heading text-white uppercase mb-4">Construction</h3>
                        <p className="text-gray-400 mb-4 font-mono text-sm border-l-2 border-brand-orange pl-4">
                            Kombination aus Stahlrahmen, Beton-Gewichten und hochschlagfesten HPL-Platten.
                        </p>
                        <div className="flex gap-4">
                            <span className="text-xs uppercase tracking-widest text-brand-orange border border-brand-orange px-2 py-1">Stahl</span>
                            <span className="text-xs uppercase tracking-widest text-brand-orange border border-brand-orange px-2 py-1">Beton</span>
                            <span className="text-xs uppercase tracking-widest text-brand-orange border border-brand-orange px-2 py-1">HPL</span>
                        </div>
                    </div>

                    <div className="aspect-[16/10] bg-brand-surface rounded-sm overflow-hidden border border-white/10 group">
                         <img src="https://images.pexels.com/photos/4167333/pexels-photo-4167333.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Kids playing hockey" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">FIG 02. IN ACTION</div>
                    </div>
                </div>
            </div>

            {/* 3. TECH SPECS */}
            <div className="mb-32">
                <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
                    <h2 className="text-4xl font-black font-heading text-white uppercase tracking-tighter">Tech<span className="text-brand-orange">Data</span></h2>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <TechSpecCard title="Höhen" value="40cm / 110cm" icon="height" />
                    <TechSpecCard title="Raster" value="1,50 Meter" icon="grid_view" />
                    <TechSpecCard title="Einsatz" value="Ganzjährig" icon="calendar_month" />
                    <TechSpecCard title="Montage" value="Fundamentfrei" icon="layers" />
                    <TechSpecCard title="Eignung" value="Inline & Eis" icon="ice_skating" />
                    <TechSpecCard title="Material" value="Stahl/HPL/Beton" icon="science" />
                    <TechSpecCard title="Schutz" value="Verletzungsarm" icon="shield" />
                    <TechSpecCard title="Zubehör" value="Tore & Netze" icon="sports_hockey" />
                </div>
            </div>

            <BrochureRequestForm context="productpage" />
            <OtherProducts />

       </div>
    </PageShell>
  );
};

export default ProductHockeyRinkPage;