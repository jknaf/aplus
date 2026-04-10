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
          <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/10 backdrop-blur-sm rounded-md">Portfolio</span>
          <h2 className="text-4xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-[0.9]">Weitere <span className="text-brand-orange">Lösungen.</span></h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {otherProducts.map(product => (
          <Link key={product.id} to={product.path} className="group relative block overflow-hidden rounded-sm aspect-[4/5] bg-brand-surface/60 border border-brand-dark/5 z-20 backdrop-blur-sm">
            <img loading="lazy" decoding="async" src={product.imageUrl} alt={product.altText} width="600" height="800" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"/>
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
}

const TechSpecCard: React.FC<{ title: string; value: string; icon: string }> = ({ title, value, icon }) => (
    <div className="bg-brand-surface/40 border border-brand-dark/5 p-6 rounded-xl shadow-sm hover:border-brand-orange/50 transition-colors duration-300">
        <span className="material-symbols-outlined text-brand-orange text-3xl mb-4">{icon}</span>
        <h4 className="text-brand-muted font-mono text-xs uppercase tracking-widest mb-2">{title}</h4>
        <p className="text-brand-dark font-bold text-lg leading-tight">{value}</p>
    </div>
);

const GalleryImage: React.FC<{ src: string; alt: string; label: string }> = ({ src, alt, label }) => (
    <div className="aspect-[16/10] bg-brand-surface/60 rounded-xl overflow-hidden border border-brand-dark/10 group relative shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
        <img src={src} alt={alt} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute bottom-4 left-4 bg-black/80 px-3 py-1 text-xs font-mono text-white">{label}</div>
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

const ProductSkateAnlagenPage: React.FC = () => {
  const productSchema = {
    "@context": "https://schema.org", "@type": "Product",
    "name": "Beton Skate-Anlagen",
    "description": "Modulare Skate-Anlagen aus Beton. TÜV-zertifizierte, fundamentfrei und extrem langlebig für den öffentlichen Raum.",
    "brand": { "@type": "Brand", "name": "A+ Urban Design" },
    "category": "Urban Furniture",
    "image": "/images/skate-bowls/skate-bowl-01.jpg",
    "offers": { "@type": "Offer", "availability": "https://schema.org/InStock", "priceCurrency": "EUR", "price": "0", "url": window.location.href }
  };

  return (
    <PageShell
        title="Skatepark-Hersteller — Beton-Skateparks planen & bauen"
        description="Skatepark-Hersteller seit 1999: A+ Urban Design plant und baut modulare Beton-Skateparks. TÜV-zertifizierte Skate-Elemente wie Ramps, Bowls & Rails. Fundamentfrei, europaweite Lieferung."
        schema={productSchema}
        fullWidth={true}
    >

       {/* 1. IMMERSIVE HERO */}
       <div className="relative w-full h-[60vh] -mt-16 mb-24 overflow-hidden rounded-b-2xl border-b border-brand-dark/10 z-10">
            <div className="absolute inset-0">
                 <img src="/images/homepage/hero-anlage-01.jpg" alt="Hero Beton Skatepark — Totalaufnahme" className="w-full h-full object-cover animate-kenburns-1" loading="eager" fetchPriority="high" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-dark/80 to-transparent"></div>
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
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-heading uppercase tracking-tighter text-white leading-[0.85] animate-fade-in-up [animation-delay:100ms] drop-shadow-2xl">
                        Beton<br/><span className="text-brand-orange">Skateparks</span>
                    </h1>
                </div>
            </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">

            {/* 2. INTRO: GESCHICHTE & ÜBERBLICK */}
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 mb-32">
                <div className="lg:w-5/12">
                    <div className="lg:sticky lg:top-32 relative z-20">
                         <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/10 backdrop-blur-sm rounded-md">Das Original</span>
                        <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none mb-8">
                            Seit den <span className="text-brand-orange">90ern.</span>
                        </h2>
                        <p className="text-xl text-brand-muted leading-relaxed mb-6">
                            Als Skatepark-Hersteller entwickeln wir seit den 90er Jahren modulare Skateelemente aus Beton. 1999 wurden sie als eine der ersten Beton-Skateelemente in Europa TÜV-zertifiziert.
                        </p>
                        <p className="text-lg text-brand-muted leading-relaxed mb-6">
                            Auf der Landesgartenschau 2000 in Memmingen wurde erstmals unsere Combi-Pipe ins Erdreich eingebaut. 2002 folgte der erste Bowl auf Gran Canaria.
                        </p>
                        <p className="text-lg text-brand-muted leading-relaxed mb-8">
                            Heute sind unsere Skaterampen, Bowls und Halfpipes europaweit im Einsatz — von Norwegen bis zu den Kanarischen Inseln, in Höhenlagen von 0 bis über 1.000 m ü. NN.
                        </p>

                        <div className="flex flex-col gap-4">
                            <Link to="/kontakt" className="inline-flex justify-center items-center gap-2 bg-brand-orange text-white font-extrabold uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-brand-dark hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-xl relative z-30 group">
                                3D-Planung anfragen <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                            <span className="text-xs text-brand-muted font-mono text-center">Inklusive Kostenschätzung & Layout</span>
                        </div>
                    </div>
                </div>

                <div className="lg:w-7/12 flex flex-col gap-6">
                    <GalleryImage src="/images/skateparks/skatepark-01.jpg" alt="Skatepark aus modularen Beton-Elementen" label="ABB 01. SKATEPARK MODULAR" />
                    <GalleryImage src="/images/skate-anlagen/skate-anlage-01.jpg" alt="Skate-Anlage mit offenen und geschlossenen Bowls" label="ABB 02. BOWL & STREET AREA" />
                    <GalleryImage src="/images/skateparks/skatepark-04.jpg" alt="Skatepark mit Pipe und Bowl aus Beton-Fertigteilen" label="ABB 03. PIPE & BOWL KOMBI" />
                </div>
            </div>

            {/* 3. SKATE-BOWLS & POOLS SEKTION */}
            <div className="mb-32 relative z-20">
                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    <div>
                        <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-4 uppercase tracking-widest bg-brand-orange/10 rounded-md">Bowls & Pools</span>
                        <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                            Skate-<span className="text-brand-orange">Bowls</span>
                        </h2>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    <div>
                        <p className="text-lg text-brand-muted leading-relaxed mb-6">
                            Mit unseren modularen Skate-Elementen können sowohl geschlossene Bowls (im Erdreich) als auch offene Bowls (oberirdisch) in unendlich vielen Größen und Formen hergestellt werden — mit einer Tiefe von <strong className="text-brand-dark">98 und 150 cm</strong>.
                        </p>
                        <p className="text-brand-muted leading-relaxed">
                            Offene Bowls sind mindestens an einer Seite offen, sodass man direkt aufs Flat gelangt. Sie können wie ein klassischer Bowl und wie Street-Parcours-Geräte verwendet werden. Oberirdische Bowls ab 1,00 m benötigen Tables und Absturzsicherung.
                        </p>
                    </div>
                    <div>
                        <p className="text-brand-muted leading-relaxed mb-6">
                            Die Elemente geschlossener Bowls werden auf gesonderte Fundamente gestellt und anbetoniert. Mindestens ein Gully (besser zwei als Sicherheit) muss eingeplant werden.
                        </p>
                        <p className="text-brand-muted leading-relaxed">
                            Als Kunde haben Sie eine bessere Qualitätskontrolle als bei Ortbeton (Betonstärken, Bewehrung, Fugen), sind schneller in der Ausführung, nahezu wetterunabhängig — und meistens günstiger.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <GalleryImage src="/images/skate-bowls/skate-bowl-01.jpg" alt="Offener Skate-Bowl aus Beton" label="OFFENER BOWL" />
                    <GalleryImage src="/images/skate-bowls/skate-bowl-02.jpg" alt="Bowl aus Beton-Fertigteil-Modulen" label="FERTIGTEIL-BOWL" />
                    <GalleryImage src="/images/skate-bowls/skate-pool-03.jpg" alt="Skate-Bowl aus Beton-Modulen" label="SKATE-POOL" />
                    <GalleryImage src="/images/skate-bowls/skate-pool-04.jpg" alt="Bowl aus modularen Skate-Elementen" label="SKATE-ELEMENTE" />
                    <GalleryImage src="/images/skate-bowls/skate-bowl-pool-05.jpg" alt="S-Form Skate-Bowl aus Beton-Modulen" label="S-FORM BOWL" />
                    <GalleryImage src="/images/skate-bowls/skate-bowls-pools-06.jpg" alt="Skate-Bowl Varianten aus Beton-Fertigteilen" label="VARIANTEN" />
                </div>
            </div>

            {/* 4. SKATE-ELEMENTE / MODULE SEKTION */}
            <div className="mb-32 relative z-20">
                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    <div>
                        <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-4 uppercase tracking-widest bg-brand-orange/10 rounded-md">Baukastensystem</span>
                        <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                            Skate-<span className="text-brand-orange">Elemente</span>
                        </h2>
                    </div>
                </div>

                <div className="grid lg:grid-cols-5 gap-8 mb-8">
                    <div className="lg:col-span-2">
                        <p className="text-lg text-brand-muted leading-relaxed mb-6">
                            Unsere Skatemodule sind aus bewehrtem Beton hergestellt. Elemente von 35 cm bis 150 cm Höhe sind in <strong className="text-brand-dark">Hohlkörperbauweise</strong> ausgeführt, um das Gewicht zu verringern. Module bis 150 cm sind mit Aussparungen für Gabelstapler zum Abladen und Montieren ausgestattet.
                        </p>
                        <p className="text-brand-muted leading-relaxed mb-6">
                            <strong className="text-brand-dark">Höhenraster:</strong> 45 – 60 – 75 – 98 – 125 – 149 cm (Raster 125 cm, Wandstärke 8–16 cm). Pipes in 150, 185, 240 und 320 cm Höhe.
                        </p>
                        <p className="text-brand-muted leading-relaxed">
                            Die Module sind UV- und witterungsbeständig. Durch die konische Ausführung und die eingebauten Kantenschutzprofile können die Elemente mit offenen Fugen aufgestellt werden. Bei Bedarf können Fugen mit unserem speziellen Verfahren elastisch und schleifbar geschlossen werden.
                        </p>
                    </div>
                    <div className="lg:col-span-3 grid grid-cols-2 gap-4">
                        <GalleryImage src="/images/skate-elemente/skate-elemente-beton-01.jpg" alt="Skate-Elemente: Ramps und Skateteile" label="RAMPS & TEILE" />
                        <GalleryImage src="/images/skate-elemente/skate-elemente-beton-02.jpg" alt="Skate-Elemente als Beton-Fertigteil-Module" label="FERTIGTEIL-MODULE" />
                        <GalleryImage src="/images/skate-elemente/skateelemente-beton-03.jpg" alt="Skatemodule mit Übergangsblech" label="MIT ÜBERGANGSBLECH" />
                        <GalleryImage src="/images/skate-elemente/skate-module-beton-04.jpg" alt="Zusammengebaute Beton-Skatemodule" label="ZUSAMMENGEBAUT" />
                    </div>
                </div>
            </div>

            {/* 5. TECHNISCHE DETAILS — alle 3 Detail-Bilder */}
            <div className="mb-32 relative z-20">
                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    <div>
                        <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-4 uppercase tracking-widest bg-brand-orange/10 rounded-md">Konstruktion</span>
                        <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                            Details<span className="text-brand-orange">.</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-brand-surface/60 border border-brand-dark/10 rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <img src="/images/details/schutzkante-01.jpg" alt="Gerundetes Kantenschutzprofil" loading="lazy" className="w-full aspect-[16/10] object-cover" />
                        <div className="p-6">
                            <h3 className="text-lg font-bold font-heading text-brand-dark uppercase mb-2">Kantenschutzprofil</h3>
                            <p className="text-sm text-brand-muted leading-relaxed">
                                Alle Rollflächen ohne Gleitkanten sind mit einem gerundeten Hartgummi-Kantenschutzprofil versehen. Längs einbetoniert auf allen Seiten der Fahrfläche — auch auf konkaven Flächen.
                            </p>
                        </div>
                    </div>

                    <div className="bg-brand-surface/60 border border-brand-dark/10 rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <img src="/images/details/copingrohr-02.jpg" alt="Copingrohr mit Alu-Kappe" loading="lazy" className="w-full aspect-[16/10] object-cover" />
                        <div className="p-6">
                            <h3 className="text-lg font-bold font-heading text-brand-dark uppercase mb-2">Copingrohr</h3>
                            <p className="text-sm text-brand-muted leading-relaxed">
                                Durchgehende verzinkte Copingrohre, vollständig in Kleber-/Mörtelbett eingebettet und mit Stahlzapfen im Beton befestigt. Enden mit gedrehten Alu-Kappen verschlossen — gleiten besser und dellen nicht ein.
                            </p>
                        </div>
                    </div>

                    <div className="bg-brand-surface/60 border border-brand-dark/10 rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <img src="/images/details/einstellung-04.jpg" alt="Arretierungsfuß auf verzinkter Platte" loading="lazy" className="w-full aspect-[16/10] object-cover" />
                        <div className="p-6">
                            <h3 className="text-lg font-bold font-heading text-brand-dark uppercase mb-2">Arretierungsfuß</h3>
                            <p className="text-sm text-brand-muted leading-relaxed">
                                Elemente ab 35 cm haben Arretierungsfüße zur Höheneinstellung an Unebenheiten der Aufstellfläche. Kein Mörtelbett nötig — erleichtert auch den Abbau und das Versetzen.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 6. WEITERE SKATEPARKS GALERIE */}
            <div className="mb-32 relative z-20">
                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                        Skate<span className="text-brand-orange">Parks</span>
                    </h2>
                    <span className="font-mono text-brand-muted text-xs hidden sm:block">REFERENZEN</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <GalleryImage src="/images/skate-anlagen/skate-anlagen-02.jpg" alt="Skateanlage mit offenem Bowl" label="ANLAGE MIT BOWL" />
                    <GalleryImage src="/images/skate-anlagen/skateanlage-03.jpg" alt="Skatepark mit Bowl und Pipe" label="BOWL & PIPE" />
                    <GalleryImage src="/images/skate-anlagen/skateanlagen-04.jpg" alt="Skatepark aus Beton-Fertigteilen" label="FERTIGTEIL-PARK" />
                    <GalleryImage src="/images/skateparks/skatepark-02.jpg" alt="Skatepark aus modularen Elementen" label="MODULAR PARK" />
                </div>
            </div>

            {/* 7. TECHNICAL SPECS GRID */}
            <div className="mb-32 relative z-20">
                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                        Tech<span className="text-brand-orange">Specs</span>
                    </h2>
                    <span className="font-mono text-brand-muted text-xs hidden sm:block">DATENBLATT: SKATE-SYSTEME</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <TechSpecCard title="Zertifizierung" value="DIN EN 14974 / TÜV / GS" icon="verified" />
                    <TechSpecCard title="Material" value="C35/45 Beton" icon="architecture" />
                    <TechSpecCard title="Höhenraster" value="45 – 149 cm" icon="straighten" />
                    <TechSpecCard title="Wandstärke" value="8 – 16 cm" icon="square_foot" />
                    <TechSpecCard title="Bauweise" value="Hohlkörper" icon="view_in_ar" />
                    <TechSpecCard title="Kantenschutz" value="Hartgummi / Stahl" icon="shield" />
                    <TechSpecCard title="Coping" value="Verzinkt + Alu-Kappen" icon="commit" />
                    <TechSpecCard title="Montage" value="Fundamentfrei" icon="layers" />
                    <TechSpecCard title="Oberfläche" value="Offenporig / rutschfest" icon="texture" />
                    <TechSpecCard title="Lärmschutz" value="Massiv schalldämpfend" icon="volume_off" />
                    <TechSpecCard title="Modularität" value="Erweiterbar / versetzbar" icon="extension" />
                    <TechSpecCard title="Einsatzgebiet" value="0 – 1000+ m ü. NN" icon="landscape" />
                </div>
            </div>

            {/* 8. VIDEO GALERIE */}
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

            {/* 9. BROCHURE & CTA */}
            <BrochureRequestForm context="productpage" />
            <OtherProducts />

       </div>
    </PageShell>
  );
};

export default ProductSkateAnlagenPage;
