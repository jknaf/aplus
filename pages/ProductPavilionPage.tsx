import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PRODUCTS } from '../constants';
import BrochureRequestForm from '../components/BrochureRequestForm';

const OtherProducts: React.FC = () => {
  const otherProducts = PRODUCTS.filter(p => p.id !== 'ueberdachung' && p.id !== 'grillstelle').slice(0, 3);
  return (
    <div className="mt-32 border-t border-white/10 pt-24">
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

const ProductPavilionPage: React.FC = () => {
  useEffect(() => {
    document.title = "Überdachung & Pavillon aus Beton | A+ Urban Design";
  }, []);

  return (
    <PageShell title="Überdachung & Pavillon aus Beton">
       
       {/* 1. HERO */}
       <div className="relative w-full h-[85vh] -mt-16 mb-24 overflow-hidden rounded-b-2xl border-b border-white/10 z-10">
            <div className="absolute inset-0">
                <img 
                    src="https://www.aplusurbandesign.com/.cm4all/uproc.php/0/A%2B/.4-a%2Bimg_0318b-756x430.jpg/picture-200?format=auto&width=1200" 
                    alt="Hero Pavillon" 
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
                         <span className="px-3 py-1 border border-brand-orange text-brand-orange text-xs font-bold uppercase tracking-[0.2em] bg-black/40 backdrop-blur-sm">Urban Shelter</span>
                         <span className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider bg-black/40 backdrop-blur-sm px-2 py-1">
                            <span className="material-symbols-outlined text-base">umbrella</span> Wetterschutz
                         </span>
                    </div>
                    {/* INDUSTRIAL HEADER UPDATE */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black font-heading uppercase tracking-tighter text-white leading-[0.85] animate-fade-in-up [animation-delay:100ms]">
                        Beton<br/>
                        <span className="text-transparent text-outline-bold">Pavillon</span>
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
                            Architektur
                        </span>
                        {/* INDUSTRIAL HEADER UPDATE */}
                        <h2 className="text-5xl font-black font-heading text-white uppercase tracking-tighter leading-none mb-8">
                            Schutz. <span className="text-transparent text-outline-bold">Raum.</span> Ästhetik.
                        </h2>
                        <p className="text-xl text-gray-300 leading-relaxed mb-8">
                            Unser Überdachungssystem verbindet architektonischen Anspruch mit extremer Funktionalität. Als Bushaltestelle, Jugendtreff oder Schattenspender im Park.
                        </p>
                        <p className="text-lg text-brand-muted leading-relaxed mb-12">
                            Das modulare C-Profil aus Beton kann einzeln stehen oder zu langen Arkaden und Gruppen kombiniert werden. Vandalismus hat an dem massiven Stahlbeton keine Chance.
                        </p>
                        
                        <div className="flex flex-col gap-4">
                            <Link 
                                to="/kontakt" 
                                className="inline-flex justify-center items-center gap-2 bg-brand-orange text-black font-black uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-white hover:text-brand-orange transition-all duration-300 transform hover:-translate-y-1 shadow-xl group"
                            >
                                Beratung anfordern <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="lg:w-7/12 flex flex-col gap-8">
                    <div className="aspect-[16/10] bg-white/5 rounded-sm overflow-hidden border border-white/10 group backdrop-blur-sm">
                         <img src="https://images.pexels.com/photos/208801/pexels-photo-208801.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Pavillon Design" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">FIG 01. MODERN SHELTER</div>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 p-8 my-8 backdrop-blur-sm">
                        <h3 className="text-2xl font-bold font-heading text-white uppercase mb-4">Anwendungen</h3>
                        <ul className="grid grid-cols-2 gap-4 list-disc list-inside text-gray-400">
                            <li>Bushaltestellen</li>
                            <li>Schulhöfe</li>
                            <li>Parkanlagen</li>
                            <li>Fahrradunterstände</li>
                        </ul>
                    </div>

                    <div className="aspect-[16/10] bg-white/5 rounded-sm overflow-hidden border border-white/10 group backdrop-blur-sm">
                         <img src="https://images.pexels.com/photos/210393/pexels-photo-210393.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Massive Bauweise" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">FIG 02. SOLID CONSTRUCTION</div>
                    </div>
                </div>
            </div>

            {/* 3. TECH SPECS */}
            <div className="mb-32">
                <div className="flex items-end justify-between mb-12 border-b border-white/10 pb-6">
                    {/* INDUSTRIAL HEADER UPDATE */}
                    <h2 className="text-5xl md:text-6xl font-black font-heading text-white uppercase tracking-tighter leading-none">
                        Tech<span className="text-transparent text-outline-bold">Specs</span>
                    </h2>
                    <span className="font-mono text-brand-muted text-xs hidden sm:block">DATENBLATT: PAVILLON</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <TechSpecCard title="Länge" value="240 cm" icon="straighten" />
                    <TechSpecCard title="Tiefe" value="200 cm" icon="square_foot" />
                    <TechSpecCard title="Höhe" value="246 cm" icon="vertical_align_top" />
                    <TechSpecCard title="Material" value="Stahlbeton" icon="architecture" />
                    <TechSpecCard title="Montage" value="Fundamentfrei" icon="layers" />
                    <TechSpecCard title="Modular" value="Kombinierbar" icon="view_column" />
                    <TechSpecCard title="Wartung" value="Keine" icon="build_circle" />
                    <TechSpecCard title="Schutz" value="Wetterfest" icon="umbrella" />
                </div>
            </div>

            <BrochureRequestForm context="productpage" />
            <OtherProducts />

       </div>
    </PageShell>
  );
};

export default ProductPavilionPage;