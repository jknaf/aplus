import React from 'react';
import { Link } from 'react-router-dom';
import PageShell from '../components/PageShell';
import { PRODUCTS } from '../constants';
import BrochureRequestForm from '../components/BrochureRequestForm';

const OtherProducts: React.FC = () => {
  const otherProducts = PRODUCTS.filter(p => p.id !== 'skate-bowls' && p.id !== 'skate-anlagen').slice(0, 3);
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
};

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
            <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${title}: ${value}`} className={`${baseClass} block group hover:shadow-md`}>
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

const ProductSkateBowlsPage: React.FC = () => {
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Modulare Skate-Bowls aus Beton",
    "description": "Skate-Bowls und Skate-Pools aus modularen Beton-Fertigteilen: Standard-Bowls im Erdreich, offene Bowls oberirdisch, Tiefen 98 und 150 cm. TÜV-zertifiziert nach DIN EN 14974, seit 2002 europaweit im Einsatz.",
    "brand": { "@type": "Brand", "name": "A+ Urban Design" },
    "manufacturer": { "@type": "Organization", "name": "A+ Urban Design", "url": "https://www.aplusurbandesign.com" },
    "category": "Sportanlagen / Urban Sports",
    "material": "Beton",
    "countryOfOrigin": "DE",
    "image": "https://www.aplusurbandesign.com/images/skate-bowls/skate-bowl-01.jpg",
    "offers": {
      "@type": "Offer",
      "url": "https://www.aplusurbandesign.com/produkte/skate-bowls-beton",
      "availability": "https://schema.org/InStock",
      "businessFunction": "https://schema.org/Sell",
      "priceSpecification": { "@type": "PriceSpecification", "priceCurrency": "EUR", "valueAddedTaxIncluded": false }
    }
  };

  return (
    <PageShell
        title="Modulare Skate-Bowls aus Beton — Standard- und Open-Bowls"
        description="Skate-Bowls aus modularen Beton-Fertigteilen: geschlossene Standard-Bowls im Erdreich, offene Bowls oberirdisch. Tiefen 98 und 150 cm. TÜV-zertifiziert nach DIN EN 14974. Planung, Fertigung und Lieferung aus einer Hand."
        schema={productSchema}
    >
       {/* 1. HERO */}
       <div className="relative w-full h-[60vh] -mt-16 mb-24 overflow-hidden rounded-b-2xl border-b border-brand-dark/10 z-10">
            <div className="absolute inset-0">
                 <img src="/images/skate-bowls/skate-bowl-01.jpg" alt="Offener Skate-Bowl aus modularen Beton-Fertigteilen" className="w-full h-full object-cover animate-kenburns-1" loading="eager" fetchPriority="high" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-brand-dark/80 to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 w-full p-4 sm:p-12 z-10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-6 animate-fade-in-up">
                         <span className="px-3 py-1 border border-brand-orange text-brand-orange text-xs font-bold uppercase tracking-[0.2em] bg-black/40 backdrop-blur-sm">Bowls & Pools</span>
                         <span className="flex items-center gap-2 text-white text-xs font-bold uppercase tracking-wider bg-black/40 backdrop-blur-sm px-2 py-1">
                            <span className="material-symbols-outlined text-base">verified_user</span> DIN EN 14974
                         </span>
                    </div>
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold font-heading uppercase tracking-tighter text-white leading-[0.85] animate-fade-in-up [animation-delay:100ms] drop-shadow-2xl">
                        Skate-<br/><span className="text-brand-orange">Bowls</span>
                    </h1>
                </div>
            </div>
       </div>

       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">

            {/* 2. INTRO */}
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-32 mb-32">
                <div className="lg:w-5/12">
                    <div className="lg:sticky lg:top-32 relative z-20">
                         <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-6 uppercase tracking-widest bg-brand-orange/10 backdrop-blur-sm rounded-md">Das Erbe der Pools</span>
                        <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none mb-8">
                            Vom leeren <span className="text-brand-orange">Pool.</span>
                        </h2>
                        <p className="text-xl text-brand-muted leading-relaxed mb-6">
                            In den 50er Jahren entdeckten kalifornische Surfer leere Swimmingpools als Skateflächen. Die charakteristischen geschwungenen Transitions, das Flat und das Copingrohr an der Oberkante sind bis heute die DNA jedes Skate-Bowls.
                        </p>
                        <p className="text-lg text-brand-muted leading-relaxed mb-6">
                            Mit unseren modularen Skate-Elementen aus bewehrtem Beton realisieren wir Skate-Bowls und Skate-Pools in beliebigen Größen und Formen — geschlossen im Erdreich oder offen oberirdisch. Die Skate-Bowls bestehen aus einer horizontalen Fläche an der unteren Seite (Flat), die seitlich von einer gekrümmten Fläche (Transition) begrenzt wird. Entlang der Transition und der oberen Plattform befindet sich ein Copingrohr. Tiefen: <strong className="text-brand-dark">98 cm und 150 cm</strong>.
                        </p>
                        <p className="text-lg text-brand-muted leading-relaxed mb-8">
                            2002 wurde der erste Bowl mit unseren modularen Skateelementen auf Gran Canaria gebaut. Unsere Skateelemente sind im Bereich von 0 m bis über 1.000 m über dem Meeresspiegel im Einsatz — von Norwegen bis zu den Kanaren, von England bis zur Türkei.
                        </p>

                        <div className="flex flex-col gap-4">
                            <Link to="/kontakt?projectType=Skatepark" className="inline-flex justify-center items-center gap-2 bg-brand-orange text-white font-extrabold uppercase tracking-widest py-4 px-8 rounded-lg hover:bg-brand-dark hover:text-white transition-all duration-300 transform hover:-translate-y-1 shadow-xl relative z-30 group">
                                Bowl planen lassen <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                            </Link>
                            <span className="text-xs text-brand-muted font-mono text-center">Kostenlose 3D-Voranalyse, schlüsselfertige Lieferung und Montage</span>
                        </div>
                    </div>
                </div>

                <div className="lg:w-7/12 flex flex-col gap-6">
                    <GalleryImage src="/images/skate-bowls/skate-bowl-02.jpg" alt="Skate-Bowl aus modularen Beton-Fertigteilen" label="ABB 01. MODULARER BOWL" />
                    <GalleryImage src="/images/skate-bowls/skate-pool-03.jpg" alt="Skate-Pool im Erdreich — geschlossene Bauweise" label="ABB 02. POOL IM ERDREICH" />
                    <GalleryImage src="/images/skate-bowls/skate-bowl-pool-05.jpg" alt="S-Form Skate-Bowl aus Beton-Modulen" label="ABB 03. S-FORM BOWL" />
                </div>
            </div>

            {/* 3. BOWL-TYPEN */}
            <div className="mb-32 relative z-20">
                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    <div>
                        <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-4 uppercase tracking-widest bg-brand-orange/10 rounded-md">Bauweisen</span>
                        <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                            Zwei <span className="text-brand-orange">Systeme.</span>
                        </h2>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 mb-12">
                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-8 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <span className="text-brand-orange font-mono text-xs uppercase tracking-widest">Standard Bowl</span>
                        <h3 className="text-3xl font-bold font-heading text-brand-dark uppercase mt-2 mb-6">Geschlossen · im Erdreich</h3>
                        <p className="text-brand-muted leading-relaxed mb-4">
                            Der klassische Skate-Bowl: rundum geschlossen, eingegraben, Einstieg über die obere Plattform. Die Elemente werden auf gesonderte Fundamente gestellt und anbetoniert — so wird die Anlage dauerhaft mit dem Untergrund verbunden.
                        </p>
                        <p className="text-brand-muted leading-relaxed mb-4">
                            Im Flat ist mindestens ein Gully Pflicht — wir empfehlen einen zweiten als Sicherheit. Größen und Formen sind frei wählbar: Kidney-Pools, Clover-Bowls, Kombi-Pools mit mehreren Tiefen.
                        </p>
                        <ul className="text-sm text-brand-muted font-mono space-y-2 mt-6">
                            <li className="flex gap-2"><span className="text-brand-orange">▸</span> Tiefen 98 und 150 cm</li>
                            <li className="flex gap-2"><span className="text-brand-orange">▸</span> Gully 1 (Minimum) oder 2 (Sicherheit)</li>
                            <li className="flex gap-2"><span className="text-brand-orange">▸</span> Anbetoniert auf gesondertem Fundament</li>
                            <li className="flex gap-2"><span className="text-brand-orange">▸</span> Copingrohr verzinkt, fortlaufend</li>
                        </ul>
                    </div>

                    <div className="bg-brand-surface/60 border border-brand-dark/10 p-8 rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                        <span className="text-brand-orange font-mono text-xs uppercase tracking-widest">Open Bowl</span>
                        <h3 className="text-3xl font-bold font-heading text-brand-dark uppercase mt-2 mb-6">Offen · oberirdisch</h3>
                        <p className="text-brand-muted leading-relaxed mb-4">
                            Der offene Bowl ist an mindestens einer Seite geöffnet — man fährt direkt aufs Flat. Damit funktioniert er wie ein klassischer Bowl und zugleich wie ein Street-Parcours-Element: Pumpen, Grinden, Transfer zurück ins Flat.
                        </p>
                        <p className="text-brand-muted leading-relaxed mb-4">
                            Oberirdische Bowls werden direkt auf die vorhandene Rollfläche gestellt — Übergangsbleche überbrücken den Radius zur Plattform. Kein Aushub, kein Fundament, keine Drainage nötig.
                        </p>
                        <ul className="text-sm text-brand-muted font-mono space-y-2 mt-6">
                            <li className="flex gap-2"><span className="text-brand-orange">▸</span> Direkt auf Bestandsfläche oder Asphalt</li>
                            <li className="flex gap-2"><span className="text-brand-orange">▸</span> Ab 1,00 m Höhe Tables + Absturzsicherung</li>
                            <li className="flex gap-2"><span className="text-brand-orange">▸</span> Ohne Fundamentaushub — fundamentfrei</li>
                            <li className="flex gap-2"><span className="text-brand-orange">▸</span> Versetzbar, erweiterbar, abbaubar</li>
                        </ul>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <GalleryImage src="/images/skate-bowls/skate-bowl-01.jpg" alt="Offener Skate-Bowl aus Beton" label="OPEN BOWL" />
                    <GalleryImage src="/images/skate-bowls/skate-pool-04.jpg" alt="Skate-Pool aus Beton-Fertigteil-Modulen" label="SKATE-POOL" />
                    <GalleryImage src="/images/skate-bowls/skate-bowls-pools-06.jpg" alt="Bowl-Varianten aus modularen Beton-Elementen" label="VARIANTEN" />
                </div>
            </div>

            {/* 4. PLANUNG */}
            <div className="mb-32 relative z-20">
                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    <div>
                        <span className="inline-block py-1 px-3 border border-brand-orange/30 text-brand-orange font-mono text-xs mb-4 uppercase tracking-widest bg-brand-orange/10 rounded-md">Vorteil Fertigteil</span>
                        <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                            Fertigteil vs. <span className="text-brand-orange">Ortbeton.</span>
                        </h2>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    <div>
                        <p className="text-lg text-brand-muted leading-relaxed mb-6">
                            Als Kunde haben Sie eine <strong className="text-brand-dark">bessere Kontrolle der Qualität</strong> als bei Ortbeton: Betonstärken, Bewehrung, Fugen sind im Werk unter kontrollierten Bedingungen gefertigt. Die Ausführung ist schneller, fast wetterunabhängig — und meistens auch noch günstiger.
                        </p>
                        <p className="text-brand-muted leading-relaxed">
                            Wichtig ist aber eine gute Vorplanung der Anlage. <strong className="text-brand-dark">Bitte nehmen Sie vor Beginn der Planung mit uns Kontakt auf.</strong>
                        </p>
                    </div>
                    <div className="bg-brand-dark text-white p-8 rounded-xl">
                        <h3 className="text-2xl font-bold font-heading uppercase mb-4">Planung & Beratung</h3>
                        <p className="text-sm text-white/80 leading-relaxed mb-6">
                            Jede Bowl-Anlage ist eine individuelle Planungsaufgabe. Wir begleiten Sie von der ersten Skizze über die 3D-Visualisierung bis zur schlüsselfertigen Montage.
                        </p>
                        <Link to="/planung" className="inline-flex items-center gap-2 text-brand-orange font-mono text-sm uppercase tracking-wider hover:underline">
                            Planungsprozess ansehen <span className="material-symbols-outlined text-base">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* 5. TECH SPECS */}
            <div className="mb-32 relative z-20">
                <div className="flex items-end justify-between mb-12 border-b border-brand-dark/10 pb-6">
                    <h2 className="text-5xl md:text-6xl font-extrabold font-heading text-brand-dark uppercase tracking-tighter leading-none">
                        Tech<span className="text-brand-orange">Specs</span>
                    </h2>
                    <span className="font-mono text-brand-muted text-xs hidden sm:block">DATENBLATT: BOWLS</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <TechSpecCard
                        title="Zertifizierung"
                        value="DIN EN 14974 / TÜV / GS"
                        icon="verified"
                        href="https://www.tuvsud.com/de-de/dienstleistungen/produktpruefung-und-produktzertifizierung/zertifikatsdatenbank/?q=Z1A+056616+0012+Rev.+00"
                        linkLabel="TÜV-SÜD Zertifikat"
                    />
                    <TechSpecCard title="Bowl-Tiefen" value="98 / 150 cm" icon="straighten" />
                    <TechSpecCard title="Bauweisen" value="Geschlossen · Offen" icon="view_in_ar" />
                    <TechSpecCard title="Material" value="C35/45 Beton" icon="architecture" />
                    <TechSpecCard title="Copingrohr" value="Verzinkt · fortlaufend" icon="commit" />
                    <TechSpecCard title="Gully" value="min. 1 (Pflicht)" icon="water_drop" />
                    <TechSpecCard title="Übergang offen" value="Blechprofil" icon="shield" />
                    <TechSpecCard title="Absturzsicherung" value="ab 1,00 m Höhe" icon="safety_check" />
                    <TechSpecCard title="Freiformen" value="modulweise lösbar" icon="extension" />
                    <TechSpecCard title="Witterung" value="Frostsicher · UV-beständig" icon="ac_unit" />
                    <TechSpecCard title="Versetzbar" value="Ja (Open Bowl)" icon="unfold_more" />
                    <TechSpecCard title="Montage" value="Durch A+ Urban Design" icon="build" />
                </div>
            </div>

            <BrochureRequestForm context="productpage" />
            <OtherProducts />

       </div>
    </PageShell>
  );
};

export default ProductSkateBowlsPage;
