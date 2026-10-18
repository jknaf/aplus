import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PRODUCTS } from '../constants';
import BrochureRequestForm from '../components/BrochureRequestForm';
import ReferencedProjects from '../components/ReferencedProjects';
import Bild from '../components/Bild';

const OtherProducts: React.FC = () => {
  const otherProducts = PRODUCTS.filter(p => p.id !== 'hockey' && p.id !== 'pumptrack').slice(0, 3);
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
            <Bild hoch sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" loading="lazy" decoding="async" src={product.imageUrl} alt={product.altText} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"/>
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

const ProductHockeyRinkPage: React.FC = () => {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Hockey-Banden aus Beton",
    "description": "Modulare Hockey-Banden aus Beton, Edelstahl, HPL-Platten und Gummi. Fundamentfrei, in 40 cm oder 110 cm Höhe. Ganzjährig einsetzbar für Inline-, Roll- und Eishockey.",
    "brand": { "@type": "Brand", "name": "A+ Urban Design" },
    "manufacturer": { "@type": "Organization", "name": "A+ Urban Design", "url": "https://www.aplusurbandesign.com" },
    "category": "Sportanlagen",
    "material": "Beton, Edelstahl, HPL-Platten, Gummi",
    "image": "https://www.aplusurbandesign.com/images/hockey/roll-hockey-bande.jpg",
    "offers": {
      "@type": "Offer",
      "url": "https://www.aplusurbandesign.com/produkte/hockey-banden",
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
    <PageShell title="Hockey-Banden für Inline-, Roll- und Eishockey" description="Hockey-Banden und Hockeyfeld aus Beton und Stahl: fundamentfrei, in 40 cm oder 110 cm Höhe. Für Inline-Hockey, Streethockey und Rollhockey. Wartungsarm und schnell aufgebaut, für Kommunen und Vereine." schema={productSchema}>

       {/* 1. HERO */}
       <div className="relative w-full h-[60vh] -mt-16 mb-24 overflow-hidden rounded-b-2xl border-b border-brand-dark/10 z-10">
            <div className="absolute inset-0">
                 {/* OPTIMIZED HERO IMAGE for Mobile Speed */}
                 <Bild hoch src="/images/hockey/roll-hockey-bande.jpg"
                        alt="Rollhockey-Feld mit Beton-Bande"
                        className="w-full h-full object-cover animate-kenburns-1"
                        loading="eager"
                        fetchPriority="high" />
                
                <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-dark/80 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-12 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-6 animate-fade-in-up">
                         <span className="px-3 py-1 border border-brand-orange text-brand-orange text-xs font-bold uppercase tracking-[0.2em] bg-black/40 backdrop-blur-sm">Hockey-Banden</span>
                         <span className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider bg-black/40 backdrop-blur-sm px-2 py-1">
                            <span className="material-symbols-outlined text-base">verified_user</span> Inline- und Eishockey
                         </span>
                    </div>
                    {/* INDUSTRIAL HEADER UPDATE */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-heading uppercase tracking-tighter text-white leading-[0.85] animate-fade-in-up [animation-delay:100ms]">
                        Banden-<br/>
                        <span className="text-brand-orange">system</span>
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
                            Ganzjährig
                        </span>
                        {/* INDUSTRIAL HEADER UPDATE */}
                        <h2 className="text-5xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none mb-8">
                            Spielen. <span className="text-brand-orange">Das ganze Jahr.</span>
                        </h2>
                        <p className="text-xl text-brand-muted leading-relaxed mb-8">
                            Mit unserem Bandensystem wird ein Hartplatz zum Spielfeld für Inline- und Rollhockey. Mit einem Abdichtungsprofil unter der Einfassung lässt sich im Winter auch Eis anlegen.
                        </p>
                        <p className="text-lg text-brand-muted leading-relaxed mb-4">
                            Es gibt zwei Höhen: 40 cm hohe Einfassungselemente aus Beton mit Gummikappe und 110 cm hohe Profilbanden mit Edelstahl-Handlauf für Roll- und Eishockey. Beide Varianten können modular in 1,5-m-Schritten erweitert oder verkleinert werden.
                        </p>
                        <p className="text-lg text-brand-muted leading-relaxed mb-12">
                            <strong className="text-brand-dark">Die Banden brauchen keine Bodenbefestigung.</strong> Sie werden ohne Fundament auf bestehende Hartplätze gestellt. Der Belag bleibt unbeschädigt. Die am stärksten beanspruchte Fläche besteht aus massivem Beton.
                        </p>
                        
                        <div className="flex flex-col gap-4">
                            <Link
                                to="/kontakt?projectType=Sonstiges"
                                className="inline-flex justify-center items-center gap-2 bg-brand-orange text-white font-extrabold uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-brand-dark hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-xl group"
                            >
                                Spielfeld anfragen <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="lg:w-7/12 flex flex-col gap-8">
                    <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-sm overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                         <img src="/images/hockey/inline-hockey-bande-02.jpg" alt="Inline-Hockey auf einem Feld mit niedriger Einfassung" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">Abb. 1: Inline-Hockey auf einem Feld mit niedriger Einfassung</div>
                    </div>
                    
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-8 my-8 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <h3 className="text-2xl font-bold font-heading text-brand-dark uppercase mb-4">Materialien</h3>
                        <p className="text-brand-muted mb-4 font-mono text-sm border-l-2 border-brand-orange pl-4">
                            Alle Materialien sind witterungsbeständig: Beton, Edelstahl, HPL-Platten und Gummi.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <span className="text-xs uppercase tracking-widest text-brand-orange border border-brand-orange px-2 py-1">Beton</span>
                            <span className="text-xs uppercase tracking-widest text-brand-orange border border-brand-orange px-2 py-1">Edelstahl</span>
                            <span className="text-xs uppercase tracking-widest text-brand-orange border border-brand-orange px-2 py-1">HPL</span>
                            <span className="text-xs uppercase tracking-widest text-brand-orange border border-brand-orange px-2 py-1">Gummi</span>
                        </div>
                    </div>

                    <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-sm overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                         <Bild sizes="(min-width: 1024px) 60vw, 100vw" src="/images/hockey/inline-hockey-bande-03.jpg" alt="Spielfeld mit Bande und Edelstahl-Handlauf" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">Abb. 2: Spielfeld mit gelber Bande und Edelstahl-Handlauf</div>
                    </div>

                    <div className="relative aspect-[16/10] bg-brand-surface/60 rounded-sm overflow-hidden border border-brand-dark/10 group shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                         <img src="/images/hockey/hockey-einfassung-01.jpg" alt="40 cm hohe Beton-Einfassung mit Gummikappe" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">Abb. 3: Niedrige Einfassung mit roter Gummikappe</div>
                    </div>
                </div>
            </div>

            {/* 2b. VARIANTEN */}
            <div className="mb-32">
                <div className="mb-8">
                    <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/5 rounded-md">Varianten</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter">
                        40 cm oder <span className="text-brand-orange">110 cm.</span>
                    </h2>
                    <p className="text-lg text-brand-muted mt-4 max-w-3xl">
                        Die 40-cm-Einfassung mit Gummikappen eignet sich als Spielfeldbegrenzung auf bestehenden Hartplätzen. Sie ist stapelbar und vandalismussicher. Die 110-cm-Bande mit Edelstahl-Handlauf umschließt das ganze Spielfeld und ist für regelmäßigen Spielbetrieb gebaut. Beide Varianten lassen sich kombinieren und auf Asphalt- oder Betonflächen fundamentfrei aufstellen.
                    </p>
                </div>
                {/* Roland §8.7: Klarstellung Profil-Bande vs. Einfassung als getrennte Systeme noch final abstimmen */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-brand-surface/60 border border-brand-dark/10 rounded-xl p-8">
                        <div className="text-4xl font-extrabold font-mono text-brand-orange mb-3">40 cm</div>
                        <h3 className="text-xl font-bold font-heading text-brand-dark uppercase mb-3">Einfassungselemente (niedrige Bande)</h3>
                        <p className="text-sm text-brand-muted mb-3">Sie begrenzen das Spielfeld auf bestehenden Hartplätzen.</p>
                        <ul className="space-y-2 text-sm text-brand-muted">
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-orange rounded-full flex-shrink-0"></span>Gummikappen als Aufprallschutz</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-orange rounded-full flex-shrink-0"></span>Modular erweiterbar in 1,5-m-Schritten</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-orange rounded-full flex-shrink-0"></span>Stapelbar für saisonale Nutzung</li>
                        </ul>
                    </div>
                    <div className="bg-brand-surface/60 border border-brand-orange/30 rounded-xl p-8">
                        <div className="text-4xl font-extrabold font-mono text-brand-orange mb-3">110 cm</div>
                        <h3 className="text-xl font-bold font-heading text-brand-dark uppercase mb-3">Profil-Bande für Rollhockey oder Eishockey</h3>
                        <ul className="space-y-2 text-sm text-brand-muted">
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-orange rounded-full flex-shrink-0"></span>Mit integriertem Edelstahl-Handlauf</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-orange rounded-full flex-shrink-0"></span>Optional mit Abdichtungsprofil für Eishockey</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-orange rounded-full flex-shrink-0"></span>Nachrüstbar auf bestehende 40-cm-Einfassung</li>
                            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-brand-orange rounded-full flex-shrink-0"></span>Für intensive Beanspruchung</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* 3. TECH SPECS */}
            <div className="mb-32">
                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    {/* INDUSTRIAL HEADER UPDATE */}
                    <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                        Technische <span className="text-brand-orange">Daten</span>
                    </h2>
                    <span className="font-mono text-brand-muted text-xs hidden sm:block">DATENBLATT: BANDENSYSTEME</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <TechSpecCard title="Höhen" value="40 / 110 cm" icon="height" />
                    <TechSpecCard title="Raster" value="1,50 Meter" icon="grid_view" />
                    <TechSpecCard title="Einsatz" value="Ganzjährig" icon="calendar_month" />
                    <TechSpecCard title="Montage" value="Fundamentfrei" icon="layers" />
                    <TechSpecCard title="Eignung" value="Inline-, Roll- und Eishockey" icon="ice_skating" />
                    <TechSpecCard title="Material" value="Beton, Edelstahl, HPL, Gummi" icon="science" />
                    <TechSpecCard title="Schutz" value="Gummikappe an Einfassung" icon="shield" />
                    <TechSpecCard title="Prallfläche" value="Beton" icon="layers" />
                </div>
            </div>

            <BrochureRequestForm context="productpage" />
            <ReferencedProjects productPath="/produkte/hockey-banden" />
            <OtherProducts />

       </div>
    </PageShell>
  );
};

export default ProductHockeyRinkPage;