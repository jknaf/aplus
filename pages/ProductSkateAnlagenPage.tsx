import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PRODUCTS } from '../constants';
import BrochureRequestForm from '../components/BrochureRequestForm';
import ReferencedProjects from '../components/ReferencedProjects';

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

const TechSpecCard: React.FC<{ title: string; value: string; icon: string; href?: string; linkLabel?: string }> = ({ title, value, icon, href, linkLabel }) => {
    const content = (
        <>
            <span className="material-symbols-outlined text-brand-orange text-3xl mb-4">{icon}</span>
            <h4 className="text-brand-muted font-mono text-xs uppercase tracking-widest mb-2">{title}</h4>
            <p className="text-brand-dark font-bold text-lg leading-tight">{value}</p>
            {href && (
                <span className="mt-3 inline-flex items-center gap-1 text-brand-orange font-mono text-xs uppercase tracking-wider">
                    {linkLabel ?? 'Zertifikat ansehen'}
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                </span>
            )}
        </>
    );
    const baseClass = "bg-brand-surface/40 border border-brand-dark/5 p-6 rounded-xl shadow-sm hover:border-brand-orange/50 transition-colors duration-300";
    if (href) {
        return (
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${title}: ${value}, ${linkLabel ?? 'Zertifikat in der TÜV-SÜD-Datenbank ansehen'}`}
                className={`${baseClass} block group hover:shadow-md`}
            >
                {content}
            </a>
        );
    }
    return <div className={baseClass}>{content}</div>;
};

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
        <div className="absolute inset-0 flex items-center justify-center bg-black/15 group-hover:bg-black/5 transition-colors">
          <div className="w-16 h-16 rounded-full bg-brand-orange/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-xl">
            <span className="material-symbols-outlined text-white text-3xl ml-1">play_arrow</span>
          </div>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 to-transparent">
        <span className="text-white text-sm font-bold uppercase tracking-wider">{video.title}</span>
      </div>
    </div>
  );
};

const ProductSkateAnlagenPage: React.FC = () => {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Skate-Anlagen aus Beton",
    "description": "Modulare Skate-Anlagen aus Beton. TÜV-zertifiziert, fundamentfrei und langlebig.",
    "brand": { "@type": "Brand", "name": "A+ Urban Design" },
    "manufacturer": { "@type": "Organization", "name": "A+ Urban Design", "url": "https://www.aplusurbandesign.com" },
    "category": "Sportanlagen",
    "material": "Beton",
    "image": "https://www.aplusurbandesign.com/images/skate-bowls/skate-bowl-01.jpg",
    "offers": {
      "@type": "Offer",
      "url": "https://www.aplusurbandesign.com/produkte/skate-anlagen",
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
    <PageShell
        title="Skatepark-Hersteller: Beton-Skateparks planen & bauen"
        description="A+ Urban Design plant und baut modulare Beton-Skateparks. TÜV-zertifizierte Skate-Elemente wie Ramps, Bowls & Rails. Fundamentfrei, europaweite Lieferung."
        schema={productSchema}
    >

       {/* 1. IMMERSIVE HERO */}
       <div className="relative w-full h-[60vh] -mt-16 mb-24 overflow-hidden rounded-b-2xl border-b border-brand-dark/10 z-10">
            <div className="absolute inset-0">
                 <img src="/images/homepage/hero-anlage-01.jpg" alt="Skatepark aus Betonelementen, Gesamtansicht" className="w-full h-full object-cover animate-kenburns-1" loading="eager" fetchPriority="high" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-dark/80 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
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
                        Skatepark<br/><span className="text-brand-orange">aus Beton</span>
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
                            Wir entwickeln modulare Skate-Elemente aus Beton für dauerhafte Skateparks im öffentlichen Raum. Unsere Elemente gehörten zu den ersten Beton-Skateelementen in Europa mit TÜV-Zertifikat.
                        </p>
                        <p className="text-lg text-brand-muted leading-relaxed mb-6">
                            Auf der Landesgartenschau 2000 in Memmingen wurde erstmals unsere Combi-Pipe ins Erdreich eingebaut. 2002 folgte der erste Bowl auf Gran Canaria.
                        </p>
                        <p className="text-lg text-brand-muted leading-relaxed mb-8">
                            Unsere Skateelemente stehen auf Meereshöhe ebenso wie auf über 1.000 m, von Norwegen bis zu den Kanaren und von England bis in die Türkei.
                        </p>

                        <div className="flex flex-col gap-4">
                            <Link to="/kontakt?projectType=Skatepark" className="inline-flex justify-center items-center gap-2 bg-brand-orange text-white font-extrabold uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-brand-dark hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-xl relative z-30 group">
                                3D-Planung anfragen <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                            <span className="text-xs text-brand-muted font-mono text-center">Mit Kostenschätzung. Wir liefern und montieren schlüsselfertig.</span>
                        </div>
                    </div>
                </div>

                <div className="lg:w-7/12 flex flex-col gap-6">
                    <GalleryImage src="/images/skateparks/skatepark-01.jpg" alt="Skatepark aus modularen Beton-Elementen" label="Abb. 1: Anlage mit Pipes, Quarterpipes und Funbox" />
                    <GalleryImage src="/images/skate-anlagen/skate-anlage-01.jpg" alt="Skate-Anlage mit offenen und geschlossenen Bowls" label="Abb. 2: Große Anlage mit Bowls und Street-Bereich, von oben" />
                    <GalleryImage src="/images/skateparks/skatepark-04.jpg" alt="Skatepark mit Pipe und Bowl aus Beton-Fertigteilen" label="Abb. 3: Funbox und Bowl in einer Grünanlage" />
                </div>
            </div>

            {/* 4. SKATE-ELEMENTE / MODULE SEKTION */}
            <div className="mb-32 relative z-20">
                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    <div>
                        <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-4 uppercase tracking-widest bg-brand-orange/10 rounded-md">Baukastensystem</span>
                        <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                            Skatepark-<span className="text-brand-orange">Elemente</span>
                        </h2>
                    </div>
                </div>

                <div className="grid lg:grid-cols-5 gap-8 mb-8">
                    <div className="lg:col-span-2">
                        <p className="text-lg text-brand-muted leading-relaxed mb-6">
                            Unsere Skate-Module sind aus bewehrtem Beton hergestellt. Elemente von 35 bis 150 cm Höhe haben <strong className="text-brand-dark">höhenverstellbare Füße</strong> und sind in <strong className="text-brand-dark">Hohlkörperbauweise</strong> gebaut. Das spart Gewicht. Module bis 150 cm haben unten Aussparungen für Hubwagen oder Gabelstapler, durch die auch Regenwasser abläuft.
                        </p>
                        <p className="text-brand-muted leading-relaxed mb-6">
                            Die Elemente gibt es in den Höhen <strong className="text-brand-dark">35, 45, 60, 75, 98, 125 und 150 cm</strong>, die Wände sind 8 bis 16 cm stark. Die Pipes sind 165, 200 oder 255 cm hoch. Darin ist das Flat, also der ebene Boden, schon eingerechnet. Sie stehen auf arretierbaren Stützen. Kleine Pipes lassen sich auch aus den niedrigeren Elementen zusammenstellen. Mehr dazu auf der Seite <Link to="/produkte/skate-pipes-beton" className="text-brand-orange hover:underline">Skate-Pipes</Link>.
                        </p>
                        <p className="text-brand-muted leading-relaxed mb-6">
                            Die Skate-Elemente aus Beton sind UV- und witterungsbeständig und durch die konische Form auch auf leicht unebenem Untergrund montierbar. Die eingebauten Kantenschutzprofile ermöglichen es, die Skate-Elemente mit offenen Fugen aufzustellen. Auf Wunsch schließen wir die Fugen mit unserem eigenen Verfahren.
                        </p>
                        <p className="text-brand-muted leading-relaxed">
                            Die Elemente gibt es in zwei Ausführungen: zum direkten Aufstellen auf einer vorhandenen Fläche oder zum Aufstellen auf einer Fundamentplatte. Im zweiten Fall wird das Flat anschließend mit unserem Fugenverfahren anbetoniert oder anasphaltiert.
                        </p>
                    </div>
                    <div className="lg:col-span-3 grid grid-cols-2 gap-4">
                        <GalleryImage src="/images/skate-elemente/skate-elemente-beton-01.jpg" alt="Rampen und Boxen an einer Strandpromenade" label="Rampen und Boxen an einer Strandpromenade" />
                        <GalleryImage src="/images/skate-elemente/skate-elemente-beton-02.jpg" alt="Skate-Elemente als Beton-Fertigteil-Module" label="Quarterpipes in einer Reihe" />
                        <GalleryImage src="/images/skate-elemente/skateelemente-beton-03.jpg" alt="Skatemodule mit Übergangsblech" label="Quarterpipes und Boxen" />
                        <GalleryImage src="/images/skate-elemente/skate-module-beton-04.jpg" alt="Zusammengebaute Beton-Skatemodule" label="Fertigteile auf dem Lagerplatz" />
                    </div>
                </div>
            </div>

            {/* 4b. CORE ELEMENTS: 4 Kombinationstypen */}
            <div className="mb-32 relative z-20">
                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    <div>
                        <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-4 uppercase tracking-widest bg-brand-orange/10 rounded-md">Aufstellungsvarianten</span>
                        <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                            Vier <span className="text-brand-orange">Grundformen</span>
                        </h2>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-brand-surface/60 border border-brand-dark/10 rounded-xl p-6">
                        <div className="text-xs font-mono text-brand-orange mb-2 uppercase tracking-widest">01</div>
                        <h3 className="text-xl font-bold font-heading text-brand-dark uppercase mb-2">Standard mit variabler Breite</h3>
                        <p className="text-sm text-brand-muted leading-relaxed">Die Grundaufstellung hat auf beiden Seiten ein Flat und eine Plattform. Die Breite ist im Modulraster flexibel.</p>
                    </div>
                    <div className="bg-brand-surface/60 border border-brand-dark/10 rounded-xl p-6">
                        <div className="text-xs font-mono text-brand-orange mb-2 uppercase tracking-widest">02</div>
                        <h3 className="text-xl font-bold font-heading text-brand-dark uppercase mb-2">Kombi mit Spine</h3>
                        <p className="text-sm text-brand-muted leading-relaxed">Zwei Rampen stehen Rücken an Rücken und sind über einen gemeinsamen Grat verbunden, den Spine.</p>
                    </div>
                    <div className="bg-brand-surface/60 border border-brand-dark/10 rounded-xl p-6">
                        <div className="text-xs font-mono text-brand-orange mb-2 uppercase tracking-widest">03</div>
                        <h3 className="text-xl font-bold font-heading text-brand-dark uppercase mb-2">Kombi mit Banks</h3>
                        <p className="text-sm text-brand-muted leading-relaxed">Zusatz-Banks erweitern die Anlage seitlich und bieten flache An- und Abfahrten.</p>
                    </div>
                    <div className="bg-brand-surface/60 border border-brand-dark/10 rounded-xl p-6">
                        <div className="text-xs font-mono text-brand-orange mb-2 uppercase tracking-widest">04</div>
                        <h3 className="text-xl font-bold font-heading text-brand-dark uppercase mb-2">Kombi mit Coping-Ramps</h3>
                        <p className="text-sm text-brand-muted leading-relaxed">Coping-Ramps haben ein durchlaufendes Copingrohr. Die Rundung ist zum Fahren da, das Rohr zum Grinden.</p>
                    </div>
                </div>
            </div>

            {/* 5. TECHNISCHE DETAILS: alle 3 Detail-Bilder */}
            <div className="mb-32 relative z-20">
                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    <div>
                        <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-4 uppercase tracking-widest bg-brand-orange/10 rounded-md">Konstruktion</span>
                        <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                            Details<span className="text-brand-orange">.</span>
                        </h2>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <div className="bg-brand-surface/60 border border-brand-dark/10 rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <img src="/images/details/schutzkante-01.jpg" alt="Gerundetes Kantenschutzprofil" loading="lazy" className="w-full aspect-[16/10] object-cover" />
                        <div className="p-6">
                            <h3 className="text-lg font-bold font-heading text-brand-dark uppercase mb-2">Kantenschutzprofil</h3>
                            <p className="text-sm text-brand-muted leading-relaxed">
                                Alle Kanten ohne Copingrohr haben ein gerundetes Kantenschutzprofil aus Hartgummi. Es ist auf allen Seiten der Fahrfläche einbetoniert, auch an gewölbten Flächen.
                            </p>
                        </div>
                    </div>

                    <div className="bg-brand-surface/60 border border-brand-dark/10 rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <img src="/images/details/copingrohr-02.jpg" alt="Copingrohr mit Alu-Kappe" loading="lazy" className="w-full aspect-[16/10] object-cover" />
                        <div className="p-6">
                            <h3 className="text-lg font-bold font-heading text-brand-dark uppercase mb-2">Copingrohre</h3>
                            <p className="text-sm text-brand-muted leading-relaxed">
                                Die durchlaufenden Copingrohre werden vollständig in Zweikomponentenkleber eingebettet und mit Stahlzapfen im Beton befestigt. Die Enden werden mit gedrehten Alu-Kappen verschlossen.
                            </p>
                        </div>
                    </div>

                    <div className="bg-brand-surface/60 border border-brand-dark/10 rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <img src="/images/skate-anlagen/uebergangsblech.jpg" alt="Edelstahl-Übergangsblech zwischen Skate-Element und angrenzender Fläche" loading="lazy" className="w-full aspect-[16/10] object-cover" />
                        <div className="p-6">
                            <h3 className="text-lg font-bold font-heading text-brand-dark uppercase mb-2">Übergangsblech</h3>
                            <p className="text-sm text-brand-muted leading-relaxed">
                                Ein Übergangsblech aus Edelstahl am unteren Rand sorgt für einen bündigen, stolperfreien Übergang zur angrenzenden Fläche aus Asphalt oder Beton. Es wird im Werk einbetoniert.
                            </p>
                        </div>
                    </div>

                    <div className="bg-brand-surface/60 border border-brand-dark/10 rounded-xl overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <img src="/images/details/einstellung-04.jpg" alt="Arretierungsfuß auf verzinkter Platte" loading="lazy" className="w-full aspect-[16/10] object-cover" />
                        <div className="p-6">
                            <h3 className="text-lg font-bold font-heading text-brand-dark uppercase mb-2">Arretierungsfuß</h3>
                            <p className="text-sm text-brand-muted leading-relaxed">
                                Elemente ab 35 cm haben Arretierungsfüße. Mit ihnen gleicht man Unebenheiten der Aufstellfläche in der Höhe aus. Verankerungen oder ein Mörtelbett sind nicht nötig. Das erleichtert den Auf-, Um- und Abbau der Skate-Elemente.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 6. WEITERE SKATEPARKS GALERIE */}
            <div className="mb-32 relative z-20">
                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                        Skate<span className="text-brand-orange">parks</span>
                    </h2>
                    <span className="font-mono text-brand-muted text-xs hidden sm:block">REFERENZEN</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <GalleryImage src="/images/skate-anlagen/skate-anlagen-02.jpg" alt="Skateanlage mit offenem Bowl" label="Anlage mit Bowl, von oben" />
                    <GalleryImage src="/images/skate-anlagen/skateanlage-03.jpg" alt="Skatepark mit Bowl und Pipe" label="Skatepark mit Bowl in einer Parkanlage" />
                    <GalleryImage src="/images/skate-anlagen/skateanlagen-04.jpg" alt="Skatepark aus Beton-Fertigteilen" label="Anlage mit Pipe und farbiger Bowl" />
                    <GalleryImage src="/images/skateparks/skatepark-02.jpg" alt="Skatepark aus modularen Elementen" label="Sprung über eine Funbox" />
                </div>
            </div>

            {/* 7. TECHNICAL SPECS GRID */}
            <div className="mb-32 relative z-20">
                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                        Technische <span className="text-brand-orange">Daten</span>
                    </h2>
                    <span className="font-mono text-brand-muted text-xs hidden sm:block">DATENBLATT: SKATE-SYSTEME</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <TechSpecCard
                        title="Zertifizierung"
                        value="DIN EN 14974 / TÜV / GS"
                        icon="verified"
                        href="https://www.tuvsud.com/de-de/dienstleistungen/produktpruefung-und-produktzertifizierung/zertifikatsdatenbank/?q=Z1A+056616+0012+Rev.+00"
                        linkLabel="Zertifikat TÜV SÜD"
                    />
                    <TechSpecCard title="Material" value="Bewehrter Beton C35/45" icon="architecture" />
                    <TechSpecCard title="Höhenraster" value="35–150 cm" icon="straighten" />
                    <TechSpecCard title="Wandstärke" value="8–16 cm" icon="square_foot" />
                    <TechSpecCard title="Bauweise" value="Hohlkörper" icon="view_in_ar" />
                    <TechSpecCard title="Kantenschutz" value="Hartgummi" icon="shield" />
                    <TechSpecCard title="Coping" value="Verzinkt + Alu-Kappen" icon="commit" />
                    <TechSpecCard title="Montage" value="Fundamentfrei" icon="layers" />
                    <TechSpecCard title="Oberfläche" value="Offenporig / rutschfest" icon="texture" />
                    <TechSpecCard title="Lärm" value="ca. 5–8 dB(A) leiser als Holz" icon="volume_off" />
                    <TechSpecCard title="Modularität" value="Erweiterbar / versetzbar" icon="extension" />
                    <TechSpecCard title="Einsatzgebiet" value="0 bis über 1.000 m ü. NN" icon="landscape" />
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
            <ReferencedProjects productPath="/produkte/skate-anlagen" />
            <OtherProducts />

       </div>
    </PageShell>
  );
};

export default ProductSkateAnlagenPage;
