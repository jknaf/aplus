import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PRODUCTS } from '../constants';
import BrochureRequestForm from '../components/BrochureRequestForm';

const OtherProducts: React.FC = () => {
  const otherProducts = PRODUCTS.filter(p => p.id !== 'skate-anlagen' && p.id !== 'pumptrack').slice(0, 3);
  return (
    <div className="mt-32 border-t border-brand-dark/10 pt-24 relative z-20">
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
          <Link key={product.id} to={product.path} className="group relative block overflow-hidden rounded-sm aspect-[4/5] bg-brand-surface/60 border border-brand-dark/5 z-20 backdrop-blur-sm">
            <img loading="lazy" decoding="async" src={product.imageUrl} alt={product.altText} width="600" height="800" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent"></div>
            <div className="relative h-full flex flex-col justify-end p-8 z-30">
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

const VIDEOS = [
  { src: '/videos/skateparks/contest-skate-bmx-inline-scooter.mp4', poster: '/videos/skateparks/poster-contest-skate-bmx.jpg', title: 'Contest: Skate / BMX / Inline / Scooter' },
  { src: '/videos/skateparks/session-skate-bmx-inline-scooter.mp4', poster: '/videos/skateparks/poster-session-skate-bmx.jpg', title: 'Session: Skate / BMX / Inline / Scooter' },
  { src: '/videos/skateparks/contest-skateboard.mp4', poster: '/videos/skateparks/poster-contest-skateboard.jpg', title: 'Contest: Skateboard' },
  { src: '/videos/skateparks/contest-bmx.mp4', poster: '/videos/skateparks/poster-contest-bmx.jpg', title: 'Contest: BMX' },
  { src: '/videos/skateparks/contest-inliner.mp4', poster: '/videos/skateparks/poster-contest-inliner.jpg', title: 'Contest: Inliner' },
  { src: '/videos/skateparks/contest-scooter.mp4', poster: '/videos/skateparks/poster-contest-scooter.jpg', title: 'Contest: Scooter' },
];

const VideoCard: React.FC<{ video: typeof VIDEOS[0] }> = ({ video }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    if (!ref.current) return;
    if (playing) { ref.current.pause(); } else { ref.current.play(); }
    setPlaying(!playing);
  };

  return (
    <div className="group relative aspect-video bg-black rounded-xl overflow-hidden border border-brand-dark/10 cursor-pointer shadow-[0_2px_12px_rgba(0,0,0,0.08)]" onClick={toggle}>
      <video ref={ref} src={video.src} poster={video.poster} muted loop playsInline preload="none" className="w-full h-full object-cover" />
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/10 transition-colors">
          <div className="w-16 h-16 rounded-full bg-brand-orange/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
            <span className="material-symbols-outlined text-white text-3xl ml-1">play_arrow</span>
          </div>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
        <span className="text-white text-sm font-bold uppercase tracking-wider">{video.title}</span>
      </div>
    </div>
  );
};

const VideoGallery: React.FC = () => (
  <div className="mb-32 relative z-20">
    <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
      <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
        Videos<span className="text-brand-orange">.</span>
      </h2>
      <span className="font-mono text-brand-muted text-xs hidden sm:block">CONTESTS & SESSIONS</span>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {VIDEOS.map((video, i) => <VideoCard key={i} video={video} />)}
    </div>
    <p className="text-xs text-brand-muted font-mono mt-4 text-right">Videos: HaiHai Media</p>
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
    "image": "/images/skate-bowls/skate-bowl-01.jpg",
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
       <div className="relative w-full h-[85vh] -mt-16 mb-24 overflow-hidden z-10 rounded-b-2xl border-b border-brand-dark/10">
            <div className="absolute inset-0">
                {/* OPTIMIZED HERO IMAGE for Mobile Speed */}
                 <img
                    src="/images/skate-bowls/skate-bowl-01.jpg"
                    alt="Hero Beton Skatepark"
                    className="w-full h-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                 />
                
                {/* Center area clears for image, edges fade to black/transparent */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent"></div>
                {/* BOTTOM FADE: Must fade to TRANSPARENT to show the global grid below */}
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-brand-dark/80 to-transparent opacity-90"></div>
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
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-heading uppercase tracking-tighter text-white leading-[0.85] animate-fade-in-up [animation-delay:100ms] drop-shadow-2xl">
                        Beton<br/>
                        <span className="text-brand-orange">Skateparks</span>
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
                        <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none mb-8">
                            Seit den <span className="text-brand-orange">90ern.</span>
                        </h2>
                        <p className="text-xl text-brand-muted leading-relaxed mb-8">
                            Unsere modularen Skate-Elemente haben den öffentlichen Raum revolutioniert. Entwickelt in den 90ern, 1999 als weltweit erste modulare Beton-Skateelemente TÜV-zertifiziert. Vom ersten Bowl auf Gran Canaria (2002) bis zu Anlagen in Norwegen und Rumänien.
                        </p>
                        <p className="text-lg text-brand-muted leading-relaxed mb-12">
                            Egal ob Street-Plaza oder Flow-Park: Die Module in Höhen von 45 bis 149 cm (Wandstärke 8–16 cm, Hohlkörperbauweise) werden einfach auf eine verdichtete Schotterfläche gestellt. Kein Tiefbau, keine Fundamente. Die rutschhemmende, offenporige Betonoberfläche bleibt auch bei Nässe griffig.
                        </p>
                        
                        <div className="flex flex-col gap-4">
                            <Link 
                                to="/kontakt" 
                                className="inline-flex justify-center items-center gap-2 bg-brand-orange text-white font-extrabold uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-brand-dark hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-xl relative z-30 group"
                            >
                                3D-Planung anfragen <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                            <span className="text-xs text-brand-muted font-mono text-center">Inklusive Kostenschätzung & Layout</span>
                        </div>
                    </div>
                </div>

                {/* Right: Scrolling Gallery & Features */}
                <div className="lg:w-7/12 flex flex-col gap-8">
                    <div className="aspect-[16/10] bg-brand-surface/60 rounded-sm overflow-hidden border border-brand-dark/10 group relative z-10 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                         <img src="/images/skateparks/skatepark-01.jpg" alt="Skate Bowl Detail" width="800" height="500" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">ABB 01. STREET ELEMENTS</div>
                    </div>
                    
                    {/* Feature Highlight Box - NEW TECHNICAL SECTION */}
                    <div className="bg-brand-surface/60 border border-brand-orange/20 p-8 my-8 relative overflow-hidden z-10 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <div className="flex flex-col md:flex-row items-center gap-8">
                            <div className="w-full md:w-1/2">
                                <h3 className="text-2xl font-bold font-heading text-brand-dark uppercase mb-4 relative z-10">Material & Details</h3>
                                <ul className="space-y-4 relative z-10">
                                    <li className="flex gap-4">
                                        <span className="text-brand-orange font-mono">01</span>
                                        <span className="text-brand-muted"><strong>Coping:</strong> Verzinktes Stahlrohr, perfekt integriert.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-brand-orange font-mono">02</span>
                                        <span className="text-brand-muted"><strong>Kanten:</strong> Feuerverzinkter Stahl-Kantenschutz.</span>
                                    </li>
                                    <li className="flex gap-4">
                                        <span className="text-brand-orange font-mono">03</span>
                                        <span className="text-brand-muted"><strong>Übergang:</strong> Nahtloses Bodenblech.</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="w-full md:w-1/2">
                                <img src="/images/details/copingrohr-02.jpg" className="rounded border border-brand-dark/10" alt="Technical Detail" />
                                <span className="block text-[10px] text-brand-muted font-mono mt-1 text-right">FIG 02. COPING DETAIL</span>
                            </div>
                        </div>
                    </div>

                    <div className="aspect-[16/10] bg-brand-surface/60 rounded-sm overflow-hidden border border-brand-dark/10 group relative z-10 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                         <img src="/images/skateparks/skatepark-04.jpg" alt="Street Skateboarding" width="800" height="500" loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                         <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">ABB 03. MODULAR PARK</div>
                    </div>
                </div>
            </div>

            {/* 3. TECHNICAL SPECS GRID */}
            <div className="mb-32 relative z-20">
                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    {/* INDUSTRIAL HEADER UPDATE */}
                    <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                        Tech<span className="text-brand-orange">Specs</span>
                    </h2>
                    <span className="font-mono text-brand-muted text-xs hidden sm:block">DATENBLATT: SKATE-SYSTEME</span>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <TechSpecCard title="Zertifizierung" value="DIN EN 14974" icon="verified" />
                    <TechSpecCard title="Montage" value="Fundamentfrei" icon="layers" />
                    <TechSpecCard title="Material" value="C35/45 Beton" icon="architecture" />
                    <TechSpecCard title="Höhenraster" value="45–149 cm" icon="straighten" />
                    <TechSpecCard title="Wandstärke" value="8–16 cm" icon="square_foot" />
                    <TechSpecCard title="Bauweise" value="Hohlkörper" icon="view_in_ar" />
                    <TechSpecCard title="Kantenschutz" value="Hartgummi / Stahl" icon="shield" />
                    <TechSpecCard title="Lautstärke" value="Bis –15 dB" icon="volume_off" />
                    <TechSpecCard title="Oberfläche" value="Offenporig / Grip" icon="texture" />
                    <TechSpecCard title="Coping" value="Verzinkt + Alu-Kappen" icon="commit" />
                    <TechSpecCard title="Modularität" value="Erweiterbar" icon="extension" />
                    <TechSpecCard title="Einsatzgebiet" value="0–1000+ m ü. NN" icon="landscape" />
                </div>
            </div>

            {/* 4. VIDEO GALERIE */}
            <VideoGallery />

            {/* 5. BROCHURE & CTA */}
            <BrochureRequestForm context="productpage" />
            <OtherProducts />

       </div>
    </PageShell>
  );
};

export default ProductSkateAnlagenPage;