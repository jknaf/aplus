import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PRODUCTS } from '../constants';
import BrochureRequestForm from '../components/BrochureRequestForm';

const OtherProducts: React.FC = () => {
  const otherProducts = PRODUCTS.filter(p => p.id !== 'bmx-anlagen' && p.id !== 'skate-anlagen').slice(0, 3);
  return (
    <div className="mt-32 border-t border-white/10 pt-24">
      <h2 className="text-3xl font-bold font-heading text-center mb-16 uppercase tracking-widest">More Engineered Solutions</h2>
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

const ProductBmxPage: React.FC = () => {
  useEffect(() => {
    document.title = "BMX-Anlagen & Parks | A+ Urban Design";
  }, []);

  return (
    <PageShell title="Planung & Bau von BMX-Anlagen">
       
       {/* 1. IMMERSIVE HERO */}
       <div className="relative w-full h-[85vh] -mt-16 mb-24 overflow-hidden">
             {/* Video Background for BMX */}
            <div className="absolute inset-0">
                <video 
                    src="https://videos.pexels.com/video-files/5445275/5445275-hd_1920_1080_25fps.mp4"
                    autoPlay muted loop playsInline
                    className="w-full h-full object-cover grayscale opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-brand-bg"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-12 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-6 animate-fade-in-up">
                         <span className="px-3 py-1 border border-brand-orange text-brand-orange text-xs font-bold uppercase tracking-[0.2em]">Dirt & Street</span>
                         <span className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider">
                            <span className="material-symbols-outlined text-base">verified_user</span> DIN EN 14974
                         </span>
                    </div>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-heading uppercase tracking-tighter text-white leading-[0.85] animate-fade-in-up [animation-delay:100ms]">
                        BMX<br/>
                        <span className="text-outline-bold">Parks</span>
                    </h1>
                </div>
            </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* 2. SPLIT LAYOUT */}
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 mb-32">
                
                {/* Sticky Narrative */}
                <div className="lg:w-5/12">
                    <div className="lg:sticky lg:top-32">
                        <h2 className="text-3xl font-bold font-heading text-white mb-8">Big Air. Hard Concrete.</h2>
                        <p className="text-xl text-gray-400 leading-relaxed mb-8">
                            BMX-Parks müssen extremen Belastungen standhalten. Wenn Pegs auf Kanten treffen und Reifen mit hoher Geschwindigkeit landen, versagen Holz und Asphalt schnell.
                        </p>
                        <p className="text-lg text-brand-muted leading-relaxed mb-12">
                            Unsere Beton-Lösungen für Jump-Ramps, Dirt-Lines und Bowls sind für die Ewigkeit gebaut. Die massiven Elemente bieten Stabilität bei jedem Aufprall und sind dennoch flexibel in der Anordnung.
                        </p>
                        
                        <div className="flex flex-col gap-4">
                            <Link 
                                to="/kontakt" 
                                className="inline-flex justify-center items-center gap-2 bg-brand-orange text-black font-black uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-white hover:text-brand-orange transition-all duration-300 transform hover:-translate-y-1 shadow-xl group"
                            >
                                Park anfragen <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Scrolling Gallery */}
                <div className="lg:w-7/12 flex flex-col gap-8">
                    <div className="aspect-[16/10] bg-brand-surface rounded-sm overflow-hidden border border-white/10 group">
                         <img src="https://images.pexels.com/photos/165438/pexels-photo-165438.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="BMX Jump Ramp" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">FIG 01. JUMP RAMPS</div>
                    </div>
                    
                    {/* Elements Grid */}
                    <div className="bg-brand-surface border border-white/10 p-8 my-8">
                        <h3 className="text-2xl font-bold font-heading text-white uppercase mb-4">Core Elements</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-400 font-mono">
                             <div className="border-b border-white/5 py-2 flex justify-between"><span>Dirt-Lines</span> <span className="text-brand-orange">+</span></div>
                             <div className="border-b border-white/5 py-2 flex justify-between"><span>Spines</span> <span className="text-brand-orange">+</span></div>
                             <div className="border-b border-white/5 py-2 flex justify-between"><span>Vertebrate</span> <span className="text-brand-orange">+</span></div>
                             <div className="border-b border-white/5 py-2 flex justify-between"><span>Wall-Rides</span> <span className="text-brand-orange">+</span></div>
                        </div>
                    </div>

                    <div className="aspect-[16/10] bg-brand-surface rounded-sm overflow-hidden border border-white/10 group">
                         <img src="https://images.pexels.com/photos/34521/bmx-rider-dramatic-lighting-action.jpg?auto=compress&cs=tinysrgb&w=1200" alt="BMX Bowl Action" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">FIG 02. BOWL SECTION</div>
                    </div>
                </div>
            </div>

            {/* 3. TECHNICAL SPECS */}
            <div className="mb-32">
                <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
                    <h2 className="text-4xl font-black font-heading text-white uppercase tracking-tighter">Specs<span className="text-brand-orange">Sheet</span></h2>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <TechSpecCard title="Disziplinen" value="Dirt, Park, Street" icon="sports_motorsports" />
                    <TechSpecCard title="Belastung" value="Extreme Duty" icon="fitness_center" />
                    <TechSpecCard title="Kanten" value="Stahl / Beton" icon="straighten" />
                    <TechSpecCard title="Montage" value="Fundamentfrei" icon="layers" />
                    <TechSpecCard title="Lautstärke" value="Reduziert" icon="volume_down" />
                    <TechSpecCard title="Lebensdauer" value="30+ Jahre" icon="update" />
                    <TechSpecCard title="Sicherheit" value="TÜV / GS" icon="security" />
                    <TechSpecCard title="Oberfläche" value="High Grip" icon="terrain" />
                </div>
            </div>

            <BrochureRequestForm context="productpage" />
            <OtherProducts />

       </div>
    </PageShell>
  );
};

export default ProductBmxPage;